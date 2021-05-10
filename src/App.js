import { useEffect, useState } from "react";
import { connectToServer, sendMessage } from "./api";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connectToServer((msg) => {
      setMessages([...messages, msg]);
    });
  });

  const onSendMessage = (message) => {
    const response = sendMessage(message);
  };

  const renderMessages = () => {
    return messages.map((message, i) => {
      return (
        <div className="message-container" key={i}>
          <div className="message">{message.data}</div>
        </div>
      );
    });
  };

  return (
    <div className="app">
      <div className="window">
        <h1>Go Chat</h1>
        <hr />
        <div className="messages-container">{renderMessages()}</div>
        <div className="bottom">
          <hr />
          <div className="input-container">
            <input placeholder="Enter your message" />
            <button onClick={() => onSendMessage("Hello again Edgar!")}>
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
