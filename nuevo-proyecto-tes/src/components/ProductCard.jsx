import React from 'react';

// Formatea el precio a moneda colombiana (COP) para un mejor ejemplo
const formatPrice = (price) => {
    return price.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
};

function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
            
            {/* Contenedor de la Imagen */}
            <div className="h-48 w-full flex items-center justify-center p-4 bg-gray-50">
                <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            {/* Detalles del Producto */}
            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                    {product.name}
                </h3>
                <p className="text-xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                </p>
                {/* Opcional: Puedes añadir un botón o un enlace aquí */}
            </div>
        </div>
    );
}

export default ProductCard;