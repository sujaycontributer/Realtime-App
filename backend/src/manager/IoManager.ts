import http from 'http';
import { Server } from 'socket.io';
import express from 'express'
import cors from 'cors'


export const app = express();
export const server = http.createServer(app);

app.use(cors({
  origin: ["https://xyzquiz.netlify.app", "http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));


export class IoManager {
    private static io: Server;  

    public static getIo() {
        if(!this.io) {
            
            const io = new Server(server, {
                cors: {
                    origin: ['https://xyzquiz.netlify.app', "http://localhost:5173"],
                    methods: ["GET", "POST"],
                    credentials: true
                }
            });
            return this.io = io;
        }
        return this.io;
    }
}

