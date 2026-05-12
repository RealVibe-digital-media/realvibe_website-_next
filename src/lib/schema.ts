import { query } from '@/lib/db';

export async function createTablesIfNotExist() {
  const testimonialsTable = `
    CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      author VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      image_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const teamTable = `
    CREATE TABLE IF NOT EXISTS team_members (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      bio TEXT,
      image_url VARCHAR(500),
      social_links JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const cultureTable = `
    CREATE TABLE IF NOT EXISTS work_culture (
      id INT AUTO_INCREMENT PRIMARY KEY,
      image_url VARCHAR(2048) NOT NULL,
      title VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const clientsTable = `
    CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        logo_url VARCHAR(2048) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const serviceLeadsTable = `
    CREATE TABLE IF NOT EXISTS service_leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        company VARCHAR(255),
        service VARCHAR(100) NOT NULL,
        source_page VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const portfolioTable = `
    CREATE TABLE IF NOT EXISTS portfolio (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      client_name VARCHAR(255),
      client_logo VARCHAR(2048),
      description TEXT,
      challenge TEXT,
      solution TEXT,
      results TEXT,
      content LONGTEXT,
      image_url VARCHAR(2048) NOT NULL,
      metrics JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const blogsTable = `
    CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      excerpt TEXT,
      content LONGTEXT NOT NULL,
      image_url VARCHAR(2048),
      author VARCHAR(255) DEFAULT 'RealVibe Team',
      meta_title VARCHAR(255),
      meta_description TEXT,
      schema_markup TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const portfolioWallTable = `
    CREATE TABLE IF NOT EXISTS portfolio_wall (
      id INT AUTO_INCREMENT PRIMARY KEY,
      image_url VARCHAR(2048) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await query(testimonialsTable);
    console.log('Testimonials table verified.');
    await query(teamTable);
    console.log('Team table verified.');
    await query(cultureTable);
    console.log('Culture table verified.');
    await query(clientsTable);
    console.log('Clients table verified.');
    await query(serviceLeadsTable);
    console.log('Service Leads table verified.');
    await query(portfolioTable);
    console.log('Portfolio table verified.');
    await query(blogsTable);
    console.log('Blogs table verified.');
    await query(portfolioWallTable);
    console.log('Portfolio Wall table verified.');

    // Add SEO columns if they don't exist
    try {
      await query('ALTER TABLE blogs ADD COLUMN meta_title VARCHAR(255)');
      console.log('Added meta_title to blogs');
    } catch (e) { /* Ignore if exists */ }
    try {
      await query('ALTER TABLE blogs ADD COLUMN meta_description TEXT');
      console.log('Added meta_description to blogs');
    } catch (e) { /* Ignore if exists */ }
    try {
      await query('ALTER TABLE blogs ADD COLUMN schema_markup TEXT');
      console.log('Added schema_markup to blogs');
    } catch (e) { /* Ignore if exists */ }

    // Seed 3 SEO-friendly blogs if the table is empty
    const existingBlogs = await query('SELECT id FROM blogs LIMIT 1');
    if ((existingBlogs as any[]).length === 0) {
      console.log('Seeding initial blogs...');
      const seedQuery = `
        INSERT INTO blogs (title, slug, excerpt, content, image_url, author) VALUES 
        (?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?)
      `;
      const seedData = [
        "The Future of Digital Marketing in 2026: AI & Beyond",
        "future-of-digital-marketing-2026",
        "Discover how artificial intelligence and augmented reality are reshaping the digital landscape and what brands need to do to stay ahead.",
        "The digital marketing landscape is evolving at a breakneck pace. As we move through 2026, the integration of AI is no longer just an advantage—it's a necessity. From hyper-personalized customer journeys to automated content creation that maintains a human touch, the rules of engagement have changed.\n\nAt RealVibe, we're already implementing predictive analytics to help our clients anticipate market shifts before they happen. Augmented reality is also moving from a gimmick to a vital part of the E-commerce funnel, allowing customers to 'try before they buy' in a fully digital environment. Staying ahead means embracing these tools while never losing sight of the core purpose: genuine human connection.",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
        "RealVibe Strategy Team",
        
        "Why Branding is the Ultimate Competitive Advantage",
        "branding-ultimate-competitive-advantage",
        "In a world of infinite choices, your brand is the only thing that isn't a commodity. Learn how to build a brand that resonates.",
        "Products are interchangeable. Features can be copied. But a brand is unique. In today's saturated market, your branding is the strongest tool you have for long-term survival and growth.\n\nA great brand isn't just a logo; it's a promise. It's the emotional connection a customer feels when they interact with your business. It's your voice, your values, and your vision. When you build a strong brand, you stop competing on price and start competing on value. This loyalty ensures that even as markets fluctuate, your audience stays with you. We specialize in finding that unique 'Vibe' that sets your business apart from the noise.",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2374",
        "RealVibe Creative",
        
        "Maximizing Your ROI Through Strategic Video Content",
        "maximizing-roi-strategic-video",
        "Video isn't just a format; it's a funnel. We break down how to create video content that actually converts viewers into loyal customers.",
        "Video content now accounts for over 80% of all internet traffic. If your agency isn't prioritizing video, you're invisible to a massive portion of your potential audience. However, 'making a video' isn't enough. You need strategy.\n\nStrategic video content involves understanding exactly where your customer is in the journey. Top-of-funnel content should be broad, entertaining, and shareable. Middle-of-funnel content should educate and build trust. Bottom-of-funnel content needs to be the final push—testimonials, demos, and clear calls to action. By mapping your video production to the sales funnel, you turn views into revenue. RealVibe's production process is designed to ensure every second of footage serves your bottom line." ,
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=2370",
        "RealVibe Production"
      ];
      await query(seedQuery, seedData);
      console.log('Blogs seeded successfully.');
    }
    
    console.log('All database tables verified/created successfully.');
  } catch (error) {
    console.error('Failed to create database tables:', error);
    throw error; // Propagate error so API can report it
  }
}

