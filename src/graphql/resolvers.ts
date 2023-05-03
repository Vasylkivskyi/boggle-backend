import { prisma } from "../lib/prisma";

export const resolvers = {
  Query: {
    async getUsers() {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    async createUser(
      _: any,
      {
        userInput: { username, password, email },
      }: { userInput: { username: string; password: string; email: string } }
    ) {
      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: password,
        },
      });
      console.log(user);
      return user;
    },
  },
};
