import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';
import { fastify } from 'fastify';
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider
} from 'fastify-type-provider-zod';
import { dbConnector } from './db/dbConnector';
import { routes } from './routes';

export function buildApp() {
	const app = fastify().withTypeProvider<ZodTypeProvider>();

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.register(dbConnector, {
		url: process.env.MONGODB_URI
	});

	app.register(fastifyCors, {
		origin: '*'
	});

	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: 'Transactions API',
				version: '1.0.0'
			}
		},
		transform: jsonSchemaTransform
	});

	app.register(ScalarApiReference, {
		routePrefix: '/docs'
	});

	app.register(routes);

	return app;
}