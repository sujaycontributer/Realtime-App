import http from 'http';
import { Server } from 'socket.io';
import express from 'express'

export const app = express();
export const server = http.createServer(app);

export class IoManager {
    private static io: Server;  

    public static getIo() {
        if(!this.io) {
            
            const io = new Server(server, {
                cors: {
                    origin: '*',
                    methods: ["GET", "POST"]
                }
            });
            return this.io = io;
        }
        return this.io;
    }
}

