import { useState } from "react";

/**
 * StudentCard
 * -----------
 * Props:
 *  - student: {
 *      name, nameEn, studentId, major, year, gpa,
 *      avatar, email, phone, status, skills
 *    }
 */
export default function StudentCard({ student }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(student.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusMap = {
    active: { bg: "#e6f7ee", color: "#1a7f4b", label: "نشط" },
    inactive: { bg: "#fdecea", color: "#c62828", label: "غير نشط" },
    suspended: { bg: "#fff3e0", color: "#e65100", label: "موقوف" },
  };
  const s = statusMap[student.status] ?? statusMap.inactive;

  return (
    <div style={styles.card} dir="rtl">
      {/* ── Header ── */}
      <div style={styles.cardHeader}>
        <div style={styles.avatarWrapper}>
          <div style={styles.avatar}>{student.avatar}</div>
          <div style={styles.avatarBadge} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <h2 style={styles.studentName}>{student.name}</h2>
            <span style={{ ...styles.statusBadge, background: s.bg, color: s.color }}>
              {s.label}
            </span>
          </div>
          <p style={styles.studentSub}>{student.nameEn}</p>
        </div>
      </div>

      {/* ── Info Grid ── */}
      <div style={styles.infoGrid}>
        <InfoItem icon="🎓" label="الرقم الجامعي" value={student.studentId} />
        <InfoItem icon="📚" label="التخصص" value={student.major} />
        <InfoItem icon="📅" label="المستوى الدراسي" value={student.year} />
        <InfoItem icon="🏆" label="المعدل التراكمي" value={student.gpa?.toFixed(2)} highlight />
      </div>

      <div style={styles.divider} />

      {/* ── Contact ── */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={styles.contactItem}>
          <span style={styles.contactIcon}>✉️</span>
          <span style={styles.contactText}>{student.email}</span>
          <button style={styles.copyBtn} onClick={handleCopy}>
            {copied ? "✓ تم" : "نسخ"}
          </button>
        </div>
        <div style={styles.contactItem}>
          <span style={styles.contactIcon}>📞</span>
          <span style={styles.contactText}>{student.phone}</span>
        </div>
      </div>

      {/* ── Skills ── */}
      <div style={styles.skills}>
        {student.skills?.map((skill) => (
          <span key={skill} style={styles.skillTag}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Sub-component ── */
function InfoItem({ icon, label, value, highlight }) {
  return (
    <div style={styles.infoItem}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <div>
        <p style={styles.infoLabel}>{label}</p>
        <p style={{ ...styles.infoValue, color: highlight ? "#1a56db" : "#1a1a1a" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

/* ── Styles ── */
const styles = {
  card: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 8px rgba(0,0,0,0.04)",
    border: "1px solid #f1f1f1",
    fontFamily: "'Segoe UI','Cairo',sans-serif",
  },
  cardHeader: { display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 },
  avatarWrapper: { position: "relative" },
  avatar: {
    width: 64, height: 64, borderRadius: "50%",
    background: "linear-gradient(135deg,#1a56db,#7c3aed)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 22, fontWeight: 700, color: "#fff", flexShrink: 0,
  },
  avatarBadge: {
    position: "absolute", bottom: 2, left: 2,
    width: 14, height: 14, borderRadius: "50%",
    background: "#22c55e", border: "2px solid #fff",
  },
  studentName: { fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 },
  studentSub: { fontSize: 13, color: "#9ca3af", margin: "3px 0 0" },
  statusBadge: { fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 },
  infoGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: 12, marginBottom: 20,
  },
  infoItem: {
    display: "flex", alignItems: "flex-start", gap: 10,
    padding: 12, background: "#f9fafb", borderRadius: 10,
  },
  infoLabel: { fontSize: 12, color: "#9ca3af", margin: 0 },
  infoValue: { fontSize: 14, fontWeight: 600, margin: "2px 0 0" },
  divider: { height: 1, background: "#f3f4f6", margin: "16px 0" },
  contactItem: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "8px 12px", background: "#f9fafb", borderRadius: 8,
    fontSize: 13, flex: 1, minWidth: 0,
  },
  contactIcon: { fontSize: 16 },
  contactText: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#374151" },
  copyBtn: {
    fontSize: 12, color: "#1a56db", background: "none", border: "none",
    cursor: "pointer", fontFamily: "inherit", fontWeight: 600, padding: 0, flexShrink: 0,
  },
  skills: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 },
  skillTag: {
    fontSize: 12, fontWeight: 600, padding: "4px 12px",
    background: "#eff6ff", color: "#1a56db", borderRadius: 20, border: "1px solid #dbeafe",
  },
};