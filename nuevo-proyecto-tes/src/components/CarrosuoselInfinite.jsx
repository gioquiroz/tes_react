import React from 'react';
import Slider from 'react-slick';

// Importa tus imágenes aquí para usarlas en el carrusel
import Banner1 from '../assets/image.png';
import Banner2 from '../assets/image.png';
import Banner3 from '../assets/image.png';
import Banner4 from '../assets/image.png';
import Banner5 from '../assets/image.png';

// Array de contenido del carrusel (agregué más para que se note el efecto)
const carouselImages = [
    { id: 1, src: Banner1, alt: 'Banner de Promoción 1' },
    { id: 2, src: Banner2, alt: 'Banner de Promoción 2' },
    { id: 3, src: Banner3, alt: 'Banner de Promoción 3' },
    { id: 4, src: Banner4, alt: 'Banner de Promoción 4' },
    { id: 5, src: Banner5, alt: 'Banner de Promoción 5' },
];


function SimpleCarousel() {
    // Configuración de react-slick para vista parcial y centrado
    const settings = {
        dots: false, // Opcional: Generalmente se ocultan los puntos en este diseño
        infinite: true,
        speed: 8000,
        
        // --- PROPIEDADES CLAVE ---
        centerMode: true, // Centra el slide activo
        slidesToShow: 4, // Muestra 3 slides a la vez (1 completo + 2 parciales)
        // Puedes usar 3.5 o 5 si lo prefieres
        cssEase: "linear",
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1,
        arrows: true, 
        autoplay: true,
        centerMode: true, 
        slidesToShow: 3, 
        slidesToScroll: 1, // Mueve un slide a la vez.
        arrows: true,
        // -------------------------

        // Configuraciones responsivas
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1, // En móviles, volvemos a mostrar solo uno.
                    centerPadding: "60px", // Añade padding para ver el "peek"
                }
            }
        ]
    };

    return (
        <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden mb-12">
            <Slider {...settings}>
                {carouselImages.map((item, index) => (
                    <div key={item.id} className="px-1">
                        <div 
                            className="h-64 bg-gray-300 rounded-lg shadow-md transition-all duration-200"
                            // Estilo para la imagen (puedes usar la clase 'slick-center' para resaltarlo con CSS)
                            style={{ 
                                backgroundImage: `url(${item.src})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                border: '3px solid transparent' 
                            }}
                        >
                            {/* Opcional: Aquí puedes añadir texto o un gradiente */}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SimpleCarousel;