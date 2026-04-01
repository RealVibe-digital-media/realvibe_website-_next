import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "srv668.hstgr.io",
  database: "u650869678_rvnew",
  user: "u650869678_amul",
  password: "Awesome@realvibe123",
  port: 3306,
});

async function checkClients() {
  try {
    const [rows] = await pool.query('SELECT id, name, logo_url FROM clients');
    console.log(JSON.stringify(rows, null, 2));
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
}

checkClients();
