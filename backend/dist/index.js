"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});
io.on('connection', (socket) => {
    socket.broadcast.emit('New user join', `${socket.id} is just joined`);
    socket.on('greetings', (data) => {
        console.log(data.message);
    });
    socket.on('message', (data) => {
        console.log(data.message, socket.id);
        socket.to(data.toSend).emit('receive', {
            message: data.message
        });
    });
});
const port = 3000;
server.listen(port, () => console.log(`Server is running on ${port}`));
