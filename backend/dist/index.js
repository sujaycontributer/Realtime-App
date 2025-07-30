"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IoManager_1 = require("./manager/IoManager");
const IoManager_2 = require("./manager/IoManager");
const IoManager_3 = require("./manager/IoManager");
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
const io = IoManager_1.IoManager.getIo();
IoManager_3.server.listen(3000);
const users = [];
const submissions = [];
IoManager_2.app.get('/', (req, res) => {
    res.send("Hi there");
});
io.on('connection', (client) => {
    // 3 admin events
    // 2 client events
    client.on('join-room', (data) => {
        users.push({
            id: data.id,
            name: data.name,
            type: data.type,
            roomId: data.roomId
        });
        client.join(data.roomId);
        client.to(data.roomId).emit('message', {
            message: `${name} has joined the room`
        });
    });
    client.on('submission', (data) => {
        const id = data.id;
        const problemId = data.problemId;
        const selectedId = data.ansId;
        console.log(data);
        submissions.push({
            id: id,
            problemId: problemId,
            selectedId: selectedId
        });
        console.log(submissions);
    });
    client.on('admin-problem', (data) => {
        const roomId = data.roomId;
        const problemId = data.id;
        const problem = data.problem;
        const options = data.optios;
        const correctAns = data.correctAns;
        client.to(roomId).emit('user-problem', {
            problemId,
            problem,
            options
        });
    });
    client.on('show-leaderboad', (data) => {
        // send users to show leaderboad
    });
});
