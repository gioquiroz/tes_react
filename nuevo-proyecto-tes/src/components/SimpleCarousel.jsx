import React from 'react';
import Slider from 'react-slick';

import SlideImg1 from '../assets/DSC_0003.jpg';
import SlideImg2 from '../assets/DSC_0013.jpg';
import SlideImg3 from '../assets/DSC_0020.jpg';
import SlideImg4 from '../assets/DSC_0031.jpg';
import SlideImg5 from '../assets/DSC_0037.jpg';
import SlideImg6 from '../assets/DSC_0058.jpg';
import SlideImg7 from '../assets/DSC_0063.jpg';
import SlideImg8 from '../assets/DSC_0070.jpg';

const carouselImages = [
    { id: 1, src: SlideImg1, alt: 'Imagen 1' },
    { id: 2, src: SlideImg2, alt: 'Imagen 2' },
    { id: 3, src: SlideImg3, alt: 'Imagen 3' },
    { id: 4, src: SlideImg4, alt: 'Imagen 4' },
    { id: 5, src: SlideImg5, alt: 'Imagen 5' },
    { id: 6, src: SlideImg6, alt: 'Imagen 6' },
    { id: 7, src: SlideImg7, alt: 'Imagen 7' },
    { id: 8, src: SlideImg8, alt: 'Imagen 8' },
];


function SimpleCarousel() {
    const settings = {
        dots: false,
        infinite: true, 
        speed: 500,
        slidesToScroll: 1, 
        autoplay: true,
        autoplaySpeed: 1500,

        
        centerMode: true, 

        slidesToShow: 7, 

        responsive: [
            {
                breakpoint: 1280, // Para pantallas grandes (lg)
                settings: {
                    slidesToShow: 3, // Muestra 3 slides completos
                }
            },
            {
                breakpoint: 1024, // Para pantallas medianas (md)
                settings: {
                    slidesToShow: 2.5, // Muestra 2 completos y 1 parcial
                }
            },
            {
                breakpoint: 768, // Para tablets (sm)
                settings: {
                    slidesToShow: 1.5, // Muestra 1 completo y 1 parcial
                }
            },
            {
                breakpoint: 480, // Para móviles (xs)
                settings: {
                    slidesToShow: 1, // Muestra solo 1 slide completo.
                    centerPadding: "40px", // Muestra un poco de los lados en móviles.
                }
            }
        ]
    };

    return (
        <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden mb-12">
            <Slider {...settings}>
                {carouselImages.map((item, index) => (
                    <div key={item.id} className="px-4"> {/* Padding horizontal entre slides */}
                        <div 
                            className="h-64 md:h-80 lg:h-96 w-full bg-gray-200 rounded-lg shadow-md flex items-center justify-center overflow-hidden"
                        >
                            <img 
                                src={item.src} 
                                alt={item.alt} 
                                className="w-full h-full object-cover transition-all duration-300"
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SimpleCarousel;