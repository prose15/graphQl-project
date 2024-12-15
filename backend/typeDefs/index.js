import { mergeTypeDefs } from "@graphql-tools/merge"
import userTypeDef from "./users.typedef.js"
import transactionTypeDef from "./transactions.typedef.js"

const mergedTypeDef= mergeTypeDefs([userTypeDef,transactionTypeDef])

export default mergedTypeDef