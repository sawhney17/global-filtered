import Parser from 'rss-parser';

export default async function handler(req, res) {
  const { feed } = req.query;
  const parser = new Parser();

  // For demo purposes, define some feed URLs by key.
  // In a real app, you might store these in a DB or config file.
  const feedUrls = {
    'techcrunch': 'https://techcrunch.com/feed/',
    'bbc-news':  'http://feeds.bbci.co.uk/news/rss.xml',
    'cnn':       'http://rss.cnn.com/rss/cnn_topstories.rss',
    'timesofindia': 'http://timesofindia.indiatimes.com/rssfeeds/296589292.cms',
    // Add more as needed
  };

  // Get the feed URL by the feed key; fallback to TechCrunch if not found
  const feedUrl = feedUrls[feed] ?? feedUrls['techcrunch'];

  try {
    const rssFeed = await parser.parseURL(feedUrl);
    // Return the items from the feed
    res.status(200).json({ items: rssFeed.items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching the RSS feed.' });
  }
}