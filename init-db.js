import { initDb } from './server/db.js';
console.log('Initializing Database manually...');
initDb().then(() => {
  console.log('Done! database.sqlite has been successfully created.');
  process.exit(0);
}).catch(console.error);
