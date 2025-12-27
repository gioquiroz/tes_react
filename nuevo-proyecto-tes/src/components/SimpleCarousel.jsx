// import React, { useState, useEffect } from "react";

// import SlideImg1 from "../assets/DSC_0003.webp";
// import SlideImg2 from "../assets/DSC_0013.jpg";
// import SlideImg3 from "../assets/DSC_0020.jpg";
// import SlideImg4 from "../assets/DSC_0031.jpg";
// import SlideImg5 from "../assets/DSC_0037.jpg";
// import SlideImg6 from "../assets/DSC_0058.jpg";
// import SlideImg7 from "../assets/DSC_0063.jpg";
// import SlideImg8 from "../assets/DSC_0070.jpg";
// import SlideImg9 from "../assets/DSC_0076.jpg";

// const images = [
//   { src: SlideImg1, name: "Julio", cargo: "Mensajero" },
//   { src: SlideImg2, name: "Diana Gutierrez", cargo: "Coordinadora de Servicio" },
//   { src: SlideImg3, name: "Paula", cargo: "Comercial" },
//   { src: SlideImg4, name: "Luis Gonzaga", cargo: "Almacenista" },
//   { src: SlideImg5, name: "Edward Velasquez", cargo: "Supervisor Tecnico" },
//   { src: SlideImg6, name: "Sandra Franco", cargo: "Contadora" },
//   { src: SlideImg7, name: "Luis Sepulveda", cargo: "Gerente Tecnico" },
//   { src: SlideImg8, name: "Patricia", cargo: "Comercial" },
//   { src: SlideImg9, name: "Jesus Rendon", cargo: "Gerente General" },
// ];

// export default function SimpleCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const next = () => {
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//   };

