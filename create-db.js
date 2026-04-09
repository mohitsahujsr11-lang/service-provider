const { Client } = require('pg');
require('dotenv').config({ path: __dirname + '/.env' });

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    port: 5432,
    database: 'postgres' // Connect to default database
});

client.connect()
    .then(() => client.query(`CREATE DATABASE "${process.env.DB_NAME}"`))
    .then(() => {
        console.log('Database created successfully.');
        client.end();
    })
    .catch(err => {
        if (err.code === '42P04') {
            console.log('Database already exists.');
        } else {
            console.error('Error creating database:', err);
        }
        client.end();
    });
