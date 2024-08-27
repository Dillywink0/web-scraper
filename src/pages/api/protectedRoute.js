// pages/api/protectedRoute.js
import dbConnect from '../../lib/dbConnect';
import authMiddleware from '../../lib/authMiddleware';

export default async function handler(req, res) {
  await dbConnect();
  
  // Protect route with auth middleware
  authMiddleware(req, res, async () => {
    // Your protected route logic here
    res.status(200).json({ message: 'You have access to this protected route' });
  });
}
