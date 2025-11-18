import React from 'react';

// Datos de ejemplo para los productos en el carrito
const cartItems = [
  { id: 1, name: "Ricoh Sp 840DN", price: "100.000.000", imageUrl: "placeholder-copier-1.jpg" },
  { id: 2, name: "Ricoh Sp 840DN", price: "100.000.000", imageUrl: "placeholder-copier-2.jpg" },
];

// Componente individual para mostrar un item del carrito
const CartItem = ({ item }) => (
  <div className="border border-gray-300 shadow-sm p-4 flex flex-col justify-between w-full h-full">
    {/* Imagen del producto: Usaremos un placeholder para simular la imagen */}
    <div className="flex justify-center items-center h-48 bg-gray-50 mb-4">
      {/* Si tienes las imágenes reales, usa esto:
        <img src={item.imageUrl} alt={item.name} className="max-h-full max-w-full object-contain" />
      */}
      <span className="text-gray-400 text-sm">
        [Imagen de Copiadora]
      </span>
    </div>
    
    <div className="mt-auto">
      {/* Aseguramos que el texto 'Ricoh Sp 840DN' no sea bold, solo el precio, como en la imagen */}
      <p className="text-xl font-normal mb-1">{item.name}</p>
      {/* El precio tiene el formato de la imagen original */}
      <p className="text-xl font-bold text-gray-800">{item.price}</p>
    </div>
  </div>
);

// Componente principal del Carrito de Compras
const ShoppingCart = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans p-8"> {/* Fondo general de la página */}
      
      {/* Título "Carrito de Compras" fuera de la tarjeta blanca */}
      <h1 className="mt-20 text-3xl font-normal mb-8 container mx-auto px-6">Carrito de Compras</h1>

      {/* --- Contenedor Grande Blanco para el Carrito --- */}
      <div className="container mx-auto px-6 py-8 bg-white shadow-xl border border-gray-100">

        {/* Contenedor de los items del carrito */}
        <div className="flex flex-wrap gap-6 mb-16">
          {cartItems.map(item => (
            // Usamos un ancho fijo y máximo para replicar el espaciado
            <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[300px]"> 
              <CartItem item={item} />
            </div>
          ))}
        </div>

        {/* Navegación Inferior (Continuar Compra / Finalizar) */}
        <div className="flex justify-between items-center text-lg font-medium">
          {/* Seguir Comprando */}
          <a 
            href="#" 
            className="flex items-center text-gray-700 hover:text-red-600 transition duration-150"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
            Seguir Comprando
          </a>
          
          {/* Hacer Compra */}
          <a 
            href="#" 
            className="flex items-center text-gray-700 hover:text-red-600 transition duration-150"
          >
            Hacer Compra
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </a>
        </div>
      </div>
      {/* --- Fin del Contenedor Grande Blanco --- */}

    </div>
  );
};

export default ShoppingCart;