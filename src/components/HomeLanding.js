import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

const initialCarrousel = [
  { id: 101, nombre: 'Choclo', emoji: '🌽', cantidadPorKg: 4 },
  { id: 102, nombre: 'Brócoli', emoji: '🥦', cantidadPorKg: 6 },
  { id: 103, nombre: 'Batata', emoji: '🍠', cantidadPorKg: 4 },
  { id: 104, nombre: 'Papa', emoji: '🥔', cantidadPorKg: 5 },
  { id: 105, nombre: 'Berenjena', emoji: '🍆', cantidadPorKg: 4 },
  { id: 106, nombre: 'Champiñón', emoji: '🍄', cantidadPorKg: 8 },
  { id: 107, nombre: 'Ajo', emoji: '🧄', cantidadPorKg: 12 },
  { id: 108, nombre: 'Pimiento', emoji: '🫑', cantidadPorKg: 4 },
  { id: 109, nombre: 'Lechuga', emoji: '🥬', cantidadPorKg: 15 },
  { id: 110, nombre: 'Cebollas', emoji: '🧅', cantidadPorKg: 6 },
  { id: 111, nombre: 'Zanahoria', emoji: '🥕', cantidadPorKg: 4 },
];

function HomeLanding() {
  const [verduras, setVerduras] = useState([]); // Suscripción del usuario
  const [carrousel, setCarrousel] = useState([]); // Elementos disponibles en el carrusel
  const [loading, setLoading] = useState(false); // Estado de carga
  const [fetched, setFetched] = useState(false); // Estado para evitar bucles

  // Leer el token desde localStorage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // Leer el usuario desde localStorage

  // Obtener la suscripción del usuario
  const fetchSubscription = useCallback(async () => {
    if (!token) {
      console.error('Token no disponible.');
      return;
    }

    setLoading(true); // Iniciar la carga
    try {
      console.log("token que se envia en header", token);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/subscription`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Mapear los datos de la respuesta para actualizar las verduras con los datos del carrusel
      const updatedVerduras = response.data.subscription.map((item) => {
        const matchedItem = initialCarrousel.find((c) => c.id === item.id);
        return matchedItem ? { ...item, cantidadPorKg: matchedItem.cantidadPorKg } : item;
      });

      setVerduras(updatedVerduras);

      // Excluir los elementos de la suscripción del carrusel
      const filteredCarrousel = initialCarrousel.filter(
        (item) => !updatedVerduras.some((v) => v.id === item.id)
      );

      setCarrousel(filteredCarrousel);
    } catch (error) {
      console.error('Error al cargar la suscripción:', error);
    } finally {
      setLoading(false); // Finalizar la carga
      setFetched(true); // Cambiar el estado de `fetched` para evitar más ejecuciones
    }
  }, [token]);

  // Usar useEffect para llamar fetchSubscription solo cuando el token esté disponible
  useEffect(() => {
    if (token && user && !fetched) { // Solo ejecutar si no se ha realizado la carga
      fetchSubscription();
    }
  }, [token, user, fetched, fetchSubscription]); // `fetched` ahora controla las ejecuciones

  const handleAddVerdura = async (item) => {
    if (verduras.length >= 6) {
      alert('¡Máximo de 6 verduras!');
      return;
    }

    try {
      const producto = { id: item.id, nombre: item.nombre, emoji: item.emoji, peso: 500 };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/subscription/add`,
        producto,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedItem = { ...producto, cantidadPorKg: item.cantidadPorKg };
      setVerduras((prev) => [...prev, updatedItem]);
      setCarrousel((prev) => prev.filter((i) => i.id !== item.id));
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  const handleRemoveVerdura = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/subscription/remove`,
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
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
        <div className="flex-none" style={{ height: '15%' }}>
          <h2 className="text-center text-3xl font-bold text-green-600 py-4">
            Tu Suscripción
          </h2>
        </div>
        <div className="flex-none overflow-y-auto bg-gray-50 pb-4" style={{ height: '55%' }}>
          {loading ? (
            <div className="text-center">Cargando...</div>
          ) : (
            <ProductsGrid verduras={verduras} onRemove={handleRemoveVerdura} />
          )}
        </div>
        <div className="flex-none bg-gray-100 mt-4" style={{ height: '30%' }}>
          <CarrouselResponsive items={carrousel} onClickItem={handleAddVerdura} />
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
