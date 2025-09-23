import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'myAnnouncementDB';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end();

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('announcements');

    const { id } = req.query;
    await collection.deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({ success: true, message: 'Announcement deleted successfully!' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ success: false, message: 'Error deleting announcement' });
  } finally {
    await client.close();
  }
}
