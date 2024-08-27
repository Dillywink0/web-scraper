// lib/scheduledTasks.js
import cron from 'node-cron';
import { scrapeAmazonPage } from './scraper';

// Example: Run scraping job every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const urls = [
      'https://www.amazon.com/dp/B08P2HBBLX', // Example URLs to monitor
      'https://www.amazon.com/dp/B08P2BZR42',
    ];

    const scrapePromises = urls.map(url => scrapeAmazonPage(url));
    const productsArray = await Promise.all(scrapePromises);
    const products = productsArray.flat();

    console.log('Scraping done:', products);
    // You can store or process the scraped data here
  } catch (error) {
    console.error('Error scraping:', error);
  }
});
