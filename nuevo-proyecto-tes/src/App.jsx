import React from "react";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/home.jsx";
import About from "./pages/about";


function App() {
    return (
        <div className="flex flex-col min-h-screen">
          <Router>
            <NavBar /> 
            <ScrollToTop />
            <main className="flex-grow"> 
              <Routes>
                  <Route path="/" element={<Home />} /> 
                  <Route path="/about" element={<About />} />
              </Routes>
            </main>
  
            <Footer />
          </Router>
        </div>
    );
}

export default App;
