// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
      const result = await res.json();
      if (res.ok) {
        setData(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h1>Web Scraper</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit">Scrape</button>
      </form>

      {data && (
        <div>
          <h2>Scraped Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
