import React from 'react';

/* =========================
   PRECIO: FALLBACK SEGURO
========================= */
const formatPrice = (price) => {
    if (price === null || price === undefined || price === '') {
        return 'Precio N/D';
    }

    const numeric = Number(price);
    if (isNaN(numeric)) return 'Precio N/D';

    return numeric.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

function ProductDetailsModal({ product, onClose, onAddToCart }) {
    if (!product) return null;

    /* =========================
       NORMALIZACIÓN TOTAL
    ========================= */
    const normalizedProduct = {
        id: product.id ?? null,
        name: product.name || product.nombre || 'Producto sin nombre',
        brand: product.brand || product.marca || 'N/A',
        image_url:
            product.image_url ||
            product.image ||
            'https://placehold.co/300x300?text=Sin+Imagen',

        // 👇 PRECIO UNIFICADO (MISMO DE SHOPPAGE)
        priceFormatted:
            product.priceFormatted ||
            formatPrice(
                product.price ??
                product.precio ??
                product.rental_price ??
                product.price_per_day ??
                product.daily_price ??
                product.valor ??
                null
            ),

        tipo:
            product.tipo ||
            product.category?.name ||
            product.categoria ||
            'N/A',

        color: product.color || 'N/A',
        velocidad:
            product.velocidad ||
            product.speed_ppm ||
            product.ppm ||
            'N/A',

        funcionalidad: product.funcionalidad || 'N/A',
        conectividad: product.conectividad || 'N/A',

        adf:
            typeof product.adf === 'boolean'
                ? product.adf ? 'Sí' : 'No'
                : product.adf || 'N/A',
    };

    const extraDetails = [
        { label: 'Marca', value: normalizedProduct.brand },
        { label: 'Tipo', value: normalizedProduct.tipo },
        { label: 'Color', value: normalizedProduct.color },
        { label: 'Velocidad (PPM)', value: normalizedProduct.velocidad },
        { label: 'Funcionalidad', value: normalizedProduct.funcionalidad },
        { label: 'Conectividad', value: normalizedProduct.conectividad },
        { label: 'ADF', value: normalizedProduct.adf },
    ].filter(d => d.value && d.value !== 'N/A');

    const handleAddToCartClick = () => {
        if (typeof onAddToCart === 'function') {
            onAddToCart(normalizedProduct);
        }
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
                    <h2 className="text-3xl font-extrabold text-indigo-700">
                        Detalles del Producto
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* IMAGEN */}
                        <div className="sm:w-1/3">
                            <img
                                src={normalizedProduct.image_url}
                                alt={normalizedProduct.name}
                                className="w-full object-contain rounded-lg border p-3 shadow"
                                onError={(e) => {
                                    e.target.src =
                                        'https://placehold.co/300x300?text=Sin+Imagen';
                                }}
                            />
                        </div>

                        {/* INFO */}
                        <div className="sm:w-2/3">
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                {normalizedProduct.name}
                            </h3>

                            {/* ✅ PRECIO IGUAL QUE SHOPPAGE */}
                            <p className="text-4xl font-extrabold text-indigo-600 mb-4">
                                {normalizedProduct.priceFormatted}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {extraDetails.map(detail => (
                                    <div key={detail.label}>
                                        <p className="text-sm font-semibold text-gray-500">
                                            {detail.label}
                                        </p>
                                        <p className="text-base font-medium text-gray-800">
                                            {detail.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleAddToCartClick}
                                className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg text-lg hover:bg-indigo-700 transition shadow-lg"
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsModal;
