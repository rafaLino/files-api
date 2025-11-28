import { z } from 'zod';

export const BodySchema = z.object({
	date: z.iso.date(),
	items: z.array(
		z.object({
			name: z.string(),
			value: z.number(),
			persist: z.boolean().optional(),
			installments: z
				.object({
					current: z.number(),
					total: z.number()
				})
				.optional()
		})
	)
});

export const DateParamSchema = z.object({
	date: z.string()
});

export const IdParamSchema = z.object({
	id: z.string()
});
