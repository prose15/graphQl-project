const transactionTypeDef = `#graphql
 type Transaction {
    _id: ID!
    userId: ID!
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String!
    date: String!
 }
 
 type Query{
    transactions: [Transaction!]
    transaction(transactionId:ID!): Transaction
   #  categoryStatistics: [categoryStatistics!]
 }
 
 type Mutation{
    createtransaction(input: CreatetransactionInput!): Transaction!
    updatetransaction(input: updatetransactionInput!): Transaction!
    deletetransaction(transactionId:ID!): Transaction!
 }
 
 input CreatetransactionInput {
 description: String!
 paymentType: String!
 category: String!
 amount: String!
 date: String!
 location: String!   
}

input updatetransactionInput {
 description: String!
 paymentType: String
 category: String
 amount: String
 date: String
 location: String   
}`;

export default transactionTypeDef;