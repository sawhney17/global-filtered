"use server";

import Parser from 'rss-parser';

export async function getFeedData(feed) {
  const parser = new Parser();

  const feedUrls = {
    techcrunch: 'https://techcrunch.com/feed/',
    bbc: 'http://feeds.bbci.co.uk/news/rss.xml',
    cnn: 'http://rss.cnn.com/rss/cnn_topstories.rss',
  };

  const feedUrl = feedUrls[feed] ?? feedUrls['techcrunch'];

  const rssFeed = await parser.parseURL(feedUrl);
  return rssFeed.items;
}