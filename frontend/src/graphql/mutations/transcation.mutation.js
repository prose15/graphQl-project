import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
	mutation Createtransaction($input: CreatetransactionInput!) {
		createtransaction(input: $input) {
			_id
			description
			paymentType
			category
			amount
			location
			date
		}
	}
`;

export const UPDATE_TRANSACTION = gql`
	mutation UpdateTransaction($input: UpdateTransactionInput!) {
		updateTransaction(input: $input) {
			_id
			description
			paymentType
			category
			amount
			location
			date
		}
	}
`;
export const DELETE_TRANSACTION = gql`
	mutation Deletetransaction($transactionId: ID!) {
	deletetransaction(transactionId: $transactionId) {
		_id
	}
	}
`;
