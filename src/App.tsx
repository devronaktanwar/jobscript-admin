import { Route, Routes } from "react-router-dom";
import AddJob from "./components/AddJob";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import AddCompany from "./components/AddCompany";
import AllCompany from "./components/AllCompany";
import ContactUs from "./components/ContactUs";

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex gap-6">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/all-companies" element={<AllCompany />} />
        <Route path="/contact-queries" element={<ContactUs />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
