import { describe, test } from 'vitest'
import { buildApp } from '@/app'
import { clearCollection, parseBody } from '@/config/test.helper'

describe('POST Tests', () => {
	test('should create a transaction successfully', async (t) => {
		const app = await buildApp()
		const item = {
			date: '2025-11-27',
			items: [
				{
					name: 'test',
					value: 100,
					persist: false
				}
			]
		}

		const response = await app.inject({
			method: 'POST',
			url: '/transactions',
			body: item
		})

		t.expect(response.statusCode).toBe(201)
		t.expect(response.body).toBeDefined()
		const result = parseBody<{ _id: string }>(response.body)

		t.expect(result.date).toBeDefined()
		t.expect(result.items).toBeDefined()

		t.expect(result._id).toBeDefined()

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
})
