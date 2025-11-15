import React, { useState } from "react";
import { Menu, X, User, ShoppingCart } from 'lucide-react'; 
import logoTES from '../assets/logo-tes150.png';

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
                            <a href="./index.html"
                                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150">Inicio</a>
                            <a href="./tienda.html"
                                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150">Tienda</a>
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