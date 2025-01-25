import React from 'react';

const Step2Form = ({ data, updateFormData, handleNext, handlePrevious }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">¿Dónde enviamos? - 2/3</h2>
      <div className="mb-4">
        <label className="block mb-1">Calle</label>
        <input
          type="text"
          name="calle"
          value={data.calle}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Número</label>
        <input
          type="text"
          name="numero"
          value={data.numero}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Código Postal</label>
        <input
          type="text"
          name="codigoPostal"
          value={data.codigoPostal}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="flex justify-between">
        <button onClick={handlePrevious} className="bg-gray-600 text-white py-2 px-4 rounded">
          Anterior
        </button>
        <button onClick={handleNext} className="bg-green-600 text-white py-2 px-4 rounded">
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Step2Form;
