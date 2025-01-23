import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from './Header';
import ProductCard from './ProductCard';

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
  const [verduras, setVerduras] = useState([]);
  const [carrousel, setCarrousel] = useState(initialCarrousel);

  const initializeSubscription = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Usuario no autenticado. Por favor inicia sesión.');
        return;
      }

      await axios.post(
        'https://vasci-be.onrender.com/api/subscription/init',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchSubscription();
    } catch (error) {
      console.error('Error al inicializar la suscripción:', error);
    }
  }, []);

  const fetchSubscription = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Usuario no autenticado. Por favor inicia sesión.');
        return;
      }

      const response = await axios.get('https://vasci-be.onrender.com/api/subscription', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVerduras(response.data.subscription);
    } catch (error) {
      console.error('Error al cargar la suscripción:', error);
    }
  }, []);

  useEffect(() => {
    initializeSubscription();
  }, [initializeSubscription]);

  const handleAddVerdura = async (item) => {
    if (verduras.length >= 6) {
      alert('¡Máximo de 6 verduras!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const producto = { ...item, peso: 500 };

      await axios.post('https://vasci-be.onrender.com/api/subscription/add', producto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVerduras((prev) => [...prev, producto]);
      setCarrousel((prev) => prev.filter((i) => i.id !== item.id));
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  const handleUpdatePeso = async (id, nuevoPeso) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://vasci-be.onrender.com/api/subscription/update',
        { id, peso: nuevoPeso },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVerduras((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, peso: nuevoPeso } : item
        )
      );
    } catch (error) {
      console.error('Error al actualizar el peso:', error);
    }
  };

  const handleRemoveVerdura = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://vasci-be.onrender.com/api/subscription/remove',
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const removedProduct = verduras.find((item) => item.id === id);
      setVerduras((prev) => prev.filter((item) => item.id !== id));
      setCarrousel((prev) => [...prev, removedProduct]);
    } catch (error) {
      console.error('Error al eliminar la verdura:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col mt-[4rem]">
        <div className="flex-none" style={{ height: '20%' }}>
          <h2 className="text-center text-3xl font-bold text-green-600 py-4">
            Tu Suscripción
          </h2>
        </div>
        <div className="flex-none overflow-hidden bg-gray-50 pb-4" style={{ height: '50%' }}>
          <ProductsGrid
            verduras={verduras}
            onUpdatePeso={handleUpdatePeso}
            onRemove={handleRemoveVerdura}
          />
        </div>
        <div className="flex-none bg-gray-100 mt-4" style={{ height: '30%' }}>
          <CarrouselResponsive items={carrousel} onClickItem={handleAddVerdura} />
        </div>
      </div>
    </div>
  );
}

function ProductsGrid({ verduras, onUpdatePeso, onRemove }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {verduras.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          onUpdatePeso={onUpdatePeso}
          onRemove={onRemove}
        />
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
