import { useState } from "react";

/**
 * StudentGrades
 * -------------
 * Props:
 *  - subjects: Array<{
 *      name, code, grade (0-100), letter, credits
 *    }>
 */
export default function StudentGrades({ subjects = [] }) {
  const [sortBy, setSortBy] = useState("grade");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const letterColor = {
    "A+": "#1a7f4b", A: "#2e7d32",
    "B+": "#1565c0", B: "#1976d2",
    C: "#e65100",
  };

  const filtered = subjects.filter((s) =>
    filter === "all" ? true :
      filter === "high" ? s.grade >= 90 :
        s.grade < 90
  );

  const sorted = [...filtered].sort((a, b) =>
    sortBy === "grade"
      ? b.grade - a.grade
      : a.name.localeCompare(b.name, "ar")
  );

  const avg = subjects.length
    ? (subjects.reduce((s, c) => s + c.grade, 0) / subjects.length).toFixed(1)
    : "—";
  const highest = subjects.length ? Math.max(...subjects.map((s) => s.grade)) : 0;
  const lowest = subjects.length ? Math.min(...subjects.map((s) => s.grade)) : 0;

  return (
    <div style={styles.card} dir="rtl">
      {/* ── Title + Controls ── */}
      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>📋 الدرجات الأكاديمية</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={styles.select} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="grade">ترتيب: الدرجة</option>
            <option value="name">ترتيب: الاسم</option>
          </select>
          <select style={styles.select} value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">الكل</option>
            <option value="high">ممتاز (90+)</option>
            <option value="low">دون 90</option>
          </select>
        </div>
      </div>

      {/* ── Summary Row ── */}
      <div style={styles.summaryRow}>
        <SummaryChip label="المتوسط" value={`${avg}%`} color="#1a56db" />
        <SummaryChip label="الأعلى" value={`${highest}%`} color="#1a7f4b" />
        <SummaryChip label="الأدنى" value={`${lowest}%`} color="#e65100" />
        <SummaryChip label="المقررات" value={subjects.length} color="#7c3aed" />
      </div>

      {/* ── Grade Rows ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sorted.map((subject) => {
          const barColor =
            subject.grade >= 90 ? "#1a7f4b" :
              subject.grade >= 80 ? "#1565c0" : "#e65100";
          const isOpen = expanded === subject.code;

          return (
            <div key={subject.code}>
              <div
                style={{ ...styles.gradeRow, cursor: "pointer" }}
                onClick={() => setExpanded(isOpen ? null : subject.code)}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={styles.courseCode}>{subject.code}</span>
                    <span style={styles.courseName}>{subject.name}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${subject.grade}%`, background: barColor }} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 16 }}>
                  <span style={styles.gradeNumber}>{subject.grade}</span>
                  <span
                    style={{
                      ...styles.letterBadge,
                      background: (letterColor[subject.letter] || "#6b7280") + "18",
                      color: letterColor[subject.letter] || "#6b7280",
                    }}
                  >
                    {subject.letter}
                  </span>
                  <span style={{ color: "#9ca3af", fontSize: 13 }}>{isOpen ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Expandable Details */}
              {isOpen && (
                <div style={styles.expandedPanel}>
                  <Detail label="رمز المقرر" value={subject.code} />
                  <Detail label="عدد الساعات" value={`${subject.credits} ساعات`} />
                  <Detail label="الدرجة الكاملة" value={`${subject.grade} / 100`} />
                  <Detail label="التقدير" value={subject.letter} />
                </div>
              )}
            </div>
          );
        })}

        {sorted.length === 0 && (
          <p style={{ textAlign: "center", color: "#9ca3af", padding: 24 }}>
            لا توجد مقررات تطابق الفلتر المحدد
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Sub-components ── */
function SummaryChip({ label, value, color }) {
  return (
    <div style={{ ...styles.chip, borderColor: color + "40" }}>
      <span style={{ fontSize: 13, color: "#6b7280" }}>{label}</span>
      <span style={{ fontSize: 22, fontWeight: 700, color }}>{value}</span>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}>
      <span style={{ color: "#9ca3af" }}>{label}</span>
      <span style={{ fontWeight: 600, color: "#374151" }}>{value}</span>
    </div>
  );
}

/* ── Styles ── */
const styles = {
  card: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 28,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 8px rgba(0,0,0,0.04)",
    border: "1px solid #f1f1f1",
    fontFamily: "'Segoe UI','Cairo',sans-serif",
    width: "100%",
    boxSizing: "border-box",
  },
  sectionHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: 16, gap: 12, flexWrap: "wrap",
  },
  sectionTitle: { fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 },
  select: {
    fontSize: 13, padding: "6px 10px", borderRadius: 8,
    border: "1px solid #e5e7eb", background: "#f9fafb",
    color: "#374151", cursor: "pointer", fontFamily: "inherit", outline: "none",
  },
  summaryRow: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
    gap: 10, marginBottom: 20,
  },
  chip: {
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "12px 10px", background: "#f9fafb",
    borderRadius: 12, border: "1px solid",
    gap: 4,
  },
  gradeRow: {
    display: "flex", alignItems: "center",
    padding: "12px 14px", background: "#f9fafb",
    borderRadius: 10, border: "1px solid #f3f4f6",
  },
  courseCode: {
    fontSize: 11, fontWeight: 700, color: "#6b7280",
    background: "#e5e7eb", padding: "2px 8px", borderRadius: 6, flexShrink: 0,
  },
  courseName: {
    fontSize: 14, fontWeight: 500, color: "#111827",
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
  },
  progressBar: { height: 8, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 4, transition: "width 0.8s ease" },
  gradeNumber: { fontSize: 18, fontWeight: 700, color: "#111827", minWidth: 36, textAlign: "center" },
  letterBadge: { fontSize: 13, fontWeight: 700, padding: "4px 10px", borderRadius: 8, minWidth: 36, textAlign: "center" },
  expandedPanel: {
    background: "#f9fafb", borderRadius: "0 0 10px 10px",
    padding: "12px 16px", border: "1px solid #f3f4f6", borderTop: "none",
    marginTop: -4,
  },
};