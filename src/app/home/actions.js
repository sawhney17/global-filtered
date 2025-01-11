"use client";

import Parser from "rss-parser";

import OpenAI from "openai";
import { fetchRSSFeed, filterRespones } from "./openai_ai_proxy";

// const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json';

export async function getFeedData(feed) {
  const feedUrls = {
    techcrunch: "https://techcrunch.com/feed/",
    bbc: "http://feeds.bbci.co.uk/news/rss.xml",
    cnn: "http://rss.cnn.com/rss/cnn_topstories.rss",
    timesofindia: "http://timesofindia.indiatimes.com/rssfeeds/296589292.cms",
  };

  const feedUrl = feedUrls[feed] ?? feedUrls["techcrunch"];
  // const apiEndpoint = `${RSS_TO_JSON_API}?rss_url=${encodeURIComponent(feedUrl)}`;
  // const rssFeed = await parser.parseURL(feedUrl);

  try {
    // const response = await fetch(apiEndpoint);
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch feed: ${response.statusText}`);
    // }

    // const rssFeed = await response.json();
    const rssFeed = await fetchRSSFeed(feedUrl);
    if (!rssFeed.items) {
      throw new Error("No items found in the feed.");
    }

    // Take the first 6 items
    const items = rssFeed.items;
    console.log("Fetched RSS Feed Items:", items);

    // Filter the feed items
    const filteredItems = await filterFeed(items);
    return filteredItems;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
}

export async function filterFeed(feedItems) {
  try {
    const filteredItems = [];

    while (feedItems.length > 0 && filteredItems.length < 10) {
      for (const item of feedItems) {
        try {
          let response = await filterRespones(item);

          if (response.includes("POSITIVE")) {
            filteredItems.push(item);
          }
        } catch (error) {
          console.error("Error processing feed item:", error);
        }
      }

      return filteredItems;
    }
  } catch (error) {
    console.error("Error filtering feed items:", error);
    return [];
  }
}
