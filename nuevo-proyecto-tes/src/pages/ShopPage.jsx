import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductDetailsModal from "../components/ProductDetailsModal";
import shopDataConfig, { API_CONFIG } from "../data/ShopData";

import impresoraImg from "../assets/fotocopiadora.webp";
import multiImg from "../assets/RICOH.jpg";
import escanerImg from "../assets/escaner.jpg";

const normalize = (v = "") =>
  v
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const detectRealType = (item) => {
  const text = normalize(`${item.name} ${item.description || ""}`);

  if (text.includes("multifuncional")) return "multifuncionales";
  if (text.includes("escaner") || text.includes("scanner")) return "escaneres";
  return "impresoras";
};

const fallbackImages = {
  impresoras: impresoraImg,
  multifuncionales: multiImg,
  escaneres: escanerImg,
};

const initializeFilters = (filtersConfig) => {
  const obj = {};
  Object.keys(filtersConfig).forEach(k => (obj[k] = []));
  return obj;
};

/* ================= COMPONENTE ================= */

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("Impresoras");
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryConfig = shopDataConfig[activeCategory];

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      setFilters(initializeFilters(categoryConfig.filters));

      try {
        const res = await fetch(
          `${API_CONFIG.baseURL}/products?per_page=200`
        );
        if (!res.ok) throw new Error("Error al consultar la API");

        const json = await res.json();

        const cleaned = json.data
          .filter(item => detectRealType(item) === categoryConfig.categorySlug)
          .map(item => ({
            id: item.id,
            name: item.name,
            description: item.description || "Sin descripción",
            priceFormatted: item.price?.formatted || "$ 0 COP",
            image_url:
              item.image_url ||
              item.image ||
              fallbackImages[categoryConfig.categorySlug],
            brand: item.brand_model || "Sin marca",
            quantity: item.quantity,
            rental_status: item.rental_status,
            is_available: item.is_available,
            in_stock: item.in_stock,
          }));

        setProducts(cleaned);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  /* ================= FILTRADO ================= */

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (
        search &&
        !p.name.toLowerCase().includes(search.toLowerCase())
      )
        return false;

      const estado = filters.Estado || [];
      if (estado.length && !estado.includes(p.rental_status)) return false;

      const disp = filters.Disponibilidad || [];
      if (
        disp.length &&
        !(
          (disp.includes("available") && p.is_available) ||
          (disp.includes("not_available") && !p.is_available)
        )
      )
        return false;

      const stock = filters.Stock || [];
      if (
        stock.length &&
        !(
          (stock.includes("in_stock") && p.in_stock) ||
          (stock.includes("out_of_stock") && !p.in_stock)
        )
      )
        return false;

      return true;
    });
  }, [products, filters, search]);

  const toggleFilter = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: prev[filter].includes(value)
        ? prev[filter].filter(v => v !== value)
        : [...prev[filter], value],
    }));
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto pt-32 px-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">
        Catálogo de {categoryConfig.title}
      </h1>

      <div className="flex gap-8">
        <aside className="w-64 bg-white p-6 rounded-xl shadow sticky top-24">
          <h2 className="font-bold mb-4">Secciones</h2>

          {Object.keys(shopDataConfig).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`block w-full mb-2 px-4 py-2 rounded ${
                cat === activeCategory
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}

          <h2 className="font-bold mt-6 mb-2">Filtros</h2>

          {Object.entries(categoryConfig.filters).map(([filter, values]) => (
            <div key={filter} className="mb-4">
              <p className="font-semibold">{filter}</p>
              {values.map(v => (
                <label key={v} className="block text-sm">
                  <input
                    type="checkbox"
                    checked={filters[filter]?.includes(v)}
                    onChange={() => toggleFilter(filter, v)}
                  />{" "}
                  {v}
                </label>
              ))}
            </div>
          ))}
        </aside>

        <main className="flex-1">
          <input
            className="w-full p-3 mb-6 rounded border"
            placeholder="Buscar producto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {loading && <p>Cargando...</p>}
          {error && <p className="text-red-600">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onViewDetails={() => setSelectedProduct(p)}
              />
            ))}
          </div>
        </main>
      </div>

      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      /> 
    </div>
  );
}
