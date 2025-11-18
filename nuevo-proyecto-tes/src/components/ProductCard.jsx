// --- src/components/ProductCard.jsx ---
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

// Acepta onViewDetails como prop
function ProductCard({ product, onViewDetails }) { 
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200">
            
            {/* Contenedor de la Imagen */}
            <div className="h-48 w-full flex items-center justify-center p-4 bg-gray-50 border-b">
                <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/FCA5A5/FFF?text=DEV"; }}
                />
            </div>

            {/* Detalles del Producto */}
            <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-800 truncate mb-1" title={product.name}>
                    {product.name}
                </h3>
                <p className="text-sm text-indigo-600 font-medium mb-2">{product.brand}</p>
                <p className="text-2xl font-extrabold text-gray-900">
                    {formatPrice(product.price)}
                </p>
                {/* Botón que llama a onViewDetails, pasando el producto actual */}
                <button 
                    onClick={() => onViewDetails(product)} 
                    className="mt-3 w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition duration-150 shadow-md"
                >
                    Ver Detalles
                </button>
            </div>
        </div>
    );
}

export default ProductCard;