import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'puser',
    host: 'localhost',
    database: 'postals',
    password: '123456',
    port: 5432,
})

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Unexpected DATABASE error', err);
});

export default pool;