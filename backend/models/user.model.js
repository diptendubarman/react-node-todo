const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class User {
  static async create(data) {
    return await prisma.users.create({
      data: data,
    });
  }

  static async find(data) {
    return await prisma.users.findFirst({ where: data });
  }
}

module.exports = User;
