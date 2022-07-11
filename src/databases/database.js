import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({
    path: "./src/.env"
});

const mongoClient = new MongoClient(process.env.MONGO_URI);

await mongoClient.connect();

const db = mongoClient.db("closet-store");
export default db;