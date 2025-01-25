import React, { useState } from 'react';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';

const RegistrationForm = ({ handleRegister }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    calle: '',
    numero: '',
    codigoPostal: '',
    email: '',
    password: '',
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = () => {
    handleRegister(formData);
  };

  return (
    <div>
      {step === 1 && (
        <Step1Form data={formData} updateFormData={updateFormData} handleNext={handleNext} />
      )}
      {step === 2 && (
        <Step2Form
          data={formData}
          updateFormData={updateFormData}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      )}
      {step === 3 && (
        <Step3Form
          data={formData}
          updateFormData={updateFormData}
          handlePrevious={handlePrevious}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default RegistrationForm;
