// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [urls, setUrls] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProducts([]);

    try {
      const urlsArray = urls.split('\n').map(url => url.trim()).filter(url => url !== '');

      const res = await fetch(`/api/scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: urlsArray }),
      });

      const data = await res.json();

      if (res.ok) {
        setProducts(data);
      } else {
        setError(data.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Amazon Product Scraper</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <textarea
          rows={5}
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="Enter Amazon URLs (one per line)"
          required
          style={{ padding: '10px', width: '100%', marginBottom: '10px', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
          {loading ? 'Scraping...' : 'Scrape'}
        </button>
      </form>

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</div>}

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {products.map((product, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', background: '#f9f9f9' }}>
            <h3 style={{ marginBottom: '10px', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>{product.name}</h3>
            <p style={{ marginBottom: '10px', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
