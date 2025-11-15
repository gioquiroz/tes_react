// import React from "react";
// import { Printer, ScrollText, Wrench, Headset, Briefcase } from 'lucide-react';
import RH from '../assets/OIP.jpg';
// import Cumple from '../assets/cumple.png';

// function MainContent() {
//     const serviceItems = [
//         { icon: Printer, label: "Renta de Equipos", color: "text-indigo-600", },
//         { icon: Briefcase, label: "Venta de Consumibles", color: "text-indigo-600" },
//         { icon: Headset, label: "Asesoría de Equipos", color: "text-indigo-600" },
//     ];

//     const problemItems = [
//         { icon: Headset, label: "Líneas de ayuda", color: "text-red-600" },
//         { icon: ScrollText, label: "Garantías", color: "text-red-600" },
//         { icon: Wrench, label: "Soporte Técnico", color: "text-red-600" },
//     ];

//     const allianceBannerUrl = RH;
//     const celebrationImageUrl = Cumple;

//     return (
//         <main className="max-w-7xl mx-auto p-4 pt-12">
//             <section className="mt-8 mb-16">
//                 <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">Servicios</h1>
//                 <div className="flex justify-center space-x-8 md:space-x-20">
//                     {serviceItems.map((item) => {
//                         const IconComponent = item.icon;
//                         return (
//                             <div key={item.label} className="text-center group p-4 rounded-xl transition transform hover:scale-105">
//                                 <div className={`mx-auto w-16 h-16 flex items-center justify-center mb-3 rounded-full ${item.color} bg-indigo-50/70 group-hover:bg-indigo-100 transition`}>
//                                     <IconComponent className="w-8 h-8" />
//                                 </div>
//                                 <p className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600">{item.label}</p>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </section>

//             <div className="w-screen relative left-1/2 -translate-x-1/2 -mx-2">
//                 <section
//                     className="text-white py-16 my-16 shadow-2xl bg-gray-800 bg-cover bg-center"
//                     style={{
//                         backgroundImage: allianceBannerUrl ? `url(${allianceBannerUrl})` : 'none',
//                         backgroundBlendMode: allianceBannerUrl ? 'multiply' : 'none',
//                         backgroundColor: allianceBannerUrl ? '' : 'rgb(55 65 81)',
//                     }}
//                 >
//                     <div className="max-w-7xl mx-auto px-4 text-center">
//                         <h2 className="text-4xl font-extrabold mb-3">Alianza RH</h2>
//                         <p className="text-gray-300 text-lg">
//                             En colaboración con alianzas locales promovemos prácticas de reciclaje responsables: recolección, reutilización y disposición adecuada de consumibles electrónicos y cartuchos, reduciendo el impacto ambiental y fomentando la economía circular en nuestras comunidades.
//                         </p>
//                     </div>
//                 </section>
//             </div>

//             <section className="mt-16 mb-16">
//                 <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-10">¿Algún Problema?</h2>
//                 <div className="flex justify-center space-x-8 md:space-x-20">
//                     {problemItems.map((item) => {
//                         const IconComponent = item.icon;
//                         return (
//                             <div key={item.label} className="text-center group p-4 rounded-xl transition transform hover:scale-105">
//                                 <div className={`mx-auto w-16 h-16 flex items-center justify-center mb-3 rounded-full ${item.color} bg-red-50/70 group-hover:bg-red-100 transition`}>
//                                     <IconComponent className="w-8 h-8" />
//                                 </div>
//                                 <p className="text-sm font-semibold text-gray-700 group-hover:text-red-600">{item.label}</p>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </section>

//             <section className="mt-20 mb-12 text-center">
//                 <p className="text-base text-gray-500 mb-6 font-medium">Celebrando un aniversario</p>
//                 <img
//                     src={celebrationImageUrl}
//                     alt="Celebración del 25 aniversario del equipo"
//                     className="mx-auto w-full rounded-xl shadow-2xl border-4 border-gray-100 transition"
//                     style={{ maxWidth: '800px', maxHeight: '400px', objectFit: 'cover' }}
//                 />
//             </section>

//             <div className="text-center text-xs text-gray-400 mt-12 mb-4 border-t pt-4">
//                 Impresoras, fotocopiadoras, Asesoría, Renta & Distribución — Ubicados en Colombia. Todos los derechos reservados.
//             </div>
//         </main>
//     );
// }

// export default MainContent;

import React from "react";
// Importamos los íconos de Lucide-React
import { Printer, ScrollText, Wrench, Headset, Briefcase, ChevronRight } from 'lucide-react';

// URL de las imágenes subidas para el banner y la celebración
// Usando los Content IDs de los archivos previamente cargados
const allianceBannerUrl = RH;
const celebrationImageUrl = "/fetch-content/uploaded:image_a630da.jpg-9198de36-c6eb-41b9-b1fc-1cdd38c1abcc";

