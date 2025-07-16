import { NavLink, Link } from "react-router-dom";
import {
  Home,
  Clock,
  Star,
  LogIn,
  Github,
  Twitter,
  Menu,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../States/slice";
import { useEffect, useState } from "react";

function NavBar() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    console.log("Do we have token: ", token);
  }, [token]);

  const links = [
    { name: "Home", to: "/home", icon: Home },
    { name: "History", to: "/history", icon: Clock },
    { name: "Favourites", to: "/favourites", icon: Star },
    {
      name: "Github",
      to: "https://github.com/Aayushman-nvm/Short-url-generator",
      icon: Github,
    },
    { name: "Twitter", to: "https://x.com/White_nvm", icon: Twitter },
  ];

  return (
    <>
      <nav className="w-full flex justify-between items-center px-4 py-3 bg-black text-white sticky top-0 z-50">
        <div className="md:text-lg font-bold">Short Url</div>

        {/* Desktop Nav */}
        <div className={`hidden md:flex space-x-4 md:space-x-16`}>
          {token &&
            links.map(({ name, to, icon: Icon }) => (
              <NavLink
                key={name}
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 ${isActive ? "text-orange-400" : "text-gray-300"
                  } hover:text-orange-400 transition`
                }
              >
                <Icon size={24} />
                <span className="hidden sm:inline text-[10px]">{name}</span>
              </NavLink>
            ))}
        </div>

        {/* Log out for Desktop */}
        {token && (
          <Link
            to="/"
            onClick={() => dispatch(setToken(null))}
            className="hidden md:flex flex-col items-center hover:text-orange-400 transition text-gray-300"
          >
            <LogIn size={20} />
            <p className="text-[12px]">Log Out</p>
          </Link>
        )}

        {/*Sidebar hamburger*/}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/*Sidebar for mobile, not really a side bar... it opens from top*/}
      <div
        className={`fixed top-0 left-0 w-full bg-black text-white z-40 shadow-lg p-6 space-y-6 transition-transform duration-300 transform ${sidebarOpen ? "translate-y-0" : "-translate-y-full"
          } md:hidden`}
      >
        <div className="border-t border-b border-gray-700 mt-7 mb-4">
          {token &&
            links.map(({ name, to, icon: Icon }) => (
              <NavLink
                key={name}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-4 py-2 px-2 rounded hover:text-orange-400 transition ${isActive ? "text-orange-400" : "text-gray-300"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span className="text-sm">{name}</span>
              </NavLink>
            ))}
        </div>

        {/* Log out for mobile */}
        {token && (
          <Link
            to="/"
            onClick={() => {
              dispatch(setToken(null));
              setSidebarOpen(false);
            }}
            className="flex items-center space-x-4 py-2 px-2 rounded text-gray-300 hover:text-orange-400 transition"
          >
            <LogIn size={20} />
            <span className="text-sm">Log Out</span>
          </Link>
        )}
      </div>
    </>
  );
}

export default NavBar;
