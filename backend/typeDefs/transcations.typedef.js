const TranscationTypeDef = `#graphql
 type Transcation {
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
    transcations: [Transcation!]
    transcation(transcationId:ID!): Transcation
   #  categoryStatistics: [categoryStatistics!]
 }
 
 type Mutation{
    createTranscation(input: CreateTranscationInput!): Transcation!
    updateTranscation(input: updateTranscationInput!): Transcation!
   #  deleteTranscation(input: deleteTranscation!): Transcation!
 }
 
 input CreateTranscationInput {
 description: String!
 paymentType: String!
 category: String!
 amount: String!
 date: String!
 location: String!   
}

input updateTranscationInput {
 description: String!
 paymentType: String
 category: String
 amount: String
 date: String
 location: String   
}`;

export default TranscationTypeDef;