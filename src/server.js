const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

require('dotenv').config();

const AUTH_TOKEN = process.env.AUTH_TOKEN || 'supersecrettoken';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Authentication check
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (!authHeader) {
      throw new Error('Authorization header is required');
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (token !== AUTH_TOKEN) {
      throw new Error('Invalid authentication token');
    }

    return { req };
  },
  formatError: (error) => {
    // Custom error formatting
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      path: error.path,
      extensions: error.extensions
    };
  },
  introspection: true, // Enable GraphQL introspection
  playground: true, // Enable GraphQL Playground
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 GraphQL API Server ready at ${url}`);
  console.log(`🔐 Authentication required with Bearer token`);
  console.log(`📚 GraphQL Playground available at ${url}`);
  console.log(`🔍 Token for testing: supersecrettoken`);
});

module.exports = server;
