const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'srv668.hstgr.io',
    user: 'u650869678_amul',
    password: 'Awesome@realvibe123',
    database: 'u650869678_rvnew',
    port: 3306,
};

async function migrate() {
    console.log('Starting standalone database migration...');
    const connection = await mysql.createConnection(dbConfig);
    
    try {
        const columns = [
            { name: 'slug', type: 'VARCHAR(255) NOT NULL DEFAULT ""' },
            { name: 'client_name', type: 'VARCHAR(255)' },
            { name: 'client_logo', type: 'VARCHAR(2048)' },
            { name: 'challenge', type: 'TEXT' },
            { name: 'solution', type: 'TEXT' },
            { name: 'results', type: 'TEXT' },
            { name: 'content', type: 'LONGTEXT' }
        ];

        for (const col of columns) {
            try {
                await connection.execute(`ALTER TABLE portfolio ADD COLUMN ${col.name} ${col.type}`);
                console.log(`Added column: ${col.name}`);
            } catch (err) {
                if (err.code === 'ER_DUP_COLUMN_NAME') {
                    console.log(`Column ${col.name} already exists.`);
                } else {
                    console.error(`Error adding column ${col.name}:`, err.message);
                }
            }
        }

        console.log('Updating Omaxe record...');
        await connection.execute(`
            UPDATE portfolio 
            SET client_name = 'Omaxe', 
                client_logo = '/assets/real-estate/omaxe-logo-1.webp',
                slug = 'omaxe-commercial'
            WHERE title LIKE '%Omaxe%' OR client_name IS NULL OR client_name = ''
            LIMIT 1
        `);

        console.log('Migration completed!');
    } catch (error) {
        console.error('Migration failed:', error.message);
    } finally {
        await connection.end();
    }
}

migrate();
