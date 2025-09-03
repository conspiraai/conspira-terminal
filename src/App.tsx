import React from "react";
import "./App.css";

function App() {
  return (
    <div>
      {/* Top Navigation */}
      <header>
        <nav>
          <button className="btn">HOME</button>
          <button className="btn">MARKET ▾</button>
          <button className="btn">SOURCES ▾</button>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <h1>CONSPIRA AI</h1>
        <p>Uncover the Crypto Undercurrent</p>

        {/* Buttons Row */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className="btn">_ Enter Terminal</button>
          <a
            href="https://x.com/conspira_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Follow on X
          </a>
          <input type="email" placeholder="Enter email" />
          <button className="btn">Go</button>
        </div>
      </main>
    </div>
  );
}

export default App;
