import React from "react";
import oncologos from "../assets/descarga.png";
import movilidad from "../assets/image.png";
import utp from "../assets/utp.png";
import santa from "../assets/santa.jpg";
import seguridad from "../assets/seguridad.png";
import almacen from "../assets/almacen.jpg";
import calasanz from "../assets/calasanz.png";
import tecnovida from "../assets/tecnovida.png";
import camara from "../assets/camara.jpg";
import enciso from "../assets/enciso.jpg";
import motor from "../assets/motor.png";

const images = [
  oncologos,
  movilidad,
  utp,
  santa,
  seguridad,
  almacen,
  calasanz,
  tecnovida,
  camara,
  enciso,
  motor,
];

export default function SimpleCarousel() {
  const loopImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="carousel-track">
        {loopImages.map((src, i) => (
          <div
            key={i}
            className="carousel-item"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              height: "100px",
              width: "100px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
