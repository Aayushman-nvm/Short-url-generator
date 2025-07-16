import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import History from "./Pages/History";
import Favourites from "./Pages/Favourites";
import Login from "./Pages/Login";

function App() {
  const token = useSelector((state) => state.token);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-orange-900 text-white font-sans">
      <BrowserRouter>
        <NavBar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={token ? <HomePage /> : <Navigate to={"/"} />} />
            <Route path="/history" element={token ? <History /> : <Navigate to={"/"} />} />
            <Route path="/favourites" element={token ? <Favourites /> : <Navigate to={"/"} />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
