import { Quiz } from "../lib/Quix";
import { IoManager } from "./IoManager";


class QuizManager {
    private quizes: Quiz[];

    constructor(){
        this.quizes = [];
    }

    public start(roomId: string) {
        const io = IoManager.getIo();
        const quiz =  this.quizes.find(x => x.roomId === roomId);
         
    }
}