import { query } from './src/lib/db';

async function migrate() {
    console.log('Starting database migration for Portfolio Case Studies...');
    
    try {
        // 1. Add missing columns to portfolio table
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
                await query(`ALTER TABLE portfolio ADD COLUMN ${col.name} ${col.type}`);
                console.log(`Added column: ${col.name}`);
            } catch (err: any) {
                if (err.code === 'ER_DUP_COLUMN_NAME') {
                    console.log(`Column ${col.name} already exists, skipping.`);
                } else {
                    console.error(`Error adding column ${col.name}:`, err.message);
                }
            }
        }

        // 2. Populate initial data if empty or missing logos
        console.log('Seeding initial data for Case Studies...');
        
        // Update Omaxe specifically since it's showing up blank
        await query(`
            UPDATE portfolio 
            SET client_name = 'Omaxe', 
                client_logo = '/assets/real-estate/omaxe-logo-1.webp',
                slug = 'omaxe-commercial'
            WHERE title LIKE '%Omaxe%' OR client_name IS NULL OR client_name = ''
            LIMIT 1
        `);

        // Add other defaults if table is near empty
        const countRes = await query('SELECT COUNT(*) as count FROM portfolio');
        if ((countRes as any)[0].count <= 1) {
             const seedQuery = `
                INSERT INTO portfolio (title, slug, client_name, client_logo, description, metrics, image_url) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const seedData = [
                ["Qualified Leads for Bignonia", "central-park-bignonia", "Central Park", "/assets/real-estate/CENTRAL-PARK-LOGO_Mother-Logo-scaled-e1762848235731-1015x1024.webp", "Central Park transformed their luxury residential positioning.", JSON.stringify([{label: "Increase in qualified leads", value: 37}]), "/assets/real-estate/portfolio-1.webp"],
                ["Sales-ready Inquiries", "signature-global-park", "Signature Global", "/assets/real-estate/imgi_1_SG-GLOBAL-NEW-LOGO-1024x373.webp", "Engineering a full-funnel lead engine.", JSON.stringify([{label: "Sales-ready inquiries", value: 47}]), "/assets/real-estate/portfolio-2.webp"]
            ];
            for (const data of seedData) {
                try {
                    await query(seedQuery, data);
                } catch(e) {}
            }
        }

        console.log('Migration completed successfully!');
    } catch (error: any) {
        console.error('Migration failed:', error.message);
    }
    process.exit(0);
}

migrate();
