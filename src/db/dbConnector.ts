import type { FastifyInstance } from 'fastify';
import mongoose from 'mongoose';

mongoose.set('strictQuery', true);
export async function dbConnector(
	fastify: FastifyInstance,
	options: { url: string | undefined }
) {
	try {
		if (!options.url) {
			fastify.log.error(`MongoDB connection error: MONGODB_URI is not defined`);
			throw new Error(`MongoDB connection error: MONGODB_URI is not defined`);
		}
		await mongoose.connect(options.url);
		fastify.log.info('MongoDB connected');
		fastify.decorate('mongoose', mongoose);
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : String(err);
		fastify.log.error(`MongoDB connection error: ${errorMessage}`);

		throw err;
	}
}
