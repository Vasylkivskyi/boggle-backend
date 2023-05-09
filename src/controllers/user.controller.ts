import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { TLoginInput, TUserInput } from "../types";
import { prisma } from "../lib/prisma";

export class UserController {
  static async createUser(userInput: TUserInput): Promise<string> {
    console.log({ userInput });
    try {
      const { email, password, username } = userInput;
      const salt: string = await bcrypt.genSalt(10);
      const userExists = await prisma.user.findFirst({
        where: { email },
        select: { id: true },
      });
      if (userExists) {
        throw new Error("User already exists");
      }
      const hashedPassword: string = await bcrypt.hash(password, salt);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      const token = UserController.generateToken(user.id);
      return token;
    } catch (error) {
      throw new GraphQLError((error as Error).message, {
        extensions: {
          code: "FATAL_ERROR",
          http: { status: 503 },
        },
      });
    }
  }

  static generateToken(id: string) {
    const secret = process.env.JWT_SECRET;
    return jwt.sign({ id }, secret as string, { expiresIn: "30d" });
  }

  static async loginUser(loginInput: TLoginInput) {
    const { email, password: enteredPassword } = loginInput;
    try {
      const user = await prisma.user.findFirst({
        where: { email },
        select: { id: true, password: true },
      });
      if (user) {
        const compare = await bcrypt.compare(enteredPassword, user?.password);
        if (compare) {
          const token = UserController.generateToken(user?.id);
          console.log(token);
          return token;
        }
      }
      return new GraphQLError("Incorrect password or email address", {
        extensions: {
          code: "AUTH_ERROR",
          http: { status: 401 },
        },
      });
    } catch (error) {
      console.log("Error while login: ", (error as Error).message);
      throw new GraphQLError((error as Error).message, {
        extensions: {
          code: "FATAL_ERROR",
          http: { status: 503 },
        },
      });
    }
  }
}
