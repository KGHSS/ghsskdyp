import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'myAnnouncementDB';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('announcements');

    const announcements = await collection.find().sort({ timestamp: -1 }).toArray();
    res.status(200).json(announcements);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ success: false, message: 'Error reading from database' });
  } finally {
    await client.close();
  }
}
