import mysql from 'mysql2/promise';

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'realvibe_local',
            port: 3306,
        });

        console.log('Successfully connected to the LOCAL database!');

        // Test a basic query
        const [rows] = await connection.execute('SHOW TABLES;');
        console.log('Tables in database:', rows);

        await connection.end();
    } catch (err) {
        console.error('Error connecting to LOCAL database:', err.message);
        process.exit(1);
    }
}

testConnection();
