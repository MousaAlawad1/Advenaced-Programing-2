import { useState } from "react"
import "./App.css"

/* ═══════════════════════════════════════════════════════════
   Color palette — one theme per course (cycles if more)
   ═══════════════════════════════════════════════════════════ */
const PALETTES = [
  { banner: "#534AB7", headBg: "#EEEDFE", nameColor: "#3C3489", pillBg: "#CECBF6", pillText: "#26215C", iconBg: "#CECBF6", iconColor: "#3C3489", partBg: "#F4F3FE", bar: "#7F77DD", exBg: "#CECBF6", exText: "#26215C", footBg: "#F4F3FE", btnBg: "#534AB7", totalColor: "#3C3489" },
  { banner: "#0F6E56", headBg: "#E1F5EE", nameColor: "#085041", pillBg: "#9FE1CB", pillText: "#04342C", iconBg: "#9FE1CB", iconColor: "#085041", partBg: "#F0FAF6", bar: "#1D9E75", exBg: "#9FE1CB", exText: "#04342C", footBg: "#F0FAF6", btnBg: "#0F6E56", totalColor: "#085041" },
  { banner: "#993C1D", headBg: "#FAECE7", nameColor: "#712B13", pillBg: "#F5C4B3", pillText: "#4A1B0C", iconBg: "#F5C4B3", iconColor: "#712B13", partBg: "#FDF5F2", bar: "#D85A30", exBg: "#F5C4B3", exText: "#4A1B0C", footBg: "#FDF5F2", btnBg: "#993C1D", totalColor: "#712B13" },
  { banner: "#185FA5", headBg: "#E6F1FB", nameColor: "#0C447C", pillBg: "#B5D4F4", pillText: "#042C53", iconBg: "#B5D4F4", iconColor: "#0C447C", partBg: "#F2F8FE", bar: "#378ADD", exBg: "#B5D4F4", exText: "#042C53", footBg: "#F2F8FE", btnBg: "#185FA5", totalColor: "#0C447C" },
  { banner: "#854F0B", headBg: "#FAEEDA", nameColor: "#633806", pillBg: "#FAC775", pillText: "#412402", iconBg: "#FAC775", iconColor: "#633806", partBg: "#FDF7EC", bar: "#EF9F27", exBg: "#FAC775", exText: "#412402", footBg: "#FDF7EC", btnBg: "#854F0B", totalColor: "#633806" },
  { banner: "#993556", headBg: "#FBEAF0", nameColor: "#72243E", pillBg: "#F4C0D1", pillText: "#4B1528", iconBg: "#F4C0D1", iconColor: "#72243E", partBg: "#FEF3F7", bar: "#D4537E", exBg: "#F4C0D1", exText: "#4B1528", footBg: "#FEF3F7", btnBg: "#993556", totalColor: "#72243E" },
]

const ICONS = [
  "ti-books", "ti-code", "ti-database", "ti-server",
  "ti-device-laptop", "ti-chart-bar", "ti-cpu", "ti-terminal",
]

const getPalette = (index) => PALETTES[index % PALETTES.length]
const getIcon = (index) => ICONS[index % ICONS.length]
const sumEx = (parts) => parts.reduce((s, p) => s + p.exercises, 0)

/* ─── Header ────────────────────────────────────────────── */
const Header = ({ name, color }) => (
  <span className="course-name-text" style={{ color }}>{name}</span>
)

/* ─── Part ──────────────────────────────────────────────── */
const Part = ({ part, palette, delay }) => (
  <div
    className="part-item"
    style={{ background: palette.partBg, animationDelay: `${delay}s` }}
  >
    <div className="part-bar" style={{ background: palette.bar }} />
    <span className="part-name">{part.name}</span>
    <span className="part-ex" style={{ background: palette.exBg, color: palette.exText }}>
      {part.exercises} تمرين
    </span>
  </div>
)

/* ─── Content ───────────────────────────────────────────── */
const Content = ({ parts, palette }) => (
  <div className="parts-list">
    {parts.map((part, i) => (
      <Part key={part.id} part={part} palette={palette} delay={i * 0.05} />
    ))}
  </div>
)

/* ─── Total ─────────────────────────────────────────────── */
const Total = ({ parts, color }) => (
  <div className="total-wrap">
    <span className="total-label">المجموع:</span>
    <span className="total-num" style={{ color }}>{sumEx(parts)}</span>
  </div>
)

/* ─── Course ─────────────────────────────────────────────── */
const Course = ({ course, courseIndex, onAddPart }) => {
  const p = getPalette(courseIndex)
  const ic = getIcon(courseIndex)

  return (
    <div className="course-card" style={{ animationDelay: `${courseIndex * 0.08}s` }}>
      <div className="course-banner" style={{ background: p.banner }} />

      <div className="course-head" style={{ background: p.headBg }}>
        <div className="course-icon-wrap" style={{ background: p.iconBg }}>
          <i className={`ti ${ic}`} aria-hidden="true" style={{ color: p.iconColor, fontSize: 20 }} />
        </div>
        <Header name={course.name} color={p.nameColor} />
        <span className="count-pill" style={{ background: p.pillBg, color: p.pillText }}>
          {course.parts.length} وحدات
        </span>
      </div>

      <Content parts={course.parts} palette={p} />

      <div className="course-footer" style={{ background: p.footBg }}>
        <Total parts={course.parts} color={p.totalColor} />
        <button
          className="btn-add-part"
          style={{ background: p.btnBg, color: "#fff" }}
          onClick={() => onAddPart(course.id)}
        >
          <i className="ti ti-plus" aria-hidden="true" style={{ fontSize: 14 }} />
          وحدة جديدة
        </button>
      </div>
    </div>
  )
}

