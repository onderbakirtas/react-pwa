import { FC, useRef, useState } from "react";
import { WEBSOCKET_URL } from "../utils/constants";

type TLogin = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const [formValue, setFormValue] = useState<TLogin>({
    email: "",
    password: "",
  });

  const connectionRef = useRef<WebSocket>(new WebSocket(WEBSOCKET_URL));

  const authenticate = (fields: TLogin) => {
    const { email, password } = fields;
    console.log("authenticating", email, password);
    connectionRef.current.send(
      JSON.stringify({ type: "auth", email, password })
    );
  };

  return <div>login</div>;
};

export default Login;
