import React from "react";
// Asegúrate de importar todos los iconos que uses
import { Printer, ScrollText, Wrench, Headset, Briefcase } from 'lucide-react'; 
import RH from '../assets/OIP.jpg';
import Cumple from '../assets/cumple.png';
import SimpleCarousel from './CarrosuoselInfinite'
import { NavLink } from "./NavbarElements"; 


function MainContent() {
    // Definición de ítems de servicio (AHORA CON PROPIEDAD 'to')
    const serviceItems = [
        { icon: Printer, label: "Renta de Equipos", color: "text-indigo-600", to: "/renta" },
        { icon: Briefcase, label: "Venta de Consumibles", color: "text-indigo-600", to: "/tienda" },
        { icon: Headset, label: "Asesoría de Equipos", color: "text-indigo-600", to: "/asesoria" },
    ];

    // Definición de ítems de problemas, con la ruta 'to'
    const problemItems = [
        { icon: Headset, label: "Líneas de ayuda", color: "text-red-600", to: "/contact" },
        { icon: ScrollText, label: "Nosotros", color: "text-red-600", to: "/about" },   
        { icon: Wrench, label: "Soporte Técnico", color: "text-red-600", to: "/soporte" },
    ];

    const allianceBannerUrl = RH;
    const celebrationImageUrl = Cumple;

    return (
        <div className="max-w-7xl mx-auto p-4 pt-12"> 
            
            {/* Sección de Servicios (CORREGIDA: Ahora usa NavLink) */}
            <section className="mt-8 mb-16">
                <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">Servicios</h1>
                <div className="flex justify-center space-x-8 md:space-x-20">
                    {serviceItems.map((item) => {
                        const IconComponent = item.icon;
                        // El componente siempre será NavLink porque definimos 'to' en todos
                        const ContainerComponent = NavLink; 

                        return (
                            <ContainerComponent 
                                key={item.label} 
                                to={item.to} // Usamos la ruta definida
                                className="text-center group p-4 rounded-xl transition transform hover:scale-105 cursor-pointer"
                            >
                                <div className={`mx-auto w-16 h-16 flex items-center justify-center mb-3 rounded-full ${item.color} bg-indigo-50/70 group-hover:bg-indigo-100 transition`}>
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <p className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600">{item.label}</p>
                            </ContainerComponent>
                        );
                    })}
                </div>
            </section>

            {/* Banner de Alianza (Sin cambios) */}
            <div className="w-screen relative left-1/2 -translate-x-1/2 -mx-2">
                <section
                    className="text-white py-16 my-16 shadow-2xl bg-gray-800 bg-cover bg-center"
                    style={{
                        backgroundImage: allianceBannerUrl ? `url(${allianceBannerUrl})` : 'none',
                        backgroundBlendMode: allianceBannerUrl ? 'multiply' : 'none',
                        backgroundColor: allianceBannerUrl ? '' : 'rgb(55 65 81)',
                    }}
                >
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-extrabold mb-3">Alianza RH</h2>
                        <p className="text-gray-300 text-lg">
                            En colaboración con alianzas locales promovemos prácticas de reciclaje responsables: recolección, reutilización y disposición adecuada de consumibles electrónicos y cartuchos, reduciendo el impacto ambiental y fomentando la economía circular en nuestras comunidades.
                        </p>
                    </div>
                </section>
            </div>

            {/* Sección de Problemas (Usa NavLink) */}
            <section className="mt-16 mb-16">
                <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-10">¿Algún Problema?</h2>
                <div className="flex justify-center space-x-8 md:space-x-20">
                    {problemItems.map((item) => {
                        const IconComponent = item.icon;
                        // El componente siempre será NavLink porque definimos 'to' en todos
                        const ContainerComponent = NavLink; 
                        
                        return (
                            <ContainerComponent 
                                key={item.label} 
                                to={item.to} // Usamos la ruta definida
                                className="text-center group p-4 rounded-xl transition transform hover:scale-105 cursor-pointer"
                            >
                                <div className={`mx-auto w-16 h-16 flex items-center justify-center mb-3 rounded-full ${item.color} bg-red-50/70 group-hover:bg-red-100 transition`}>
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <p className="text-sm font-semibold text-gray-700 group-hover:text-red-600">{item.label}</p>
                            </ContainerComponent>
                        );
                    })}
                </div>
            </section>

            <SimpleCarousel />

            <section className="mt-20 mb-12 text-center">
                <p className="text-base text-gray-500 mb-6 font-medium">Celebrando un aniversario</p>
                <img
                    src={celebrationImageUrl}
                    alt="Celebración del 25 aniversario del equipo"
                    className="mx-auto w-full rounded-xl shadow-2xl border-4 border-gray-100 transition"
                    style={{ maxWidth: '800px', maxHeight: '400px', objectFit: 'cover' }}
                />
            </section>

            <div className="text-center text-xs text-gray-400 mt-12 mb-4 border-t pt-4">
                Impresoras, fotocopiadoras, Asesoría, Renta & Distribución — Ubicados en Colombia. Todos los derechos reservados.
            </div>
        </div>
    );
}

export default MainContent;