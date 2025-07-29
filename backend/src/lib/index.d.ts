
export interface User {
    id: string;
    name: string;
    type: "admin" | "user",
    roomId: string;
}

export interface Submission {
    id: string;
    problemId: number;
    selectedId: number;
}