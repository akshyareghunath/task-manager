const redis = require('redis');
const client = redis.createClient(); // auto-connects to localhost:6379

client.on('error', err => console.error('Redis error:', err));
client.connect();

module.exports = client;