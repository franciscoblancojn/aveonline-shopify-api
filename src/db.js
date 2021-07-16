const { PrismaClient } = require('@prisma/client')

exports.get = async ({table,where={}}) => {
    try {
        const prisma = new PrismaClient()
        const respond = await prisma[table].findMany({where})
        await prisma.$disconnect()
        return respond;
    } catch (error) {
        return {
            type: "error",
            error:`${error}`
        }
    }
}