"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const IoManager_1 = require("../manager/IoManager");
class Quiz {
    constructor(roomId) {
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = [];
        this.activeProblem = 0;
        this.users = [];
    }
    addProblem(problem) {
        this.problems.push(problem);
    }
    start() {
        this.hasStarted = true;
        const io = IoManager_1.IoManager.getIo();
        io.emit('CHANGE_PROBLEM', {
            proble: this.problems[0]
        });
    }
    next() {
        this.activeProblem++;
        const problem = this.problems[this.activeProblem];
        const io = IoManager_1.IoManager.getIo();
        if (problem) {
            io.emit('CHANGE_PROBLEM', {
                problem: problem
            });
        }
        else {
            io.emit('QUIZ_ENDED', {
                message: "Quiz ended"
            });
        }
    }
    getRandomString() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    addUser(name) {
        const id = this.getRandomString();
        this.users.push({
            name,
            id
        });
        return id;
    }
    submit(userId, roomId, problemId, submission) {
        const problem = this.problems.find(x => x.id === problemId);
        const user = problem === null || problem === void 0 ? void 0 : problem.submissions;
    }
}
exports.Quiz = Quiz;
