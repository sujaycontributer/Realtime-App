
export interface User {
    socketId: string;
    name: string;
    type: "admin" | "user",
    roomId: string;
}

export interface Submission {
    socketId: string;
    problemId: string;
    selectedId: string;
    ans: string;
}