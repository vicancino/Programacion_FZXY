import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ErrorMessage from "../../ErrorMessage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


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

  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-b from-cyan-900 to-black h-full min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md px-6 py-8 rounded-lg mx-10">
        <h1 className="text-5xl font-extrabold text-center mb-6">{t('contact_form')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Nombre */}
          <div className="mt-4">
            <label className="text-3xl font-bold" htmlFor="name">{t('name')}</label>
            <input
              id="name"
              type="text"
              placeholder={t('your_name')}
              className="border-2 border-gray-300 p-2 w-full mt-2"
              {...register("name", { required: t('nombre_obli_cont') })}
            />
            {errors.name && (
              <div className="flex justify-center font-extrabold text-red-600 text-2xl mt-2">
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mt-4">
            <label className="text-3xl font-bold" htmlFor="email">{t('email')}</label>
            <input
              id="email"
              type="email"
              placeholder={t('email')}
              className="border-2 border-gray-300 p-2 w-full mt-2"
              {...register("email", {
                required: t('email_obli_cont'),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: t('email_no_valido'),
                },
              })}
            />
            {errors.email && (
              <div className="flex justify-center font-extrabold text-red-600 text-2xl mt-2">
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              </div>
            )}
          </div>

          {/* Telefono*/}
          <div className="mt-4">
            <label className="text-3xl font-bold" htmlFor="phone">{t('phone')}</label>
            <input
              id="phone"
              type="tel"
              placeholder={t('phone')}
              className="border-2 border-gray-300 p-2 w-full mt-2"
              {...register("phone", { required: t('telefono_obli_cont') })}
            />
            {errors.phone && (
              <div className="flex justify-center font-extrabold text-red-600 text-2xl mt-2">
                <ErrorMessage>{errors.phone.message}</ErrorMessage>
              </div>
            )}
          </div>

          {/* Mensaje*/}
          <div className="mt-4">
            <label className="text-3xl font-bold" htmlFor="message">{t('message')}</label>
            <textarea
              id="message"
              placeholder={t('your_message')}
              className="border-2 border-gray-300 p-2 w-full mt-2"
              {...register("message", )}
            />
            {errors.message && (
              <div className="flex justify-center font-extrabold text-red-600 text-2xl mt-2">
                <ErrorMessage>{errors.message.message}</ErrorMessage>
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-between mt-6 space-x-4">
            <button
              type="submit"
              className="flex-1 p-2 text-2xl rounded-lg font-bold text-white bg-cyan-600 hover:bg-cyan-800"
            >
              {t('save_contact')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 p-2 text-2xl rounded-lg font-bold text-white bg-gray-600 hover:bg-gray-800"
            >
              {t('back_to_menu')}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ContactForm;
