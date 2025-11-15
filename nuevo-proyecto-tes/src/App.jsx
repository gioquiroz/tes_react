// import React, {useState} from "react";
// import NavBar from "./components/NavBar.jsx";
// import CenteredCarousel from "./components/Carousel.jsx";
// import MainContent from "./components/MainContent.jsx";
// import Footer from "./components/Footer.jsx";
// import { useState } from "react";

// function App() {
//     return (
//         <>
//           <NavBar />
//           <CenteredCarousel />
//           <MainContent />
//           <Footer />
//         </>
//     );
// }

// export default App;

import React, { useState } from 'react'; // 1. Importar useState
import NavBar from './components/NavBar'; // Import ajustado (sin .jsx)
import CenteredCarousel from './components/Carousel'; // Import ajustado (sin .jsx)
import MainContent from './components/MainContent'; // Import ajustado (sin .jsx)
import Footer from './components/Footer'; // Import ajustado (sin .jsx)

// =========================================================
// Componente de página temporal para 'Servicios'
const ServiciosPage = ({ onNavigate }) => (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-700">Página de Servicios</h1>
        <p className="text-gray-600 mt-2">¡Llegaste desde el Home!</p>
        <button
            onClick={() => onNavigate('home')}
            className="mt-6 px-6 py-2 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition"
        >
            Volver a Inicio
        </button>
    </div>
);
// =========================================================

function App() {
  // 3. Definir el estado que rastrea la página actual
  const [currentPage, setCurrentPage] = useState('home'); 

  // 4. Función que decide qué componente mostrar
  const renderPage = () => {
    // Pasar la función de navegación a los componentes
    const onNavigate = setCurrentPage;

    switch (currentPage) {
      case 'home':
        // Pasamos onNavigate al MainContent (donde están los íconos de servicios)
        return (
          <>
            <CenteredCarousel />
            <MainContent onNavigate={onNavigate} /> 
          </>
        );
      case 'servicios':
        // Renderiza la nueva página de Servicios
        return <ServiciosPage onNavigate={onNavigate} />;
      default:
        // Si la ruta no existe, vuelve al home
        return (
          <>
            <CenteredCarousel />
            <MainContent onNavigate={onNavigate} />
          </>
        );
    }
  };

  return (
    <div className="font-sans antialiased">
      {/* Pasar la función de navegación también a NavBar para los enlaces principales */}
      <NavBar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      {/* 5. Renderizar el contenido dinámico */}
      <main>
          {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

export default App;