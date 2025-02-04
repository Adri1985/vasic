import React from 'react';

function ProductModal({
  item,
  peso,
  setPeso,
  onRemove,
  closeModal,
  incrementarPeso,
  decrementarPeso,
}) {
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
    tamañoEmoji = Math.min(100 / piramide.length, 20); // Este es el cálculo original
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
      onClick={closeModal}
    >
      <div
        className="bg-white shadow-lg rounded-lg p-6 w-4/5"
        onClick={(e) => e.stopPropagation()} // Evitar que el clic en el modal cierre el modal
      >
        {/* Mostrar emojis en pirámide */}
        <div
          className="flex flex-col items-center justify-center mb-2"
          style={{
            height: '250px',
            width: '100%',
            overflowX: 'auto', // Añadir scroll horizontal si es necesario
            overflowY: 'hidden', // Evitar que se desborde en el eje vertical
          }}
        >
          {piramide.map((numEmojis, filaIndex) => (
            <div key={filaIndex} className="flex justify-center">
              {Array.from({ length: numEmojis }).map((_, index) => (
                <span key={index} className="m-1" style={{ fontSize: `${tamañoEmoji}px` }}>
                  {item.emoji}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Nombre del producto */}
        <p className="font-semibold text-2xl mb-4 text-center">{item.nombre}</p>

        {/* Controles de peso */}
        <div className="flex justify-center items-center">
          <button
            onClick={decrementarPeso}
            className="bg-gray-200 text-black px-4 py-2 rounded-l-md hover:bg-gray-300"
          >
            -
          </button>
          <input
            type="text"
            value={`${peso} g`}
            readOnly
            className="text-center w-24 bg-gray-100 border border-gray-300 py-2"
          />
          <button
            onClick={incrementarPeso}
            className="bg-gray-200 text-black px-4 py-2 rounded-r-md hover:bg-gray-300"
          >
            +
          </button>
        </div>

        {/* Botón "Guardar Cambios" centrado */}
        <div className="flex justify-center mt-4">
          <button
            onClick={closeModal}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
