import express from 'express';
import cors from 'cors'
import  http from 'http';
import { Server } from 'socket.io';


const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:'http://localhost:5173'
    }
});


io.on('connection', (socket) => {
    
    socket.on('greetings', (data) => {
        console.log(data.message);
    })

    socket.on('message', (data) => {
        console.log(data.message, socket.id);
    })
})












const port = 3000;
server.listen(port, () => console.log(`Server is running on ${port}`));

