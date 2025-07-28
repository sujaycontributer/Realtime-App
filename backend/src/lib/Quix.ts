import { IoManager } from "../manager/IoManager";

interface Problem {
    title: string;
    description : string;
    image?: string;
    answer: string;
    options: {
        id: number;
        title: string;
    }[]; 
}

interface User{
    name: string;
    id: string;
}

export class Quiz  {
    public roomId: string;
    private hasStarted: Boolean;
    private problems: Problem[];
    private activeProblem: number;
    private users: User[];

    constructor(roomId: string) {
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = [];
        this.activeProblem = 0;
        this.users = [];
    }

    addProblem(problem: Problem) {
        this.problems.push(problem);
    }

    start() {
        this.hasStarted = true;
        const io = IoManager.getIo();
        io.emit('CHANGE_PROBLEM', {
            proble: this.problems[0]
        })
    }

    next (){
        this.activeProblem++;
        const problem = this.problems[this.activeProblem];
        const io = IoManager.getIo();

        if(problem){
            io.emit('CHANGE_PROBLEM', {
                problem: problem
            })
        } else{
            io.emit('QUIZ_ENDED', {
                message: "Quiz ended"
            })
        }
        
    }

    getRandomString() {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    addUser() {
        const id = this.getRandomString();
        this.users.push({
            name: "sujay",
            id: id
        });
        return id;
    }




}