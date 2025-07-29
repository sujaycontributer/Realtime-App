import { IoManager } from "../manager/IoManager";

export type AllowedSubmissions = 0 | 1 | 2 | 3;

interface Problem {
    id: string;
    title: string;
    description : string;
    image?: string;
    answer: AllowedSubmissions;
    options: {
        id: number;
        title: string;
    }[]; 
}

interface Submission {
    userId: string;
    problemId: string;
    optionSelected: AllowedSubmissions;
    isCorrect: boolean;
}

interface User {
    name: string;
    id: string;
}


export class Quiz {
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

    addUser(name: string) {
        const id = this.getRandomString();
        this.users.push({
            name,
            id
        });
        return id;
    }

    submit(roomId: string, problemId: string, submission: 0 | 1 | 2 | 3) {
        const problem = this.problems.find (x => x.id === problemId);
        
        if(problem) {
            const exisitingSubmission = problem.submissions.find(x => )
        }
    } 




}