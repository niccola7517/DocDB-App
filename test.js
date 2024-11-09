// test.js
const { connectToDatabase } = require('./db');

async function testConnection() {
    try {
        const db = await connectToDatabase();
        await db.command({ ping: 1 });
        console.log("Successfully connected to DocumentDB");
    } catch (err) {
        console.error("Connection test failed:", err);
    }
}

testConnection();