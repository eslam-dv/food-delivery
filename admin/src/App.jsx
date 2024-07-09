import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import List from "./pages/List";

const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
