import { expect, test } from 'vitest'
import { RefDate } from '@/valueObjects/refDate'

test.each([
	'2026-01',
	'2026-1',
	'2026-02',
	'2026-2',
	'2026-9',
	'2026-10'
])('should be ref date %o valid', (date) => {
	const refDate = new RefDate(date)

	expect(refDate.isValid()).toBe(true)
})
