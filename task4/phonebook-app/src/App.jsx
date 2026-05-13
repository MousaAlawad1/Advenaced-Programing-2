import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const Filter = ({ value, onChange }) => (
  <div style={styles.searchWrapper}>
    <span style={styles.searchIcon}>🔍</span>
    <input
      style={styles.searchInput}
      placeholder="ابحث باسم جهة الاتصال..."
      value={value}
      onChange={onChange}
    />
  </div>
)

const PersonForm = ({ onSubmit, name, number, onNameChange, onNumberChange, loading }) => (
  <form onSubmit={onSubmit} style={styles.form}>
    <div style={styles.formRow}>
      <label style={styles.label}>الاسم</label>
      <input
        style={styles.input}
        placeholder="أدخل الاسم الكامل"
        value={name}
        onChange={onNameChange}
        required
      />
    </div>
    <div style={styles.formRow}>
      <label style={styles.label}>رقم الهاتف</label>
      <input
        style={styles.input}
        placeholder="05xxxxxxxx"
        value={number}
        onChange={onNumberChange}
        required
      />
    </div>
    <button type="submit" style={styles.submitBtn} disabled={loading}>
      {loading ? '⏳ جار الإضافة...' : '➕ إضافة جهة اتصال'}
    </button>
  </form>
)

const PersonCard = ({ person, onDelete }) => {
  const initials = person.name
    .trim()
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')

  const colors = ['#534AB7', '#0F6E56', '#993C1D', '#185FA5', '#7C3D8A', '#1D6E6E']
  const color = colors[person.name.charCodeAt(0) % colors.length]

  return (
    <div style={styles.card}>
      <div style={{ ...styles.avatar, background: color }}>{initials}</div>
      <div style={styles.cardInfo}>
        <div style={styles.cardName}>{person.name}</div>
        <div style={styles.cardNumber}>📞 {person.number}</div>
      </div>
      <button
        style={styles.deleteBtn}
        onClick={() => onDelete(person.id, person.name)}
        title="حذف"
      >
        🗑
      </button>
    </div>
  )
}

