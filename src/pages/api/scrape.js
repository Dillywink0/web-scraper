// pages/api/scrape.js
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Fetch the HTML content of the page
    const { data } = await axios.get(url);

    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    // Example: Extract the title of the page
    const title = $('title').text();

    // Return the extracted data
    res.status(200).json({ title });
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape the page' });
  }
}
