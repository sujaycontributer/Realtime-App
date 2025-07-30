import { PrismaClient } from "../generated/prisma";


declare global {
    var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient | undefined;

if(process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if(!global.prisma) {
        prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;
