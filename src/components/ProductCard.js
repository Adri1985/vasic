import React, { useState } from 'react';

function ProductCard({ item, onRemove }) {
  const [peso, setPeso] = useState(item.peso || 500);

  const incrementarPeso = () => setPeso((prev) => prev + 250);
  const decrementarPeso = () => {
    const nuevoPeso = peso - 250;
    if (nuevoPeso <= 0) {
      onRemove(item.id);
    } else {
      setPeso(nuevoPeso);
    }
  };

  // Calcular la cantidad de emojis según el peso
  const cantidadDeEmojis = Math.floor((peso / 1000) * item.cantidadPorKg);

  // Generar una pirámide con los emojis
  const generarPiramide = (cantidad) => {
    const filas = [];
    let filaActual = 1;

    while (cantidad > 0) {
      const elementosEnFila = Math.min(filaActual, cantidad);
      filas.push(elementosEnFila);
      cantidad -= elementosEnFila;
      filaActual++;
    }

    return filas;
  };

  const piramide = generarPiramide(cantidadDeEmojis);

  // Tamaño dinámico de los emojis
  const tamañoEmoji = Math.min(100 / piramide.length, 20);

  return (
    <div
      className="border rounded-lg shadow-md p-2 flex flex-col items-center justify-between"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Contenedor de emojis */}
      <div
        className="flex flex-col items-center justify-center mb-2"
        style={{
          height: '120px',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {piramide.map((numEmojis, filaIndex) => (
          <div key={filaIndex} className="flex justify-center">
            {Array.from({ length: numEmojis }).map((_, index) => (
              <span
                key={index}
                className="m-1"
                style={{
                  fontSize: `${tamañoEmoji}px`,
                }}
              >
                {item.emoji}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Nombre del producto */}
      <p className="font-semibold text-md mb-2">{item.nombre}</p>

      {/* Controles de peso */}
      <div className="flex items-center">
        <button
          onClick={decrementarPeso}
          className="bg-gray-200 text-black px-3 py-1 rounded-l-md hover:bg-gray-300"
        >
          -
        </button>
        <input
          type="text"
          value={`${peso} g`}
          readOnly
          className="text-center w-14 bg-gray-100 border border-gray-300 py-1"
        />
        <button
          onClick={incrementarPeso}
          className="bg-gray-200 text-black px-3 py-1 rounded-r-md hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
