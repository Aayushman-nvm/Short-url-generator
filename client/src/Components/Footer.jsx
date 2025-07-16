import { Link } from "react-router-dom";
import { Github, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full flex flex-col sm:flex-row justify-between items-center px-4 py-4 bg-gradient-to-r from-black via-gray-900 to-orange-900 text-white mt-8">
      <div className="text-sm">© 2025 SunsetApp. All rights reserved.</div>
      <div className="flex space-x-4 mt-2 sm:mt-0">
        <Link to="/home" className="hover:text-orange-400 transition">Home</Link>
        <Link to="/history" className="hover:text-orange-400 transition">History</Link>
        <Link to="/favourites" className="hover:text-orange-400 transition">Favourites</Link>
        <Link to="/" className="hover:text-orange-400 transition">Login/SignUp</Link>
      </div>
      <div className="flex space-x-3 mt-2 sm:mt-0">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
          <Github size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
          <Twitter size={20} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
