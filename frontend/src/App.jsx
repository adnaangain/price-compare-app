import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001'

export default function App() {
  const [q, setQ] = useState('iphone 14 case')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const search = async (e) => {
    e?.preventDefault()
    setLoading(true); setError(null); setData(null)
    try {
      const res = await fetch(`${API_BASE}/api/compare?q=${encodeURIComponent(q)}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>🛒 Price Compare</h1>
      <form onSubmit={search} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a product..."
          style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}
        />
        <button
          onClick={search}
          style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #333', background: '#111', color: '#fff' }}
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

      {data && (
        <div>
          <p><strong>Results for:</strong> {data.query} — {data.count} found</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {data.results.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {r.image && <img src={r.image} alt="" style={{ width: 90, height: 90, objectFit: 'contain' }} />}
                    <div>
                      <div style={{ fontSize: 14, color: '#666' }}>{r.platform}</div>
                      <div style={{ fontWeight: 600, margin: '6px 0' }}>{r.title}</div>
                      <div style={{ fontSize: 18 }}>₹{r.price ?? '—'} {r.currency || ''}</div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {!data && !loading && (
        <div style={{ color: '#666' }}>
          Try searching for "iphone 14", "laptop sleeve", "backpack", etc.
        </div>
      )}
    </div>
  )
}
