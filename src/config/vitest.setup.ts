import fs from 'node:fs'
import { afterAll, beforeAll } from 'vitest'
import { createTable } from './test.helper'

beforeAll(async () => {
	process.env.MODE = 'TEST'
	process.env.DB_URI = `file:sqlite.db`
	process.env.DB_TOKEN = 'test'
	process.env.ALLOWED_ORIGIN = '*'
	await createTable()
})

afterAll(async () => {
	fs.rmSync('sqlite.db')
})