// Componente auxiliar para Tarjetas Clickeables
const ClickableServiceItem = ({ Icon, label, color, onClick }) => (
    <button
        onClick={onClick}
        className="text-center group p-4 rounded-xl transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 cursor-pointer"
        aria-label={`Ver detalles de ${label}`}
    >
        <div className={`mx-auto w-16 h-16 flex items-center justify-center mb-3 rounded-full ${color} bg-indigo-50/70 group-hover:bg-indigo-100 transition shadow-md`}>
            <Icon className="w-8 h-8" />
        </div>
        <p className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 mt-1">{label}</p>
        <span className="text-xs text-blue-500 flex items-center justify-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Ver más <ChevronRight className="w-3 h-3 ml-1" />
        </span>
    </button>
);

// Componente auxiliar para Tarjetas Informativas (Problemas)
const InformativeProblemItem = ({ Icon, label, color }) => (
    <div className="text-center group p-4 rounded-xl transition transform hover:scale-105">
        <div className={`mx-auto w-16 h-16 flex items-center justify-center mb-3 rounded-full ${color} bg-red-50/70 group-hover:bg-red-100 transition shadow-md`}>
            <Icon className="w-8 h-8" />
        </div>
        <p className="text-sm font-semibold text-gray-700 group-hover:text-red-600">{label}</p>
    </div>
);


function MainContent({ onNavigate }) { // <--- Aseguramos que onNavigate sea recibido

    // Items para la sección "Servicios" (Clickables)
    const serviceItems = [
        { icon: Printer, label: "Renta de Equipos", color: "text-indigo-600", key: 'renta' },
        { icon: Briefcase, label: "Venta de Consumibles", color: "text-indigo-600", key: 'venta' },
        { icon: Headset, label: "Asesoría de Equipos", color: "text-indigo-600", key: 'asesoria' },
    ];

    // Items para la sección "¿Algún Problema?" (Informativas)
    const problemItems = [
        { icon: Headset, label: "Líneas de ayuda", color: "text-red-600" },
        { icon: ScrollText, label: "Garantías", color: "text-red-600" },
        { icon: Wrench, label: "Soporte Técnico", color: "text-red-600" },
    ];

    return (
        <main className="max-w-7xl mx-auto p-4 pt-12">

            {/* 1. Sección de Servicios - Ahora clickeable para navegación */}
            <section className="mt-8 mb-16">
                <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">Nuestros Servicios</h1>
                <div className="flex justify-center space-x-4 md:space-x-12 flex-wrap">
                    {serviceItems.map((item) => (
                        <ClickableServiceItem
                            key={item.label}
                            Icon={item.icon}
                            label={item.label}
                            color={item.color}
                            // Al hacer clic, navegamos a la página 'servicios'
                            onClick={() => onNavigate('servicios')}
                        />
                    ))}
                </div>
            </section>

            {/* 2. Sección de Alianza RH (Banner de ancho completo) */}
            <div className="w-screen relative left-1/2 -translate-x-1/2 -mx-2 ">
                <section
                    className="text-white py-16 my-16 shadow-2xl bg-gray-800 bg-center bg-cover"
                    style={{
                        backgroundImage: allianceBannerUrl ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${allianceBannerUrl})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: allianceBannerUrl ? '' : 'rgb(55 65 81)',
                        minHeight: '300px'
                    }}
                >
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-extrabold mb-3">Alianza RH</h2>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            En colaboración con alianzas locales promovemos prácticas de reciclaje responsables: recolección, reutilización y disposición adecuada de consumibles electrónicos y cartuchos, reduciendo el impacto ambiental y fomentando la economía circular en nuestras comunidades.
                        </p>
                        <button className="mt-6 px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition transform hover:scale-105">
                            Más información
                        </button>
                    </div>
                </section>
            </div>

            {/* 3. Sección de Problemas (Informativos) */}
            <section className="mt-16 mb-16">
                <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-10">¿Algún Problema?</h2>
                <div className="flex justify-center space-x-4 md:space-x-12 flex-wrap">
                    {problemItems.map((item) => (
                        <InformativeProblemItem
                            key={item.label}
                            Icon={item.icon}
                            label={item.label}
                            color={item.color}
                        />
                    ))}
                </div>
            </section>

            {/* 4. Sección de Celebración/Aniversario (Imagen) */}
            <section className="mt-20 mb-12 text-center">
                <p className="text-base text-gray-500 mb-6 font-medium">Celebrando un aniversario</p>
                <img
                    // Usamos la URL generada para la imagen
                    src={celebrationImageUrl}
                    alt="Celebración del aniversario del equipo"
                    // Establecer un tamaño de fallback en caso de que la imagen sea demasiado grande
                    className="mx-auto w-full rounded-xl shadow-2xl border-4 border-gray-100 transition object-cover"
                    style={{ maxWidth: '900px', height: '400px' }}
                    // Placeholder para accesibilidad si la imagen no carga
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/900x400/1e40af/ffffff?text=Imagen+de+Celebración+No+Disponible' }}
                />
            </section>

            <div className="text-center text-xs text-gray-400 mt-12 mb-4 border-t pt-4">
                Impresoras, fotocopiadoras, Asesoría, Renta & Distribución — Ubicados en Colombia. Todos los derechos reservados.
            </div>
        </main>
    );
}

export default MainContent;