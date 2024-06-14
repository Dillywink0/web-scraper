// pages/api/register.js
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { username, email, password } = body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
