"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoManager = exports.app = void 0;
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const server = http_1.default.createServer(exports.app);
class IoManager {
    static getIo() {
        if (!this.io) {
            const io = new socket_io_1.Server(server, {
                cors: {
                    origin: 'http://localhost:5173'
                }
            });
            return this.io = io;
        }
        return this.io;
    }
}
exports.IoManager = IoManager;
