import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
    port: 5432, // default port PostgreSQL
    user: 'postgres',
    password: 'postgres',
    database: 'gis', // Nama database yang digunakan
})

export default pool;