/* ─── Sidebar ────────────────────────────────────────────── */
const Sidebar = ({ courses }) => {
  const totalCourses = courses.length
  const totalParts = courses.reduce((s, c) => s + c.parts.length, 0)
  const totalExercises = courses.reduce((s, c) => s + sumEx(c.parts), 0)

  return (
    <div className="sidebar">
      <div className="profile-card">
        <div className="profile-banner">
          <div className="profile-avatar">م</div>
        </div>
        <div className="profile-body">
          <div className="profile-name">موسى</div>
          <div className="profile-role">طالب هندسة معلوماتية</div>
          {[
            { icon: "ti-school", label: "IT Engineering" },
            { icon: "ti-briefcase", label: "يعمل بدوام جزئي" },
            { icon: "ti-map-pin", label: "إسطنبول، تركيا" },
            { icon: "ti-target", label: "هدف: مهندس برمجيات" },
          ].map((r, i) => (
            <div key={i} className="profile-row">
              <i className={`ti ${r.icon}`} aria-hidden="true" />
              {r.label}
            </div>
          ))}
        </div>
      </div>

      <div className="stats-card">
        <div className="stats-heading">الإحصائيات</div>
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-num">{totalCourses}</div>
            <div className="stat-lbl">كورسات</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">{totalParts}</div>
            <div className="stat-lbl">وحدات</div>
          </div>
          <div className="stat-wide">
            <div>
              <div className="stat-wide-num">{totalExercises}</div>
              <div className="stat-wide-lbl">إجمالي التمارين</div>
            </div>
            <i className="ti ti-pencil stat-wide-icon" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Modal ──────────────────────────────────────────────── */
const Modal = ({ title, icon, fields, onConfirm, onClose }) => {
  const [values, setValues] = useState(fields.map(() => ""))
  const set = (i, v) => setValues(prev => prev.map((val, j) => (j === i ? v : val)))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-title">
          <i className={`ti ${icon}`} aria-hidden="true" />
          {title}
        </div>

        {fields.map((f, i) => (
          <div key={i} className="field">
            <label>{f.label}</label>
            <input
              type={f.type || "text"}
              placeholder={f.placeholder}
              value={values[i]}
              onChange={e => set(i, e.target.value)}
              autoFocus={i === 0}
            />
          </div>
        ))}

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>إلغاء</button>
          <button className="btn-confirm" onClick={() => onConfirm(values)}>
            <i className="ti ti-check" aria-hidden="true" style={{ fontSize: 14 }} />
            إضافة
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── App ────────────────────────────────────────────────── */
const App = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "تطبيقات تطوير Half Stack",
      parts: [
        { id: 1, name: "أساسيات React", exercises: 10 },
        { id: 2, name: "تمرير البيانات عبر props", exercises: 7 },
        { id: 3, name: "إدارة الحالة", exercises: 14 },
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

  const [showAddCourse, setShowAddCourse] = useState(false)
  const [addPartForId, setAddPartForId] = useState(null)
  const [nextId, setNextId] = useState(3)

  const handleAddCourse = ([name]) => {
    if (!name.trim()) return
    setCourses(prev => [...prev, { id: nextId, name: name.trim(), parts: [] }])
    setNextId(n => n + 1)
    setShowAddCourse(false)
  }

  const handleAddPart = ([name, exercises]) => {
    if (!name.trim()) return
    setCourses(prev =>
      prev.map(c => {
        if (c.id !== addPartForId) return c
        const newId = c.parts.length ? Math.max(...c.parts.map(p => p.id)) + 1 : 1
        return {
          ...c,
          parts: [...c.parts, { id: newId, name: name.trim(), exercises: parseInt(exercises) || 0 }],
        }
      })
    )
    setAddPartForId(null)
  }

  return (
    <div className="cm-page">
      {/* ── Main column ── */}
      <div>
        <div className="cm-header">
          <h1 className="cm-title">منهاج الويب</h1>
          <p className="cm-subtitle">تتبع كورساتك وتمارينك في مكان واحد</p>
        </div>

        {courses.map((course, index) => (
          <Course
            key={course.id}
            course={course}
            courseIndex={index}
            onAddPart={setAddPartForId}
          />
        ))}

        <button className="btn-add-course" onClick={() => setShowAddCourse(true)}>
          <i className="ti ti-circle-plus" aria-hidden="true" />
          إضافة كورس جديد
        </button>
      </div>

      {/* ── Sidebar ── */}
      <Sidebar courses={courses} />

      {/* ── Modals ── */}
      {showAddCourse && (
        <Modal
          title="كورس جديد"
          icon="ti-circle-plus"
          fields={[{ label: "اسم الكورس", placeholder: "مثال: Python Basics" }]}
          onConfirm={handleAddCourse}
          onClose={() => setShowAddCourse(false)}
        />
      )}

      {addPartForId && (
        <Modal
          title="وحدة جديدة"
          icon="ti-layout-grid-add"
          fields={[
            { label: "اسم الوحدة", placeholder: "مثال: المتغيرات والأنواع" },
            { label: "عدد التمارين", placeholder: "10", type: "number" },
          ]}
          onConfirm={handleAddPart}
          onClose={() => setAddPartForId(null)}
        />
      )}
    </div>
  )
}

export default App