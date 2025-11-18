import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import paseo from '../assets/paseo.jpg'
import cumple261 from '../assets/26-1.jpg'
import jefes from '../assets/jefes.jpg'


const carouselSlides = [
    { url: paseo},
    { url: cumple261},
    { url: jefes},
];


function CenteredCarousel({ 
    slides = carouselSlides, 
    autoPlayInterval = 5000, 
    containerHeightClasses = "h-[400px]", 
    centerWidthClass = "w-1/2", 
    sideWidthClass = "w-1/3",

    centerHeightClass = "h-[90%]",
    sideHeightClass = "h-[70%]"   
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slidesLength = slides.length;
    if (slidesLength === 0) return null;

    // Lógica para obtener el índice de la diapositiva anterior y siguiente
    const getPreviousIndex = (index) => (index - 1 + slidesLength) % slidesLength;
    const getNextIndex = (index) => (index + 1) % slidesLength;

    // Usamos useCallback para memorizar las funciones de navegación
    const goToPrevious = useCallback(() => setCurrentIndex(getPreviousIndex(currentIndex)), [currentIndex, slidesLength]);
    const goToNext = useCallback(() => setCurrentIndex(getNextIndex(currentIndex)), [currentIndex, slidesLength]);

    // Auto-Play
    useEffect(() => {
        if (autoPlayInterval > 0) {
            const interval = setInterval(() => {
                goToNext();
            }, autoPlayInterval);
            return () => clearInterval(interval);
        }
    }, [autoPlayInterval, goToNext]);

    // Calcular las tres diapositivas que estarán visibles
    const visibleSlides = [
        slides[getPreviousIndex(currentIndex)], // Izquierda
        slides[currentIndex],                   // Centro (Actual)
        slides[getNextIndex(currentIndex)],     // Derecha
    ];

    // Función para determinar las clases CSS de cada diapositiva
    const getSlideBaseClasses = (isCenter) => {
        // Base sin dimensiones para aplicar solo las props
        const baseClasses = "opacity-100 shadow-lg transition-all duration-700 ease-in-out cursor-pointer flex justify-center items-center";
        
        const widthClass = isCenter ? centerWidthClass : sideWidthClass;
        const depthClass = isCenter ? "z-20 shadow-2xl" : "z-10";
        
        // ¡CAMBIO CLAVE! Altura individualizada
        const heightClass = isCenter ? centerHeightClass : sideHeightClass; 

        return `${baseClasses} ${widthClass} ${heightClass} ${depthClass}`;
    };

    return (
        // Contenedor principal: Altura configurada por prop (containerHeightClasses).
        <div className={`mt-20 flex justify-center items-center w-full relative ${containerHeightClasses} overflow-hidden mb-8 mt-8`}>
            
            {/* Contenedor de las 3 Diapositivas Visibles - Con separación (gap-4) */}
            <div className="flex justify-center items-center w-full h-full gap-4 px-4">
                
                {/* Diapositiva Izquierda (Anterior) */}
                <div 
                    onClick={goToPrevious}
                    className={getSlideBaseClasses(false)} 
                >
                    <div 
                        className="h-full w-full rounded-lg bg-cover bg-center flex items-center justify-center relative group overflow-hidden"
                        // Uso de URL vacía o background temporal si no hay URL
                        style={{ 
                            backgroundImage: slides[getPreviousIndex(currentIndex)].url ? `url(${slides[getPreviousIndex(currentIndex)].url})` : 'none',
                            backgroundColor: slides[getPreviousIndex(currentIndex)].url ? 'transparent' : '#eee',
                        }}
                    >
                    </div>
                </div>

                {/* Diapositiva Central (Actual) */}
                <div 
                    className={getSlideBaseClasses(true)}
                    onClick={(e) => e.stopPropagation()} 
                >
                    <div 
                        className="h-full w-full rounded-xl bg-cover bg-center flex flex-col items-center justify-center p-4 shadow-xl"
                        // Uso de URL vacía o background temporal si no hay URL
                        style={{ 
                            backgroundImage: slides[currentIndex].url ? `url(${slides[currentIndex].url})` : 'none',
                            backgroundColor: slides[currentIndex].url ? 'transparent' : '#e0e0e0',
                        }}
                    >
                    </div>
                </div>

                {/* Diapositiva Derecha (Siguiente) */}
                <div 
                    onClick={goToNext}
                    className={getSlideBaseClasses(false)}
                >
                    <div 
                        className="h-full w-full rounded-lg bg-cover bg-center flex items-center justify-center relative group overflow-hidden"
                        // Uso de URL vacía o background temporal si no hay URL
                        style={{ 
                            backgroundImage: slides[getNextIndex(currentIndex)].url ? `url(${slides[getNextIndex(currentIndex)].url})` : 'none',
                            backgroundColor: slides[getNextIndex(currentIndex)].url ? 'transparent' : '#eee',
                        }}
                    >
                    </div>
                </div>

            </div>

            {/* Controles de Navegación (Flechas) */}
            <button 
                onClick={goToPrevious}
                // Posicionamiento ajustado a 12%
                className="absolute left-[12%] top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full shadow-lg z-30 transition backdrop-blur-sm"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={goToNext}
                // Posicionamiento ajustado a 12%
                className="absolute right-[12%] top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full shadow-lg z-30 transition backdrop-blur-sm"
                aria-label="Siguiente"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicadores de Puntos (Navegación directa) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            index === currentIndex ? 'bg-indigo-600 shadow-md' : 'bg-gray-400 bg-opacity-70 hover:bg-indigo-400'
                        }`}
                        aria-label={`Ir a diapositiva ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

// Exportar solo el componente CenteredCarousel
export default CenteredCarousel;