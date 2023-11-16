import { useRef, useState } from "react";

const directusWsUrl = "wss://fleabid.pixelatecms.com/websocket";

const Auctions = () => {
  const connectionRef = useRef<WebSocket | null>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [socketName, setSocketName] = useState("");
  const [socketLocation, setSocketLocation] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    connectionRef.current = new WebSocket(directusWsUrl);

    connectionRef.current.addEventListener("open", () => {
      console.log("WebSocket connected");
      connectionRef.current?.send(
        JSON.stringify({
          type: "update",
          collection: "auctions",
          id: 1,
          data: {
            name,
            location,
          },
        })
      );
    });
  };

  return (
    <div>
      <div>
        Name: {socketName}
        <br />
        Location: {socketLocation}
      </div>
      <fieldset>
        <legend>Auctions</legend>
        <form onSubmit={handleSubmit}>
          <div>
            <label>name</label>
            <input type="text" onChange={handleNameChange} />
          </div>
          <br />
          <div>
            <label>location</label>
            <input type="text" onChange={handleLocationChange} />
          </div>
          <button type="submit">submit</button>
        </form>
      </fieldset>
    </div>
  );
};

export default Auctions;
