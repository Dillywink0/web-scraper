// pages/api/saveLink.js
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { userId, title, url, description } = body;

        // Find user by userId
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Add new link to user's savedLinks array
        user.savedLinks.push({ title, url, description });
        await user.save();

        res.status(201).json({ message: 'Link saved successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to save link' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
