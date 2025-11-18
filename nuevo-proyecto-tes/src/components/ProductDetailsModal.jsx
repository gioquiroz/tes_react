// --- src/components/ProductDetailsModal.jsx ---

import React from 'react';

// Formatea el precio a moneda local (ajusta si es necesario)
const formatPrice = (price) => {
    if (typeof price !== 'number') return 'Precio N/D'; 
    return price.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
};

// **1. Recibir onAddToCart en las props**
function ProductDetailsModal({ product, onClose, onAddToCart }) {
    if (!product) return null; 

    const extraDetails = [
        { label: 'Marca', value: product.brand },
        { label: 'Tipo', value: product.tipo || 'N/A' },
        { label: 'Color', value: product.color || 'N/A' },
        { label: 'Velocidad (PPM)', value: product.velocidad || 'N/A' },
        { label: 'Funcionalidad', value: product.funcionalidad || 'N/A' },
        { label: 'Conectividad', value: product.conectividad || 'N/A' },
        { label: 'ADF', value: product.adf || 'N/A' },
    ].filter(detail => detail.value !== 'N/A'); 
    
    const handleAddToCartClick = () => {
        if (onAddToCart) {
            onAddToCart(product);
        }
        onClose(); 
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-start p-6 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-3xl font-extrabold text-indigo-700">
                        Detalles del Producto
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="sm:w-1/3 flex-shrink-0">
                            <img 
                                src={product.image_url} 
                                alt={product.name} 
                                className="w-full h-auto object-contain rounded-lg border p-2 shadow-md"
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/FCA5A5/FFF?text=DEV"; }}
                            />
                        </div>

                        <div className="sm:w-2/3">
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-4xl font-extrabold text-indigo-600 mb-4">
                                {formatPrice(product.price)}
                            </p>
                            
                            <p className="text-gray-700 mb-4 italic">
                                Información simulada.
                            </p>

                            <div className="grid grid-cols-2 gap-3 mt-4">
                                {extraDetails.map(detail => (
                                    <div key={detail.label}>
                                        <p className="text-sm font-semibold text-gray-500">{detail.label}</p>
                                        <p className="text-base font-medium text-gray-800">{detail.value}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <button 
                                onClick={handleAddToCartClick}
                                className="w-full mt-6 py-3 bg-indigo-600 text-white font-bold rounded-lg text-lg hover:bg-indigo-700 transition duration-200 shadow-xl"
                            >
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsModal;