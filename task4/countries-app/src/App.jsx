import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './App.css'

// ── Helpers ──────────────────────────────────────────────────────────────────

const formatPopulation = (n) => {
  if (!n) return '—'
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)} مليار`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} مليون`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} ألف`
  return n.toLocaleString()
}

const formatArea = (n) => {
  if (!n) return '—'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)} مليون كم²`
  return `${n.toLocaleString()} كم²`
}

// ── CountryDetails ────────────────────────────────────────────────────────────

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages || {})
  const currencies = Object.values(country.currencies || {})

  return (
    <div className="detail-card">
      <div className="detail-hero">
        <img
          className="detail-flag"
          src={country.flags?.png}
          alt={`علم ${country.name.common}`}
        />
        <div className="detail-hero-text">
          {country.region && (
            <span className="detail-region-tag">{country.region}</span>
          )}
          <div className="detail-name">{country.name.common}</div>
          {country.name.official !== country.name.common && (
            <div className="detail-native">{country.name.official}</div>
          )}
        </div>
      </div>

      <div className="detail-body">
        <div className="stats-row">
          <div className="stat-cell">
            <span className="stat-label">العاصمة</span>
            <div className="stat-value">{country.capital?.[0] || '—'}</div>
          </div>
          <div className="stat-cell">
            <span className="stat-label">السكان</span>
            <div className="stat-value">{formatPopulation(country.population)}</div>
            <div className="stat-sub">نسمة</div>
          </div>
          <div className="stat-cell">
            <span className="stat-label">المساحة</span>
            <div className="stat-value" style={{ fontSize: '16px' }}>{formatArea(country.area)}</div>
          </div>
          {country.subregion && (
            <div className="stat-cell">
              <span className="stat-label">المنطقة الفرعية</span>
              <div className="stat-value" style={{ fontSize: '16px' }}>{country.subregion}</div>
            </div>
          )}
        </div>

        {languages.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div className="section-title">اللغات</div>
            <div className="tags-wrap">
              {languages.map(lang => (
                <span key={lang} className="tag">{lang}</span>
              ))}
            </div>
          </div>
        )}

        {currencies.length > 0 && (
          <div>
            <div className="section-title">العملة</div>
            <div className="tags-wrap">
              {currencies.map(c => (
                <span key={c.name} className="tag currency">
                  {c.name} {c.symbol && `· ${c.symbol}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const inputRef = useRef(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  let content

  if (loading) {
    content = (
      <div className="loading-wrap">
        <div className="loading-spinner" />
        <div className="loading-text">جارٍ تحميل الدول</div>
      </div>
    )
  } else if (filter === '') {
    content = (
      <div className="message-card">
        <span className="message-icon">🌍</span>
        <p className="message-text">
          ابحث عن دولة لاستعراض معلوماتها<br />
          <strong>{countries.length}</strong> دولة متاحة
        </p>
      </div>
    )
  } else if (filtered.length > 10) {
    content = (
      <div className="message-card">
        <span className="message-icon">🔍</span>
        <p className="message-text">
          وُجد <strong>{filtered.length}</strong> نتيجة — كن أكثر تحديدًا للحصول على نتائج أدق
        </p>
      </div>
    )
  } else if (filtered.length > 1) {
    content = (
      <div className="countries-grid">
        {filtered.map(c => (
          <button
            key={c.cca3}
            className="country-item"
            onClick={() => setFilter(c.name.common)}
          >
            <img className="country-item-flag" src={c.flags?.png} alt="" />
            <span className="country-item-name">{c.name.common}</span>
            <span className="country-item-arrow">←</span>
          </button>
        ))}
      </div>
    )
  } else if (filtered.length === 1) {
    content = <CountryDetails country={filtered[0]} />
  } else {
    content = (
      <div className="message-card">
        <span className="message-icon">🗺️</span>
        <p className="message-text">
          لم يتم العثور على دولة تطابق "<strong>{filter}</strong>"
        </p>
      </div>
    )
  }

  return (
    <div className="app-wrapper">
      <div className="container">

        <header className="header">
          <div className="header-eyebrow">موسوعة جغرافية</div>
          <h1 className="header-title">
            معلومات <span>الدول</span>
          </h1>
          <p className="header-subtitle">استكشف بيانات كل دولة في العالم</p>
        </header>

        <div className="search-container">
          <div className="search-frame">
            <span className="search-icon">⌕</span>
            <input
              ref={inputRef}
              className="search-input"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="ابحث عن دولة..."
              autoComplete="off"
            />
            {filter && filtered.length > 0 && (
              <span className="search-count">{filtered.length} نتيجة</span>
            )}
          </div>
        </div>

        {content}

        <div className="ornament">✦ ✦ ✦</div>

      </div>
    </div>
  )
}

export default App