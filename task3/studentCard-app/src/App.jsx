import { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import StudentGrades from "./StudentGrades";
import StudentProgress from "./StudentProgress";

/* ── Sample data (replace with real props/API) ── */
const STUDENT = {
  name: "موسى العوض",
  nameEn: "Mousa Alawad",
  studentId: "STU-2023-2305013",
  major: "Software Engineering",
  year: " Third Year",
  gpa: 3.72,
  avatar: "MA",
  email: "mousa@university.edu",
  phone: "+963 968 348 962",
  status: "active",
  enrolledSince: "2022",
  attendance: 94,
  completedCourses: 18,
  totalCourses: 24,
  skills: ["React", "Python", "SQL", "Java", "Git"],
  subjects: [
    { name: "هياكل البيانات", code: "CS301", grade: 92, letter: "A", credits: 3 },
    { name: "قواعد البيانات", code: "CS302", grade: 88, letter: "B+", credits: 3 },
    { name: "الخوارزميات", code: "CS303", grade: 95, letter: "A+", credits: 3 },
    { name: "شبكات الحاسوب", code: "CS304", grade: 78, letter: "B", credits: 3 },
    { name: "هندسة البرمجيات", code: "CS305", grade: 84, letter: "B+", credits: 4 },
    { name: "الذكاء الاصطناعي", code: "CS401", grade: 91, letter: "A", credits: 3 },
  ],
};

const TABS = [
  { id: "overview", label: "نظرة عامة", icon: "👤" },
  { id: "grades", label: "الدرجات", icon: "📋" },
  { id: "progress", label: "التقدم", icon: "📊" },
];

export default function Student({ student = STUDENT }) {
  const [activeTab, setActiveTab] = useState("overview");

  // ── Override any parent max-width / padding Vite/CRA injects ──
  useEffect(() => {
    const els = [document.body, document.documentElement, document.getElementById("root")];
    const saved = els.map((el) =>
      el ? { maxWidth: el.style.maxWidth, width: el.style.width, margin: el.style.margin, padding: el.style.padding } : null
    );
    els.forEach((el) => {
      if (!el) return;
      el.style.maxWidth = "none";
      el.style.width = "100%";
      el.style.margin = "0";
      el.style.padding = "0";
    });
    return () =>
      els.forEach((el, i) => {
        if (!el || !saved[i]) return;
        Object.assign(el.style, saved[i]);
      });
  }, []);

  return (
    <div style={styles.root} dir="rtl">
      {/* ── Top Header Bar ── */}
      <header style={styles.topBar}>
        <div style={styles.topBarInner}>
          <div>
            <h1 style={styles.pageTitle}>ملف الطالب</h1>
            <p style={styles.pageSub}>العام الدراسي 2024-2025</p>
          </div>
          <span style={styles.semesterBadge}>الفصل الثاني</span>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={styles.body}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <nav style={styles.nav}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                style={{ ...styles.navItem, ...(activeTab === tab.id ? styles.navItemActive : {}) }}
                onClick={() => setActiveTab(tab.id)}
              >
                <span style={styles.navIcon}>{tab.icon}</span>
                <span style={{ flex: 1 }}>{tab.label}</span>
                {activeTab === tab.id && <span style={styles.navDot} />}
              </button>
            ))}
          </nav>

          <div style={styles.sideStats}>
            <p style={styles.sideStatsTitle}>ملخص سريع</p>
            {[
              { label: "المعدل", value: student.gpa.toFixed(2) },
              { label: "الحضور", value: `${student.attendance}%` },
              { label: "المقررات", value: `${student.completedCourses}/${student.totalCourses}` },
            ].map((s) => (
              <div key={s.label} style={styles.sideStatRow}>
                <span style={styles.sideStatLabel}>{s.label}</span>
                <span style={styles.sideStatValue}>{s.value}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main style={styles.main}>
          {activeTab === "overview" && <StudentCard student={student} />}
          {activeTab === "grades" && <StudentGrades subjects={student.subjects} />}
          {activeTab === "progress" && <StudentProgress student={student} />}
        </main>
      </div>
    </div>
  );
}

/* ── Styles ── */
const styles = {
  root: {
    fontFamily: "'Segoe UI','Cairo',sans-serif",
    width: "100vw",
    minHeight: "100vh",
    background: "#f4f6f9",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    position: "relative",
    left: 0,
    top: 0,
  },
  topBar: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "0 40px",
    width: "100%",
    boxSizing: "border-box",
    flexShrink: 0,
  },
  topBarInner: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    height: 72,
  },
  pageTitle: { fontSize: 22, fontWeight: 800, color: "#111827", margin: 0 },
  pageSub: { fontSize: 13, color: "#9ca3af", margin: "2px 0 0" },
  semesterBadge: {
    fontSize: 13, fontWeight: 600, padding: "6px 18px",
    borderRadius: 20, background: "#eff6ff", color: "#1a56db",
    border: "1px solid #dbeafe",
  },
  body: {
    display: "flex",
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  sidebar: {
    width: 240,
    minWidth: 240,
    flexShrink: 0,
    background: "#ffffff",
    borderLeft: "1px solid #e5e7eb",
    padding: "28px 0",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  nav: {
    display: "flex", flexDirection: "column", gap: 4, padding: "0 12px",
  },
  navItem: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "11px 14px", border: "none", background: "transparent",
    borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 500,
    color: "#6b7280", transition: "all 0.15s", fontFamily: "inherit",
    width: "100%", textAlign: "right",
  },
  navItemActive: { background: "#eff6ff", color: "#1a56db", fontWeight: 700 },
  navIcon: { fontSize: 18, flexShrink: 0 },
  navDot: {
    width: 7, height: 7, borderRadius: "50%",
    background: "#1a56db", flexShrink: 0,
  },
  sideStats: {
    margin: "24px 12px 0", padding: "14px 14px",
    background: "#f9fafb", borderRadius: 12, border: "1px solid #f0f0f0",
  },
  sideStatsTitle: {
    fontSize: 11, fontWeight: 700, color: "#9ca3af",
    letterSpacing: "0.07em", margin: "0 0 10px", textTransform: "uppercase",
  },
  sideStatRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "7px 0", borderBottom: "1px solid #f0f0f0",
  },
  sideStatLabel: { fontSize: 13, color: "#6b7280" },
  sideStatValue: { fontSize: 14, fontWeight: 700, color: "#111827" },
  main: {
    flex: 1,
    minWidth: 0,
    padding: "36px 48px",
    overflowY: "auto",
  },
};