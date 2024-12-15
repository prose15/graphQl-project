import { mergeResolvers } from "@graphql-tools/merge";
import transactionResolvers from "./transactions.resolvers.js";
import userResolvers from "./users.resolvers.js";

const mergedResolvers = mergeResolvers([userResolvers,transactionResolvers]);

export default mergedResolvers