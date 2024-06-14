// pages/api/scrape.js
import { scrapeAmazonPage } from '../../lib/scraper';
import db from '../../lib/db';
import Product from '../../models/Product';

export default async function handler(req, res) {
  await db; // Ensure database connection

  const { urls } = req.body;

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'Invalid URLs provided' });
  }

  try {
    const scrapePromises = urls.map(url => scrapeAmazonPage(url));
    const productsArray = await Promise.all(scrapePromises);
    const products = productsArray.flat();

    // Save products to database
    for (const product of products) {
      await Product.create({ ...product, url: urls[products.indexOf(product)] });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error scraping:', error);
    res.status(500).json({ error: 'Failed to scrape Amazon pages' });
  }
}
