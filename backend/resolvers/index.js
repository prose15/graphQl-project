import { mergeResolvers } from "@graphql-tools/merge";
import transcationResolvers from "./transcations.resolvers.js";
import userResolvers from "./users.resolvers.js";

const mergedResolvers = mergeResolvers([userResolvers,transcationResolvers]);

export default mergedResolvers