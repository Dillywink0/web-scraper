// pages/api/login.js
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { email, password } = body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid password' });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
