import { Route, Routes, BrowserRouter } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Footer from './Components/Footer'
import HomePage from "./Pages/HomePage";
import History from "./Pages/History"
import Favourites from "./Pages/Favourites";
import Login from "./Pages/Login";

function App() {

  return (
    <div>Hello
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/history" element={<History />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
