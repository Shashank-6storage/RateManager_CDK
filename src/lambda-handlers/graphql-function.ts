// import { ApolloServer, gql } from 'apollo-server-lambda';

// const typeDefs = gql`
//   type Query {
//     user: User
//   }

//   type User {
//     id: ID
//     name: String
//   }
// `;

// const resolvers = {
//   Query: {
//     user: () => ({ id: 123, name: 'John Doe' })
//   }
// };

// const server = new ApolloServer({ typeDefs, resolvers });

// exports.handler = server.createHandler();


import { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      // web hook lambda handler code goes here
      return resolve('This is a graphql Function');
    } catch (error) {
      reject();
    }
  });
};
