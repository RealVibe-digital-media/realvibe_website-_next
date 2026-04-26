const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'srv668.hstgr.io',
    user: 'u650869678_amul',
    password: 'Awesome@realvibe123',
    database: 'u650869678_rvnew',
    port: 3306,
};

async function populate() {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Populating professional dummy case studies...');
    
    try {
        const dummyData = {
            challenge: "The client was struggling with high CPL (Cost Per Lead) and poor lead quality from generic social media campaigns. They needed to reach high-net-worth individuals (HNWIs) for their premium commercial and residential inventories in Gurugram.",
            solution: "We implemented a hyper-targeted Performance Marketing engine using custom intent audiences and LinkedIn Sales Navigator data. We redesigned their landing pages for high conversion and integrated an automated WhatsApp lead nurturing system to qualify prospects in real-time.",
            results: "We achieved a 40% reduction in CPL within the first 60 days while increasing the sales-readiness of inquiries by 3x. This resulted in a record-breaking sell-out of their phase 1 inventory.",
            content: `Our strategic approach began with a deep dive into the luxury buyer persona. We realized that traditional broad-match targeting was attracting 'window shoppers' rather than serious investors.

We shifted the budget toward high-intent search terms and premium placements on business networks. By creating a bespoke 'VIP Early Access' funnel, we created a sense of exclusivity that resonated with the target demographic.

Simultaneously, our creative team overhauled the visual identity of the digital ads, using cinema-grade video content and architectural renderings that positioned the property as a landmark of sophistication.

The integration of our 'RV-Qualify' algorithm ensured that only leads with verified contact data and declared budget ranges reached the client's sales team, significantly improving their closing ratio and overall morale.`
        };

        // Update all portfolio items that have a slug
        const [rows] = await connection.execute("SELECT id, title FROM portfolio");
        
        for (const row of rows) {
            await connection.execute(`
                UPDATE portfolio 
                SET challenge = ?, solution = ?, results = ?, content = ?
                WHERE id = ?
            `, [dummyData.challenge, dummyData.solution, dummyData.results, dummyData.content, row.id]);
            console.log(`Updated case study for: ${row.title}`);
        }

        console.log('All case studies populated with dummy content!');
    } catch (e) {
        console.error('Error populating case studies:', e);
    } finally {
        await connection.end();
    }
}

populate();
