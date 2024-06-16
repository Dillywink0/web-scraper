// lib/priceMonitor.js
import cron from 'node-cron';
import { scrapeAmazonPage } from './scraper'; // Your scraper function
import User from '../models/User'; // Your User model
import mongoose from 'mongoose';
import { sendEmail } from './email'; // Your email function

const monitorPrices = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const users = await User.find({});

  for (const user of users) {
    for (const link of user.savedLinks) {
      const products = await scrapeAmazonPage(link.url);

      const product = products.find(p => p.name.includes(link.title)); // Adjust this logic based on your scraping result structure

      if (product && product.price < link.previousPrice) {
        // Price drop detected, send email
        const subject = `Price Drop Alert: ${link.title}`;
        const text = `The price of ${link.title} has dropped to ${product.price}. Check it out at ${link.url}`;
        const html = `<p>The price of <strong>${link.title}</strong> has dropped to <strong>${product.price}</strong>. Check it out <a href="${link.url}">here</a>.</p>`;

        await sendEmail(user.email, subject, text, html);

        // Update the saved link with the new price
        link.previousPrice = product.price;
        await user.save();
      }
    }
  }
};

cron.schedule('0 * * * *', monitorPrices); // Run every hour
