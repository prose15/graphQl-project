import Transaction from "../models/transaction.model.js";

const transactionResolvers = {
    Query: {
        transactions: async(_,__,context) =>{
            try {
                if(!context.getUser()) throw new Error("Unauthorized")
                const userId = await context.getUser()._id
                const transactions = await Transaction.find({userId})
                return transactions
            } catch (error) {
                console.log(error);
                throw new Error(error.message)
            }
        },
        transaction: async(_,{transactionId}) =>{
            try {
                const transaction = await Transaction.findById(transactionId)
                return transaction;
            } catch (error) {
                console.log(error);
                throw new Error(error.message)
            }
        },
    },
    Mutation: {
        createtransaction: async(_,{input},context) =>{
            try {
                const newTransaction = {
                    ...input,
                    userId: context.getUser()._id
                }
                await newTransaction.save();
                return newTransaction                
            } catch (error) {
                console.log(error)
                throw new Error(error.message)
            }
        },
        updatetransaction: async(_,{input}) =>{
          const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId,input,{new: true})
          return updatedTransaction  
        },
        deletetransaction: async(_,{transactionId}) =>{
            try {
            const deleteTransaction = await Transaction.findByIdAndDelete(transactionId);
            return deleteTransaction
            } catch (error) {
                console.log(error);
                throw new Error(error.message)
            }
            
        }
    }
}

export default transactionResolvers;