const Toast = ({ msg, type }) => {
  if (!msg) return null
  const isError = type === 'error'
  return (
    <div style={{
      ...styles.toast,
      background: isError ? '#FCEBEB' : '#E1F5EE',
      color: isError ? '#A32D2D' : '#085041',
      borderColor: isError ? '#F09595' : '#5DCAA5',
    }}>
      {isError ? '❌' : '✅'} {msg}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [toast, setToast] = useState({ msg: '', type: '' })

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: '' }), 3000)
  }

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then(res => {
        setPersons(res.data)
        setFetching(false)
      })
      .catch(() => {
        showToast('تعذّر الاتصال بالسيرفر. تأكد أن json-server شغّال على المنفذ 3001', 'error')
        setFetching(false)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (exists) {
      showToast(`"${newName}" موجود مسبقًا في الدليل`, 'error')
      return
    }
    setLoading(true)
    axios
      .post(BASE_URL, { name: newName, number: newNumber })
      .then(res => {
        setPersons(prev => prev.concat(res.data))
        setNewName('')
        setNewNumber('')
        showToast(`تمت إضافة "${res.data.name}" بنجاح`)
      })
      .catch(() => showToast('فشلت الإضافة، تحقق من الاتصال بالسيرفر', 'error'))
      .finally(() => setLoading(false))
  }

  const deletePerson = (id, name) => {
    if (!window.confirm(`هل تريد حذف "${name}"؟`)) return
    axios
      .delete(`${BASE_URL}/${id}`)
      .then(() => {
        setPersons(prev => prev.filter(p => p.id !== id))
        showToast(`تم حذف "${name}"`)
      })
      .catch(() => showToast('فشل الحذف، تحقق من الاتصال بالسيرفر', 'error'))
  }

  const personsToShow = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div style={styles.app}>
      <div style={styles.container}>

        <div style={styles.header}>
          <div style={styles.headerIcon}>📒</div>
          <div>
            <h1 style={styles.title}>دليل الهاتف</h1>
            <p style={styles.subtitle}>{persons.length} جهة اتصال مسجّلة</p>
          </div>
        </div>

        <Toast msg={toast.msg} type={toast.type} />

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🔎 البحث</h2>
          <Filter value={filter} onChange={e => setFilter(e.target.value)} />
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>➕ إضافة جهة اتصال</h2>
          <PersonForm
            onSubmit={addPerson}
            name={newName}
            number={newNumber}
            onNameChange={e => setNewName(e.target.value)}
            onNumberChange={e => setNewNumber(e.target.value)}
            loading={loading}
          />
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            📋 الأرقام
            {filter && (
              <span style={styles.filterBadge}>
                {personsToShow.length} نتيجة لـ "{filter}"
              </span>
            )}
          </h2>

          {fetching ? (
            <div style={styles.emptyState}>⏳ جار تحميل البيانات...</div>
          ) : personsToShow.length === 0 ? (
            <div style={styles.emptyState}>
              {filter ? '🔍 لا توجد نتائج' : '📭 الدليل فارغ، أضف جهة اتصال أولى'}
            </div>
          ) : (
            <div style={styles.personsList}>
              {personsToShow.map(person => (
                <PersonCard key={person.id} person={person} onDelete={deletePerson} />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

const styles = {
  app: {
    direction: 'rtl',
    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    minHeight: '100vh',
    background: '#f5f4f0',
    padding: '2rem 1rem',
  },
  container: {
    maxWidth: '640px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '1.25rem 1.5rem',
    background: '#fff',
    borderRadius: '16px',
    border: '0.5px solid #e5e7eb',
  },
  headerIcon: { fontSize: '36px', lineHeight: 1 },
  title: { fontSize: '22px', fontWeight: '600', color: '#111', margin: 0 },
  subtitle: { fontSize: '13px', color: '#9ca3af', margin: '2px 0 0' },
  toast: {
    padding: '10px 16px',
    borderRadius: '10px',
    border: '0.5px solid',
    fontSize: '14px',
    fontWeight: '500',
  },
  section: {
    background: '#fff',
    borderRadius: '16px',
    border: '0.5px solid #e5e7eb',
    padding: '1.25rem 1.5rem',
  },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#374151',
    margin: '0 0 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  filterBadge: {
    fontSize: '11px',
    background: '#EEEDFE',
    color: '#3C3489',
    padding: '2px 8px',
    borderRadius: '20px',
    fontWeight: '500',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#f9fafb',
    border: '0.5px solid #e5e7eb',
    borderRadius: '10px',
    padding: '0 12px',
  },
  searchIcon: { fontSize: '16px', flexShrink: 0 },
  searchInput: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    padding: '10px 0',
    fontSize: '14px',
    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    color: '#111',
    outline: 'none',
    direction: 'rtl',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  formRow: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '12px', color: '#6b7280', fontWeight: '500' },
  input: {
    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    fontSize: '14px',
    padding: '9px 12px',
    border: '0.5px solid #d1d5db',
    borderRadius: '10px',
    background: '#f9fafb',
    color: '#111',
    outline: 'none',
    direction: 'rtl',
  },
  submitBtn: {
    padding: '10px 20px',
    background: '#534AB7',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    alignSelf: 'flex-start',
  },
  personsList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    background: '#f9fafb',
    borderRadius: '10px',
    border: '0.5px solid #f0f0f0',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    flexShrink: 0,
  },
  cardInfo: { flex: 1 },
  cardName: { fontSize: '14px', fontWeight: '500', color: '#111' },
  cardNumber: { fontSize: '13px', color: '#6b7280', marginTop: '2px' },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px',
    borderRadius: '6px',
    opacity: 0.5,
  },
  emptyState: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '14px',
    padding: '1.5rem 0',
  },
}

export default App