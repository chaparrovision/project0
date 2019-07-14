import { Pool } from 'pg';

const db = new Pool({
    database: 'p0',
    //database: 'ERS',
    host: process.env.INVENTORY_URL || 'localhost',
    password: process.env.INVENTORY_PASSWORD || 'password',
    port: 5432,
    user: process.env.INVENTORY_USER || 'postgres',
});

export async function closePool() {
    await db.end();
}

export default db;
