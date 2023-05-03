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
    getUsers: [User]!
  }

  type Mutation {
    createUser(userInput: UserInput): User!
  }
  enum Gender {
    MALE
    FEMALE
    UNKNOWN
  }

  input UserInput {
    username: String
    password: String
    email: String
  }
`;
