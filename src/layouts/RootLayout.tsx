import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

const RootLayout: FC = () => {
  return (
    <main>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/auctions">Auctions</Link>
      </nav>
      <Outlet />
    </main>
  );
};

export default RootLayout;
