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

    constructor(roomId: string){
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = [];
    }

    


}