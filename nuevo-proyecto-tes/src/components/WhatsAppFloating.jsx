import React from "react";

export default function WhatsAppFloating() {
  const phoneNumber = "573001234567"; // tu número real
  const message = "Hola, quiero información sobre sus productos";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="
        fixed bottom-6 right-6 z-[9999]
        w-14 h-14
        rounded-full
        bg-[#25D366]
        flex items-center justify-center
        shadow-xl
        transition-transform duration-300
        hover:scale-110
        active:scale-100
      "
    >
      {/* ÍCONO WHATSAPP (SVG OFICIAL CORREGIDO) */}
      <svg
        viewBox="0 0 32 32"
        fill="white"
        className="w-8 h-8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 .3C7.3.3.3 7.3.3 16c0 2.8.7 5.5 2.1 7.9L0 32l8.3-2.2c2.3 1.2 4.9 1.9 7.7 1.9 8.7 0 15.7-7 15.7-15.7S24.7.3 16 .3zm0 28.8c-2.5 0-4.9-.7-6.9-1.9l-.5-.3-4.9 1.3 1.3-4.8-.3-.5c-1.3-2.1-2-4.5-2-7C2.7 8.4 8.4 2.7 16 2.7S29.3 8.4 29.3 16 23.6 29.1 16 29.1zm7.6-9.6c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.6-.2-.9.2s-1 1.2-1.2 1.4c-.2.2-.5.3-.9.1-1.6-.8-3-1.8-4.2-3.2-.3-.3-.7-.9-.9-1.3-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.9-2.3-1.2-3.2c-.3-.8-.6-.7-.9-.7h-.8c-.3 0-.7.1-1 .4-.4.4-1.3 1.2-1.3 3s1.4 3.5 1.6 3.7c.2.2 2.8 4.3 6.8 6 .9.4 1.6.6 2.1.8.9.3 1.8.3 2.4.2.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.1-.4-.2-.8-.4z" />
      </svg>
    </a>
  );
}
