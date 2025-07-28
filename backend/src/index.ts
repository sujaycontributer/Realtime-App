import express from 'express';
import cors from 'cors'
import  http from 'http';
import { Server } from 'socket.io';
import { IoManager } from './manager/IoManager';


// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin:'http://localhost:5173'
//     }
// });


// io.on('connection', (socket) => { 
    
//     socket.broadcast.emit('New user join', `${socket.id} is just joined`);

//     socket.on('greetings', (data) => {
//         console.log(data.message);
//     })

//     socket.on('message', (data) => {
//         console.log(data.message, socket.id);
//         socket.to(data.toSend).emit('receive', {
//             message: data.message
//         })
//     })


// })

const io = IoManager.getIo();
io.listen(3000);

io.on('connection', (socket) => {
    // 3 admin events
    // 2 client events
});












const port = 3000;
server.listen(port, () => console.log(`Server is running on ${port}`));

