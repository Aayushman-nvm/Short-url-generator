import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import History from "./Pages/History";
import Favourites from "./Pages/Favourites";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans">
      <BrowserRouter>
        <NavBar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/history" element={<History />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
