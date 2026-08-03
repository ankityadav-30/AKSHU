import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AkshuChatbot from "../chat/AkshuChatbot";

const MainLayout = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="content-wrapper">
        <Outlet />
      </main>
      <Footer />
      <AkshuChatbot />
    </div>
  );
};

export default MainLayout;
