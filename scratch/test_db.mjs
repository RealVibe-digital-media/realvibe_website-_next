import { getPool, query } from './src/lib/db.js';

async function test() {
  try {
    const res = await query('SHOW COLUMNS FROM blogs');
    console.log(res);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
test();
