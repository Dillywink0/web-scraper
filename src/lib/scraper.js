// lib/scraper.js
import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeAmazonPage = async (url) => {
  try {
    // Fetch the HTML content of the page
    const { data } = await axios.get(url);

    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    // Extract product names and prices
    const products = [];
    $('.s-result-item').each((index, element) => {
      const name = $(element).find('h2').text().trim();
      const price = $(element).find('.a-price .a-offscreen').text().trim();
      products.push({ name, price });
    });

    return products;
  } catch (error) {
    throw new Error('Failed to scrape the Amazon page');
  }
};
