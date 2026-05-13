import { useState } from "react"

const THEMES = [
  {
    accent: "#534AB7", badgeBg: "#EEEDFE", badgeColor: "#3C3489",
    dot: "#AFA9EC", exBg: "#CECBF6", exColor: "#26215C",
    btnBg: "#534AB7", addColor: "#534AB7",
  },
  {
    accent: "#0F6E56", badgeBg: "#E1F5EE", badgeColor: "#085041",
    dot: "#5DCAA5", exBg: "#9FE1CB", exColor: "#04342C",
    btnBg: "#0F6E56", addColor: "#0F6E56",
  },
  {
    accent: "#993C1D", badgeBg: "#FAECE7", badgeColor: "#712B13",
    dot: "#F0997B", exBg: "#F5C4B3", exColor: "#4A1B0C",
    btnBg: "#993C1D", addColor: "#993C1D",
  },
  {
    accent: "#185FA5", badgeBg: "#E6F1FB", badgeColor: "#0C447C",
    dot: "#85B7EB", exBg: "#B5D4F4", exColor: "#042C53",
    btnBg: "#185FA5", addColor: "#185FA5",
  },
]

const Part = ({ part, theme }) => (
  <div style={styles.partRow}>
    <div style={styles.partName}>
      <span style={{ ...styles.dot, background: theme.dot }} />
      {part.name}
    </div>
    <span style={{ ...styles.exBadge, background: theme.exBg, color: theme.exColor }}>
      {part.exercises} تمرين
    </span>
  </div>
)

const AddPartForm = ({ courseId, theme, onAdd, onCancel }) => {
  const [name, setName] = useState("")
  const [exercises, setExercises] = useState("")

  const handleAdd = () => {
    if (!name.trim() || exercises === "") return
    onAdd(courseId, name.trim(), Number(exercises))
  }

  return (
    <div style={styles.inlineForm}>
      <input
        style={styles.input}
        placeholder="اسم الجزء"
        value={name}
        onChange={e => setName(e.target.value)}
        autoFocus
      />
      <input
        style={{ ...styles.input, width: "90px", flex: "none" }}
        placeholder="التمارين"
        type="number"
        min="0"
        value={exercises}
        onChange={e => setExercises(e.target.value)}
      />
      <button style={{ ...styles.btnAdd, background: theme.btnBg }} onClick={handleAdd}>
        إضافة
      </button>
      <button style={styles.btnCancel} onClick={onCancel}>إلغاء</button>
    </div>
  )
}

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

const App = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "تطبيقات تطوير Half Stack",
      parts: [
        { id: 1, name: "أساسيات React", exercises: 10 },
        { id: 2, name: "تمرير البيانات باستخدام props", exercises: 7 },
        { id: 3, name: "حالة المكوّن", exercises: 14 },
        { id: 4, name: "تنقيح تطبيقات React", exercises: 11 },
      ],
    },
    {
      id: 2,
      name: "Node.js",
      parts: [
        { id: 1, name: "التوجيه (Routing)", exercises: 3 },
        { id: 2, name: "الوسائط (Middlewares)", exercises: 7 },
      ],
    },
  ])

  const [showCourseForm, setShowCourseForm] = useState(false)
  const [newCourseName, setNewCourseName] = useState("")

  const totalExercises = courses.reduce(
    (s, c) => s + c.parts.reduce((a, p) => a + p.exercises, 0),
    0
  )

  const handleAddPart = (courseId, name, exercises) => {
    setCourses(prev =>
      prev.map(course => {
        if (course.id !== courseId) return course
        const newId = course.parts.length
          ? Math.max(...course.parts.map(p => p.id)) + 1
          : 1
        return { ...course, parts: [...course.parts, { id: newId, name, exercises }] }
      })
    )
  }

  const handleAddCourse = () => {
    if (!newCourseName.trim()) return
    const newId = courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1
    setCourses(prev => [...prev, { id: newId, name: newCourseName.trim(), parts: [] }])
    setNewCourseName("")
    setShowCourseForm(false)
  }

  return (
    <div style={styles.app}>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>منهاج الويب</h1>
        <span style={styles.globalStat}>
          {totalExercises} تمرين · {courses.length} كورس
        </span>
      </div>

      <div style={styles.coursesList}>
        {courses.map((course, i) => (
          <Course
            key={course.id}
            course={course}
            themeIndex={i}
            onAddPart={handleAddPart}
          />
        ))}
      </div>

      {showCourseForm ? (
        <div style={styles.newCourseForm}>
          <input
            style={{ ...styles.input, fontSize: "14px", padding: "7px 10px" }}
            placeholder="اسم الكورس الجديد..."
            value={newCourseName}
            onChange={e => setNewCourseName(e.target.value)}
            autoFocus
          />
          <button
            style={{ ...styles.btnAdd, background: "#534AB7" }}
            onClick={handleAddCourse}
          >
            إنشاء
          </button>
          <button style={styles.btnCancel} onClick={() => setShowCourseForm(false)}>
            إلغاء
          </button>
        </div>
      ) : (
        <button style={styles.addCourseTrigger} onClick={() => setShowCourseForm(true)}>
          + إضافة كورس جديد
        </button>
      )}
    </div>
  )
}

