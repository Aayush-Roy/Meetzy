import { createContext, useContext, useState } from "react";
import httpStatus from "http-status";
import axios from "axios";
export const AuthContext = createContext({});
import {useNavigate} from "react-router-dom";
const client = axios.create({
    baseURL:"http://localhost:8000/api/v1/users/",
})

export const AuthProvider = ({ children }) => { 
    const authContext = useContext(AuthContext);
    const[userData, setUserData] = useState(authContext)
    const router = useNavigate();


    const handleRegister = async(name,username,password)=>{
        try{
            let request = await client.post("/register", {
                name,
                username,
                password
            })
            if(request.status===httpStatus.CREATED){
                return request.data.messages;
            }
        }catch(err){
            console.log("Error during registration:", err);
            throw err;
        }
    }

    const handleLogin = async(username,password)=>{
        try{
            let request = await client.post("/login",{
                username,
                password    
            });
            if(request.status===httpStatus.OK){
                localStorage.setItem("token", request.data.token);
                // router("/home");
            }
        }catch(err){
            console.log("Error during login:", err);
            throw err;
        }
    }

    const data = {
        userData,setUserData,handleRegister,handleLogin
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );

}