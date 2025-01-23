import React, { useState, useEffect } from 'react';
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
  const [verduras, setVerduras] = useState([]); // Verduras en la suscripción del usuario
  const [carrousel, setCarrousel] = useState(initialCarrousel);

  // Inicializar la suscripción del usuario
  const initializeSubscription = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Usuario no autenticado. Por favor inicia sesión.');
        return;
      }

      // Llamar al endpoint /init
      await axios.post(
        'http://localhost:3000/api/subscription/init',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Suscripción inicializada con éxito');
      fetchSubscription(); // Cargar la suscripción después de inicializarla
    } catch (error) {
      console.error('Error al inicializar la suscripción:', error);
      alert('No se pudo inicializar la suscripción.');
    }
  };

  // Obtener la suscripción del usuario
  const fetchSubscription = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Usuario no autenticado. Por favor inicia sesión.');
        return;
      }

      const response = await axios.get('http://localhost:3000/api/subscription', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVerduras(response.data.subscription); // Actualizar las verduras con los datos del backend
    } catch (error) {
      console.error('Error al cargar la suscripción:', error);
      alert('No se pudo cargar la suscripción.');
    }
  };

  // Agregar un producto a la suscripción
  const handleAddVerdura = async (item) => {
    if (verduras.length >= 6) {
      alert('¡Máximo de 6 verduras!');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
  
      // Producto con peso inicial
      const producto = {
        id: item.id,
        nombre: item.nombre,
        emoji: item.emoji,
        peso: 500, // Peso inicial
      };
  
      console.log('Producto enviado al backend:', producto);
  
      // Enviar al backend
      await axios.post('http://localhost:3000/api/subscription/add', producto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Actualizar estado
      setVerduras((prev) => [...prev, producto]);
      setCarrousel((prev) => prev.filter((i) => i.id !== item.id));
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert('No se pudo agregar el producto a la suscripción.');
    }
  };
  

  // Actualizar el peso del producto en la suscripción
  const handleUpdatePeso = async (id, nuevoPeso) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/api/subscription/update',
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
      alert('No se pudo actualizar el peso del producto.');
    }
  };

  // Eliminar un producto de la suscripción
  const handleRemoveVerdura = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/api/subscription/remove',
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
      alert('No se pudo eliminar la verdura de la suscripción.');
    }
  };

  // Cargar la suscripción al montar el componente
  useEffect(() => {
    initializeSubscription();
  }, []);

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
