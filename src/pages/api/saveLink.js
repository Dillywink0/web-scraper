// pages/api/saveLink.js
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import authMiddleware from '../../lib/authMiddleware';
import { scrapeAmazonPage } from '../../lib/scraper';

export default async function handler(req, res) {
  await dbConnect();

  authMiddleware(req, res, async () => {
    const { method, body, user } = req;

    switch (method) {
      case 'POST':
        try {
          const { title, url, description } = body;

          // Scrape the current price of the product
          const products = await scrapeAmazonPage(url);
          const product = products.find(p => p.name.includes(title));

          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }

          // Add new link to user's savedLinks array
          user.savedLinks.push({ title, url, description, previousPrice: product.price });
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
  });
}
