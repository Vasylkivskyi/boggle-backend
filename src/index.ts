import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

interface MyContext {
  token?: String;
}

const PORT = process.env.PORT || 8081;

(async function () {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [
      // ApolloServerPluginLandingPageDisabled(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
})();
