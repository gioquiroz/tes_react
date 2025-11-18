import React from 'react';
import SimpleCarousel from '../components/SimpleCarousel.jsx'; 

import TeamPhotoMain from '../assets/cumple.png'; 
import MissionPhoto from '../assets/cumple.png'; 
import VisionPhoto from '../assets/cumple.png'; 
import Banner from '../assets/cumple.png'


function About() {
    return (
        <div className="pt-24 pb-16 bg-white min-h-screen">
            
            <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                <SimpleCarousel /> 
                
                <h1 className="text-4xl font-extrabold text-gray-800 mb-16">
                    TES LTDA
                </h1>
            </header>

            {/* 2. Sección: ¿Quiénes Somos? */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 grid md:grid-cols-2 gap-12 items-center">
                
                {/* Texto: ¿Quiénes Somos? */}
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Quiénes somos?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        En **TES**, somos una empresa del eje cafetero, con **26 años de experiencia** en la renta de equipos, venta de consumibles, asesoría y soporte técnico. Ofrecemos soluciones integrales de impresión y copiado, adaptadas a las necesidades de pequeñas y grandes empresas.
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-4">
                        Nuestro compromiso es brindar un servicio ágil, confiable y de calidad para ser reconocidos como una empresa líder en la región en todo lo que hacemos. Somos un equipo de profesionales dedicados a superar las expectativas del cliente, basados en la **honestidad**, la **responsabilidad** y la **innovación**.
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-4 font-semibold">
                        Tenemos el mejor departamento de servicio técnico, medido por los estándares de calidad ISO.
                    </p>
                </div>
                
                {/* Imagen del Equipo Principal */}
                <div className="order-1 md:order-2">
                    <img 
                        src={TeamPhotoMain} 
                        alt="Equipo de TES LTDA celebrando aniversario" 
                        className="rounded-lg shadow-xl w-full h-auto object-cover"
                    />
                </div>
            </section>
            
            {/* 3. Sección: Misión y Visión (Usando Grid/Columnas) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-start">
                
                {/* Columna de Misión */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col h-full">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Misión</h2>
                    <p className="text-gray-600 leading-relaxed flex-grow">
                        Ofrecer y comercializar equipos de alta tecnología, consumibles para impresoras y software, además de brindar asesoría, soporte técnico, servicio de renta y venta de tóner, sellos, realizando acuerdos con las principales marcas a nivel mundial. Nos esforzamos por superar las expectativas de nuestros clientes y asegurar el desarrollo profesional y personal de nuestros colaboradores y la satisfacción de nuestros empleados.
                    </p>
                    <img 
                        src={MissionPhoto} 
                        alt="Foto Misión" 
                        className="rounded-lg shadow-md mt-6 w-full h-auto object-cover"
                    />
                </div>

                {/* Columna de Visión */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col h-full">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Visión</h2>
                    <p className="text-gray-600 leading-relaxed flex-grow">
                        Tecnología moderna y suministros (LMS - test), en el 2020 el desarrollo de apps web y móviles. Innovación constante para la prevención de tecnicismos de trabajo, desempeñó del empleado, capacidad de adaptabilidad de las tecnologías, gestión ambiental, seguridad laboral, honestidad y la línea de tecnologías en el futuro.
                    </p>
                    <img 
                        src={VisionPhoto} 
                        alt="Foto Visión" 
                        className="rounded-lg shadow-md mt-6 w-full h-auto object-cover"
                    />
                </div>
                
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="h-full bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                        src={Banner} // Usamos la variable Banner aquí
                        alt="Banner de promoción o información adicional" 
                        className="w-full h-full object-cover rounded-lg" 
                    />
                </div>
            </div>

        </div>
    );
}

export default About;