"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const IoManager_1 = require("./manager/IoManager");
const IoManager_2 = require("./manager/IoManager");
require("./api/index");
const io = IoManager_1.IoManager.getIo();
IoManager_1.app.use((0, cors_1.default)());
IoManager_2.server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
const users = [];
const submissions = [];
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
        }
        else {
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
        io.to(data.roomId).emit('message', {
            message: `sujay has joined the room`
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
