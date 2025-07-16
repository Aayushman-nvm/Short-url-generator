import { Link } from "react-router-dom";
import { Github, Twitter } from "lucide-react";

function Footer() {

  return (
    <footer className="w-full mt-12 pt-6 px-7 bg-black text-white">
      <div className="flex border-t border-gray-700 flex-row justify-between items-start sm:items-center w-full">
        {/* Navigation */}
        <div className="flex flex-col space-y-2 my-4">
          <Link to="/home" className="hover:text-orange-400 transition">Home</Link>
          <Link to="/history" className="hover:text-orange-400 transition">History</Link>
          <Link to="/favourites" className="hover:text-orange-400 transition">Favourites</Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center mt-6 sm:mt-0">
          <span className="text-sm mb-2 text-gray-400">Social Links</span>
          <div className="flex space-x-3 justify-center">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
              <Github size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 py-2 border-t border-gray-800">
        © 2025 Short Url. All rights reserved.
      </div>
    </footer>
  );

}

export default Footer;
