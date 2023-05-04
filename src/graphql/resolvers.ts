import { UserController } from "../controllers/user.controller";
import { prisma } from "../lib/prisma";
import { UserInputType } from "../types";

export const resolvers = {
  Query: {
    async getUsers() {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    async createUser(_: any, { userInput }: { userInput: UserInputType }) {
      return await UserController.createUser(userInput);
    },
  },
};
