import mongoose from 'mongoose'
import type { ITransaction } from '@/interfaces'

declare global {
	var mongooseConnection: mongoose.Connection
}

async function createConnection() {
	console.log('create connection...')
	if (!process.env.MONGODB_URI) {
		console.log('MONGODB_URI not defined!')
		return
	}

	global.mongooseConnection ??= mongoose.createConnection(
		process.env.MONGODB_URI
	)
}

export async function seed(value: ITransaction) {
	await createConnection()
	const collection =
		global.mongooseConnection.collection<ITransaction>('transactions')

	await collection.insertOne(value)
	console.log('seeded!')
}

export async function clearCollection() {
	await createConnection()
	const collection =
		global.mongooseConnection.collection<ITransaction>('transactions')

	await collection.deleteMany({})
	console.log('cleared!')
}

export function parseBody<T = object>(body: string): ITransaction & T {
	return JSON.parse(body)
}
