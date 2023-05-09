import { UserController } from "../controllers/user.controller";
import { prisma } from "../lib/prisma";
import { TUserInput, TLoginInput } from "../types";

export const resolvers = {
  Query: {
    async Login(_: any, { loginInput }: { loginInput: TLoginInput }) {
      const token = await UserController.loginUser(loginInput);
      return token;
    },
  },
  Mutation: {
    async CreateUser(_: any, { userInput }: { userInput: TUserInput }) {
      console.log({ userInput });
      const token = await UserController.createUser(userInput);
      console.log({ token });
      return token;
    },
  },
};
