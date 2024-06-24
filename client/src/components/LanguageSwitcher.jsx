import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="text-center mt-0">
      <button onClick={() => changeLanguage('es')} className="mx-2 p-1 text-l text-white rounded bg-cyan-900 hover:opacity-70">
        Español
      </button>
      <button onClick={() => changeLanguage('en')} className="mx-2 p-1 text-l bg-cyan-900 text-white rounded hover:opacity-70">
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
