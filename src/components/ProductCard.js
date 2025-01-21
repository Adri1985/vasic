import React, { useState } from 'react';

function ProductCard({ item, onRemove }) {
  const [peso, setPeso] = useState(500);

  const incrementarPeso = () => setPeso((prev) => prev + 250);

  const decrementarPeso = () => {
    const newPeso = peso - 250;
    if (newPeso <= 0) {
      onRemove(item);
    } else {
      setPeso(newPeso);
    }
  };

  return (
    <div
      className="border rounded-lg shadow-md p-2 flex flex-col items-center justify-between"
      style={{ width: '100%', height: '100%' }}
    >
      <div className="text-6xl mb-2">{item.emoji}</div>
      <p className="font-semibold text-md mb-2">{item.nombre}</p>
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
