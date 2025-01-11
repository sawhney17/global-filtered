"use server";

import Parser from 'rss-parser';

export async function getFeedData(feed) {
  const parser = new Parser();

  // Define your available RSS feed URLs
  const feedUrls = {
    techcrunch: 'https://techcrunch.com/feed/',
    bbc: 'http://feeds.bbci.co.uk/news/rss.xml',
    cnn: 'http://rss.cnn.com/rss/cnn_topstories.rss',
  };

  // Default to TechCrunch if an unknown key is provided
  const feedUrl = feedUrls[feed] ?? feedUrls['techcrunch'];

  // Fetch and parse the RSS
  const rssFeed = await parser.parseURL(feedUrl);
  // Return just the items array
  return rssFeed.items;
}