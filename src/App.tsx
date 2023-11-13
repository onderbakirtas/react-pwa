import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./views/Home";
import Products from "./views/Products";
import Chat from "./views/Chat";

const App = () => {
  return (
    <div>
      <h1>React PWA</h1>

      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="chat" element={<Chat />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
