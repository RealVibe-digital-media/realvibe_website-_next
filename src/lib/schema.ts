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

  try {
    await query(testimonialsTable);
    await query(teamTable);
    await query(cultureTable);
    await query(clientsTable);
    await query(serviceLeadsTable);
    console.log('Database tables verified/created successfully.');
  } catch (error) {
    console.error('Failed to create database tables:', error);
  }
}
