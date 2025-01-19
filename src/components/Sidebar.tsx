import { PiBagSimpleBold } from "react-icons/pi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

interface lNavProps {
  title: string;
  icon: ReactNode;
  href: string;
}
const navitems: lNavProps[] = [
  {
    title: "All Jobs",
    icon: <PiBagSimpleBold />,
    href: "",
  },
  {
    title: "Add Job",
    icon: <IoMdAddCircleOutline />,
    href: "add-job",
  },
  {
    title: "All Companies",
    icon: <PiBagSimpleBold />,
    href: "all-companies",
  },
  {
    title: "Add Company",
    icon: <PiBagSimpleBold />,
    href: "add-company",
  },
  {
    title: "Contact queries",
    icon: <PiBagSimpleBold />,
    href: "contact-queries",
  },
];
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className=" border-r">
      <div className="w-16 h-16 cursor-pointer">
        <img src={logo} alt="" className="w-full h-full" />
      </div>
      <div className="flex flex-col w-[300px] h-[100vh] items-center">
        {navitems.map((item, index) => {
          const isActive = `/${item.href}` === path;
          return (
            <div
              key={index}
              className={`flex items-center p-3 py-2 gap-3 w-full border-b cursor-pointer rounded ${
                isActive
                  ? "bg-green-100 text-primaryNew"
                  : "bg-white text-black"
              }`}
              onClick={() => navigate(`/${item.href}`)}
            >
              {item.icon}
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
