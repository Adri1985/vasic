import React, { useState } from 'react';
import Header from './Header';
import ProductCard from './ProductCard';

const initialVerduras = [
  { id: 1, nombre: 'Tomates', emoji: '🍅' },
  { id: 2, nombre: 'Cebollas', emoji: '🧅' },
  { id: 3, nombre: 'Zanahorias', emoji: '🥕' },
  { id: 4, nombre: 'Lechuga', emoji: '🥬' },
];

const initialCarrousel = [
  { id: 101, nombre: 'Choclo', emoji: '🌽' },
  { id: 102, nombre: 'Brócoli', emoji: '🥦' },
  { id: 103, nombre: 'Batata', emoji: '🍠' },
  { id: 104, nombre: 'Papa', emoji: '🥔' },
  { id: 105, nombre: 'Berenjena', emoji: '🍆' },
  { id: 106, nombre: 'Champiñón', emoji: '🍄' },
  { id: 107, nombre: 'Ajo', emoji: '🧄' },
  { id: 108, nombre: 'Pimiento', emoji: '🫑' },
  { id: 109, nombre: 'Arvejas', emoji: '🫘' },
  { id: 110, nombre: 'Zucchini', emoji: '🥒' },
];

function HomeLanding() {
  const [verduras, setVerduras] = useState(initialVerduras);
  const [carrousel, setCarrousel] = useState(initialCarrousel);

  const handleAddVerdura = (item) => {
    if (verduras.length >= 6) {
      alert('¡Máximo de 6 verduras!');
      return;
    }
    setVerduras((prev) => [...prev, item]);
    setCarrousel((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleRemoveVerdura = (item) => {
    setVerduras((prev) => prev.filter((v) => v.id !== item.id));
    setCarrousel((prev) => [...prev, item]);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header fijo */}
      <Header />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col mt-[4rem]">
        {/* Título (20%) */}
        <div className="flex-none" style={{ height: '20%' }}>
          <h2 className="text-center text-3xl font-bold text-green-600 py-4">
            Tu Suscripción
          </h2>
        </div>

        {/* Productos (50%) */}
        <div
          className="flex-none overflow-hidden bg-gray-50 pb-4"
          style={{ height: '50%' }}
        >
          <ProductsGrid verduras={verduras} onRemoveVerdura={handleRemoveVerdura} />
        </div>

        {/* Carrusel (30%) */}
        <div
          className="flex-none bg-gray-100 mt-4"
          style={{ height: '30%' }}
        >
          <CarrouselResponsive items={carrousel} onClickItem={handleAddVerdura} />
        </div>
      </div>
    </div>
  );
}

function ProductsGrid({ verduras, onRemoveVerdura }) {
  const n = verduras.length;
  const cols = Math.min(n, 3); // Máximo 3 columnas para pantallas pequeñas

  const gridStyle = {
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridAutoRows: 'minmax(0, 1fr)', // Ajusta dinámicamente las filas
    gap: '8px',
  };

  return (
    <div style={gridStyle}>
      {verduras.map((item) => (
        <ProductCard key={item.id} item={item} onRemove={onRemoveVerdura} />
      ))}
    </div>
  );
}

function CarrouselResponsive({ items, onClickItem }) {
  return (
    <div className="w-full h-full grid grid-cols-5 grid-rows-2 sm:grid-cols-10 sm:grid-rows-1 place-items-center gap-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onClickItem(item)}
          className="text-4xl cursor-pointer hover:scale-110 transition-transform flex flex-col items-center"
          title={item.nombre}
        >
          {item.emoji}
          <p className="text-sm mt-1">{item.nombre}</p>
        </div>
      ))}
    </div>
  );
}

export default HomeLanding;
