import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import mergedTypeDef from "./typeDefs/index.js"
import mergedResolvers from "./resolvers/index.js"
import dotenv from "dotenv";
import { connectDB } from './db/connectDb.js';
import path from "path";
import passport from "passport";
import session from "express-session";
import { fstat } from 'fs';
import ConnectMongoDBSession from 'connect-mongodb-session';
import { configurePassport } from './passport/passport.config.js';


const app = express();
const httpServer = http.createServer(app);

dotenv.config()
configurePassport()

const MongoDBStore = ConnectMongoDBSession(session)
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection:"sessions"
})

store.on("error",(err)=>console.log(err))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    },
    store: store
  })
)

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDef,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
})
 


await server.start();
app.use('/graphql', cors({
  origin: "http://localhost:3000",
  credentials: true,
}), express.json(), expressMiddleware(server,{
  context: async({req,res}) => buildContext({req,res})
}));
await new Promise(resolve => httpServer.listen({port: 4000}, resolve));
await connectDB();
console.log(`🚀 Server ready at http://localhost:4000/graphql`);