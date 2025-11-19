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
import ShopPage from './pages/ShopPage.jsx'
import CartItem from './pages/CartPage.jsx'
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";

function App() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Router>
                <NavBar /> 
                <ScrollToTop />

                <main className="flex-grow bg-gray-100"> 
                    <Routes>
                        <Route path="/" element={<Home />} /> 
                        <Route path="/about" element={<About />} />
                        <Route path="/tienda" element={<ShopPage />} />
                        <Route path="/carrito" element={<CartItem />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} /> 
                    </Routes>
                </main>
    
                <Footer />
            </Router>
        </div>
    );
}

export default App;