import { useEffect, useRef, useState } from "react";
import { connectToServer, sendMessage } from "./api";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./App.css";

function App() {
  const [startup, setStartup] = useState(true);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userStatus, setUserStatus] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    if (!startup) {
      connectToServer(username, (msg) => {
        const parsedMsg = JSON.parse(msg.data);
        if (parsedMsg.status) setUserStatus([...userStatus, parsedMsg.body]);
        else setMessages([...messages, parsedMsg.body]);
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  });

  const handleEnter = (e, start = false) => {
    if (e.key === "Enter") {
      if (start && username !== "") {
        setStartup(false);
      } else if (currentMessage !== "") {
        sendMessage(currentMessage);
        setCurrentMessage("");
      }
    }
  };

  const handleButton = () => {
    if (currentMessage !== "") {
      sendMessage(currentMessage);
      setCurrentMessage("");
    }
  };

  const renderMessages = () => {
    return messages.map((message, i) => {
      return (
        <div className="message-container me" key={i}>
          <div className="message">{message}</div>
        </div>
      );
    });
  };

  return (
    <div className="app">
      {startup ? (
        <div className="startup">
          <h1 style={{ marginBottom: "1em" }}>Go Chat</h1>
          <input
            placeholder="Enter your name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyDown={(e) => handleEnter(e, true)}
          />
          <hr />
        </div>
      ) : (
        <div className="window">
          <div className="top">
            <div className="split">
              <h1>Go Chat</h1>
              <div>
                <p className="online-header">Users Status:</p>
                {userStatus.slice(userStatus.length - 3).map((user) => (
                  <p className="online-user">{user}</p>
                ))}
              </div>
            </div>
            <hr />
          </div>
          <div className="messages-container">
            {renderMessages()}
            <div ref={scrollRef}></div>
          </div>
          <div className="bottom">
            <hr />
            <div className="input-container">
              <input
                placeholder="Enter your message"
                onChange={(e) => setCurrentMessage(e.target.value)}
                value={currentMessage}
                onKeyDown={handleEnter}
              />
              <div className="send-button" onClick={handleButton}>
                <MdKeyboardArrowRight color="#fff" size={25} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
