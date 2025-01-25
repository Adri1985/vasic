import React from 'react';

const Step1Form = ({ data, updateFormData, handleNext }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">¿Cómo te llamas? - 1/3</h2>
      <div className="mb-4">
        <label className="block mb-1">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={data.nombre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Apellido</label>
        <input
          type="text"
          name="apellido"
          value={data.apellido}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <button onClick={handleNext} className="bg-green-600 text-white py-2 px-4 rounded">
        Siguiente
      </button>
    </div>
  );
};

export default Step1Form;
