import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Desplaza la ventana a la posición superior (0, 0)
    window.scrollTo(0, 0); 
  }, [pathname]); // Se activa cada vez que la ruta (pathname) cambia

  return null;
}