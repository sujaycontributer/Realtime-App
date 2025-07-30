import http from 'http';
import { Server } from 'socket.io';
import express from 'express'

export const app = express();
const server = http.createServer(app);

export class IoManager {
    private static io: Server;  

    public static getIo() {
        if(!this.io) {
            
            const io = new Server(server, {
                cors: {
                    origin: 'http://localhost:5173'
                }
            });
            return this.io = io;
        }
        return this.io;
    }
}

