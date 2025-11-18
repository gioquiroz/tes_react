import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard.jsx'; 
import shopData from '../data/ShopData.js'; // Importamos los datos

// Función para inicializar el estado de los filtros (limpiar filtros al cambiar de sección)
const initializeFilters = (data) => {
    const filters = {};
    Object.keys(data.filters).forEach(filterName => {
        // Inicializamos todos los filtros como arrays vacíos (para checkboxes)
        filters[filterName] = []; 
    });
    return filters;
};

function ShopPage() {
    // ESTADO PRINCIPAL: Categoría seleccionada
    const [activeCategory, setActiveCategory] = useState('Impresoras');
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({}); // Los filtros serán un objeto dinámico
    
    // Obtener los datos y filtros de la categoría activa
    const categoryData = shopData[activeCategory];
    const categoryFilterNames = Object.keys(categoryData.filters);
    const allProducts = categoryData.products;
    
    // Inicializar filtros la primera vez o cuando cambia la categoría
    useState(() => {
        setFilters(initializeFilters(categoryData));
    }, [activeCategory]);
    
    // ------------------------------------
    // MANEJADORES DE EVENTOS
    // ------------------------------------

    const handleCategoryChange = (newCategory) => {
        setActiveCategory(newCategory);
        setSearchTerm('');
        // Importante: Limpiar todos los filtros al cambiar de sección
        setFilters(initializeFilters(shopData[newCategory])); 
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => {
            const currentValues = prevFilters[filterName] || [];
            let newValues;
            
            if (currentValues.includes(value)) {
                // Deseleccionar
                newValues = currentValues.filter(v => v !== value);
            } else {
                // Seleccionar (si el filtro solo permite una opción, usa [value])
                // Para simplificar, aquí usamos checkboxes (múltiples opciones)
                newValues = [...currentValues, value];
            }
            
            return {
                ...prevFilters,
                [filterName]: newValues
            };
        });
    };

    // ------------------------------------
    // LÓGICA DE FILTRADO
    // ------------------------------------
    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            // 1. Filtrar por BÚSQUEDA
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            if (!matchesSearch) return false;

            // 2. Filtrar por TODOS los FILTROS DINÁMICOS
            const matchesFilters = categoryFilterNames.every(filterName => {
                const selectedValues = filters[filterName] || [];
                
                // Si no hay valores seleccionados para este filtro, se acepta
                if (selectedValues.length === 0) return true;

                // Asumimos que el nombre del filtro (e.g., "Marcas") corresponde
                // a una clave en el objeto producto (e.g., product.Marcas).
                // Convertimos el nombre del filtro a minúsculas y sin espacios para la clave
                // O mejor, usamos el nombre exacto si los datos de la API lo permiten.
                const productKey = filterName.toLowerCase().split(' ')[0]; 

                // Intentamos buscar la propiedad en el producto.
                // Usamos 'brand', 'type', 'color', etc., directamente si están definidas en la API.
                
                // Nota: Esto requiere que las claves de los filtros (e.g., "Marcas") coincidan 
                // con las claves de los productos (e.g., product.brand).
                // Aquí usamos una simplificación:
                const productValue = product[productKey] || product[filterName.toLowerCase()] || product.brand; 
                
                if (!productValue) return true; // Si el producto no tiene la clave, lo aceptamos.
                
                return selectedValues.some(val => 
                    String(productValue).toLowerCase() === String(val).toLowerCase()
                );
            });

            return matchesFilters;
        });
    }, [searchTerm, filters, allProducts, categoryFilterNames]);

    // ------------------------------------
    // RENDERIZADO
    // ------------------------------------
    return (
        <div className="max-w-7xl mx-auto pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
                {categoryData.title} {/* TÍTULO DINÁMICO */}
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* COLUMNA DE FILTROS (IZQUIERDA) */}
                <aside className="w-full md:w-64">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 sticky top-24">
                        
                        {/* 1. Selección de Categoría (Radio/Botones) */}
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                            Sección
                        </h2>
                        <div className="mb-6 flex flex-col space-y-2">
                            {Object.keys(shopData).map(category => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                        activeCategory === category
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        
                        {/* 2. Filtros Dinámicos de la Categoría */}
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-t pt-4">
                            Filtros de {categoryData.title}
                        </h2>
                        
                        {categoryFilterNames.map(filterName => (
                            <div key={filterName} className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">{filterName}</h3>
                                {categoryData.filters[filterName].map(value => (
                                    <label key={value} className="flex items-center space-x-2 text-gray-600 mb-1 cursor-pointer">
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
                            placeholder={`Buscar en ${categoryData.title}...`} 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    
                    {/* GRID DE PRODUCTOS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Manejo de la Paginación/Conteo */}
                    <div className="mt-8 text-center">
                        {filteredProducts.length > 0 ? (
                            <p className="text-gray-500">Mostrando {filteredProducts.length} de {allProducts.length} productos en {categoryData.title}</p>
                        ) : (
                            <p className="text-xl font-medium text-gray-600">No se encontraron productos en **{categoryData.title}** que coincidan con los filtros.</p>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
}

export default ShopPage;