import { useState, useEffect } from "react";

const App = () => {
  const anecdotes = [
    "Debugging is like being the detective in a crime movie where you are also the murderer.",
    "Programming is the art of putting bugs in the code and then removing them.",
    "The best way to get started is to stop talking and begin doing.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Before software can work well, it must first work.",
    "Simplicity is the ultimate sophistication.",
    "The best error message is the one that never shows up.",
    "The hardest part of programming is naming things."
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [animate, setAnimate] = useState(false);

  const totalVotes = votes[selected];

  // تشغيل الأنيميشن عند تغيّر الحكم أو التصويت
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 200);
    return () => clearTimeout(timeout);
  }, [selected, votes]);

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const maxVotes = Math.max(...votes);
  const mostVoted = votes.indexOf(maxVotes);

  const buttonStyle = {
    padding: "10px 20px",
    margin: "5px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    color: "white"
  };

  const animatedStyle = {
    transition: "transform 0.2s",
    transform: animate ? "scale(1.1)" : "scale(1)"
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial, sans-serif" }}>
      <h1>Quote of the Day</h1>

      <p style={{ fontSize: "1.3em", fontStyle: "italic", margin: "20px 0", ...animatedStyle }}>
        "{anecdotes[selected]}"
      </p>
      <p style={animatedStyle}>Votes: {votes[selected]}</p>

      <div>
        <button
          style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}
          onClick={handleVote}
        >
          Vote
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: "#2196F3" }}
          onClick={handleNextAnecdote}
        >
          Next Quote
        </button>
      </div>

      <h2 style={{ marginTop: "40px" }}>Most Popular Quote</h2>
      {maxVotes > 0 ? (
        <div>
          <p style={{ fontSize: "1.2em", fontStyle: "italic", margin: "10px 0" }}>
            "{anecdotes[mostVoted]}"
          </p>
          <p>with {maxVotes} votes</p>
        </div>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  );
};

export default App;