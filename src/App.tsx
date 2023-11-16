import { useState, useRef } from "react";

const url = "wss://fleabid.pixelatecms.com/websocket";

export default function App() {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [newMessage, setNewMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  const connectionRef = useRef(null);

  const authenticate = (opts) => {
    const { email, password } = opts;
    console.log("authenticating", email, password);
    connectionRef.current.send(
      JSON.stringify({ type: "auth", email, password })
    );
  };

  const loginSubmit = (event) => {
    event.preventDefault();
    connectionRef.current = new WebSocket(url);
    connectionRef.current.addEventListener("open", () => {
      console.log("connected");

      authenticate(formValue);
    });
    connectionRef.current.addEventListener("message", (message) => {
      console.log("message", message);
      receiveMessage(message);
    });
  };

  const receiveMessage = (message) => {
    const data = JSON.parse(message.data);

    if (data.type == "auth" && data.status == "ok") {
      connectionRef.current.send(
        JSON.stringify({
          type: "subscribe",
          collection: "messages",
          query: {
            fields: ["*", "user_created.first_name"],
            sort: "date_created",
          },
        })
      );
    }

    if (data.type === "subscription" && data.event === "init") {
      for (const message of data.data) {
        setMessageHistory((history) => [...history, message]);
      }
    }

    if (data.type === "subscription" && data.event === "create") {
      setMessageHistory((history) => [...history, data.data[0]]);
    }
  };

  const messageSubmit = (event) => {
    event.preventDefault();

    connectionRef.current.send(
      JSON.stringify({
        type: "items",
        collection: "messages",
        action: "create",
        data: { text: newMessage },
      })
    );

    setNewMessage("");
  };

  const handleLoginChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={loginSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValue.email}
          onChange={handleLoginChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValue.password}
          onChange={handleLoginChange}
        />
        <button type="submit">Submit</button>
      </form>

      <ol>
        {messageHistory.map((message) => (
          <li key={message.id}>
            {message.user_created.first_name}: {message.text}
          </li>
        ))}
      </ol>

      <form onSubmit={messageSubmit}>
        <label htmlFor="message">Message</label>
        <input
          type="text"
          id="message"
          name="message"
          value={newMessage}
          onChange={handleMessageChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
