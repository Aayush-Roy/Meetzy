import express from 'express';
import mongoose from 'mongoose';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import cors from 'cors';
import connectToSocket from './controllers/socketManager.js';
import userRoutes from './routes/users.routes.js';
const app = express();
const server = createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:8000",
//         methods: ["GET", "POST"]
//     }
// });
const io = connectToSocket(server);
app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({extended:true, limit:"40kb"}));

app.use("/api/v1/users",userRoutes);

const start = async () => {
    app.set("mongo_user");
    const connectionDB = await mongoose.connect("mongodb+srv://ar0671362:oa3LB8taO2TNaUyG@cluster0.aw9fpwx.mongodb.net/");
    if (connectionDB) {
        console.log("Connected to MongoDB successfully");
    } else {
        console.error("Failed to connect to MongoDB");
    }
    server.listen(app.get("port"),()=>{
        console.log("Server is running on port 8000");
    })
}
start();
