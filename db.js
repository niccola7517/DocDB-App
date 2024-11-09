// db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    tls: true,
    tlsCAFile: process.env.SSL_CERT_PATH,
    directConnection: true,
    retryWrites: false,
    maxPoolSize: 1,
    authMechanism: 'SCRAM-SHA-1',  // DocumentDB에서 지원하는 인증 메커니즘
    authSource: 'admin'  // 인증 데이터베이스
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Successfully connected to DocumentDB');
        return client.db(process.env.DB_NAME);
    } catch (err) {
        console.error('Connection error:', err);
        throw err;
    }
}

module.exports = { connectToDatabase, client };