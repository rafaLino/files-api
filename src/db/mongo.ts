import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
const mongoDBUri = process.env.MONGODB_URI;

async function connectMongoose() {
	if (!mongoDBUri) {
		throw new Error('MONGODB_URI is not defined in environment variables');
	}
	await mongoose.connect(mongoDBUri);
}

export function dbConnect() {
	try {
		connectMongoose();
	} catch (err) {
		console.error('Failed to connect to MongoDB:', err);
		process.exit(1);
	}
}
