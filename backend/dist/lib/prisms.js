"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new prisma_1.PrismaClient();
}
else {
    if (!global.prisma) {
        prisma = new prisma_1.PrismaClient();
    }
    prisma = global.prisma;
}
exports.default = prisma;
