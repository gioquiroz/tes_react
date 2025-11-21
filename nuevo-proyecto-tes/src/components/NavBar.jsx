import React, { useState, useEffect } from "react";
import { Menu, X, User, ShoppingCart, LogOut } from "lucide-react";
import logoTES from "../assets/logo-tes150.png";
import { NavLink } from "./NavbarElements";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [user, setUser] = useState(null);

    // Cargar usuario al iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    useEffect(() => {
        const handleUserUpdate = () => {
            const updatedUser = localStorage.getItem("user");
            setUser(updatedUser ? JSON.parse(updatedUser) : null);
        };

        window.addEventListener("userUpdated", handleUserUpdate);
        return () => window.removeEventListener("userUpdated", handleUserUpdate);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    {/* Logo */}
                    <div>
                        <img
                            src={logoTES}
                            alt="Logo TES"
                            className="h-16 w-auto object-contain"
                        />
                    </div>

                    {/* Links Desktop */}
                    <div className="hidden md:flex md:space-x-8 md:items-center">
                        <NavLink to="/">Inicio</NavLink>
                        <NavLink to="/tienda">Tienda</NavLink>
                    </div>

                    {/* Iconos */}
                    <div className="flex items-center space-x-4">

                        {/* Nombre del usuario */}
                        {user && (
                            <span className="text-gray-700 font-medium">
                                {user.nombre}
                            </span>
                        )}

                        {/* Ícono usuario */}
                        <div className="relative">
                            <button
                                onClick={() => setUserMenu(!userMenu)}
                                className="p-2 text-gray-600 hover:text-indigo-600 transition"
                            >
                                <User className="w-5 h-5" />
                            </button>

                            {userMenu && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-xl rounded-md z-20">
                                    {!user ? (
                                        <NavLink
                                            to="/login"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                        >
                                            Iniciar Sesión
                                        </NavLink>
                                    ) : (
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Cerrar sesión
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Carrito */}
                        <NavLink to="/carrito">
                            <ShoppingCart className="w-5 h-5" />
                        </NavLink>

                        {/* Menú categorías Desktop */}
                        <div className="hidden md:block relative">
                            <button
                                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                                className="p-2 text-gray-600 hover:text-indigo-600 transition"
                            >
                                {isCategoryMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>

                            {isCategoryMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md z-20">
                                    <div className="py-1">
                                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                                            Computo
                                        </a>
                                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                                            Software
                                        </a>
                                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                                            Pagos
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Menú móvil */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-gray-500 hover:text-indigo-600 p-2"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú móvil */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-50 border-t border-gray-200 pb-3 pt-2 space-y-1">
                    <a href="/" className="block px-3 py-2 text-base text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Inicio</a>
                    <a href="/tienda" className="block px-3 py-2 text-base text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Tienda</a>

                    <div className="border-t border-gray-200 mt-2 pt-2">
                        {!user ? (
                            <a href="/login" className="block px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                                Iniciar Sesión / Registro
                            </a>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                            >
                                <LogOut className="w-4 h-4" />
                                Cerrar sesión
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
