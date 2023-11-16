import { useState, useEffect } from "react";

const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<MessageEvent | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => setMessage(event);
    setSocket(ws);
    return () => {
      ws.close();
    };
  }, [url]);

  return { socket, message };
}

export default useWebSocket;