const styles = {
  app: {
    direction: "rtl",
    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    maxWidth: "680px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  pageHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  pageTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#111",
  },
  globalStat: {
    fontSize: "13px",
    color: "#6b7280",
    background: "#f3f4f6",
    padding: "5px 12px",
    borderRadius: "20px",
    border: "0.5px solid #e5e7eb",
  },
  coursesList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    background: "#fff",
    border: "0.5px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
  },
  accent: {
    height: "4px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: ".9rem 1.25rem .75rem",
  },
  courseName: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#111",
  },
  badge: {
    fontSize: "11px",
    padding: "3px 9px",
    borderRadius: "20px",
    fontWeight: "500",
  },
  partsList: {
    padding: ".5rem 1.25rem .75rem",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  partRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "7px 10px",
    borderRadius: "8px",
    background: "#f9fafb",
  },
  partName: {
    fontSize: "13px",
    color: "#374151",
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  exBadge: {
    fontSize: "12px",
    fontWeight: "500",
    padding: "2px 8px",
    borderRadius: "12px",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: ".65rem 1.25rem",
    borderTop: "0.5px solid #f0f0f0",
  },
  totalLabel: {
    fontSize: "12px",
    color: "#9ca3af",
  },
  totalVal: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#111",
  },
  addPartBtn: {
    background: "transparent",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
    padding: "3px 6px",
    borderRadius: "6px",
    fontWeight: "500",
  },
  inlineForm: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: ".65rem 1.25rem",
    borderTop: "0.5px solid #f0f0f0",
    flexWrap: "wrap",
  },
  input: {
    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    fontSize: "13px",
    padding: "5px 9px",
    border: "0.5px solid #d1d5db",
    borderRadius: "8px",
    background: "#fff",
    color: "#111",
    outline: "none",
    flex: 1,
    minWidth: "100px",
  },
  btnAdd: {
    fontSize: "12px",
    padding: "5px 12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: "500",
    color: "#fff",
  },
  btnCancel: {
    fontSize: "12px",
    padding: "5px 10px",
    border: "0.5px solid #e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily: "inherit",
    background: "transparent",
    color: "#9ca3af",
  },
  newCourseForm: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "1rem 1.25rem",
    border: "0.5px solid #e5e7eb",
    borderRadius: "12px",
    background: "#fff",
    flexWrap: "wrap",
    marginTop: "1rem",
  },
  addCourseTrigger: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "12px",
    border: "1.5px dashed #AFA9EC",
    borderRadius: "12px",
    background: "transparent",
    fontSize: "14px",
    fontWeight: "500",
    color: "#534AB7",
    cursor: "pointer",
    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    marginTop: "1rem",
  },
}

export default App