// pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [savedLinks, setSavedLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSavedLinks();
  }, []);

  const fetchSavedLinks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/getSavedLinks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedLinks(res.data);
    } catch (err) {
      console.error('Failed to fetch saved links', err);
      setError('Failed to fetch saved links');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/saveLink', { title, url, description, category, tags: tags.split(',').map(tag => tag.trim()) }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.message);
      await fetchSavedLinks();
    } catch (err) {
      setError('Failed to save link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <button type="submit">{loading ? 'Saving...' : 'Save Link'}</button>
      </form>

      <div>
        <h2>Saved Links</h2>
        <ul>
          {savedLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
              <p>{link.description}</p>
              <p>Category: {link.category}</p>
              <p>Tags: {link.tags.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}
