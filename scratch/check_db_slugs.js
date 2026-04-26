const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'srv668.hstgr.io',
    user: 'u650869678_amul',
    password: 'Awesome@realvibe123',
    database: 'u650869678_rvnew',
    port: 3306,
};

async function check() {
    const conn = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await conn.execute('SELECT id, title, slug FROM portfolio');
        console.log('Database Slugs:');
        console.table(rows);
    } catch (e) {
        console.error(e);
    } finally {
        await conn.end();
    }
}
check();
