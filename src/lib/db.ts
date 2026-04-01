import mysql from 'mysql2/promise';

// Extract connection configuration
const dbConfig = {
    host: process.env.DB_HOST || 'srv668.hstgr.io',
    user: process.env.DB_USER || 'u650869678_amul',
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'Awesome@realvibe123',
    database: process.env.DB_NAME || 'u650869678_rvnew',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

// Create a connection pool instead of a single connection
// This ensures Next.js API routes don't exhaust MySQL connections
let pool: mysql.Pool;

export function getPool(): mysql.Pool {
    if (!pool) {
        if (process.env.NODE_ENV === 'development') {
            // In development, preserve the pool across HMR reloads
            let globalWithDb = global as typeof globalThis & { _mysqlPool?: mysql.Pool };
            if (!globalWithDb._mysqlPool) {
                globalWithDb._mysqlPool = mysql.createPool(dbConfig);
            }
            pool = globalWithDb._mysqlPool;
        } else {
            pool = mysql.createPool(dbConfig);
        }
    }
    return pool;
}

/**
 * Helper function to safely execute queries using the connection pool
 */
export async function query<T = any>(sql: string, values?: any[]): Promise<T> {
    const currentPool = getPool();
    try {
        const [rows] = await currentPool.execute(sql, values);
        return rows as T;
    } catch (error: any) {
        console.error('Database query error:', error.message);
        throw error;
    }
}
