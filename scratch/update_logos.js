const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'srv668.hstgr.io',
    user: 'u650869678_amul',
    password: 'Awesome@realvibe123',
    database: 'u650869678_rvnew',
    port: 3306,
};

async function update() {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const updates = [
            { name: 'Central Park', logo: '/assets/real-estate/CENTRAL-PARK-LOGO_Mother-Logo-scaled-e1762848235731-1015x1024.webp', slug: 'central-park' },
            { name: 'Signature Global', logo: '/assets/real-estate/imgi_1_SG-GLOBAL-NEW-LOGO-1024x373.webp', slug: 'signature-global' },
            { name: 'Trevoc', logo: '/assets/real-estate/logo-2.webp', slug: 'trevoc' },
            { name: 'Emaar', logo: '/assets/real-estate/8571fdf7-emaar-dxb-logo-en.svg', slug: 'emaar' },
            { name: 'Omaxe', logo: '/assets/real-estate/omaxe-logo-1.webp', slug: 'omaxe' },
            { name: 'Sobha', logo: '/assets/real-estate/sobha-logo-e1762941031469.webp', slug: 'sobha' }
        ];

        for (const u of updates) {
            await connection.execute(`
                UPDATE portfolio 
                SET client_name = ?, client_logo = ?, slug = ?
                WHERE title LIKE ? OR client_name = ?
            `, [u.name, u.logo, u.slug, `%${u.name}%`, u.name]);
        }
        console.log('All client logos updated in database!');
    } catch (e) {
        console.error(e);
    } finally {
        await connection.end();
    }
}
update();
