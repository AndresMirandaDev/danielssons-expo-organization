import React, { createContext, useEffect, useState } from 'react';

import authStorage from '../auth/storage';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('sv');

  const options = [
    {
      icon: '🇬🇧',
      name: 'English',
      code: 'en',
      _id: 1,
    },
    {
      icon: '🇪🇸',
      name: 'Español',
      code: 'es',
      _id: 2,
    },
    {
      icon: '🇸🇪',
      name: 'Svenska',
      code: 'sv',
      _id: 3,
    },
  ];

  const updateLanguage = (lang) => {
    setLanguage(lang);
  };

  const value = {
    language,
    options,
    updateLanguage,
  };

  return (
    <LanguageContext.Provider value={value} >
      {children}
    </LanguageContext.Provider>
  );
};
