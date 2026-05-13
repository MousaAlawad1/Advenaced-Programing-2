const Course = ({ course, themeIndex, onAddPart }) => {
  const [showForm, setShowForm] = useState(false)
  const theme = THEMES[themeIndex % THEMES.length]
  const total = course.parts.reduce((s, p) => s + p.exercises, 0)

  const handleAdd = (id, name, exercises) => {
    onAddPart(id, name, exercises)
    setShowForm(false)
  }

  return (
    <div style={styles.card}>
      <div style={{ ...styles.accent, background: theme.accent }} />
      <div style={styles.cardHeader}>
        <div style={styles.courseName}>{course.name}</div>
        <span style={{ ...styles.badge, background: theme.badgeBg, color: theme.badgeColor }}>
          {course.parts.length} جزء
        </span>
      </div>

      <div style={styles.partsList}>
        {course.parts.map(p => (
          <Part key={p.id} part={p} theme={theme} />
        ))}
      </div>

      <div style={styles.cardFooter}>
        <span style={styles.totalLabel}>المجموع الكلي</span>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={styles.totalVal}>{total} تمرين</span>
          {!showForm && (
            <button
              style={{ ...styles.addPartBtn, color: theme.addColor }}
              onClick={() => setShowForm(true)}
            >
              + جزء
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <AddPartForm
          courseId={course.id}
          theme={theme}
          onAdd={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
export default Course