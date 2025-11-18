import React, { useState } from "react";
import { Menu, X, User, ShoppingCart } from 'lucide-react'; 
import logoTES from '../assets/logo-tes150.png';
import { NavLink } from "./NavbarElements";


function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

    return (
        <div>
            <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">

                        <div>
                            <img src={logoTES} alt="Logo TES" className="h-16 w-auto object-contain" />
                        </div>

                        <div className="hidden md:flex md:space-x-8 md:items-center">
                            <NavLink to="/" activeStyle>
                                Inicio
                            </NavLink>
                        </div>

                        <div className="flex items-center space-x-4">
                            
                            <a href="./inicio_sesion.html" className="text-gray-500 hover:text-indigo-600 transition duration-150">
                                <User className="w-5 h-5" />
                            </a>


                            <a href="./carrito.html" className="text-gray-500 hover:text-indigo-600 transition duration-150">
                                <ShoppingCart className="w-5 h-5" />
                            </a>

                            {/* Menú de Categorías (Dropdown) - Desktop y Tablet */}
                            <div className="hidden md:block relative">
                                <button 
                                    onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                                    className="inline-flex justify-center rounded-md text-gray-600 hover:text-indigo-600 p-2 text-sm font-medium focus:outline-none transition duration-150"
                                >
                                    {isCategoryMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>

                                {/* Panel del menú desplegable */}
                                {isCategoryMenuOpen && (
                                    <div 
                                        className="absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-20 origin-top-right transform transition ease-out duration-200"
                                        style={{ transform: 'scale(1)', opacity: 1 }}
                                    >
                                        <div className="py-1" role="menu" aria-orientation="vertical">
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150" role="menuitem">Computo</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150" role="menuitem">Software</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150" role="menuitem">Pagos</a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Botón de Menú Móvil */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 rounded-md p-2 transition duration-150"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>

                        </div>
                    </div> 
                </div> 

                {isMenuOpen && (
                    <div className="md:hidden pb-3 pt-2 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
                        <a href="./index.html" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150">Inicio</a>
                        <a href="./tienda.html" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150">Tienda</a>
                        <a href="./impresoras.html" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150">Impresoras</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150">Fotocopiadoras</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150">Escanéres</a>
                        <div className="border-t border-gray-200 mt-2 pt-2">
                            <a href="./inicio_sesion.html" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150">
                                Iniciar Sesión / Registro
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default App;

// import React, { useState } from "react";
// import { Menu, X, User, ShoppingCart, ChevronDown, Printer, Copy, Scan } from 'lucide-react'; 
// import logoTES from '../assets/logo-tes150.png';


// function NavBar() {
//     // Estado para simular qué enlace está "activo" (es necesario para el resaltado CSS)
//     const [page, setPage] = useState('inicio'); 
    
//     // Estados para controlar la visibilidad de los menús
//     const [isMenuOpen, setIsMenuOpen] = useState(false); // Menú móvil
//     const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false); // Dropdown de categorías

//     // Función unificada para manejar la navegación (simplemente actualiza el estado 'page')
//     // Nota: En una aplicación real, esta función usaría un router (como React Router).
//     const handleNavigate = (targetPage) => {
//         setPage(targetPage);
//         setIsMenuOpen(false); // Cierra el menú móvil
//         setIsCategoryMenuOpen(false); // Cierra el menú de categorías
//     };

//     // Clases dinámicas para resaltar el enlace activo en la navegación Desktop
//     const linkClasses = (targetPage) => 
//         `px-3 py-2 rounded-md text-sm font-medium transition duration-150 border-b-2 border-transparent ${
//             page === targetPage ? 'text-indigo-600 border-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600 hover:border-indigo-300'
//         }`;
    
//     // Clases dinámicas para el menú móvil
//     const mobileLinkClasses = (targetPage) => 
//         `block px-3 py-2 rounded-md text-base font-medium transition duration-150 text-left w-full ${
//             page === targetPage ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
//         }`;
        
//     return (
//         // Se envuelve solo la barra de navegación
//         <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between h-16">

//                     {/* Logo */}
//                     <div className="flex-shrink-0 flex items-center">
//                         <button onClick={() => handleNavigate('inicio')} className="focus:outline-none">
//                             <img 
//                                 src={logoTES} 
//                                 alt="Logo TES" 
//                                 className="h-16 w-auto object-contain cursor-pointer py-1"
//                             />
//                         </button>
//                     </div>

//                     {/* Links de Navegación (Desktop) */}
//                     <div className="hidden md:flex md:space-x-8 md:items-center">
//                         <button 
//                             onClick={() => handleNavigate('inicio')} 
//                             className={linkClasses('inicio')}
//                         >
//                             Inicio
//                         </button>
//                         <button 
//                             onClick={() => handleNavigate('tienda')} 
//                             className={linkClasses('tienda')}
//                         >
//                             Tienda
//                         </button>
//                          <button 
//                             onClick={() => handleNavigate('servicios')} 
//                             className={linkClasses('servicios')}
//                         >
//                             Servicios
//                         </button>
//                     </div>

//                     {/* Íconos y Menús */}
//                     <div className="flex items-center space-x-4">
                        
//                         {/* Iniciar Sesión/Usuario */}
//                         <button 
//                             onClick={() => handleNavigate('login')} 
//                             className="text-gray-500 hover:text-indigo-600 transition duration-150 p-2 rounded-full hover:bg-gray-100" 
//                             aria-label="Iniciar Sesión"
//                         >
//                             <User className="w-5 h-5" />
//                         </button>

//                         {/* Carrito de Compras */}
//                         <button 
//                             onClick={() => handleNavigate('carrito')} 
//                             className="text-gray-500 hover:text-indigo-600 transition duration-150 p-2 rounded-full hover:bg-gray-100 relative" 
//                             aria-label="Carrito de Compras"
//                         >
//                             <ShoppingCart className="w-5 h-5" />
//                             {/* Indicador de items (ejemplo) */}
//                             <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center p-0.5 pointer-events-none"></span>
//                         </button>

//                         {/* Menú de Categorías (Dropdown) - Desktop y Tablet */}
//                         <div className="hidden md:block relative">
//                             <button 
//                                 onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
//                                 className="inline-flex items-center justify-center rounded-md text-gray-600 hover:text-indigo-600 p-2 text-sm font-medium focus:outline-none transition duration-150"
//                                 aria-expanded={isCategoryMenuOpen}
//                                 aria-label="Menú de Categorías"
//                             >
//                                 Categorías <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
//                             </button>

//                             {/* Panel del menú desplegable */}
//                             {isCategoryMenuOpen && (
//                                 <div 
//                                     className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-20 origin-top-right animate-in fade-in slide-in-from-top-1"
//                                 >
//                                     <div className="py-1" role="menu" aria-orientation="vertical">
//                                         <button onClick={() => handleNavigate('impresoras')} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150" role="menuitem">
//                                             <Printer className="w-4 h-4 mr-2" /> Impresoras
//                                         </button>
//                                         <button onClick={() => handleNavigate('fotocopiadoras')} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150" role="menuitem">
//                                             <Copy className="w-4 h-4 mr-2" /> Fotocopiadoras
//                                         </button>
//                                         <button onClick={() => handleNavigate('escaneres')} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150" role="menuitem">
//                                             <Scan className="w-4 h-4 mr-2" /> Escanéres
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Botón de Menú Móvil */}
//                         <button
//                             onClick={() => setIsMenuOpen(!isMenuOpen)}
//                             className="md:hidden text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 rounded-md p-2 transition duration-150"
//                             aria-expanded={isMenuOpen}
//                             aria-label="Menú principal"
//                         >
//                             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//                         </button>

//                     </div>
//                 </div> 
//             </div> 

//             {/* Menú Móvil Desplegado */}
//             {isMenuOpen && (
//                 <div className="md:hidden pb-3 pt-2 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200 animate-in slide-in-from-top-4">
//                     <button onClick={() => handleNavigate('inicio')} className={mobileLinkClasses('inicio')}>Inicio</button>
//                     <button onClick={() => handleNavigate('tienda')} className={mobileLinkClasses('tienda')}>Tienda</button>
//                     <button onClick={() => handleNavigate('servicios')} className={mobileLinkClasses('servicios')}>Servicios</button>
                    
//                     {/* Categorías Móviles */}
//                     <div className="px-3 py-1 text-sm font-semibold text-gray-500 mt-2 border-t border-gray-200 pt-2">Categorías</div>
//                     <button onClick={() => handleNavigate('impresoras')} className={mobileLinkClasses('impresoras')}>Impresoras</button>
//                     <button onClick={() => handleNavigate('fotocopiadoras')} className={mobileLinkClasses('fotocopiadoras')}>Fotocopiadoras</button>
//                     <button onClick={() => handleNavigate('escaneres')} className={mobileLinkClasses('escaneres')}>Escanéres</button>

//                     <div className="border-t border-gray-200 mt-2 pt-2">
//                         <button onClick={() => handleNavigate('login')} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150 w-full text-left">
//                             Iniciar Sesión / Registro
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// }

// export default NavBar;  