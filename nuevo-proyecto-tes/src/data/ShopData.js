// --- Estructura de Filtros y Endpoints de la API ---

const shopDataConfig = {
    "Impresoras": {
        title: "Impresoras",
        // Usamos JSONPlaceholder como ejemplo de endpoint
        apiEndpoint: 'https://jsonplaceholder.typicode.com/posts', 
        filters: {
            "Tipo": ['Laser', 'Inyección', 'Térmica'],
            "Color": ['Blanco y negro', 'Color'],
            "Marcas": ['Ricoh', 'HP', 'Epson'],
        },
    },
    "Fotocopiadoras": {
        title: "Fotocopiadoras",
        // Usamos el mismo endpoint de ejemplo, pero la data se adapta
        apiEndpoint: 'https://jsonplaceholder.typicode.com/posts',
        filters: {
            "Velocidad (PPM)": ['20-30', '46+'],
            "Funcionalidad": ['Multifuncional', 'Solo Copia'],
            "Marcas": ['Ricoh', 'Konica Minolta'],
        },
    },
    "Escaneres": {
        title: "Escáneres",
        apiEndpoint: 'https://jsonplaceholder.typicode.com/posts',
        filters: {
            "Conectividad": ['USB', 'Red', 'Wi-Fi'],
            "ADF": ['Sí', 'No'],
            "Marcas": ['Epson', 'Canon'],
        },
    }
};

export default shopDataConfig;