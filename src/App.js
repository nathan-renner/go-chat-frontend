import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="window">
        <h1>Go Chat</h1>
        <hr />
        <div className="messages-container">
          <div className="message-container me">
            <div className="message">message</div>
          </div>
          <div className="message-container">
            <div className="message">message</div>
          </div>
          <div className="message-container">
            <div className="message">message</div>
          </div>
          <div className="message-container">
            <div className="message">message</div>
          </div>
        </div>
        <div className="bottom">
          <hr />
          <div className="input-container">
            <input placeholder="Enter your message" />
            <button>send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
