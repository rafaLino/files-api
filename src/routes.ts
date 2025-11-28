import { UTCDate } from '@date-fns/utc'
import { copyTransaction } from './helpers/copyTransaction'
import { Transaction } from './models/transaction'
import { BodySchema, DateParamSchema, IdParamSchema } from './schemas'
import type { FastifyTypedInstance } from './types/fastify'

export async function routes(app: FastifyTypedInstance) {
	app.get(
		'/transactions/:date',
		{
			schema: {
				tags: ['Transactions'],
				params: DateParamSchema
			}
		},
		async (request, reply) => {
			const date = new UTCDate(request.params.date)
			const transaction = await Transaction.findOne({ date }).exec()
			return reply.code(200).send(transaction?.toJSON({ virtuals: true }))
		}
	)

	app.post(
		'/transactions',
		{
			schema: {
				tags: ['Transactions'],
				body: BodySchema
			}
		},
		async (request, reply) => {
			const transaction = new Transaction(request.body)

			await transaction.save()

			return reply.code(201).send(transaction)
		}
	)

	app.put(
		'/transactions/',
		{
			schema: {
				tags: ['Transactions'],
				body: BodySchema
			}
		},
		async (request, reply) => {
			await Transaction.findOneAndUpdate(
				{ date: request.body.date },
				request.body
			)

			return reply.code(204).send()
		}
	)

	app.delete(
		'/transactions/',
		{
			schema: {
				tags: ['Transactions'],
				params: IdParamSchema
			}
		},
		async (request, reply) => {
			await Transaction.deleteOne({ _id: request.params.id }).exec()

			return reply.code(204).send()
		}
	)

	app.post(
		'/transactions/next',
		{
			schema: {
				tags: ['Transactions'],
				body: DateParamSchema
			}
		},
		async (request, reply) => {
			const date = new UTCDate(request.body.date)
			const existingTransaction = await Transaction.findOne({ date }).exec()

			if (!existingTransaction) {
				return reply
					.code(404)
					.send({ message: 'Transaction not found for the given date.' })
			}

			const newTransaction = copyTransaction(
				date,
				existingTransaction.toObject()
			)

			const transaction = new Transaction(newTransaction)

			await transaction.save()

			return reply.code(201).send(transaction)
		}
	)
}
