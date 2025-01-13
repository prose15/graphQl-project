import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js"

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
        transaction: async (_,{ transactionId }) =>{
            try {
                const transaction = await Transaction.findById(transactionId)
                return transaction;
            } catch (error) {
                console.log(error);
                throw new Error(error.message)
            }
        },
        categoryStatistics: async (_, __, context) => {
			if (!context.getUser()) throw new Error("Unauthorized");

			const userId = context.getUser()._id;
			const transactions = await Transaction.find({ userId });
			const categoryMap = {};

			// const transactions = [
			// 	{ category: "expense", amount: 50 },
			// 	{ category: "expense", amount: 75 },
			// 	{ category: "investment", amount: 100 },
			// 	{ category: "saving", amount: 30 },
			// 	{ category: "saving", amount: 20 }
			// ];

			transactions.forEach((transaction) => {
				if (!categoryMap[transaction.category]) {
					categoryMap[transaction.category] = 0;
				}
				categoryMap[transaction.category] += transaction.amount;
			});

			// categoryMap = { expense: 125, investment: 100, saving: 50 }

			return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));
			// return [ { category: "expense", totalAmount: 125 }, { category: "investment", totalAmount: 100 }, { category: "saving", totalAmount: 50 } ]
		},
    },
    Mutation: {
        createtransaction: async(_,{input},context) =>{
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id,
                })
                console.log(newTransaction);
                await newTransaction.save();
                return newTransaction                
            } catch (error) {
                console.log(error)
                throw new Error(error.message)
            }
        },
        updateTransaction: async (_, { input }) => {
			try {
				const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
					new: true,
				});
				return updatedTransaction;
			} catch (err) {
				console.error("Error updating transaction:", err);
				throw new Error("Error updating transaction");
			}
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
    },
    Transaction: {
        user: async(parent)=>{
            const userId = parent.userId
            try {
                const user = await User.findById(userId)
                return user
            } catch (error) {
                console.log(error);                
            }
        }
    }
}

export default transactionResolvers;