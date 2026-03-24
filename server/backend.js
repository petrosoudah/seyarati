import express from 'express';
import cors from 'cors';
import { initDb } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;
initDb().then(database => {
  db = database;
  console.log('DB Connection injected to server.');
});

app.get('/api/cars', async (req, res) => {
  try {
    const cars = await db.all('SELECT * FROM cars');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/cars/decode/:vin', async (req, res) => {
  try {
    const { vin } = req.params;
    let make = 'Unknown', model = 'Unknown';
    const nhtsaRes = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
    const nhtsaData = await nhtsaRes.json();
    if (nhtsaData.Results) {
      const makeItem = nhtsaData.Results.find(r => r.Variable === 'Make');
      const modelItem = nhtsaData.Results.find(r => r.Variable === 'Model');
      if (makeItem?.Value && makeItem.Value !== 'null') make = makeItem.Value;
      if (modelItem?.Value && modelItem.Value !== 'null') model = modelItem.Value;
    }
    res.json({ make, model });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.post('/api/cars/register', async (req, res) => {
  const { vin } = req.body;
  if (!vin || vin.length !== 17) {
    return res.status(400).json({ error: 'Invalid VIN number' });
  }
  try {
    let make = 'Unknown';
    let model = 'Unknown';

    try {
      const nhtsaRes = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
      const nhtsaData = await nhtsaRes.json();
      
      if (nhtsaData.Results) {
        const makeItem = nhtsaData.Results.find(r => r.Variable === 'Make');
        const modelItem = nhtsaData.Results.find(r => r.Variable === 'Model');
        if (makeItem && makeItem.Value && makeItem.Value !== 'null') make = makeItem.Value;
        if (modelItem && modelItem.Value && modelItem.Value !== 'null') model = modelItem.Value;
      }
    } catch(err) {
      console.log('NHTSA API Fetch Failed: ', err);
    }

    const result = await db.run('INSERT INTO cars (vin, make, model) VALUES (?, ?, ?)', [vin, make, model]);
    res.json({ id: result.lastID, make, model, success: true });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({ error: 'VIN already registered.' });
    }
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/parts', async (req, res) => {
  const { make, category } = req.query;
  let query = 'SELECT * FROM parts WHERE 1=1';
  const params = [];

  if (make && make !== 'All' && make !== 'All Makes') {
    query += ' AND (make = ? OR make = "Universal")';
    params.push(make);
  }
  if (category && category !== 'All' && category !== 'All Categories') {
    query += ' AND category = ?';
    params.push(category);
  }

  try {
    const parts = await db.all(query, params);
    res.json(parts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/mechanics', async (req, res) => {
  const { area } = req.query;
  let query = 'SELECT * FROM mechanics';
  const params = [];
  
  if (area && area !== 'All Region' && area !== 'All') {
    query += ' WHERE area LIKE ?';
    params.push(`%${area}%`);
  }

  try {
    const mechanics = await db.all(query, params);
    res.json(mechanics);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await db.all('SELECT * FROM messages');
    res.json(messages.map(m => ({...m, isMe: m.isMe === 1})));
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/messages', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Message text required' });

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  try {
    const result = await db.run('INSERT INTO messages (sender, text, time, isMe) VALUES (?, ?, ?, ?)', ['Me', text, time, 1]);
    res.json({ id: result.lastID, text, time, isMe: true, sender: 'Me' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/chat', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });
  const t = text.toLowerCase();
  
  let reply = "Hello! I'm Seyarti AI. How can I help you with your vehicle today?";
  
  if (t.includes('brake') || t.includes('stopping') || t.includes('pad')) {
      reply = "Squeaking or grinding brakes usually mean worn brake pads. I recommend checking our Mechanics Directory for a specialist in Amman to inspect your calipers and pads. You can also find 'Brembo Brake Pads' in our Parts Marketplace!";
  } else if (t.includes('oil') || t.includes('filter')) {
      reply = "Regular oil changes are vital! Most cars need a change every 5,000 to 10,000 km. You can find premium 'Mobil 1 Synthetic Oil' natively in our Parts Marketplace under Fluids.";
  } else if (t.includes('engine') || t.includes('check engine') || t.includes('light')) {
      reply = "A check engine light can mean many things, from a loose gas cap to a serious misfire. Head over to our Mechanics tab and find an 'Electrical Systems' or diagnostic expert near your city.";
  } else if (t.includes('tire') || t.includes('tyre') || t.includes('flat')) {
      reply = "For tires, always ensure your tread depth is safe and pressure matches the sticker on your driver's door jamb. We have 'Michelin Pilot Sport 4' available in the Parts section if you need rapid replacements.";
  } else if (t.includes('spark plug') || t.includes('misfire') || t.includes('start')) {
      reply = "Rough idling and poor startup can definitely be spark plugs. We currently carry OEM 'NGK Spark Plugs' officially mapped for Toyota and other brands in the Parts Marketplace.";
  } else if (t.includes('price') || t.includes('cost') || t.includes('how much')) {
      reply = "Prices vary widely depending on the make and model. You can search for exact parts in our real-time Parts Marketplace to see current JOD pricing directly from verified sellers.";
  } else if (t.includes('hello') || t.includes('hi') || t.includes('hey') || t.includes('marhaba')) {
      reply = "Marhaba! I am Seyarti AI. I can guide you to the right spare parts, help you diagnose car issues, or find the best mechanic near you in Jordan. What's going on with your car?";
  } else if (t.includes('thank')) {
      reply = "You're very welcome! Drive safe, and let me know if you need anything else.";
  } else {
      reply = "That's an interesting technical question. I recommend directly messaging one of our verified Mechanics through the platform (under the Mechanics tab) for a precise, professional diagnosis based on your car's exact symptoms!";
  }
  
  // Simulate AI typing latency
  setTimeout(() => {
     res.json({ text: reply, sender: 'bot' });
  }, 600);
});

app.listen(PORT, () => {
  console.log(`Seyarti API Backend listening on http://localhost:${PORT}`);
});
