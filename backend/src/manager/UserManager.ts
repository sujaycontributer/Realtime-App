import { Socket } from "socket.io";

export class UserManager {
    private users: {
        roomId: string;
        socket:Socket
    }[]

    constructor(){
        this.users = [];
    }

    addUser (roomId: string, socket: Socket){
        this.users.push({
            roomId,
            socket
        });

        this.createHandler(roomId, socket);
    }

    private createHandler(roomId: string, socket: Socket){
        socket.on('submission', (data) => {
            const type = data.type;
        })
    }


}