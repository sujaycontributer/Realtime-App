
import { IoManager, app } from './manager/IoManager';
import { Submission, User } from './lib/index';
import {server} from './manager/IoManager'
import './api/index'

const io = IoManager.getIo();
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

interface ProblemInterface {
    id: string;
    problemSetId: string;
    problemName: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    ans: string;
}

let problem: ProblemInterface | undefined = undefined;
let submissions: Submission[] = [];


io.on('connection', (client) => {
    // 3 admin events
    // 2 client events

     client.on('checkRoomExistence', (roomId) => {
        const room = io.sockets.adapter.rooms.get(roomId); // if not exist, return undefined

        if (room) {
            // The room exists and has at least one socket in it
            const numberOfClients = room.size;
            // console.log(`Room '${roomId}' exist with ${numberOfClients} client(s).`);
            client.emit('room-status', { roomId, exists: true, clients: numberOfClients });
        } else {
            // The room does not exist (no sockets are currently in it)
            // console.log(`Room '${roomId}' does not exist or is empty.`);
            client.emit('room-status', { roomId, exists: false, clients: 0 });
        }
     });
        
    client.on('join-room', (data) => {
        
        client.join(data.roomId);

        io.to(data.roomId).emit('message', {
            message: `sujay has joined the room`
        });
    });

    client.on('question-request', (data) => {
        submissions = [];
        client.to(data.roomId).emit('question', ({
            problem: data.problem
        }));
    })

    client.on('submission', (data) => {
        console.log("data is", data);
        const socketId = data.socketId;
        const problemId = data.problemId;
        const selectedId = data.selectedId;
        const question = data.problem
        problem = question;

        submissions.push({
            socketId: socketId,
            problemId: problemId,
            selectedId: selectedId,
            ans: data.ans
        });
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
        const roomId = data.roomId;
        const problemId = problem?.id;
        const totalUser = submissions.length;
        const selectedA = submissions.filter((user:any) => user.selectedId === 'A' ).length;
        const selectedB = submissions.filter((user:any) => user.selectedId === 'B' ).length;
        const selectedC = submissions.filter((user:any) => user.selectedId === 'C' ).length;
        const selectedD = submissions.filter((user:any) => user.selectedId === 'D' ).length; 
        console.log({
            selectedA,
            selectedB,
            selectedC,
            selectedD,
            ans: problem?.ans
        });

        io.to(roomId).emit('leaderboad', {
            problem: problem,
            totalUser: totalUser,
            selectedA,
            selectedB,
            selectedC,
            selectedD,
            ans: problem?.ans
        });
        
    });

    client.on('disconnect', () => {
        const socketId = client.id;
        submissions = submissions.filter(user => user.socketId !=socketId);
    });

});












