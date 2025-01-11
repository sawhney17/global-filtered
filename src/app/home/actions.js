"use client";

// import Parser from 'rss-parser';

import OpenAI from 'openai';

const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json';

export async function getFeedData(feed) {
  const feedUrls = {
    techcrunch: 'https://techcrunch.com/feed/',
    bbc: 'http://feeds.bbci.co.uk/news/rss.xml',
    cnn: 'http://rss.cnn.com/rss/cnn_topstories.rss',
  };

  const feedUrl = feedUrls[feed] ?? feedUrls['techcrunch'];
  const apiEndpoint = `${RSS_TO_JSON_API}?rss_url=${encodeURIComponent(feedUrl)}`;

  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.statusText}`);
    }

    const rssFeed = await response.json();
    if (!rssFeed.items) {
      throw new Error('No items found in the feed.');
    }

    // Take the first 6 items
    const items = rssFeed.items.slice(0, 20);
    console.log('Fetched RSS Feed Items:', items);

    // Filter the feed items
    const filteredItems = await filterFeed(items);
    return filteredItems;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

export async function filterFeed(feedItems) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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