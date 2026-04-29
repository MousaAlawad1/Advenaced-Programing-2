/**
 * StudentProgress
 * ---------------
 * Props:
 *  - student: {
 *      gpa, attendance,
 *      completedCourses, totalCourses,
 *      enrolledSince
 *    }
 */
export default function StudentProgress({ student }) {
  const completionRate = student.totalCourses
    ? Math.round((student.completedCourses / student.totalCourses) * 100)
    : 0;

  const stats = [
    {
      label: "المقررات المكتملة",
      display: `${student.completedCourses} / ${student.totalCourses}`,
      percent: Math.round((student.completedCourses / student.totalCourses) * 100),
      color: "#1a56db",
      icon: "📚",
    },
    {
      label: "نسبة الحضور",
      display: `${student.attendance}%`,
      percent: student.attendance,
      color: "#1a7f4b",
      icon: "📅",
    },
    {
      label: "المعدل التراكمي",
      display: student.gpa?.toFixed(2),
      percent: Math.round((student.gpa / 4) * 100),
      color: "#7c3aed",
      icon: "🏆",
    },
  ];

  const startYear = parseInt(student.enrolledSince, 10) || 2022;
  const currentYear = new Date().getFullYear();
  const graduateYear = startYear + 4;

  const milestones = Array.from({ length: 5 }, (_, i) => {
    const year = startYear + i;
    const isDone = year <= currentYear;
    const isCurrent = year === currentYear;
    const label = i === 0 ? "التسجيل"
      : i === 4 ? "التخرج"
        : `السنة ${["الأولى", "الثانية", "الثالثة", "الرابعة"][i - 1]}`;
    return { label, year, isDone, isCurrent };
  });

  return (
    <div style={styles.card} dir="rtl">
      <h3 style={styles.sectionTitle}>📊 التقدم الأكاديمي</h3>

      {/* ── Stat Cards ── */}
      <div style={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} style={styles.statCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <p style={styles.statLabel}>{stat.label}</p>
              <span style={{ fontSize: 20 }}>{stat.icon}</span>
            </div>
            <p style={{ ...styles.statValue, color: stat.color }}>{stat.display}</p>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${stat.percent}%`,
                  background: stat.color,
                }}
              />
            </div>
            <p style={styles.statPercent}>{stat.percent}%</p>
          </div>
        ))}
      </div>

      <div style={styles.divider} />

      {/* ── Timeline ── */}
      <h4 style={styles.subTitle}>🗺️ مسيرة التقدم</h4>
      <div style={styles.timeline}>
        {milestones.map((m, i) => (
          <div key={m.label} style={styles.timelineItem}>
            {/* Dot + Line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  ...styles.dot,
                  background: m.isDone
                    ? m.isCurrent ? "#1a56db" : "#1a7f4b"
                    : "#e5e7eb",
                  border: m.isCurrent ? "3px solid #93c5fd" : "none",
                  transform: m.isCurrent ? "scale(1.35)" : "scale(1)",
                }}
              />
              {i < milestones.length - 1 && (
                <div
                  style={{
                    width: 2, height: 36,
                    background: m.isDone && !m.isCurrent ? "#1a7f4b" : "#e5e7eb",
                    marginTop: 2,
                  }}
                />
              )}
            </div>

            {/* Label */}
            <div style={{ paddingBottom: 16, paddingTop: 1 }}>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: m.isCurrent ? 700 : 500,
                  color: m.isCurrent ? "#1a56db" : m.isDone ? "#1a7f4b" : "#9ca3af",
                  margin: 0,
                }}
              >
                {m.label}
                {m.isCurrent && (
                  <span style={styles.currentBadge}>الحالي</span>
                )}
              </p>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: "2px 0 0" }}>{m.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Completion Banner ── */}
      <div style={styles.completionBox}>
        <div>
          <p style={{ fontWeight: 600, color: "#1e40af", margin: 0 }}>نسبة إتمام الدراسة</p>
          <p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0" }}>
            {student.completedCourses} من أصل {student.totalCourses} مقرر مكتمل
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: "#1a56db" }}>
            {completionRate}%
          </span>
          <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>
            متوقع التخرج {graduateYear}
          </p>
        </div>
      </div>
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
  sectionTitle: { fontSize: 17, fontWeight: 700, color: "#111827", margin: "0 0 16px" },
  subTitle: { fontSize: 15, fontWeight: 600, color: "#374151", margin: "0 0 16px" },
  statsGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: 14, marginBottom: 20,
  },
  statCard: {
    padding: 16, background: "#f9fafb",
    borderRadius: 12, border: "1px solid #f3f4f6",
  },
  statLabel: { fontSize: 13, color: "#6b7280", margin: 0, fontWeight: 500 },
  statValue: { fontSize: 26, fontWeight: 700, margin: "8px 0 8px" },
  statPercent: { fontSize: 12, color: "#9ca3af", margin: "4px 0 0", textAlign: "left" },
  progressBar: { height: 6, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 4, transition: "width 1s ease" },
  divider: { height: 1, background: "#f3f4f6", margin: "20px 0" },
  timeline: { display: "flex", flexDirection: "column", paddingRight: 4 },
  timelineItem: { display: "flex", alignItems: "flex-start", gap: 14 },
  dot: {
    width: 14, height: 14, borderRadius: "50%",
    flexShrink: 0, marginTop: 2, transition: "all 0.2s",
  },
  currentBadge: {
    fontSize: 11, marginRight: 6,
    background: "#dbeafe", color: "#1d4ed8",
    padding: "2px 8px", borderRadius: 12,
    display: "inline-block",
  },
  completionBox: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px 20px", background: "#eff6ff",
    borderRadius: 12, border: "1px solid #dbeafe",
    marginTop: 20,
  },
};