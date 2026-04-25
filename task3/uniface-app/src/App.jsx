import { useState, useEffect } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [animate, setAnimate] = useState(false);

  const total = good + neutral + bad;

  const buttonStyle = {
    padding: "10px 20px",
    margin: "5px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    color: "white"
  };

  // تشغيل الأنيميشن عند كل تغيير في الأصوات
  useEffect(() => {
    if (total > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 150); // مدة الأنيميشن
      return () => clearTimeout(timeout);
    }
  }, [good, neutral, bad]);

  const animatedStyle = {
    transition: "transform 0.15s",
    transform: animate ? "scale(1.2)" : "scale(1)"
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Give Us Your Opinion</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}
          onClick={() => setGood(good + 1)}
        >
          Good
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: "#2196F3" }}
          onClick={() => setNeutral(neutral + 1)}
        >
          Neutral
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: "#f44336" }}
          onClick={() => setBad(bad + 1)}
        >
          Bad
        </button>
      </div>

      <h2>Details</h2>
      <p style={animatedStyle}>
        Good: {good} ({total ? ((good / total) * 100).toFixed(1) : 0}%)
      </p>
      <p style={animatedStyle}>
        Neutral: {neutral} ({total ? ((neutral / total) * 100).toFixed(1) : 0}%)
      </p>
      <p style={animatedStyle}>
        Bad: {bad} ({total ? ((bad / total) * 100).toFixed(1) : 0}%)
      </p>
      <p style={animatedStyle}><strong>Total Votes: {total}</strong></p>
    </div>
  );
};

export default App;