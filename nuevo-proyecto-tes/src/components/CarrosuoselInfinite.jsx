import React from 'react';
import Slider from 'react-slick';

// Asegúrate de que estas rutas sean correctas
import Banner1 from '../assets/descarga.png';
import Banner2 from '../assets/descarga.png';
import Banner3 from '../assets/descarga.png';
import Banner4 from '../assets/descarga.png';
import Banner5 from '../assets/descarga.png';

// Array de contenido del carrusel
const carouselImages = [
  { id: 1, src: Banner1, alt: 'Banner de Promoción 1' },
  { id: 2, src: Banner2, alt: 'Banner de Promoción 2' },
  { id: 3, src: Banner3, alt: 'Banner de Promoción 3' },
  { id: 4, src: Banner4, alt: 'Banner de Promoción 4' },
  { id: 5, src: Banner5, alt: 'Banner de Promoción 5' },
];


function SimpleCarousel() {
  

  const settings = {
    dots: false, 
    infinite: true,
    

    speed: 8000,           
    autoplaySpeed: 1,      
    cssEase: "linear",     
    autoplay: true,
     arrows: false,         
    

    centerMode: true, 
    slidesToShow: 3, 
    slidesToScroll: 1,
    
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
          slidesToShow: 1, 
          centerPadding: "60px", 
        }
      }
    ]
  };

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden mb-12">
      <Slider {...settings}>
        {carouselImages.map((item, index) => (
          <div key={item.id} className="px-2"> 
            <div 
                            // Altura fija y fondo blanco para el efecto 'contain'
              className="h-72 md:h-96 bg-white rounded-lg shadow-md transition-all duration-200 overflow-hidden" 
              style={{ 
                backgroundImage: `url(${item.src})`,
                
                                // AJUSTES CLAVE PARA IMÁGENES MÁS PEQUEÑAS
                backgroundSize: 'contain',     // La imagen se ajusta al espacio (más pequeña)
                backgroundRepeat: 'no-repeat', // No se repite
                backgroundPosition: 'center',  // Centra la imagen
                
                border: '3px solid transparent' 
              }}
            >
              
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleCarousel;