import express from 'express';
import cors from 'cors'
import  http from 'http';
import { Server } from 'socket.io';
import { IoManager } from './manager/IoManager';
import { Submission, User } from './lib/index';


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

const users: User[] = [];
const submissions: Submission[] = [];

io.on('connection', (client) => {
    // 3 admin events
    // 2 client events


    io.on('join-room', (data) => {
        users.push({
            id: data.id,
            name: data.name,
            type: data.type,
            roomId: data.roomId
        });
        io.to(data.roomId);
    });

    client.on('submission', (data) => {
        const user = data.id;
        const problemId = data.problemId;
        const ansId = data.ansId;
        console.log(data);

        submissions.push({
            id: data.id,
            problemId: data.problemId,
            selectedId: data.selectedId

        });
        console.log(submissions);



    })
});








