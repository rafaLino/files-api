import { UTCDate } from '@date-fns/utc'
import { describe, test } from 'vitest'
import { buildApp } from '@/app'
import { clearCollection, parseBody, seed } from '@/config/test.helper'
import type { ITransaction } from '@/interfaces'

describe('GET Tests', () => {
	test('should return a transaction successfully', async (t) => {
		const app = await buildApp()
		const item: ITransaction = {
			date: new UTCDate('2025-11-27'),
			items: [
				{
					name: 'test',
					value: 100,
					persist: false
				}
			]
		}
		await seed(item)

		const response = await app.inject({
			method: 'GET',
			url: '/transactions/2025-11-27'
		})

		t.expect(response.statusCode).toBe(200)

		t.expect(response.body).toBeDefined()
		const result = parseBody<{ total: number }>(response.body)

		t.expect(result.date).toBeDefined()
		t.expect(result.total).toBeDefined()
		t.expect(result.items).toBeDefined()

		t.expect(result.total).toBe(100)
		t.expect(result.date).toEqual(item.date.toISOString())

		t.expect(result.items).toHaveLength(1)
		const returnedItem = result.items[0]

		t.expect(returnedItem.name).toEqual('test')
		t.expect(returnedItem.value).toEqual(100)
		t.expect(returnedItem.persist).toEqual(false)
		t.expect(returnedItem.installments).toBeUndefined()

		t.onTestFinished(async () => {
			await clearCollection()
			app.close()
		})
	})

	test('should return ok and empty body given a not found transaction', async (t) => {
		const app = await buildApp()

		const response = await app.inject({
			method: 'GET',
			url: '/transactions/2025-11-27'
		})

		t.expect(response.statusCode).toBe(200)

		t.expect(response.body).toBeFalsy()

		t.onTestFinished(() => app.close())
	})

	test('should return internal error given a bad date', async (t) => {
		const app = await buildApp()

		const response = await app.inject({
			method: 'GET',
			url: '/transactions/something-weird'
		})

		console.log(response.body)

		t.expect(response.statusCode).toBe(500)

		t.onTestFinished(() => app.close())
	})
})
