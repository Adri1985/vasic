import React from 'react';

function ProductCard({ item, onUpdatePeso, onRemove }) {
  const { id, nombre, emoji, peso } = item; // Extraer datos del producto

  // Incrementar peso y llamar al método para actualizar en el backend
  const incrementarPeso = () => {
    onUpdatePeso(id, peso + 250); // Aumentar 250 gramos
  };

  // Decrementar peso o eliminar producto si llega a 0
  const decrementarPeso = () => {
    if (peso > 250) {
      onUpdatePeso(id, peso - 250); // Disminuir 250 gramos
    } else {
      onRemove(id); // Eliminar producto si el peso llega a 0
    }
  };

  return (
    <div
      className="border rounded-lg shadow-md p-2 flex flex-col items-center justify-between"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Emoji */}
      <div className="text-6xl mb-2">{emoji}</div>

      {/* Nombre */}
      <p className="font-semibold text-md mb-2">{nombre}</p>

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
