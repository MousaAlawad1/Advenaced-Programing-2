import { useState, useEffect } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);
  const [animate, setAnimate] = useState(false);

  const buttonStyle = {
    padding: "10px 20px",
    margin: "5px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  };

  // كل مرة يتغير العداد نشغّل الأنيميشن
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 150); // مدة الأنيميشن
    return () => clearTimeout(timeout);
  }, [counter]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Advanced Counter</h1>

      <h2
        style={{
          fontSize: "40px",
          margin: "20px 0",
          transition: "transform 0.15s",
          transform: animate ? "scale(1.3)" : "scale(1)",
          color: counter > 0 ? "green" : counter < 0 ? "red" : "black"
        }}
      >
        {counter}
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Step: </label>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          style={{
            padding: "8px",
            width: "80px",
            textAlign: "center",
            marginLeft: "10px"
          }}
        />
      </div>

      <div>
        <button
          style={{ ...buttonStyle, backgroundColor: "#4CAF50", color: "white" }}
          onClick={() => setCounter(counter + step)}
        >
          + {step}
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: "#f44336", color: "white" }}
          onClick={() => setCounter(counter - step)}
        >
          - {step}
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: "#555", color: "white" }}
          onClick={() => setCounter(0)}
        >
          Reset
        </button>
        <h1>By : Mousa Alawad</h1>
      </div>
    </div>
  );
};

export default App;