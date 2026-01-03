const shopDataConfig = {
    Impresoras: {
      title: "Impresoras",
      categorySlug: "impresoras",
      filters: {
        Estado: ["disponible", "alquilado", "en_mantenimiento"],
        Disponibilidad: ["available", "not_available"],
        Stock: ["in_stock", "out_of_stock"],
      },
    },
  
    Multifuncionales: {
      title: "Multifuncionales",
      categorySlug: "multifuncionales",
      filters: {
        Estado: ["disponible", "alquilado", "en_mantenimiento"],
        Disponibilidad: ["available", "not_available"],
        Stock: ["in_stock", "out_of_stock"],
      },
    },
  
    Escaneres: {
      title: "Escáneres",
      categorySlug: "escaneres",
      filters: {
        Estado: ["disponible", "alquilado", "en_mantenimiento"],
        Disponibilidad: ["available", "not_available"],
        Stock: ["in_stock", "out_of_stock"],
      },
    },
  };
  
  export const API_CONFIG = {
    baseURL: "https://inventory-app-main-qvihcj.laravel.cloud/api/v1",
  };
  
  export default shopDataConfig;
  