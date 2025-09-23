import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'myAnnouncementDB';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('announcements');

    const { content } = req.body;
    const newAnn = { text: content, timestamp: new Date() };

    await collection.insertOne(newAnn);
    res.status(200).json({ success: true, message: 'Announcement saved successfully!' });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ success: false, message: 'Database save failed' });
  } finally {
    await client.close();
  }
}
