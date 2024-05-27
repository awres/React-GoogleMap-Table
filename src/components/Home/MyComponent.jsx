import React, { useState, useEffect } from 'react';
import './style.css';
import './Map.jsx';
import { useTextContext } from './TextContext.jsx';
import batteryFull from './images/batteryFull.png';
import batteryLow from './images/batteryLow.png';
import batteryHalf from './images/batteryHalf.png';
import base from './images/base.png';
import car from './images/car.png';
import speaker from './images/speaker.png';
import idle from './images/idle.png';
import voice from './images/voice.png';
import data1 from './images/data1.png';
import sila1 from './images/sila1.png';
import sila2 from './images/sila2.png';
import sila3 from './images/sila3.png';

/**
 * MyComponent jest komponentem funkcyjnym w React, który renderuje tabelę
 * z danymi pobranymi z serwera oraz ikonami reprezentującymi różne wartości.
 */

const MyComponent = () => {
  // Deklaracja hooka useState do zarządzania stanem komponentu
  const { setText, text } = useTextContext(); // Deklaracja hooka useContext z pliku TextContext.jsx
  const [data, setData] = useState([]); // Deklaracja stanu lokalnego dla danych

  // Efekt pobierający dane z serwera i ustawiający je w stanie komponentu
  useEffect(() => {
    // Tworzenie dynamicznego skryptu dla sorttable.js
    const script = document.createElement('script');
    script.src = "https://www.kryogenix.org/code/browser/sorttable/sorttable.js";
    script.async = true;
    document.body.appendChild(script);

    // Funkcja pobierająca dane z serwera i ustawiająca je w stanie komponentu
    const fetchData = async () => {
      try {
        // Wywołanie endpointa API w celu pobrania danych
        const response = await fetch('http://localhost:8080/radios/');
        const jsonData = await response.json(); // Konwersja odpowiedzi na obiekt JSON
        console.log('Pobrane dane:', jsonData); // Logowanie pobranych danych do konsoli
        setData(jsonData); // Ustawienie pobranych danych w stanie komponentu
      } catch (error) {
        console.error('Error w fetchowaniu:', error); // Obsługa błędu w przypadku niepowodzenia żądania
      }
    };

    fetchData(); // Wywołanie funkcji pobierającej dane

    // Ustawienie interwału odświeżania danych co 5 sekund
    const intervalId = setInterval(fetchData, 5000);

    // Czyszczenie interwału po zakończeniu działania komponentu
    return () => clearInterval(intervalId);
  }, []);

  // Obsługa kliknięcia w wiersz tabeli
  const handleRowClick = (name) => {
    console.log('Kliknięto wiersz:', name); // Logowanie klikniętego wiersza do konsoli
    setText(name); // Ustawienie tekstu klikniętego wiersza za pomocą funkcji setText z hooka useTextContext
  };


  // Funkcja zwracająca ikonę baterii na podstawie jej poziomu
  const getBatteryIcon = (level) => {
    if (level > 35 && level <= 75) return batteryHalf;
    if (level >= 0 && level <= 35) return batteryLow;
    else return batteryFull;
  };

  // Funkcja zwracająca ikonę typu na podstawie jego nazwy
  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'basestation':
        return base;
      case 'car':
        return car;
      case 'portable':
        return speaker;
    }
  };

  // Funkcja zwracająca ikonę trybu pracy na podstawie jego nazwy
  const getWorkingModeIcon = (mode) => {
    switch (mode.toLowerCase()) {
      case 'idle':
        return idle;
      case 'voice':
        return voice;
      case 'data':
        return data1;
    }
  };

  // Funkcja zwracająca ikonę siły sygnału na podstawie jej poziomu
  const getStrengthIcon = (strength) => {
    if (strength >= 0 && strength <= 4) return sila1;
    if (strength >= 5 && strength <= 7) return sila2;
    if (strength >= 8 && strength <= 10) return sila3;
  };

  return (
    <>
      <div className="all">
        <div className="box">
          {/* Placeholdery */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="container">
          <div className="rwd-table-wrapper">
            {/* Tabela wyświetlająca dane */}
            <table className="rwd-table sortable">
              <tbody>
                {/* Nagłówki tabeli */}
                <tr>
                  <th>⧥ ID</th>
                  <th>Æ Name</th>
                  <th>📻 Type</th>
                  <th>🏷 Serial Number</th>
                  <th>🕪 Strength</th>
                  <th>🔋 Battery Level</th>
                  <th>♵ Working Mode</th>
                </tr>
                {/* Mapowanie danych na wiersze tabeli */}
                {data.map((wypisz, index) => (
                // Tworzenie wierszy tabeli na podstawie danych
                  <tr
                    key={index} // Unikalny klucz dla każdego wiersza
                    className={wypisz.Id === text ? 'highlighted-row' : ''} // Dodawanie klasy CSS dla zaznaczonego wiersza
                    onClick={() => handleRowClick(wypisz.Name)} // Obsługa kliknięcia w wiersz
                  >
                    {/* Komórki wiersza */}
                    <td data-th="ID">{wypisz.Id}</td>
                    <td data-th="Name">{wypisz.Name}</td>
                    <td data-th="Type">
                      {/* Ikona typu */}
                      <img
                        src={getTypeIcon(wypisz.Type)} // Pobieranie odpowiedniej ikony na podstawie typu
                        alt={wypisz.Type} // Tekst alternatywny dla ikony
                        className="type-icon" // Dodanie klasy CSS
                      />
                    </td>
                    <td data-th="Serial Number">{wypisz.SerialNumber}</td>
                    <td data-th="Strength">
                      {/* Ikona siły sygnału */}
                      <img
                        src={getStrengthIcon(wypisz.Strength)} // Pobieranie odpowiedniej ikony na podstawie siły sygnału
                        alt={`Strength ${wypisz.Strength}`} // Tekst alternatywny dla ikony
                        className="strength-icon" // Dodanie klasy CSS
                      />
                    </td>
                    <td data-th="Battery Level">
                      {/* Ikona poziomu baterii */}
                      <img
                        src={getBatteryIcon(wypisz.BatteryLevel)} // Pobieranie odpowiedniej ikony na podstawie poziomu baterii
                        alt="Battery Level" // Tekst alternatywny dla ikony
                        className="battery-icon" // Dodanie klasy CSS
                      />
                    </td>
                    <td data-th="Working Mode">
                      {/* Ikona trybu pracy */}
                      <img
                        src={getWorkingModeIcon(wypisz.WorkingMode)} // Pobieranie odpowiedniej ikony na podstawie trybu pracy
                        alt={wypisz.WorkingMode} // Tekst alternatywny dla ikony
                        className="working-mode-icon" // Dodanie klasy CSS
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyComponent;