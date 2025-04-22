const redis = require('redis');
const client = redis.createClient();
client.connect();

client.on('error', err => console.error('Redis Client Error', err));
module.exports = client;