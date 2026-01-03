const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }

  type Query {
    users: [User!]!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int!
  }

  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }
`;

const users = [];

const resolvers = {
  Query: {
    users: () => users,
  },

  Mutation: {
    createUser: (_, { input }) => {
      const user = {
        id: users.length + 1,
        name: input.name,
        email: input.email,
        age: input.age,
      };
      users.push(user);
      return user;
    },

    updateUser: (_, { id, input }) => {
      const numericId = Number(id);
      const user = users.find(u => u.id === numericId);

      if (!user) {
        throw new Error("User not found");
      }

      if (input.name !== undefined) {
        user.name = input.name;
      }
      if (input.email !== undefined) {
        user.email = input.email;
      }
      if (input.age !== undefined) {
        user.age = input.age;
      }

      return user;
    },

    deleteUser: (_, { id }) => {
      const numericId = Number(id);
      const index = users.findIndex(u => u.id === numericId);

      if (index === -1) {
        throw new Error("User not found");
      }

      const deletedUser = users[index];
      users.splice(index, 1);
      return deletedUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
module.exports = server