//   const prev = () => {
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   useEffect(() => {
//     const auto = setInterval(() => next(), 3000);
//     return () => clearInterval(auto);
//   }, []);

//   return (
//     <div className="max-w-5xl w-full mx-auto p-4 md:p-6 mb-">
//       <div className="relative flex items-center justify-center gap-6">

//         {/* BOTÓN IZQUIERDO */}
//         <button
//           onClick={prev}
//           className="absolute left-[12%] top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full shadow-lg backdrop-blur-sm z-30"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-900" fill="none"
//             viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
//           </svg>
//         </button>

//         {/* CARRUSEL */}
//         {[-3, -2, -1, 0, 1, 2, 3].map((offset) => {
//           const imgIndex = (currentIndex + offset + images.length) % images.length;

//           const sizeClass =
//             Math.abs(offset) === 3
//               ? "w-[125px] h-[300px]"
//               : Math.abs(offset) === 2
//               ? "w-[150px] h-[350px]"
//               : Math.abs(offset) === 1
//               ? "w-[200px] h-[400px]"
//               : "w-[250px] h-[450px] shadow-2xl z-20";

//           return (
//             <div
//               key={offset}
//               className={`${sizeClass} rounded-xl overflow-hidden flex-shrink-0 transition-all duration-500 bg-gray-200 relative`}
//             >
//               {/* Imagen */}
//               <div
//                 className="w-full h-full bg-cover bg-center"
//                 style={{ backgroundImage: `url(${images[imgIndex].src})` }}
//               />

//               {/* Nombre visible para TODAS las imágenes */}
//               <div
//                 className={`absolute bottom-0 w-full backdrop-blur-md bg-black/40 text-white text-center py-2 font-semibold transition-all duration-500
//                 ${offset === 0 ? "text-lg" : "text-sm opacity-80"}`}
//               >
//                 {images[imgIndex].name}
//                 <br />
//                 <div className="text-xs font-normal">
//                   {images[imgIndex].cargo}
//                 </div>  
//               </div>
//             </div>
//           );
//         })}

//         {/* BOTÓN DERECHO */}
//         <button
//           onClick={next}
//           className="absolute right-[12%] top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full shadow-lg backdrop-blur-sm z-30"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-900" fill="none"
//             viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

import SlideImg1 from "../assets/DSC_0003.webp";
import SlideImg2 from "../assets/DSC_0013.jpg";
import SlideImg3 from "../assets/DSC_0020.jpg";
import SlideImg4 from "../assets/DSC_0031.jpg";
import SlideImg5 from "../assets/DSC_0037.jpg";
import SlideImg6 from "../assets/DSC_0058.jpg";
import SlideImg7 from "../assets/DSC_0063.jpg";
import SlideImg8 from "../assets/DSC_0070.jpg";
import SlideImg9 from "../assets/DSC_0076.jpg";

const grupos = [
  {
    name: "Equipo Tes", 
    members: [
      { src: SlideImg1, name: "Julio", cargo: "Mensajero" }, 
      { src: SlideImg2, name: "Diana", cargo: "Coordinador de Tecnicos" }, 
      { src: SlideImg3, name: "Paula", cargo: "Comercial" }, 
      { src: SlideImg7, name: "Luis Sepulveda", cargo: "Gerente General" },
      { src: SlideImg4, name: "Luis Gonzaga", cargo: "Almacenista" },
      { src: SlideImg5, name: "Edward Velasquez", cargo: "Supervidor Tecnico" },
      { src: SlideImg6, name: "Sandra Franco", cargo: "Contadora" },
    ],
  },
  {
    name: "Equipo Tes", 
    members: [
      { src: SlideImg7, name: "Luis Sepulveda", cargo: "Gerente General" },
      { src: SlideImg6, name: "Sandra Franco", cargo: "Contadora" },
      { src: SlideImg3, name: "Paula", cargo: "Comercial" }, 
      { src: SlideImg4, name: "Luis Gonzaga", cargo: "Almacenista" },
      { src: SlideImg1, name: "Julio", cargo: "Mensajero" }, 
      { src: SlideImg2, name: "Diana", cargo: "Coordinador de Tecnicos" }, 
      { src: SlideImg5, name: "Edward Velasquez", cargo: "Supervidor Tecnico" },
    ],
  },
  {
    name: "Equipo Tes", 
    members: [
      { src: SlideImg6, name: "Sandra Franco", cargo: "Contadora" },
      { src: SlideImg7, name: "Luis Sepulveda", cargo: "Gerente General" },
      { src: SlideImg1, name: "Julio", cargo: "Mensajero" }, 
      { src: SlideImg2, name: "Diana", cargo: "Coordinador de Tecnicos" }, 
      { src: SlideImg3, name: "Paula", cargo: "Comercial" }, 
      { src: SlideImg4, name: "Luis Gonzaga", cargo: "Almacenista" },
      { src: SlideImg5, name: "Edward Velasquez", cargo: "Supervidor Tecnico" },
    ],
  },
];

const TARGET_SIZE = 7;

const processedGroups = grupos.map((group) => {
  const filledMembers = [...group.members];
  const numExisting = filledMembers.length;

  for (let i = numExisting; i < TARGET_SIZE; i++) {
    const memberToRepeat = filledMembers[i % numExisting];
    filledMembers.push({
      ...memberToRepeat,
    });
  }
  const membersWithOffsets = filledMembers.slice(0, TARGET_SIZE).map((member, index) => {
    const offset = index - 3; 

    return {
      ...member,
      offset: offset,
    };
  });

  return {
    ...group,
    members: membersWithOffsets
  };
});


export default function SimpleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % processedGroups.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + processedGroups.length) % processedGroups.length);
  };

  useEffect(() => {
    const auto = setInterval(() => next(), 3000);
    return () => clearInterval(auto);
  }, []);

  const currentGroup = processedGroups[currentIndex];

  return (
    <div className="max-w-7xl w-full mx-auto p-4 md:p-6 mb-12">
      
      <h2 className="text-center text-4xl font-extrabold mb-10 text-gray-800 tracking-tight">
        {currentGroup.name}
      </h2>
      
      {/* CONTENEDOR DE GRUPO */}
      <div className="relative flex items-center justify-center min-h-[500px] gap-4">

        {/*  BOTÓN IZQUIERDO */}
        <button
          onClick={prev}
          className="absolute left-[5%] top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full shadow-lg backdrop-blur-sm z-30 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-900" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        {currentGroup.members.map((member) => {
          const offset = member.offset;
          
          const sizeClass =
            Math.abs(offset) === 3
              ? "w-[125px] h-[300px]" 
              : Math.abs(offset) === 2
              ? "w-[150px] h-[350px]" 
              : Math.abs(offset) === 1
              ? "w-[200px] h-[400px]" 
              : "w-[250px] h-[450px] shadow-2xl z-20"; 
          const positionClass = 'mx-0'; 

          return (
            <div
              key={member.offset} 
              className={`${sizeClass} ${positionClass} rounded-xl overflow-hidden flex-shrink-0 transition-all duration-500 ease-in-out bg-gray-200 relative`}
              style={{ zIndex: 10 - Math.abs(offset) }}
            >
              {/* Imagen */}
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${member.src})` }}
              />

              {/* Nombre y Cargo */}
              <div
                className={`absolute bottom-0 w-full backdrop-blur-md bg-black/40 text-white text-center py-2 font-semibold transition-all duration-500
                ${offset === 0 ? "text-lg py-3" : "text-sm opacity-80 py-1"}`}
              >
                {member.name}
                <br />
                <div className="text-xs font-normal">
                  {member.cargo}
                </div>
              </div>
            </div>
          );
        })}

        {/*  BOTÓN DERECHO */}
        <button
          onClick={next}
          className="absolute right-[5%] top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full shadow-lg backdrop-blur-sm z-30 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-900" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}