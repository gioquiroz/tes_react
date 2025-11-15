import React from "react";
import { Printer, ScrollText, Wrench, Headset, Briefcase, TrendingUp } from 'lucide-react'; 
import RH from '../assets/OIP.jpg';
import Cumple from '../assets/cumple.png';

function MainContent() {
    const serviceItems = [
        { icon: Printer, label: "Renta de Equipos", color: "text-indigo-600" },
        { icon: Briefcase, label: "Venta de Consumibles", color: "text-indigo-600" },
        { icon: Headset, label: "Asesoría de Equipos", color: "text-indigo-600" },
    ];

    const problemItems = [
        { icon: Headset, label: "Líneas de ayuda", color: "text-red-600" },
        { icon: ScrollText, label: "Garantías", color: "text-red-600" },
        { icon: Wrench, label: "Soporte Técnico", color: "text-red-600" },
    ];

    const allianceBannerUrl = RH; 

    const celebrationImageUrl = Cumple;

    return (
        <main className="max-w-7xl mx-auto p-4 pt-12"> 
            
            {/* 1. SECCIÓN DE SERVICIOS */}
            <section className="mt-8 mb-16">
                <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">Servicios</h1>
                <div className="flex justify-center space-x-8 md:space-x-20">
                    {serviceItems.map((item) => {
                        const IconComponent = item.icon; 
                        return (
                            <div key={item.label} className="text-center group p-4 rounded-xl transition duration-300 transform hover:scale-105">
                                <div className={`mx-auto w-16 h-16 flex items-center justify-center mb-3 rounded-full ${item.color} bg-indigo-50/70 group-hover:bg-indigo-100 transition duration-300`}>
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <p className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600">{item.label}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 2. SECCIÓN DE ALIANZA RH (Banner) */}
            <section 
                className={`text-white py-16 my-16 rounded-xl shadow-2xl bg-gray-800 bg-cover bg-center bg-fixed`}
                style={{ 
                    backgroundImage: allianceBannerUrl ? `url(${allianceBannerUrl})` : 'none', 
                    backgroundBlendMode: allianceBannerUrl ? 'multiply' : 'none',
                    backgroundColor: allianceBannerUrl ? '' : 'rgb(55 65 81)', 
                }}
            >
                <div className="text-center max-w-2xl mx-auto px-4">
                    <h2 className="text-4xl font-extrabold mb-3">Alianza RH</h2>
                    <p className="text-gray-300 text-lg">
                        Renta de equipos de calidad sin costos que nos permiten ser líderes en equipo. Soluciones integrales para tu oficina.
                    </p>
                </div>
            </section>

            {/* 3. SECCIÓN ¿ALGÚN PROBLEMA? */}
            <section className="mt-16 mb-16">
                <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-10">¿Algún Problema?</h2>
                <div className="flex justify-center space-x-8 md:space-x-20">
                    {problemItems.map((item) => {
                        const IconComponent = item.icon; 
                        return (
                            <div key={item.label} className="text-center group p-4 rounded-xl transition duration-300 transform hover:scale-105">
                                <div className={`mx-auto w-16 h-16 flex items-center justify-center mb-3 rounded-full ${item.color} bg-red-50/70 group-hover:bg-red-100 transition duration-300`}>
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <p className="text-sm font-semibold text-gray-700 group-hover:text-red-600">{item.label}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
            
            {/* 4. SECCIÓN DE CELEBRACIÓN */}
            <section className="mt-20 mb-12 text-center">
                <p className="text-base text-gray-500 mb-6 font-medium">Celebrando un aniversario</p>
                <img 
                    src={celebrationImageUrl} 
                    alt="Celebración del 25 aniversario del equipo" 
                    className="mx-auto w-full rounded-xl shadow-2xl border-4 border-gray-100 transition duration-500"
                    style={{maxWidth: '800px', maxHeight: '400px', objectFit: 'cover'}}
                />
            </section>

             <div className="text-center text-xs text-gray-400 mt-12 mb-4 border-t pt-4">
                Impresoras, fotocopiadoras, Asesoría, Renta, & Distribución, Ubicados en Colombia. Todos los derechos reservados.
            </div>

        </main>
    );
}

// Exportamos el componente para que pueda ser utilizado
export default MainContent;