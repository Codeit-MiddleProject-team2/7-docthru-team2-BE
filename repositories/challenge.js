import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

export class ChallengeRepository {

    findAllChallenges = async () => {
        return await prisma.challenge.findMany({
            orderBy : {createdAt: 'desc'},
        });
    };
    
}