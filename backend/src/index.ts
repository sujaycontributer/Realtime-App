import { IoManager } from './manager/IoManager';
import { Submission, User } from './lib/index';
import {server} from './manager/IoManager'


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
server.listen(3000);

const users: User[] = [];
const submissions: Submission[] = [];


io.on('connection', (client) => {
    // 3 admin events
    // 2 client events

     client.on('checkRoomExistence', (roomId) => {
        const room = io.sockets.adapter.rooms.get(roomId); // if not exist, return undefined

        if (room) {
            // The room exists and has at least one socket in it
            const numberOfClients = room.size;
            console.log(`Room '${roomId}' exist with ${numberOfClients} client(s).`);
            client.emit('room-status', { roomId, exists: true, clients: numberOfClients });
        } else {
            // The room does not exist (no sockets are currently in it)
            console.log(`Room '${roomId}' does not exist or is empty.`);
            client.emit('room-status', { roomId, exists: false, clients: 0 });
        }
     });
        

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
        const problemId = data.id
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












