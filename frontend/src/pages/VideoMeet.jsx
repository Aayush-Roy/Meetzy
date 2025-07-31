import React, { useEffect, useRef, useState } from 'react'
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

    let localVideoRef = useRef();
    const [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);
    let [video,setVideo] = useState([])
    let [audio,setAudio] = useState()
    let[screen,setScreen] = useState();
    let[showModal,setShowModal] = useState();
    let [screenAvailable, setScreenAvailable] = useState();
    let [messages,setMessages] = useState("");
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
                                socketIdRef.current.emit('signal',fromId, JSON.stringify({"sdp":connections[fromId].localDescription}))
                            }).catch(e=>console.log(e));
                        }).catch(e=>console.log(e));
                    }
                }).catch(e=>console.log(e));
            }
            if(signal.ice){
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e=>console.log(e));
            }
        }
    }

    //Todo addMessage
    let addMessage = (message)=>{

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

                    connections[socketListId].onaddstream = (event)=>{
                        let videoExists = videoRef.current.find(video=>video.socketId===socketListId);
                        if(videoExists){
                            setVideo(videos => {
                                const updatedVideos = videos.map(video=>{
                                    video.socketId === socketListId ? {...video, stream:event.stream} : video;
                                })
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
                            setVideo(videos=>{
                                const updatedVideos = [...videos, newVideo]
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            })
                        }
                    }
                    if(window.localStream!==undefined && window.localStream!==null){
                        connections[socketListId].addStream(window.localStream);
                    }else{
                        //TODO
                    }
                })

                if(id===socketIdRef.current){
                    for(let id2 in connections){
                        if(id2 === socketRef.current) continue;
                        try{
                            connections[id2].addStream(window.localStream)
                        }catch(e){ 
                            console.log(e);
                         }
                         connections[id2].createOffer().then((description)=>{
                            connections[id2].setLocalDescription(description)
                            .then(()=>{
                                socketIdRef.current.emit("signal", id2, JSON.stringify({"sdp":connections[id2].localDescription}))
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

  return (
    <div>
      {askForUsername === true ? 
        <div>
            <h2>Enter into Lobby</h2>
            {username}
            <input className='border border-2' type="text" name="" value={username} onChange={(e)=>setUsername(e.target.value)} id="" />
            <button onClick={connect} className='bg-blue-500 p-4'>Connect</button>

            <div>
                <video  ref={localVideoRef} autoPlay muted></video>
            </div>
        </div> 
        
        :
         <>


        </>  
    }
    </div>
  )
}

export default VideoMeet;
