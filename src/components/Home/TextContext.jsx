import React, { createContext, useState, useContext } from 'react';

/**
 * createContext(): Funkcja używana do tworzenia nowego kontekstu. Tworzy obiekt kontekstu
 */
const TextContext = createContext();
export const TextProvider = ({ children }) => {

  /**
   * useState(''): Funkcja useState jest używana do przechowywania aktualnego stanu tekstu w komponencie. 
   */
  const [text, setText] = useState('');

  
  return (
    /**
     * <TextContext.Provider value={{ text, setText }}> - zapewnia im dostęp do wartości kontekstu.
     */
    <TextContext.Provider value={{ text, setText }}>
      {children}
      {/**
       - TextContext.Provider: Komponent dostarczający kontekst dla komponentów. Udostępnia wartość kontekstu, która zawiera tekst oraz funkcję do ustawiania tekstu. */}
    </TextContext.Provider>
  );
};

export const useTextContext = () => useContext(TextContext);