// --- src/pages/ShopPage.jsx (COMPLETO con Blur Condicional) ---

import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard.jsx'; 
import ProductDetailsModal from '../components/ProductDetailsModal.jsx';
import shopDataConfig from '../data/ShopData.js'; 
import RICOH from '../assets/RICOH.jpg'
import impresora from '../assets/fotocopiadora.webp'
import escaner from '../assets/escaner.jpg'

// Función auxiliar: Inicializa el estado de los filtros
const initializeFilters = (data) => {
    const filters = {};
    Object.keys(data.filters).forEach(filterName => {
        filters[filterName] = []; 
    });
    return filters;
};

// Función auxiliar: Adapta los datos genéricos de la API a la estructura de producto
const mapToProductStructure = (data, category) => {
    // Simula los campos de producto usando data de la API (JSONPlaceholder)
    const config = shopDataConfig[category];
    const brands = config.filters["Marcas"] || ['Genérica'];
    const prices = [500000, 1250000, 1800000, 2400000, 3100000];
    const imagePlaceholders = [
        RICOH,
        impresora,
        escaner
    ];

    return data.map((item, index) => {
        
        const baseProduct = {
            id: item.id,
            // Usamos item.title de la API como nombre
            name: item.title.substring(0, 30) + (item.title.length > 30 ? '...' : ''), 
            price: prices[index % prices.length],
            brand: brands[index % brands.length],
            image_url: imagePlaceholders[index % imagePlaceholders.length],
        };
        
        // Asignación de valores simulados para que los filtros funcionen:
        if (category === 'Impresoras') {
            baseProduct.tipo = config.filters["Tipo"][index % config.filters["Tipo"].length];
            baseProduct.color = config.filters["Color"][index % config.filters["Color"].length];
        } else if (category === 'Fotocopiadoras') {
            baseProduct.velocidad = config.filters["Velocidad (PPM)"][index % config.filters["Velocidad (PPM)"].length];
            baseProduct.funcionalidad = config.filters["Funcionalidad"][index % config.filters["Funcionalidad"].length];
        } else if (category === 'Escaneres') {
            baseProduct.conectividad = config.filters["Conectividad"][index % config.filters["Conectividad"].length];
            baseProduct.adf = config.filters["ADF"][index % config.filters["ADF"].length];
        }
        
        return baseProduct;
    }).slice(0, 20); // Limitamos a 20 productos de ejemplo
};


