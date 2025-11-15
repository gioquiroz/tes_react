import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-16 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-sm">
                    
                    <div className="text-center md:text-left mb-4 md:mb-0 space-y-1">
                        <p className="text-gray-300 font-medium">CONTACTO@TESLTDA.COM</p>
                        <p className="text-gray-400">(57) 321 123 4567</p>
                    </div>

                    <div className="text-center md:text-right space-y-1">
                        <p className="text-gray-300 font-medium">Hecho por TES LTDA.</p>
                        <p className="text-gray-400">© 2025 Tes Ltda. Todos los derechos reservados.</p>
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default Footer;