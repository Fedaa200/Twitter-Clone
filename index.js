const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
require("dotenv").config();
const pubsub = new PubSub();
//for each query

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

const uri =
  "mongodb+srv://fedaa:0000@cluster0.8r8z0.mongodb.net/clone?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
    return server.listen({ port: 5000 });
  })
  .catch((err) => console.log(err));
// mongoose
//   .connect(MONGODB, { useNewUrlParser: true })
//   .then(() => {
//     console.log("MongoDB Connected…");
//     return server.listen({ port: 3000 });
//   })

//   .then((res) => {
//     console.log(`Server Running at ${res.url}`);
//   });
