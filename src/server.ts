import { buildApp } from './app';

function main() {
	const app = buildApp();
	app
		.listen({
			port: 3333,
			host: '0.0.0.0'
		})
		.then(() => {
			console.log('HTTP server running on http://localhost:3333');
			console.log('HTTP server running on http://localhost:3333/docs');
		});
}

main();
