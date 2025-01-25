import React from 'react';

const Step3Form = ({ data, updateFormData, handlePrevious, handleSubmit }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tus Credenciales - 3/3</h2>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="flex justify-between">
        <button onClick={handlePrevious} className="bg-gray-600 text-white py-2 px-4 rounded">
          Anterior
        </button>
        <button onClick={handleSubmit} className="bg-green-600 text-white py-2 px-4 rounded">
          Registrarme
        </button>
      </div>
    </div>
  );
};

export default Step3Form;
