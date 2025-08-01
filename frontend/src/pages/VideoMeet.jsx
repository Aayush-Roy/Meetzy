import React, { useEffect, useRef, useState } from 'react'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChatIcon from '@mui/icons-material/Chat';
import { Badge } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import CallEndIcon from '@mui/icons-material/CallEnd';
import {useNavigate} from "react-router-dom";
const server_url = "http://localhost:8000";
import { io } from "socket.io-client";
let connections = {};
const peerConfigConnections = {
    "iceServers": [
        {"urls": "stun:stun.l.google.com:19302"},
    ]
};
const VideoMeet = () => {
    var socketRef = useRef();
    let socketIdRef = useRef();
    let routeTo = useNavigate();
    let localVideoRef = useRef();
    const [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);
    let [video,setVideo] = useState([])
    let [audio,setAudio] = useState()
    let[screen,setScreen] = useState();
    let[showModal,setShowModal] = useState();
    let [screenAvailable, setScreenAvailable] = useState();
    let [messages,setMessages] = useState([]);
    let [message,setMessage] = useState("");
    let[newMessage,setNewMessage] = useState(0);
    let [askForUsername, setAskForUsername] = useState(true); 
    let [username, setUsername] = useState("");
    const videoRef = useRef([]);
    const [videos, setVideos] = useState([]);


    // todo
    // if(isChrome()===false){

    // }
    const getPermission = async()=>{
        try{
            const videoPermission = await navigator.mediaDevices.getUserMedia({video: true});
            if(videoPermission){
                setVideoAvailable(true);
                
            }else{
                setVideoAvailable(false);
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({audio: true});
            if(audioPermission){
                setAudioAvailable(true);
            }
            else{
                setAudioAvailable(false);
            }

            if(navigator.mediaDevices.getDisplayMedia){
                setScreenAvailable(true);   
            }
            else{
                setScreenAvailable(false);
            }

            if(videoAvailable && audioAvailable){
                const userMediaStream = await navigator.mediaDevices.getUserMedia({video:videoAvailable, audio:audioAvailable});

                if(userMediaStream){
                    window.localStream = userMediaStream;
                    if(localVideoRef.current){
                        localVideoRef.current.srcObject = userMediaStream;
                        // localVideoRef.current.play();
                    }
                }
            }

        }catch(err){
            console.log("Error getting permissions:", err);
        }
    }

    useEffect(()=>{
        getPermission()
    },[])

    let getUserMediaSuccess = (stream)=>{
        try{
            window.localStream.getTracks().forEach(track=>track.stop())
        }catch(e){
            console.log(e);
        }
        window.localStream = stream;
        localVideoRef.current.srcObject = stream;
        for(let id in connections){
            if(id===socketIdRef.current) continue;
            connections[id].addStream(window.localStream);
            connections[id].createOffer().then((description)=>{
                connections[id].setLocalDescription(description)
                .then(()=>{
                    //before id
                    socketRef.current.emit("signal", id, JSON.stringify({"sdp":connections[id].localDescription}))
                })
                .catch(e=>console.log(e));

            })
        }
        stream.getTracks().forEach(track=>track.onended=()=>{
            setVideo(false);
            setAudio(false);
            try{
                let tracks = localVideoRef.current.srcObject.getTracks();
                tracks.forEach(track=>track.stop()); 
            }catch(e){
                console.log(e)
            }

            //TODO black silence

            let blackSilence = (...args)=>new MediaStream([black(...args),silence( )])
            window.localStream = blackSilence();
            localVideoRef.current.srcObject = window.localStream;

            for(let id in connections){
                connections[id].addStream(window.localStream)
                connections[id].createOffer().then((description)=>{
                    connections[id].setLocalDescription(description)
                    .then(()=>{
                        socketRef.current.emit("signal",id,JSON.stringify({"sdp":connections[id].localDescription}))
                    }).catch(e=>console.log(e));
                })
            }
        })
    }

    // let silence =()=>{
    //     let ctx = new AudioContext();
    //     let oscillator = ctx.createdOscillator() 
    //     let dst = oscillator.connect(ctx.createMediaStreamDestination());
    //     oscillator.start();
    //     ctx.resume();
    //     return Object.assign(dst.stream.getAudioTracks()[0],{enabled:false})
    // }

    let silence = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume?.();
    const track = dst.stream.getAudioTracks()[0];
    track.enabled = false;
    return track;
};



    let black =({width=640, height=480}={})=>{
        let canvas = Object.assign(document.createElement("canvas"),{width,height});
        canvas.getContext('2d').fillRect(0,0,width,height);
        let stream = canvas.captureStream();
        return Object.assign(stream.getVideoTracks()[0],{enabled:false})

    }

    let getUserMedia = async()=>{
        if((video && videoAvailable) || (audio && audioAvailable)){
            navigator.mediaDevices.getUserMedia({
                video: video,  
                audio: audio 
        })
        .then(getUserMediaSuccess)//TODO //getUserMediaSuccess
        .then((stream)=>{})
        .catch((err)=>{console.log(err)})
    }else{
        try{
            let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach((track)=>{
                track.stop()})
        }catch(err){
            console.log("Error in getUserMedia:", err);
        }
    }
}

    useEffect(()=>{
        if(video!== undefined && audio !== undefined){
            getUserMedia();
        }
    },[audio, video])

    //TODO
    let gotMessageFromServer = (fromId,message)=>{
        var signal = JSON.parse(message);
        if(fromId!==socketIdRef.current){
            if(signal.sdp){
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(()=>{
                    if(signal.sdp.type==='offer'){
                        connections[fromId].createAnswer().then((description)=>{
                            connections[fromId].setLocalDescription(description).then(()=>{
                                socketRef.current.emit('signal',fromId, JSON.stringify({"sdp":connections[fromId].localDescription}))
                            }).catch(e=>console.log(e));
                        }).catch(e=>console.log(e));
                    }
                }).catch(e=>console.log(e));
            }
            if(signal.ice){
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e=>console.log(e));
//                 if (connections[fromId].remoteDescription && connections[fromId].remoteDescription.type) {
//     connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e));
// } else {
//   console.warn("Remote description not set yet, skipping ice candidate");
// }

            }
        }
    }

    //Todo addMessage
    let addMessage = (data,sender,socketIdSender)=>{
      setMessages((prevMessages)=>[
        ...prevMessages,{sender:sender,data:data} 
      ])
      if(socketIdSender!==socketIdRef.current){
        setNewMessage((prevMessages)=>prevMessages+1);
      }
    } 


    let connectToSocketServer = ()=>{
        // socketIdRef.current = io.connect(server_url,{secure:false})
        socketRef.current = io.connect(server_url, { secure: false })
        // socketIdRef.current.on('signal',gotMessageFromServer); 
        socketRef.current.on('signal', gotMessageFromServer)
        socketRef.current.on('connect',()=>{
            socketRef.current.emit("join-call",window.location.href);
            socketIdRef.current = socketRef.current.id;
            socketRef.current.on("chat-message",addMessage)
            socketRef.current.on("user-left",(id)=>{
                setVideo((videos)=>videos.filter((video)=>video.socketId !== id));     
            })
            //before - id 
            socketRef.current.on("user-joined",(id,clients)=>{
                clients.forEach((socketListId)=>{
                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
                    connections[socketListId].onicecandidate = (event)=>{
                        if(event.candidate!==null){
                            socketRef.current.emit("signal", socketListId, JSON.stringify({'ice': event.candidate}));
                        }
                    }
                    console.log("🆕 Adding video for:", socketListId);
                    connections[socketListId].onaddstream = (event)=>{
                        console.log("📹 onaddstream fired for:", socketListId);
                        let videoExists = videoRef.current.find(video=>video.socketId===socketListId);
                        if(videoExists){
                            setVideos(videos => {
                                // const updatedVideos = videos.map(video=>{
                                //     video.socketId === socketListId ? {...video, stream:event.stream} : video;
                                // })
                                const updatedVideos = videos.map(video =>
                                video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );

                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            })
                        }else{
                            let newVideo = {
                                socketId:socketListId,
                                stream:event.stream,
                                autoPlay:true,
                                playsinline:true,
                            }
                            //before setVideo 
                            setVideos((videos=[])=>{
                                const updatedVideos = [...videos, newVideo];
                                 console.log("🆕 Adding video for:", socketListId); 
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            })
                        }
                    }
                    if(window.localStream!==undefined && window.localStream!==null){
                        connections[socketListId].addStream(window.localStream);
                    }else{
                        //TODO
                        let blackSilence = (...args)=>new MediaStream([black(...args),silence( )])
                        window.localStream = blackSilence();
                        connections[socketListId].addStream(window.localStream);
                    }
                })

                if(id===socketIdRef.current){
                    for(let id2 in connections){
                        if(id2 === socketIdRef.current) continue;
                        try{
                            connections[id2].addStream(window.localStream)
                        }catch(e){ 
                            console.log(e);
                         }
                         connections[id2].createOffer().then((description)=>{
                            connections[id2].setLocalDescription(description)
                            .then(()=>{
                                //id-before
                                socketRef.current.emit("signal", id2, JSON.stringify({"sdp":connections[id2].localDescription}))
                            }).catch(e=>console.log(e));
                         })

                    }
                }

            })
        })
    }


    let getMedia = ()=>{
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }

    let connect = ()=>{
        setAskForUsername(false);
        getMedia();
    }

    let handleVideo=()=>{
      setVideo(!video);
    }


    let handleAudio=()=>{
      setAudio(!audio);
    }


    let sendMessage =()=>{
      socketRef.current.emit("chat-message",message,username);
      setMessage("");
    }

    let handleEndCall=()=>{
      try{
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach(track=>track.stop())
      }catch(e){
        console.log(e);
      }
      routeTo("/home");
    }

  return (
    // <div>
    //   {askForUsername === true ? 
    //     <div>
    //         <h2>Enter into Lobby</h2>
    //         {username}
    //         <input className='border border-2' type="text" name="" value={username} onChange={(e)=>setUsername(e.target.value)} id="" />
    //         <button onClick={connect} className='bg-blue-500 p-4'>Connect</button>

    //         <div>
    //             <video  ref={localVideoRef} autoPlay muted></video>
    //         </div>
    //     </div> 
        
    //     :
    //      <div>
    //     <video ref={localVideoRef} autoPlay muted></video>
    //       {console.log("videos state in render:", videos)}
    //       {videos.map((video) => (
    //         <div key={video.socketId}>
    //           <h2>{video.socketId}</h2>
    //           {console.log("rendered socketid", video.socketId)}
    //           <video data-socket={video.socketId}
    //           ref={ref=>{
    //             if(ref && video.stream){
    //                 ref.srcObject = video.stream;
    //             }
    //           }}
    //            autoPlay ></video>
    //         </div>
    //       ))}
        
    //     </div>  
    // }
    // </div>
    <div className="w-screen h-screen bg-gray-900 text-white flex flex-col">
  {askForUsername ? (
    <div className="flex-1 flex flex-col items-center justify-center space-y-6">
      <h2 className="text-3xl font-semibold">Join Meeting</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 text-white w-72 outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your name"
      />
      <button
        onClick={connect}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-medium"
      >
        Connect
      </button>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        className="rounded-lg w-96 h-64 object-cover border-2 border-white shadow-lg"
      />
    </div>
  ) : (
//     <div className="relative flex flex-col flex-1">
//       {/* Video Grid */}
//       <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 overflow-y-auto bg-gray-950">
//         {/* Local Video */}
//         <div className="relative border border-white rounded-lg overflow-hidden shadow-md">
//           <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             className="w-full h-64 object-cover"
//           />
//           <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full text-xs px-2 py-1">
//             You ({username})
//           </div>
//         </div>

//         {/* Remote Videos */}
//         {videos.map((video) => (
//           <div key={video.socketId} className="relative border border-white rounded-lg overflow-hidden shadow-md">
//             <video
//               data-socket={video.socketId}
//               ref={(ref) => {
//                 if (ref && video.stream) {
//                   ref.srcObject = video.stream;
//                 }
//               }}
//               autoPlay
//               className="w-full h-64 object-cover"
//             />
//             <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full text-xs px-2 py-1">
//               {video.socketId.slice(0, 6)}...
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Controls */}
//       <div className="bg-gray-800 py-4 px-6 flex justify-center items-center space-x-6 border-t border-gray-700">
//         {/* Mute / Unmute */}
//         <button
//           // onClick={() => setAudioAvailable((prev) => !prev)}
//           onClick={handleAudio}
//           className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
//         >
//           {audio ? (
//             <MicIcon className="text-green-400" />
//           ) : (
//             <MicOffIcon className="text-red-500" />
//           )}
//         </button>

//         {/* Video on/off */}
//         <button
//           // onClick={() => setVideoAvailable((prev) => !prev)}
//           onClick={handleVideo}
//           className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
//         >
//           {video ? (
//             <VideocamIcon className="text-green-400" />
//           ) : (
//             <VideocamOffIcon className="text-red-500" />
//           )}
//         </button>

//         {/* Screen Share */}
//         <button
//           onClick={() => {
//             if (!screen) {
//               navigator.mediaDevices
//                 .getDisplayMedia({ video: true })
//                 .then((stream) => {
//                   setScreen(stream);
//                   // Replace current stream with screen
//                   window.localStream = stream;
//                   localVideoRef.current.srcObject = stream;
//                 })
//                 .catch((err) => console.log(err));
//             } else {
//               screen.getTracks().forEach((track) => track.stop());
//               setScreen(null);
//               getPermission(); // fallback to camera
//             }
//           }}
//           className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
//         >
//           {screen ? (
//             <StopScreenShareIcon className="text-red-500" />
//           ) : (
//             <ScreenShareIcon className="text-blue-400" />
//           )}
//         </button> 
//         {/*Chat Icon */}
//         <button
  
//   className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 relative"
// >
//   <Badge badgeContent={newMessage} color="error">
//     <ChatIcon className="text-white" />
//   </Badge>
// </button>
//         {/* End Call */}
//         <button
//           onClick={() => window.location.reload()}
//           className="p-3 rounded-full bg-red-600 hover:bg-red-700"
//         >
//           <CallEndIcon className="text-white" />
//         </button>
//       </div>
//     </div>
  <div className="relative flex flex-1 overflow-hidden">
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${showModal ? 'md:w-3/4' : 'w-full'} transition-all duration-300`}>
        {/* Video Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 overflow-y-auto bg-gray-950">
          {/* Local Video */}
          <div className="relative border border-white rounded-lg overflow-hidden shadow-md">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full text-xs px-2 py-1">
              You ({username})
            </div>
          </div>

          {/* Remote Videos */}
          {videos.map((video) => (
            <div key={video.socketId} className="relative border border-white rounded-lg overflow-hidden shadow-md">
              <video
                data-socket={video.socketId}
                ref={(ref) => {
                  if (ref && video.stream) {
                    ref.srcObject = video.stream;
                  }
                }}
                autoPlay
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full text-xs px-2 py-1">
                {video.socketId.slice(0, 6)}...
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-gray-800 py-4 px-6 flex justify-center items-center space-x-6 border-t border-gray-700">
          <button onClick={handleAudio} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
            {audio ? <MicIcon className="text-green-400" /> : <MicOffIcon className="text-red-500" />}
          </button>
          <button onClick={handleVideo} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
            {video ? <VideocamIcon className="text-green-400" /> : <VideocamOffIcon className="text-red-500" />}
          </button>
          <button
            onClick={() => {
              if (!screen) {
                navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
                  setScreen(stream);
                  window.localStream = stream;
                  localVideoRef.current.srcObject = stream;
                }).catch((err) => console.log(err));
              } else {
                screen.getTracks().forEach((track) => track.stop());
                setScreen(null);
                getPermission();
              }
            }}
            className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            {screen ? <StopScreenShareIcon className="text-red-500" /> : <ScreenShareIcon className="text-blue-400" />}
          </button>

          {/* Chat Toggle */}
          <button
            onClick={() => setShowModal(!showModal)}
            className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 relative"
          >
            <Badge badgeContent={newMessage} color="error">
              <ChatIcon className="text-white" />
            </Badge>
          </button>

          {/* End Call */}
          <button onClick={handleEndCall} className="p-3 rounded-full bg-red-600 hover:bg-red-700">
            <CallEndIcon className="text-white" />
          </button>
        </div>
      </div>

      {/* Chat Panel */}
      {showModal && (
 <div className="fixed inset-0 z-50 md:static md:w-1/4 h-full bg-gray-800 border-l border-gray-700 flex flex-col transition-all duration-300">
  <div className="p-4 text-lg font-semibold border-b border-gray-700 flex justify-between items-center">
    <span>Chat</span>
    <button
      className="md:hidden text-white text-xl"
      onClick={() => setShowModal(false)}
    >
      ✕
    </button>
  </div>
  <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`px-3 py-2 rounded-md ${
          msg.sender === username ? 'bg-blue-600 text-white self-end' : 'bg-gray-700 text-white'
        }`}
      >
        <span className="font-bold text-yellow-400">{msg.sender}</span>: {msg.data}
      </div>
    ))}
  </div>
  <div className="p-4 border-t border-gray-700 flex space-x-2">
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      type="text"
      placeholder="Type a message..."
      className="flex-1 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
    />
    <button
      onClick={sendMessage}
      className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
    >
      <SendIcon/>
    </button>
  </div>
</div>

)}

    </div>
  )}
</div>




  )
}

export default VideoMeet;
