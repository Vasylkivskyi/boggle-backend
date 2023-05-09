import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    username: String
    email: String
    password: String
    gender: Gender
    about: String
    image: String
  }

  type Query {
    Login(loginInput: LoginInput): String!
  }

  type Mutation {
    CreateUser(userInput: UserInput): String!
  }

  enum Gender {
    MALE
    FEMALE
    UNKNOWN
  }

  input UserInput {
    username: String!
    password: String!
    email: String!
  }

  input LoginInput {
    password: String!
    email: String!
  }
`;
