// --- Datos para simular la API de la tienda ---

const shopData = {
    "Impresoras": {
        title: "Impresoras",
        filters: {
            "Tipo": ['Laser', 'Inyección', 'Térmica', 'Matriz de puntos'],
            "Color": ['Blanco y negro', 'Color'],
            "Marcas": ['Ricoh', 'HP', 'Epson', 'Brother', 'Canon'],
        },
        products: [
            { id: 1, name: "Ricoh Sp 840DN", price: 1000000, brand: "Ricoh", type: "Laser", color: "Blanco y negro", image_url: "https://via.placeholder.com/150/0000FF/808080?text=I1" },
            { id: 2, name: "Epson EcoTank L3250", price: 850000, brand: "Epson", type: "Inyección", color: "Color", image_url: "https://via.placeholder.com/150/FF0000/FFFFFF?text=I2" },
            { id: 3, name: "HP LaserJet Pro M404n", price: 1200000, brand: "HP", type: "Laser", color: "Blanco y negro", image_url: "https://via.placeholder.com/150/00FF00/808080?text=I3" },
            { id: 4, name: "Brother MFC-L3770CDW", price: 1800000, brand: "Brother", type: "Laser", color: "Color", image_url: "https://via.placeholder.com/150/00FFFF/000000?text=I4" },
        ]
    },
    "Fotocopiadoras": {
        title: "Fotocopiadoras",
        filters: {
            "Velocidad (PPM)": ['20-30', '31-45', '46+'],
            "Funcionalidad": ['Multifuncional', 'Solo Copia'],
            "Marcas": ['Ricoh', 'Konica Minolta', 'Xerox'],
        },
        products: [
            { id: 10, name: "Ricoh IM 4000", price: 5000000, brand: "Ricoh", speed: "31-45", functionality: "Multifuncional", image_url: "https://via.placeholder.com/150/000000/FFFFFF?text=F1" },
            { id: 11, name: "Konica C308", price: 8000000, brand: "Konica Minolta", speed: "20-30", functionality: "Multifuncional", image_url: "https://via.placeholder.com/150/999999/FFFFFF?text=F2" },
        ]
    },
    "Escaneres": {
        title: "Escáneres",
        filters: {
            "Conectividad": ['USB', 'Red', 'Wi-Fi'],
            "ADF": ['Sí', 'No'],
            "Marcas": ['Epson', 'Canon', 'HP'],
        },
        products: [
            { id: 20, name: "Epson DS-780N", price: 2500000, brand: "Epson", connectivity: "Red", adf: "Sí", image_url: "https://via.placeholder.com/150/008080/FFFFFF?text=E1" },
            { id: 21, name: "Canon LIDE 400", price: 500000, brand: "Canon", connectivity: "USB", adf: "No", image_url: "https://via.placeholder.com/150/800080/FFFFFF?text=E2" },
        ]
    }
};

export default shopData;


// // --- Estructura de Filtros y Endpoints de la API ---

// const shopDataConfig = {
//     "Impresoras": {
//         title: "Impresoras",
//         // URL de la API (EJEMPLO: reemplaza con tu endpoint real)
//         apiEndpoint: 'https://api.tuempresa.com/v1/impresoras', 
//         filters: {
//             "Tipo": ['Laser', 'Inyección', 'Térmica', 'Matriz de puntos'],
//             "Color": ['Blanco y negro', 'Color'],
//             "Marcas": ['Ricoh', 'HP', 'Epson', 'Brother', 'Canon'],
//         },
//     },
//     "Fotocopiadoras": {
//         title: "Fotocopiadoras",
//         apiEndpoint: 'https://api.tuempresa.com/v1/fotocopiadoras',
//         filters: {
//             "Velocidad (PPM)": ['20-30', '31-45', '46+'],
//             "Funcionalidad": ['Multifuncional', 'Solo Copia'],
//             "Marcas": ['Ricoh', 'Konica Minolta', 'Xerox'],
//         },
//     },
//     "Escaneres": {
//         title: "Escáneres",
//         apiEndpoint: 'https://api.tuempresa.com/v1/escaneres',
//         filters: {
//             "Conectividad": ['USB', 'Red', 'Wi-Fi'],
//             "ADF": ['Sí', 'No'],
//             "Marcas": ['Epson', 'Canon', 'HP'],
//         },
//     }
// };

// export default shopDataConfig;