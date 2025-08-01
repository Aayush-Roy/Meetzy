import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt,{hash} from "bcrypt";
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username });
        if(!username || !password){
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Username and password are required"});
}

try {
const user = await User.findOne({ username });
if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found"
    });        
}

let isPasswordCorrect = await bcrypt.compare(password, user.password);
if(isPasswordCorrect){
    let token = crypto.randomBytes(20).toString('hex');
    user.token = token;
    await user.save();
    return res.status(httpStatus.OK).json({
        message: "Login successful",
        token: token
    });
}else{
    return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid credentials"
    });
}
}catch(e){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({"message": "An error occurred during login", error: e.message });
}

}


const register = async (req,res)=>{
    const {name, username, password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({
                message:"User already exists",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        username,
        password:hashedPassword
    })
    await newUser.save();
    res.status(httpStatus.CREATED).json({"message":"User registered successfully"});
}catch(err){
    console.error("Error during registration:", err);
    }


}

const getUserHistory =async(req,res)=>{
    const {token} = req.query;
    try{
        const user = await User.findOne({token:token});
        const meetings = await Meeting.find({user_id:user.username})
        res.json(meetings)
    }catch(e){
        console.log(`Something went wrong!!, ${e}`);
    }

}

// const addToHistory =async(req,res)=>{
//     const {token,meeting_code} = req.body;
//     try{
//         const user = await User.findOne({token:token});
//         const newMeenting = new Meeting({
//             user_id:user.username,
//             meetingCode:meeting_code,
//         })
//         await newMeenting.save();
//         res.status(httpStatus.CREATED).json({message:"Added code to history"})
//     }catch(err){
//         res.json({message:"something went wrong ", err})
//     }
// }
const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;
    console.log("meetingcode=>", meeting_code)

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            meeting_id: crypto.randomUUID(),
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

       return res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        return res.json({ message: `Something went wrong ${e}` })
    }
}




export { login, register,getUserHistory,addToHistory  };