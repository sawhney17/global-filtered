"use server";

import Parser from 'rss-parser';
import OpenAI from 'openai';

export async function getFeedData(feed) {
  const parser = new Parser();

  const feedUrls = {
    techcrunch: 'https://techcrunch.com/feed/',
    bbc: 'http://feeds.bbci.co.uk/news/rss.xml',
    cnn: 'http://rss.cnn.com/rss/cnn_topstories.rss',
    toi: "http://timesofindia.indiatimes.com/rssfeeds/296589292.cms",,
  };

  const feedUrl = feedUrls[feed] ?? feedUrls['techcrunch'];

  try {
    const rssFeed = await parser.parseURL(feedUrl);
    // Take the first 6 items
    rssFeed.items = rssFeed.items.slice(0, 20);
    console.log(rssFeed);
    // Filter and return RSS feed items
    const filteredItems = await filterFeed(rssFeed.items);
    return filteredItems;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

export async function filterFeed(feedItems) {
  const openai = new OpenAI(process.env.OPENAI_API_KEY);

  try {
    const filteredItems = [];

    for (const item of feedItems) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Look at the headline, if it is positive, say POSITIVE, otherwise say NEGATIVE. ONLY SAY THESE TWO WORDS.",
            },
            { role: "user", content: item.title },
          ],
        });

        const response = completion.choices?.[0]?.message?.content || "";
        console.log(response);

        if (response.includes("POSITIVE")) {
          filteredItems.push(item);
        }
      } catch (error) {
        console.error('Error processing feed item:', error);

      }
    }

    return filteredItems; 
  } catch (error) {
    console.error('Error filtering feed items:', error);
    return [];
  }
}