import React, { useState } from 'react';
import ProductModal from './ProductModal'; // Asegúrate de que esta ruta sea correcta

function ProductCard({ item, onRemove }) {
  const [peso, setPeso] = useState(item.peso || 500);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura del modal

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

  // Tamaño dinámico de los emojis (Ajustamos el tamaño máximo cuando hay pocos emojis)
  let tamañoEmoji = 20; // Tamaño base
  if (piramide.length <= 3) {
    // Cuando hay 1, 2 o 3 filas, los emojis serán más grandes
    tamañoEmoji = 40;
  } else {
    // Ajustar proporcionalmente el tamaño a medida que aumentan las filas
    tamañoEmoji = Math.min(100 / piramide.length, 15); // Aseguramos que no crezca demasiado
  }

  const openModal = () => {
    setModalOpen(true); // Abrir modal
  };

  const closeModal = () => {
    setModalOpen(false); // Cerrar modal
  };

  return (
    <div
      className="border rounded-lg shadow-md p-2 flex flex-col items-center justify-between"
      style={{ width: '100%', height: '100%' }}
      onClick={openModal} // Abrir el modal cuando se haga clic en cualquier lugar de la card
    >
      {/* Contenedor de emojis */}
      <div
        className="flex flex-col items-center justify-center mb-2"
        style={{
          height: '120px',
          width: '100%',
          overflowX: 'auto', // Añadir scroll horizontal si es necesario
          overflowY: 'hidden', // Evitar que se desborde en el eje vertical
        }}
      >
        {piramide.map((numEmojis, filaIndex) => (
          <div key={filaIndex} className="flex justify-center">
            {Array.from({ length: numEmojis }).map((_, index) => (
              <span
                key={index}
                className="m-1"
                style={{
                  fontSize: `${tamañoEmoji}px`, // Tamaño dinámico de los emojis
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

      {/* Peso */}
      <p className="text-lg">{peso} g</p>

      {/* Modal */}
      {modalOpen && (
        <ProductModal
          item={item}
          peso={peso}
          setPeso={setPeso}
          onRemove={onRemove}
          closeModal={closeModal}
          incrementarPeso={incrementarPeso}
          decrementarPeso={decrementarPeso}
        />
      )}
    </div>
  );
}

export default ProductCard;
