import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ErrorMessage from "../../ErrorMessage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


type ContactFormInputs = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ContactFormInputs> = data => {
    toast.success('Contacto guardado con éxito!');
    console.log(data);
  };

  return (
    <div className="bg-gradient-to-b from-cyan-700 to-cyan-900 h-full min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md px-6 py-8 rounded-lg mx-10">
        <h1 className="text-5xl font-extrabold text-center mb-6">Formulario de Contacto</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name Field */}
          <div className="mt-4">
            <label className="text-3xl font-bold" htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              className="border-2 border-gray-300 p-2 w-full mt-2"
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && (
              <div className="flex justify-center font-extrabold text-red-600 text-2xl mt-2">
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label className="text-3xl font-bold" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Tu Email"
              className="border-2 border-gray-300 p-2 w-full mt-2"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <div className="flex justify-center font-extrabold text-red-600 text-2xl mt-2">
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              </div>
            )}
          </div>

          {/* Phone Field */}
          <div className="mt-4">
            <label className="text-3xl font-bold" htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              type="tel"
              placeholder="Tu Número de Teléfono"
              className="border-2 border-gray-300 p-2 w-full mt-2"
              {...register("phone", { required: "El teléfono es obligatorio" })}
            />
            {errors.phone && (
              <div className="flex justify-center font-extrabold text-red-600 text-2xl mt-2">
                <ErrorMessage>{errors.phone.message}</ErrorMessage>
              </div>
            )}
          </div>

          {/* Message Field */}
          <div className="mt-4">
            <label className="text-3xl font-bold" htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              placeholder="Tu Mensaje"
              className="border-2 border-gray-300 p-2 w-full mt-2"
              {...register("message", { required: "El mensaje es obligatorio" })}
            />
            {errors.message && (
              <div className="flex justify-center font-extrabold text-red-600 text-2xl mt-2">
                <ErrorMessage>{errors.message.message}</ErrorMessage>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6 space-x-4">
            <button
              type="submit"
              className="flex-1 p-2 text-2xl rounded-lg font-bold text-white bg-cyan-600 hover:bg-cyan-800"
            >
              Guardar Contacto
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 p-2 text-2xl rounded-lg font-bold text-white bg-gray-600 hover:bg-gray-800"
            >
              Volver al Menú
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ContactForm;
