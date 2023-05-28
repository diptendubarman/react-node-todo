const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Todo {
  static async all() {
    const data = await prisma.todos.findMany();
    return data
      .map((item) => {
        return {
          id: item.id.toString(),
          title: item.title,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        };
      })
      .sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  static async findById(id) {
    return await prisma.todos.findUnique({ where: { id: Number(id) } });
  }

  static async delete(data) {
    return await prisma.todos.delete({
      where: data,
    });
  }

  static async create(data) {
    return await prisma.todos.create({
      data: data,
    });
  }
}

module.exports = Todo;
