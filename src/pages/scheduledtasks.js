// lib/scheduledTasks.js
import { scrapeAmazonPage } from './scraper';
import { sendEmailNotification } from './notification';
import cron from 'node-cron';

cron.schedule('0 0 * * *', async () => {
  try {
    const urls = [
      'https://www.amazon.com/dp/B08P2HBBLX',
      'https://www.amazon.com/dp/B08P2BZR42',
    ];

    const scrapePromises = urls.map(url => scrapeAmazonPage(url));
    const productsArray = await Promise.all(scrapePromises);
    const products = productsArray.flat();

    // Example price drop alert logic
    products.forEach(product => {
      if (product.price < '500.00') {
        sendEmailNotification(
          'user@example.com',
          `Price Drop Alert: ${product.name}`,
          `The price of ${product.name} has dropped to ${product.price}. Check it out here: ${product.url}`
        );
      }
    });

    console.log('Scraping and notification done:', products);
  } catch (error) {
    console.error('Error scraping:', error);
  }
});
