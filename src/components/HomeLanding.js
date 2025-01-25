import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from './Header';
import ProductCard from './ProductCard';

const API_URL = process.env.REACT_APP_API_URL;

const initialCarrousel = [
  { id: 101, nombre: 'Choclo', emoji: '🌽', cantidadPorKg: 4 },
  { id: 102, nombre: 'Brócoli', emoji: '🥦', cantidadPorKg: 6 },
  { id: 103, nombre: 'Batata', emoji: '🍠', cantidadPorKg: 3 },
  { id: 104, nombre: 'Papa', emoji: '🥔', cantidadPorKg: 5 },
  { id: 105, nombre: 'Berenjena', emoji: '🍆', cantidadPorKg: 3 },
  { id: 106, nombre: 'Champiñón', emoji: '🍄', cantidadPorKg: 8 },
  { id: 107, nombre: 'Ajo', emoji: '🧄', cantidadPorKg: 12 },
  { id: 108, nombre: 'Pimiento', emoji: '🫑', cantidadPorKg: 3 },
  { id: 109, nombre: 'Lechuga', emoji: '🥬', cantidadPorKg: 15 },
  { id: 110, nombre: 'Cebollas', emoji: '🧅', cantidadPorKg: 6 },
];

function HomeLanding() {
  const [verduras, setVerduras] = useState([]);
  const [filteredCarrousel, setFilteredCarrousel] = useState(initialCarrousel);

  const fetchSubscription = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Usuario no autenticado. Por favor inicia sesión.');
        return;
      }

      const response = await axios.get(`${API_URL}/api/subscription`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedVerduras = response.data.subscription.map((item) => {
        const matchedItem = initialCarrousel.find((c) => c.id === item.id);
        return matchedItem ? { ...item, cantidadPorKg: matchedItem.cantidadPorKg } : item;
      });

      setVerduras(updatedVerduras);

      // Filtrar el carrusel
      const updatedCarrousel = initialCarrousel.filter(
        (carrouselItem) => !updatedVerduras.some((verdura) => verdura.id === carrouselItem.id)
      );

      setFilteredCarrousel(updatedCarrousel);
    } catch (error) {
      console.error('Error al cargar la suscripción:', error);
      alert('No se pudo cargar la suscripción.');
    }
  }, []);

  const initializeSubscription = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Usuario no autenticado. Por favor inicia sesión.');
        return;
      }

      await axios.post(`${API_URL}/api/subscription/init`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchSubscription();
    } catch (error) {
      console.error('Error al inicializar la suscripción:', error);
      alert('No se pudo inicializar la suscripción.');
    }
  }, [fetchSubscription]);

  const handleAddVerdura = async (item) => {
    if (verduras.length >= 6) {
      alert('¡Máximo de 6 verduras!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const producto = { id: item.id, nombre: item.nombre, emoji: item.emoji, peso: 500 };

      await axios.post(`${API_URL}/api/subscription/add`, producto, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedItem = { ...producto, cantidadPorKg: item.cantidadPorKg };
      setVerduras((prev) => [...prev, updatedItem]);

      // Actualizar el carrusel
      setFilteredCarrousel((prev) => prev.filter((i) => i.id !== item.id));
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert('No se pudo agregar el producto a la suscripción.');
    }
  };

  const handleRemoveVerdura = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/subscription/remove`, { id }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const removedProduct = verduras.find((item) => item.id === id);
      setVerduras((prev) => prev.filter((item) => item.id !== id));

      // Actualizar el carrusel
      setFilteredCarrousel((prev) => [...prev, removedProduct]);
    } catch (error) {
      console.error('Error al eliminar la verdura:', error);
      alert('No se pudo eliminar la verdura de la suscripción.');
    }
  };

  useEffect(() => {
    initializeSubscription();
  }, [initializeSubscription]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col mt-[4rem]">
        <div className="flex-none" style={{ height: '15%' }}>
          <h2 className="text-center text-3xl font-bold text-green-600 py-4">
            Tu Suscripción
          </h2>
        </div>
        <div className="flex-none overflow-y-auto bg-gray-50 pb-4" style={{ height: '55%' }}>
          <ProductsGrid verduras={verduras} onRemove={handleRemoveVerdura} />
        </div>
        <div className="flex-none bg-gray-100 mt-4" style={{ height: '30%' }}>
          <CarrouselResponsive items={filteredCarrousel} onClickItem={handleAddVerdura} />
        </div>
      </div>
    </div>
  );
}

function ProductsGrid({ verduras, onRemove }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {verduras.map((item) => (
        <ProductCard key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
}

function CarrouselResponsive({ items, onClickItem }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onClickItem(item)}
          className="cursor-pointer text-center"
        >
          <div className="text-4xl">{item.emoji}</div>
          <div className="text-sm">{item.nombre}</div>
        </div>
      ))}
    </div>
  );
}

export default HomeLanding;
