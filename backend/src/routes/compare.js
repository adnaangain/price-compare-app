import express from 'express';
import { searchAmazon } from '../services/amazon.js';
import { searchFlipkart } from '../services/flipkart.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const query = (req.query.q || req.query.query || '').toString().trim();
  if (!query) return res.status(400).json({ error: 'Missing query (?q=...)' });

  try {
    const [amz, fk] = await Promise.allSettled([
      searchAmazon(query),
      searchFlipkart(query),
    ]);

    const results = [];
    if (amz.status === 'fulfilled') results.push(...amz.value);
    if (fk.status === 'fulfilled') results.push(...fk.value);

    res.json({
      query,
      count: results.length,
      results: results
        .filter(Boolean)
        .sort((a, b) => (a.price || 0) - (b.price || 0)),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error', detail: err?.message });
  }
});

export default router;
