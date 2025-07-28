import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();

export class IoManager {
    private static io: Server;  

    public static getIo() {
        if(!this.io) {
            const io = new Server(server);
            return this.io = io;
        }
        return this.io;
    }
}

