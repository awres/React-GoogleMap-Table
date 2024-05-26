/**
 * Importy:
    - React, { useState }: Biblioteka React.
    - ReactDOM from 'react-dom/client': Biblioteka React DOM do renderowania komponentów w przeglądarce.
    - MyComponent: Komponent aplikacji odpowiedzialny za wyświetlanie treści.
    - Map: Komponent aplikacji odpowiedzialny za wyświetlanie mapy.
    - TextProvider: Komponent zapewniający dostęp do tekstu dla komponentów podrzędnych.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import MyComponent from './components/Home/MyComponent.jsx';
import Map from './components/Home/Map.jsx';
import './index.css';
import { TextProvider } from './components/Home/TextContext.jsx';


/**
 * Główna funkcja komponentu, która renderuje aplikację.
 * Opakowuje komponenty Map i MyComponent w TextProvider, aby udostępnić im kontekst tekstu.
 * React.StrictMode pomaga w wykrywaniu potencjalnych problemów w aplikacji.
 */
function Main() {
  return (
    <React.StrictMode>
      <TextProvider>
        <Map />
        <MyComponent />
      </TextProvider>
    </React.StrictMode>
  );
}

// Renderowanie głównego komponentu aplikacji
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
