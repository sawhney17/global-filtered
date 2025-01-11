// app/FeedSelector.jsx
"use client";

import { useState } from 'react';
import { getFeedData } from './actions'; // Import the server action

export default function FeedSelector() {
  // Feed options
  const feedOptions = [
    { label: 'TechCrunch', value: 'techcrunch' },
    { label: 'BBC News', value: 'bbc' },
    { label: 'CNN', value: 'cnn' },
  ];

  const [feed, setFeed] = useState(feedOptions[0].value);
  const [rssItems, setRssItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle fetch using our server action
  const handleFetch = async () => {
    setLoading(true);
    try {
      const data = await getFeedData(feed); // calls the server action
      setRssItems(data || []);
    } catch (error) {
      console.error(error);
      setRssItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Global Filtered</h1>

      {/* Feed Selector */}
      <div className="flex items-center space-x-4 mb-6">
        <label htmlFor="feedSelect" className="font-medium">
          Select an RSS Feed:
        </label>
        <select
          id="feedSelect"
          className="border border-gray-300 rounded-md p-2"
          value={feed}
          onChange={(e) => setFeed(e.target.value)}
        >
          {feedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch'}
        </button>
      </div>

      {/* RSS Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        {rssItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700 text-sm mb-4">{item.contentSnippet}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto text-blue-600 hover:text-blue-800 underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}