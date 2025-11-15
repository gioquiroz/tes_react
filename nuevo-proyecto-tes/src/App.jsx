import React from "react";
import NavBar from "./components/NavBar.jsx";
import CenteredCarousel from "./components/Carousel.jsx";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    return (
        <>
          <NavBar />
          <CenteredCarousel />
          <MainContent />
          <Footer />
        </>
    );
}

export default App;