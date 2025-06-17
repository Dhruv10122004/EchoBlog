const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Hunter1392',
    port: 5432,
});

async function check() {
    await client.connect();
    // console.log("Connected to database:", client.connectionParameters.database); 
    // const res = await client.query('SELECT * from blogs');
    // console.log('First blog row:', res.rows[0]);
    // await client.end();
}

check();

module.exports = client;