function ShopPage() {
    // ESTADOS DE DATOS Y CARGA
    const [activeCategory, setActiveCategory] = useState('Impresoras');
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // ESTADOS DE FILTRO
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({}); 
    
    // ESTADOS DE MODAL
    const [selectedProduct, setSelectedProduct] = useState(null); 
    
    // Obtener la configuración de la categoría activa
    const categoryConfig = shopDataConfig[activeCategory];
    const categoryFilterNames = Object.keys(categoryConfig.filters);
    
    
    // ------------------------------------
    // useEffect: LLAMADA A LA API
    // ------------------------------------

    useEffect(() => {
        const fetchProducts = async () => {
            const apiEndpoint = categoryConfig.apiEndpoint;
            
            // 1. Resetear estados al iniciar la carga
            setIsLoading(true); 
            setError(null);    
            setAllProducts([]); 
            setFilters(initializeFilters(categoryConfig)); // Limpiar filtros

            try {
                // 2. Realizar la llamada HTTP
                const response = await fetch(apiEndpoint);
                
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: Fallo al cargar los datos.`);
                }
                
                const data = await response.json();
                
                // 3. Mapear y guardar los datos
                const mappedData = mapToProductStructure(data, activeCategory);
                setAllProducts(mappedData); 
                
            } catch (err) {
                console.error("Error al cargar productos:", err);
                setError(`Hubo un problema al conectar con la tienda. Intenta recargar o verificar el endpoint.`);
            } finally {
                // 4. Finalizar la carga
                setIsLoading(false); 
            }
        };

        fetchProducts();

    }, [activeCategory]);
    
    // ------------------------------------
    // MANEJADORES DE EVENTOS Y MODAL
    // ------------------------------------

    const handleCategoryChange = (newCategory) => {
        setActiveCategory(newCategory);
        setSearchTerm('');
        setSelectedProduct(null); 
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => {
            const currentValues = prevFilters[filterName] || [];
            let newValues;
            
            if (currentValues.includes(value)) {
                newValues = currentValues.filter(v => v !== value);
            } else {
                newValues = [...currentValues, value];
            }
            
            return {
                ...prevFilters,
                [filterName]: newValues
            };
        });
    };
    
    const handleViewDetails = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };
    
    // ------------------------------------
    // LÓGICA DE FILTRADO (useMemo)
    // ------------------------------------
    const filteredProducts = useMemo(() => {
        if (isLoading) return []; // No filtrar si aún está cargando

        return allProducts.filter(product => {
            // 1. Filtrar por BÚSQUEDA
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            if (!matchesSearch) return false;

            // 2. Filtrar por TODOS los FILTROS DINÁMICOS
            const matchesFilters = categoryFilterNames.every(filterName => {
                const selectedValues = filters[filterName] || [];
                if (selectedValues.length === 0) return true;

                // Mapeo de nombres de filtros a claves de producto
                let productKey;
                if (filterName === 'Marcas') productKey = 'brand';
                else if (filterName === 'Tipo') productKey = 'tipo';
                else if (filterName === 'Color') productKey = 'color';
                else if (filterName.includes('Velocidad')) productKey = 'velocidad';
                else if (filterName.includes('Funcionalidad')) productKey = 'funcionalidad';
                else if (filterName.includes('Conectividad')) productKey = 'conectividad';
                else if (filterName === 'ADF') productKey = 'adf';
                else productKey = filterName.toLowerCase().split(' ')[0]; // Fallback

                const productValue = product[productKey];
                
                if (!productValue) return true; 
                
                return selectedValues.some(val => 
                    String(productValue).toLowerCase() === String(val).toLowerCase()
                );
            });

            return matchesFilters;
        });
    }, [searchTerm, filters, allProducts, categoryFilterNames, isLoading]);


    // ------------------------------------
    // RENDERIZADO
    // ------------------------------------
    return (
        <div className="max-w-7xl mx-auto pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 font-sans">
            
            {/* ESTO NO SE BORROSEA (EL HEADER) */}
            <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Catálogo de {categoryConfig.title} 
            </h1>

            {/* CONTENIDO PRINCIPAL: Se aplica el blur condicional */}
            <div 
                className={`transition duration-300 ${selectedProduct ? 'blur-sm pointer-events-none' : ''}`}
            >
                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* COLUMNA DE FILTROS (IZQUIERDA) */}
                    <aside className="w-full md:w-64">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                            
                            {/* 1. Selección de Categoría */}
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 text-indigo-600">
                                Secciones
                            </h2>
                            <div className="mb-6 flex flex-col space-y-2">
                                {Object.keys(shopDataConfig).map(category => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors transform hover:scale-[1.02] ${
                                            activeCategory === category
                                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-300'
                                                : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            
                            {/* 2. Filtros Dinámicos */}
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-t pt-4 text-indigo-600">
                                Filtros
                            </h2>
                            
                            {categoryFilterNames.map(filterName => (
                                <div key={filterName} className="mb-6 border-b pb-3 last:border-b-0">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-700">{filterName}</h3>
                                    {categoryConfig.filters[filterName].map(value => (
                                        <label key={value} className="flex items-center space-x-2 text-gray-600 mb-1 cursor-pointer hover:text-indigo-600 transition-colors">
                                            <input 
                                                type="checkbox" 
                                                name={filterName} 
                                                value={value} 
                                                checked={filters[filterName]?.includes(value) || false}
                                                onChange={() => handleFilterChange(filterName, value)}
                                                className="form-checkbox text-indigo-600 rounded focus:ring-indigo-500 h-4 w-4" 
                                            />
                                            <span>{value}</span>
                                        </label>
                                    ))}
                                </div>
                            ))}
                            
                        </div>
                    </aside>

                    {/* COLUMNA DE PRODUCTOS (DERECHA) */}
                    <main className="flex-grow">
                        
                        {/* Barra de Búsqueda */}
                        <div className="mb-6">
                            <input 
                                type="text" 
                                placeholder={`Buscar ${categoryConfig.title} por nombre...`} 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-shadow"
                            />
                        </div>
                        
                        {/* Mensajes de Estado: Carga o Error */}
                        {isLoading && (
                            <div className="p-10 text-center text-indigo-600 bg-white rounded-xl shadow-lg">
                                <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <p className="text-xl font-semibold">Cargando productos de {categoryConfig.title} desde la API...</p>
                            </div>
                        )}
                        
                        {error && (
                            <div className="p-10 text-center bg-red-100 border border-red-400 text-red-700 rounded-xl shadow-lg">
                                <p className="text-xl font-semibold">Error de Conexión</p>
                                <p className="mt-2 text-sm">{error}</p>
                            </div>
                        )}
                        
                        {/* Contenido de Productos (Solo si no está cargando y no hay error) */}
                        {!isLoading && !error && (
                            <>
                                {/* GRID DE PRODUCTOS */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard 
                                            key={product.id} 
                                            product={product} 
                                            onViewDetails={handleViewDetails}
                                        />
                                    ))}
                                </div>

                                {/* Manejo de la Paginación/Conteo */}
                                <div className="mt-8 text-center">
                                    {filteredProducts.length > 0 ? (
                                        <p className="text-gray-500">Mostrando {filteredProducts.length} de {allProducts.length} productos en {categoryConfig.title}</p>
                                    ) : (
                                        <p className="text-2xl font-bold text-gray-700 p-8 bg-white rounded-xl shadow-lg">
                                            No se encontraron productos con esos filtros.
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                    </main>
                </div>
            </div>
            
            {/* MODAL DE DETALLES DEL PRODUCTO (SIN BACKDROP-BLUR) */}
            <ProductDetailsModal 
                product={selectedProduct} 
                onClose={handleCloseModal} 
            />
        </div>
    );
}

export default ShopPage;


// import React, { useState, useEffect, useMemo } from 'react';

// // =================================================================
// // 1. CONFIGURACIÓN DE DATOS SIMULADOS (ShopData.js)
// // =================================================================

// const ShopDataConfig = {
//     'Impresoras': {
//         title: 'Impresoras Multifuncionales',
//         apiEndpoint: 'https://jsonplaceholder.typicode.com/posts?_limit=20', // Endpoint de prueba
//         filters: {
//             'Marcas': ['Ricoh', 'Canon', 'Epson', 'HP'],
//             'Tipo': ['Inyección de Tinta', 'Láser', 'Térmica'],
//             'Color': ['Blanco', 'Negro', 'Gris'],
//         }
//     },
//     'Fotocopiadoras': {
//         title: 'Fotocopiadoras de Alto Rendimiento',
//         apiEndpoint: 'https://jsonplaceholder.typicode.com/comments?_limit=20', // Endpoint de prueba
//         filters: {
//             'Marcas': ['Ricoh', 'Xerox', 'Kyocera'],
//             'Velocidad (PPM)': ['30-40', '40-60', '60+'],
//             'Funcionalidad': ['Copiar/Imprimir', 'Copia/Impr/Escáner'],
//         }
//     },
//     'Escaneres': {
//         title: 'Escáneres Profesionales',
//         apiEndpoint: 'https://jsonplaceholder.typicode.com/todos?_limit=20', // Endpoint de prueba
//         filters: {
//             'Marcas': ['Fujitsu', 'Brother', 'HP'],
//             'Conectividad': ['USB', 'Ethernet', 'Wi-Fi'],
//             'ADF': ['Sí', 'No'],
//         }
//     }
// };

// // =================================================================
// // 2. FUNCIONES AUXILIARES
// // =================================================================

// // Formatea el precio a moneda local (COP - Pesos Colombianos)
// const formatPrice = (price) => {
//     if (typeof price !== 'number') return 'Precio N/D'; 
//     return price.toLocaleString('es-CO', {
//         style: 'currency',
//         currency: 'COP',
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0
//     });
// };

// const initializeFilters = (data) => {
//     const filters = {};
//     Object.keys(data.filters).forEach(filterName => {
//         filters[filterName] = []; 
//     });
//     return filters;
// };

// // Adapta los datos genéricos de la API a la estructura de producto
// const mapToProductStructure = (data, category) => {
//     const config = ShopDataConfig[category];
//     const brands = config.filters["Marcas"] || ['Genérica'];
//     const prices = [500000, 1250000, 1800000, 2400000, 3100000];
//     const imagePlaceholders = [
//         "https://placehold.co/150x150/5B21B6/FFFFFF?text=IMPR", 
//         "https://placehold.co/150x150/16A34A/FFFFFF?text=FOTO", 
//         "https://placehold.co/150x150/F59E0B/FFFFFF?text=SCAN" 
//     ];

//     return data.map((item, index) => {
//         const baseProduct = {
//             id: item.id,
//             name: item.title ? item.title.substring(0, 30) + (item.title.length > 30 ? '...' : '') : `Producto Simulado ${item.id}`, 
//             price: prices[index % prices.length],
//             brand: brands[index % brands.length],
//             image_url: imagePlaceholders[index % imagePlaceholders.length],
//         };
        
//         // Asignación de valores simulados para que los filtros funcionen:
//         if (category === 'Impresoras') {
//             baseProduct.tipo = config.filters["Tipo"][index % config.filters["Tipo"].length];
//             baseProduct.color = config.filters["Color"][index % config.filters["Color"].length];
//         } else if (category === 'Fotocopiadoras') {
//             baseProduct.velocidad = config.filters["Velocidad (PPM)"][index % config.filters["Velocidad (PPM)"].length];
//             baseProduct.funcionalidad = config.filters["Funcionalidad"][index % config.filters["Funcionalidad"].length];
//         } else if (category === 'Escaneres') {
//             baseProduct.conectividad = config.filters["Conectividad"][index % config.filters["Conectividad"].length];
//             baseProduct.adf = config.filters["ADF"][index % config.filters["ADF"].length];
//         }
        
//         return baseProduct;
//     }).slice(0, 20);
// };

// // =================================================================
// // 3. COMPONENTE ProductCard
// // =================================================================

// const ProductCard = ({ product, onViewDetails }) => {
//     return (
//         <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
//             <div className="p-4 bg-gray-50 flex justify-center items-center h-40">
//                 <img 
//                     src={product.image_url} 
//                     alt={product.name} 
//                     className="max-h-full max-w-full object-contain"
//                     onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/5B21B6/FFFFFF?text=IMAGEN"; }}
//                 />
//             </div>
            
//             <div className="p-5 flex flex-col flex-grow">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2 flex-grow">{product.name}</h3>
//                 <p className="text-2xl font-bold text-indigo-600 mb-4">{formatPrice(product.price)}</p>
                
//                 <button
//                     onClick={() => onViewDetails(product)}
//                     className="w-full py-2 bg-indigo-500 text-white font-medium rounded-lg text-lg hover:bg-indigo-600 transition duration-200 shadow-md transform hover:scale-[1.01]"
//                 >
//                     Ver Detalles
//                 </button>
//             </div>
//         </div>
//     );
// };

// // =================================================================
// // 4. COMPONENTE ProductDetailsModal
// // =================================================================

// function ProductDetailsModal({ product, onClose, onAddToCart }) {
//     if (!product) return null; 

//     const extraDetails = [
//         { label: 'Marca', value: product.brand },
//         { label: 'Tipo', value: product.tipo || 'N/A' },
//         { label: 'Color', value: product.color || 'N/A' },
//         { label: 'Velocidad (PPM)', value: product.velocidad || 'N/A' },
//         { label: 'Funcionalidad', value: product.funcionalidad || 'N/A' },
//         { label: 'Conectividad', value: product.conectividad || 'N/A' },
//         { label: 'ADF', value: product.adf || 'N/A' },
//     ].filter(detail => detail.value !== 'N/A'); 
    
//     // Ejecuta la función onAddToCart pasada desde App y cierra el modal
//     const handleAddToCartClick = () => {
//         if (onAddToCart) {
//             onAddToCart(product);
//         }
//         onClose(); 
//     };

//     return (
//         <div 
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 "
//             onClick={onClose}
//         >
//             <div 
//                 className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
//                 onClick={(e) => e.stopPropagation()} 
//             >
//                 <div className="flex justify-between items-start p-6 border-b sticky top-0 bg-white z-10">
//                     <h2 className="text-3xl font-extrabold text-indigo-700">
//                         Detalles del Producto
//                     </h2>
//                     <button 
//                         onClick={onClose} 
//                         className="text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
//                     >
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//                     </button>
//                 </div>

//                 <div className="p-6">
//                     <div className="flex flex-col sm:flex-row gap-6">
//                         <div className="sm:w-1/3 flex-shrink-0">
//                             <img 
//                                 src={product.image_url} 
//                                 alt={product.name} 
//                                 className="w-full h-auto object-contain rounded-lg border p-2 shadow-md"
//                                 onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/FCA5A5/FFF?text=DEV"; }}
//                             />
//                         </div>

//                         <div className="sm:w-2/3">
//                             <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h3>
//                             <p className="text-4xl font-extrabold text-indigo-600 mb-4">
//                                 {formatPrice(product.price)}
//                             </p>
                            
//                             <p className="text-gray-700 mb-4 italic">
//                                 Información simulada.
//                             </p>

//                             <div className="grid grid-cols-2 gap-3 mt-4">
//                                 {extraDetails.map(detail => (
//                                     <div key={detail.label}>
//                                         <p className="text-sm font-semibold text-gray-500">{detail.label}</p>
//                                         <p className="text-base font-medium text-gray-800">{detail.value}</p>
//                                     </div>
//                                 ))}
//                             </div>
                            
//                             <button 
//                                 onClick={handleAddToCartClick}
//                                 className="w-full mt-6 py-3 bg-indigo-600 text-white font-bold rounded-lg text-lg hover:bg-indigo-700 transition duration-200 shadow-xl"
//                             >
//                                 Agregar al Carrito
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // =================================================================
// // 5. NUEVO COMPONENTE CartView (Vista del Carrito)
// // =================================================================

// function CartView({ cartItems, onBackToShop, onRemoveItem }) {
//     const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     return (
//         <div className="bg-white p-8 rounded-xl shadow-2xl">
//             <div className="flex justify-between items-center mb-6 border-b pb-4">
//                 <h2 className="text-4xl font-extrabold text-gray-900">Tu Carrito de Compras ({cartItems.length} ítem{cartItems.length !== 1 ? 's' : ''})</h2>
//                 <button 
//                     onClick={onBackToShop}
//                     className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
//                 >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
//                     <span>Volver al Catálogo</span>
//                 </button>
//             </div>

//             {cartItems.length === 0 ? (
//                 <div className="text-center py-16">
//                     <p className="text-3xl font-bold text-gray-500 mb-4">Tu carrito está vacío.</p>
//                     <p className="text-gray-600">¡Añade algunos productos para empezar!</p>
//                 </div>
//             ) : (
//                 <div className="flex flex-col lg:flex-row gap-8">
//                     {/* Lista de Items */}
//                     <div className="lg:w-2/3 space-y-4">
//                         {cartItems.map((item) => (
//                             <div key={item.cartItemId} className="flex items-center bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
//                                 <img 
//                                     src={item.image_url} 
//                                     alt={item.name} 
//                                     className="w-16 h-16 object-contain rounded-lg mr-4"
//                                     onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/64x64/FCA5A5/FFF?text=ITEM"; }}
//                                 />
//                                 <div className="flex-grow">
//                                     <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//                                     <p className="text-sm text-gray-500">Marca: {item.brand}</p>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="text-xl font-bold text-indigo-600">{formatPrice(item.price)}</p>
//                                     <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
//                                     <button 
//                                         onClick={() => onRemoveItem(item.cartItemId)}
//                                         className="text-red-500 text-sm hover:text-red-700 mt-1 transition-colors"
//                                     >
//                                         Eliminar
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Resumen del Carrito */}
//                     <div className="lg:w-1/3 bg-gray-100 p-6 rounded-xl shadow-lg border border-indigo-200 sticky top-24 h-fit">
//                         <h3 className="text-2xl font-bold text-indigo-700 mb-4 border-b pb-2">Resumen del Pedido</h3>
//                         <div className="space-y-2 mb-6">
//                             <div className="flex justify-between text-gray-700">
//                                 <span>Subtotal:</span>
//                                 <span>{formatPrice(subtotal)}</span>
//                             </div>
//                             <div className="flex justify-between text-gray-700 border-t pt-2">
//                                 <span>Envío Estimado:</span>
//                                 <span>Gratis</span>
//                             </div>
//                         </div>
//                         <div className="flex justify-between text-2xl font-extrabold text-gray-900 border-t pt-4">
//                             <span>Total:</span>
//                             <span>{formatPrice(subtotal)}</span>
//                         </div>
//                         <button
//                             className="w-full mt-6 py-3 bg-green-500 text-white font-bold rounded-lg text-lg hover:bg-green-600 transition duration-200 shadow-xl transform hover:scale-[1.01]"
//                             onClick={() => console.log('Procesando pago:', subtotal)}
//                         >
//                             Proceder al Pago
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// // =================================================================
// // 6. COMPONENTE PRINCIPAL App (Contiene el Catálogo y el Carrito)
// // =================================================================

// export default function App() {
//     // ESTADO PRINCIPAL DE NAVEGACIÓN
//     const [currentView, setCurrentView] = useState('shop'); // 'shop' o 'cart'

//     // ESTADOS DE DATOS Y CARGA
//     const [activeCategory, setActiveCategory] = useState('Impresoras');
//     const [allProducts, setAllProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
    
//     // ESTADOS DE FILTRO
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filters, setFilters] = useState({}); 
    
//     // ESTADOS DE MODAL
//     const [selectedProduct, setSelectedProduct] = useState(null); 

//     // ESTADO DEL CARRITO
//     const [cartItems, setCartItems] = useState([]);
//     const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    
//     // Obtener la configuración de la categoría activa
//     const categoryConfig = ShopDataConfig[activeCategory];
//     const categoryFilterNames = Object.keys(categoryConfig.filters);
    
    
//     // ------------------------------------
//     // useEffect: LLAMADA A LA API
//     // ------------------------------------

//     useEffect(() => {
//         if (currentView === 'cart') return; // No cargar si estamos en la vista del carrito

//         const fetchProducts = async () => {
//             const apiEndpoint = categoryConfig.apiEndpoint;
            
//             // 1. Resetear estados al iniciar la carga
//             setIsLoading(true); 
//             setError(null);    
//             setAllProducts([]); 
//             setFilters(initializeFilters(categoryConfig)); // Limpiar filtros

//             try {
//                 // 2. Realizar la llamada HTTP
//                 const response = await fetch(apiEndpoint);
                
//                 if (!response.ok) {
//                     throw new Error(`Error ${response.status}: Fallo al cargar los datos.`);
//                 }
                
//                 const data = await response.json();
                
//                 // 3. Mapear y guardar los datos
//                 const mappedData = mapToProductStructure(data, activeCategory);
//                 setAllProducts(mappedData); 
                
//             } catch (err) {
//                 console.error("Error al cargar productos:", err);
//                 setError(`Hubo un problema al conectar con la tienda. Intenta recargar o verificar el endpoint.`);
//             } finally {
//                 // 4. Finalizar la carga
//                 setIsLoading(false); 
//             }
//         };

//         fetchProducts();

//     }, [activeCategory, currentView]); // Dependencia de currentView para evitar recargar si cambiamos a carrito
    
//     // ------------------------------------
//     // MANEJADORES DE EVENTOS Y MODAL
//     // ------------------------------------

//     const handleCategoryChange = (newCategory) => {
//         setActiveCategory(newCategory);
//         setSearchTerm('');
//         setSelectedProduct(null); 
//         setCurrentView('shop'); // Asegurarse de volver a la vista de la tienda
//     };

//     const handleFilterChange = (filterName, value) => {
//         setFilters(prevFilters => {
//             const currentValues = prevFilters[filterName] || [];
//             let newValues;
            
//             if (currentValues.includes(value)) {
//                 newValues = currentValues.filter(v => v !== value);
//             } else {
//                 newValues = [...currentValues, value];
//             }
            
//             return {
//                 ...prevFilters,
//                 [filterName]: newValues
//             };
//         });
//     };
    
//     const handleViewDetails = (product) => {
//         setSelectedProduct(product);
//     };

//     const handleCloseModal = () => {
//         setSelectedProduct(null);
//     };

//     // MANEJADOR PARA AGREGAR PRODUCTOS AL CARRITO
//     const handleAddToCart = (productToAdd) => {
//         const existingItem = cartItems.find(item => item.id === productToAdd.id);

//         if (existingItem) {
//             setCartItems(prevItems => prevItems.map(item =>
//                 item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
//             ));
//         } else {
//             const newCartItem = {
//                 ...productToAdd,
//                 cartItemId: Date.now(), // Usamos un ID único para el ítem en el carrito
//                 quantity: 1,
//             };
//             setCartItems(prevItems => [...prevItems, newCartItem]);
//         }
        
//         // Muestra una notificación temporal de éxito
//         setIsNotificationVisible(true);
//         setTimeout(() => setIsNotificationVisible(false), 2500);
//     };
    
//     // NUEVO: Eliminar ítem del carrito
//     const handleRemoveItem = (cartItemId) => {
//         setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
//     };

//     // NUEVO: Navegar a la vista del carrito
//     const handleGoToCart = () => {
//         setCurrentView('cart');
//         setSelectedProduct(null); // Asegurarse de que el modal se cierre
//     };

//     // NUEVO: Volver a la vista del catálogo
//     const handleBackToShop = () => {
//         setCurrentView('shop');
//     };
    
//     // ------------------------------------
//     // LÓGICA DE FILTRADO (useMemo)
//     // ------------------------------------
//     const filteredProducts = useMemo(() => {
//         if (isLoading) return [];

//         return allProducts.filter(product => {
//             // 1. Filtrar por BÚSQUEDA
//             const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
//             if (!matchesSearch) return false;

//             // 2. Filtrar por TODOS los FILTROS DINÁMICOS
//             const matchesFilters = categoryFilterNames.every(filterName => {
//                 const selectedValues = filters[filterName] || [];
//                 if (selectedValues.length === 0) return true;

//                 // Mapeo de nombres de filtros a claves de producto
//                 let productKey;
//                 if (filterName === 'Marcas') productKey = 'brand';
//                 else if (filterName === 'Tipo') productKey = 'tipo';
//                 else if (filterName === 'Color') productKey = 'color';
//                 else if (filterName.includes('Velocidad')) productKey = 'velocidad';
//                 else if (filterName.includes('Funcionalidad')) productKey = 'funcionalidad';
//                 else if (filterName.includes('Conectividad')) productKey = 'conectividad';
//                 else if (filterName === 'ADF') productKey = 'adf';
//                 else productKey = filterName.toLowerCase().split(' ')[0]; // Fallback

//                 const productValue = product[productKey];
                
//                 if (!productValue) return true; 
                
//                 return selectedValues.some(val => 
//                     String(productValue).toLowerCase() === String(val).toLowerCase()
//                 );
//             });

//             return matchesFilters;
//         });
//     }, [searchTerm, filters, allProducts, categoryFilterNames, isLoading]);


//     // ------------------------------------
//     // RENDERIZADO
//     // ------------------------------------
//     return (
//         <div className="max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 font-sans">
            
//             {/* INDICADOR DE CARRITO FLOTANTE Y FIJO (AHORA CON ONCLICK) */}
//             <div className="mt-20 fixed top-4 right-4 z-40">
//                 <div 
//                     className=" tive p-3 bg-white rounded-full shadow-2xl border-2 border-indigo-600 cursor-pointer hover:bg-indigo-50 transition-colors transform hover:scale-105"
//                     onClick={handleGoToCart} // NUEVO: Navega al carrito
//                 >
//                     <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    
//                     {cartItems.length > 0 && (
//                         <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
//                             {cartItems.length}
//                         </span>
//                     )}
//                 </div>
//             </div>

//             {/* NOTIFICACIÓN DE PRODUCTO AGREGADO */}
//             <div 
//                 className={`fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-xl shadow-2xl bg-green-500 text-white font-bold transition-opacity duration-300 z-50 ${isNotificationVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//             >
//                 ✅ Producto agregado al carrito. ({cartItems.length} ítem{cartItems.length !== 1 ? 's' : ''})
//             </div>

//             {/* HEADER */}
//             <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
//                 {currentView === 'shop' ? `Catálogo de ${categoryConfig.title}` : 'Vista de Carrito'}
//             </h1>

//             {/* CONDICIONAL: VISTA DE CARRITO */}
//             {currentView === 'cart' && (
//                 <CartView 
//                     cartItems={cartItems} 
//                     onBackToShop={handleBackToShop}
//                     onRemoveItem={handleRemoveItem}
//                 />
//             )}

//             {/* CONDICIONAL: VISTA DE TIENDA */}
//             {currentView === 'shop' && (
//                 <div 
//                     className={`transition duration-300 ${selectedProduct ? 'blur-sm pointer-events-none' : ''}`}
//                 >
//                     <div className="flex flex-col md:flex-row gap-8">
                        
//                         {/* COLUMNA DE FILTROS (IZQUIERDA) */}
//                         <aside className="w-full md:w-64">
//                             <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                                
//                                 {/* 1. Selección de Categoría */}
//                                 <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 text-indigo-600">
//                                     Secciones
//                                 </h2>
//                                 <div className="mb-6 flex flex-col space-y-2">
//                                     {Object.keys(ShopDataConfig).map(category => (
//                                         <button
//                                             key={category}
//                                             onClick={() => handleCategoryChange(category)}
//                                             className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors transform hover:scale-[1.02] ${
//                                                 activeCategory === category
//                                                     ? 'bg-indigo-600 text-white shadow-md shadow-indigo-300'
//                                                     : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
//                                             }`}
//                                         >
//                                             {category}
//                                         </button>
//                                     ))}
//                                 </div>
                                
//                                 {/* 2. Filtros Dinámicos */}
//                                 <h2 className="text-xl font-bold text-gray-800 mb-4 border-t pt-4 text-indigo-600">
//                                     Filtros
//                                 </h2>
                                
//                                 {categoryFilterNames.map(filterName => (
//                                     <div key={filterName} className="mb-6 border-b pb-3 last:border-b-0">
//                                         <h3 className="text-lg font-semibold mb-2 text-gray-700">{filterName}</h3>
//                                         {categoryConfig.filters[filterName].map(value => (
//                                             <label key={value} className="flex items-center space-x-2 text-gray-600 mb-1 cursor-pointer hover:text-indigo-600 transition-colors">
//                                                 <input 
//                                                     type="checkbox" 
//                                                     name={filterName} 
//                                                     value={value} 
//                                                     checked={filters[filterName]?.includes(value) || false}
//                                                     onChange={() => handleFilterChange(filterName, value)}
//                                                     className="form-checkbox text-indigo-600 rounded focus:ring-indigo-500 h-4 w-4" 
//                                                 />
//                                                 <span>{value}</span>
//                                             </label>
//                                         ))}
//                                     </div>
//                                 ))}
                                
//                             </div>
//                         </aside>

//                         {/* COLUMNA DE PRODUCTOS (DERECHA) */}
//                         <main className="flex-grow">
                            
//                             {/* Barra de Búsqueda */}
//                             <div className="mb-6">
//                                 <input 
//                                     type="text" 
//                                     placeholder={`Buscar ${categoryConfig.title} por nombre...`} 
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-shadow"
//                                 />
//                             </div>
                            
//                             {/* Mensajes de Estado: Carga o Error */}
//                             {isLoading && (
//                                 <div className="p-10 text-center text-indigo-600 bg-white rounded-xl shadow-lg">
//                                     <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                                     <p className="text-xl font-semibold">Cargando productos de {categoryConfig.title} desde la API...</p>
//                                 </div>
//                             )}
                            
//                             {error && (
//                                 <div className="p-10 text-center bg-red-100 border border-red-400 text-red-700 rounded-xl shadow-lg">
//                                     <p className="text-xl font-semibold">Error de Conexión</p>
//                                     <p className="mt-2 text-sm">{error}</p>
//                                 </div>
//                             )}
                            
//                             {/* Contenido de Productos (Solo si no está cargando y no hay error) */}
//                             {!isLoading && !error && (
//                                 <>
//                                     {/* GRID DE PRODUCTOS */}
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                                         {filteredProducts.map((product) => (
//                                             <ProductCard 
//                                                 key={product.id} 
//                                                 product={product} 
//                                                 onViewDetails={handleViewDetails}
//                                             />
//                                         ))}
//                                     </div>

//                                     {/* Manejo de la Paginación/Conteo */}
//                                     <div className="mt-8 text-center">
//                                         {filteredProducts.length > 0 ? (
//                                             <p className="text-gray-500">Mostrando {filteredProducts.length} de {allProducts.length} productos en {categoryConfig.title}</p>
//                                         ) : (
//                                             <p className="text-2xl font-bold text-gray-700 p-8 bg-white rounded-xl shadow-lg">
//                                                 No se encontraron productos con esos filtros.
//                                             </p>
//                                         )}
//                                     </div>
//                                 </>
//                             )}

//                         </main>
//                     </div>
//                 </div>
//             )}
            
//             {/* MODAL DE DETALLES DEL PRODUCTO */}
//             <ProductDetailsModal 
//                 product={selectedProduct} 
//                 onClose={handleCloseModal} 
//                 onAddToCart={handleAddToCart}
//             />
//         </div>
//     );
// }