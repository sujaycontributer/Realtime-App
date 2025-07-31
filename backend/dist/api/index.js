"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IoManager_1 = require("../manager/IoManager");
const prisms_1 = __importDefault(require("../lib/prisms"));
IoManager_1.app.post('/problem', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { problemSetId, problemName, options } = req.body;
    try {
        yield (prisms_1.default === null || prisms_1.default === void 0 ? void 0 : prisms_1.default.problem.create({
            data: {
                problemSetId,
                problemName,
                optionA: options[0],
                optionB: options[1],
                optionC: options[2],
                optionD: options[3]
            }
        }));
    }
    catch (error) {
        res.send("Error while creating problem" + error);
    }
    res.status(200).json({
        message: "Problem created!"
    });
}));
IoManager_1.app.post('/problemset', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
