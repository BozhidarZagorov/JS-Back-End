import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

try {
    await client.connect();

    console.log('Connected successfully');
} catch(err) {
    console.error('Could not connect to db');
}

const db = client.db('studentsDb');
const collection = db.collection('students');

const result = await collection.find({age: 20}).toArray();
console.log(result);

