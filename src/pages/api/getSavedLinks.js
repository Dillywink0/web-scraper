// pages/api/getSavedLinks.js
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import authMiddleware from '../../lib/authMiddleware';

export default async function handler(req, res) {
  await dbConnect();
  
  // Protect route with auth middleware
  authMiddleware(req, res, async () => {
    const { method, user } = req;

    switch (method) {
      case 'GET':
        try {
          // Return savedLinks array for the authenticated user
          res.status(200).json(user.savedLinks);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch saved links' });
        }
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
}
