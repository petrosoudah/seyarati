import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPromise = open({
  filename: path.join(__dirname, 'database.sqlite'),
  driver: sqlite3.Database
});

export const initDb = async () => {
  const db = await dbPromise;
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vin TEXT UNIQUE,
      make TEXT,
      model TEXT
    );
    CREATE TABLE IF NOT EXISTS parts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      make TEXT,
      price TEXT,
      seller TEXT,
      image TEXT
    );
    CREATE TABLE IF NOT EXISTS mechanics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      area TEXT,
      rating REAL,
      reviews INTEGER,
      specialty TEXT,
      status TEXT,
      image TEXT
    );
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender TEXT,
      text TEXT,
      time TEXT,
      isMe INTEGER
    );
  `);

  const partsCount = await db.get('SELECT COUNT(*) as count FROM parts');
  if (partsCount.count === 0) {
      const parts = [
      ['Squeaky Brake Pads', 'Brakes', 'Universal', '45.00 JOD', 'Test User 1', 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=400&q=80'],
      ['Shiny Spark Plugs', 'Engine', 'Toyota', '20.00 JOD', 'Student Coder 99', 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=400&q=80'],
      ['K&N Air Filter', 'Engine', 'Honda', '35.00 JOD', 'Irbid Auto', 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=400&q=80'],
      ['Round Rubber Tires', 'Tires', 'Universal', '120.00 JOD', 'Testing Shop', 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=400&q=80'],
    ];
    const stmt = await db.prepare('INSERT INTO parts (name, category, make, price, seller, image) VALUES (?, ?, ?, ?, ?, ?)');
    for (const part of parts) { await stmt.run(part); }
    await stmt.finalize();
  }

  const mechanicsCount = await db.get('SELECT COUNT(*) as count FROM mechanics');
  if (mechanicsCount.count === 0) {
    const mechanics = [
      ['Bob\'s Fix-It Shop (WIP)', 'Amman, Bayader', 4.8, 124, 'German Cars', 'Available', 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=400&q=80'],
      ['Vroom Vroom Garage', 'Zarqa, New Zarqa', 4.5, 89, 'General Maintenance', 'Busy', 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=400&q=80'],
      ['Cool Cars Inc. (Testing)', 'Irbid, City Center', 4.9, 210, 'Japanese Cars', 'Available', 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=400&q=80'],
    ];
    const stmt = await db.prepare('INSERT INTO mechanics (name, area, rating, reviews, specialty, status, image) VALUES (?, ?, ?, ?, ?, ?, ?)');
    for (const m of mechanics) { await stmt.run(m); }
    await stmt.finalize();
  }

  const messagesCount = await db.get('SELECT COUNT(*) as count FROM messages');
  if (messagesCount.count === 0) {
    const messages = [
      ['Bob\'s Fix-It Shop (WIP)', 'Hello! How can I help you today?', '10:30 AM', 0],
      ['Me', 'do you have the squeaky brake pads?', '10:35 AM', 1],
    ];
    const stmt = await db.prepare('INSERT INTO messages (sender, text, time, isMe) VALUES (?, ?, ?, ?)');
    for (const msg of messages) { await stmt.run(msg); }
    await stmt.finalize();
  }

  return db;
};
export default dbPromise;
