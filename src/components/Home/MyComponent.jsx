import React, { useState, useEffect } from 'react';
import './style.css'
import './Map.jsx'
import { useTextContext } from './TextContext.jsx';


const MyComponent = () => {
  const { setText, text } = useTextContext(); // Pobieranie tekstu z kontekstu
  const [data, setData] = useState([]); // Stan przechowujący pobrane dane radio
  

  /**
   * Funkcja useEffect():
        useEffect używany do pobrania danych radio z serwera przy renderowaniu komponentu.
        Wykorzystuje również useEffect do dynamicznego dodania skryptu sorttable.js do dokumentu.
   */
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.kryogenix.org/code/browser/sorttable/sorttable.js";
    script.async = true;  
    document.body.appendChild(script);

    /**
     * fetchData: Funkcja asynchroniczna(async), używana do pobierania danych radio z serwera.
     */
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/radios/');
        const jsonData = await response.json();
        console.log('Pobrane dane:', jsonData); 
        setData(jsonData); // Aktualizacja stanu danych radio
      } catch (error) {
        console.error('Error w fetchowaniu:', error);
      }
    };



    fetchData();
  }, []);

  /**
   * Obsługa zdarzenia kliknięcia na wiersz tabeli
   */
  const handleRowClick = (name) => {
    console.log('Kliknięto wiersz:', name);
    setText(name); 
  };

   // Renderowanie komponentu
  return (
    <>
    
  <div>
    <div className="box">
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
  <table className="rwd-table sortable">
    <tbody>
      <tr>
        <th>⧥ ID</th>
        <th>Æ Name</th>
        <th>📻 Type</th>
        <th>🏷 Serial Number</th>
        <th>🕪 Strength</th>
        <th>🔋 Battery Level</th>
        <th>♵ Working Mode</th>
      </tr>
      {/* Mapowanie danych na wiersze tabeli  */}
      {data.map((wypisz, index) => (
      <tr key={index} className={wypisz.Id === text ? 'highlighted-row' : ''}
      onClick={() => handleRowClick(wypisz.Name)}>
        <td data-th="ID">{wypisz.Id}</td>
        <td data-th="Name">{wypisz.Name}</td>
        <td data-th="Type">{wypisz.Type}</td>
        <td data-th="Serial Number">{wypisz.SerialNumber}</td>
        <td data-th="Strength">{wypisz.Strength}</td>
        <td data-th="Battery Level">{wypisz.BatteryLevel}</td>
        <td data-th="Working Mode">{wypisz.WorkingMode}</td>
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