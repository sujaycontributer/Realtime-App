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

export class Quiz  {
    private roomId: string;
    private hasStarted: Boolean;
    private problems: Problem[];
    private activeProblem: number;

    constructor(roomId: string) {
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = [];
        this.activeProblem = 0;
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

    


}