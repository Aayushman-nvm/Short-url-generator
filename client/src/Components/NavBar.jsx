import { Link, useLocation } from "react-router-dom";
import { Home, Clock, Star, LogIn, Github, Twitter } from "lucide-react";

function NavBar() {
  const location = useLocation();
  const links = [
    { name: "Home", to: "/home", icon: Home },
    { name: "History", to: "/history", icon: Clock },
    { name: "Favourites", to: "/favourites", icon: Star },
    { name: "Login/SignUp", to: "/", icon: LogIn },
  ];

  return (
    <nav className="w-full flex justify-between items-center px-4 py-3 bg-gradient-to-r from-black via-gray-900 to-orange-900 text-white sticky top-0 z-50">
      <div className="text-lg font-bold">Short Url</div>
      <div className="flex space-x-4">
        {links.map(({ name, to, icon: Icon }) => (
          <Link
            key={name}
            to={to}
            className={`flex items-center space-x-1 hover:text-orange-400 transition ${location.pathname === to ? "text-orange-400" : ""}`}
          >
            <Icon size={20} />
            <span className="hidden sm:inline">{name}</span>
          </Link>
        ))}
      </div>
      <div className="flex space-x-3">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
          <Github size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
          <Twitter size={20} />
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
