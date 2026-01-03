import React from 'react';

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      
      {/* IMAGEN */}
      <div className="p-4 bg-gray-50 flex justify-center items-center h-40">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/150x150/5B21B6/FFFFFF?text=SIN+IMAGEN"; 
          }}
        />
      </div>
      
      {/* CONTENIDO */}
      <div className="p-5 flex flex-col flex-grow">
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex-grow">
          {product.name}
        </h3>
        
        <p className="text-sm text-indigo-600 mb-3">
          {product.brand}
        </p>
        
        {/* PRECIO */}
        <p className={`text-2xl font-bold mb-6 ${
          product.hasPriceData ? 'text-indigo-600' : 'text-gray-400'
        }`}>
          {product.priceFormatted}
        </p>
        
        {/* BOTÓN */}
        <button
          onClick={() => onViewDetails(product)}
          className="mt-auto w-full py-2 bg-indigo-500 text-white font-medium rounded-lg text-lg hover:bg-indigo-600 transition duration-200 shadow-md transform hover:scale-[1.01]"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
