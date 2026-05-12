import { query } from '../src/lib/db';
import { createTablesIfNotExist } from '../src/lib/schema';

async function test() {
  try {
    await createTablesIfNotExist();
    const res = await query('SHOW COLUMNS FROM blogs');
    console.log(res);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
test();
