// pages/api/scrape.js
import { scrapeAmazonPage } from '../../lib/scraper';

export default async function handler(req, res) {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'Invalid URLs provided' });
  }

  try {
    const scrapePromises = urls.map(url => scrapeAmazonPage(url));
    const productsArray = await Promise.all(scrapePromises);

    // Flatten the products array (if needed)
    const products = productsArray.flat();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error scraping:', error); // Log the error for debugging purposes

    res.status(500).json({ error: 'Failed to scrape Amazon pages' });
  }
}
