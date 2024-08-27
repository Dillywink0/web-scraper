// pages/api/profile.js
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import authMiddleware from '../../lib/authMiddleware';

export default async function handler(req, res) {
  await dbConnect();

  authMiddleware(req, res, async () => {
    const { method } = req;

    switch (method) {
      case 'GET':
        // Return the user data from the request object
        res.status(200).json(req.user);
        break;
      case 'PUT':
        try {
          const { name, email } = req.body;
          req.user.name = name;
          req.user.email = email;
          await req.user.save();
          res.status(200).json(req.user);
        } catch (error) {
          res.status(500).json({ error: 'Failed to update profile' });
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
}
