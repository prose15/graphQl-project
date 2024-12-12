import { mergeTypeDefs } from "@graphql-tools/merge"
import userTypeDef from "./users.typedef.js"
import TranscationTypeDef from "./transcations.typedef.js"

const mergedTypeDef= mergeTypeDefs([userTypeDef,TranscationTypeDef])

export default mergedTypeDef