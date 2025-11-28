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
import { dbConnect } from './db/mongo';
import { routes } from './routes';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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

app
	.listen({
		port: 3333,
		host: '0.0.0.0'
	})
	.then(() => {
		dbConnect();
		console.log('HTTP server running on http://localhost:3333');
		console.log('HTTP server running on http://localhost:3333/docs');
	});
