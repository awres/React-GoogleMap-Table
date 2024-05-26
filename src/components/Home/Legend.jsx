/**
 * Importy:
    -React, {useState, useEffect}: Biblioteka React.
    -./Legend.css: style.
    -anotherSymbol,
     anotherSymbol1,
     checked,
     checked2,
     checked3,
     BaseStationMarkerR,
     CarMarkerR,
     PortableMarkerR,
     BaseStationMarkerY,
     CarMarkerY, 
     PortableMarkerY,
     BaseStationMarkerG,
     CarMarkerG,
     PortableMarkerG: ikony 
*/

import React, { useState } from 'react';
import './Legend.css';

import checked from "./images/CarBaseF.png";
import checked2 from "./images/baseBaseF.png";
import checked3 from "./images/SpeakerBaseF.png";
import BaseStationMarkerR from "./images/badBatteryBase.png";
import CarMarkerR from "./images/badBatteryCar.png";
import PortableMarkerR from "./images/badBatterySpeaker.png";
import BaseStationMarkerY from "./images/midBatteryBase.png";
import CarMarkerY from "./images/midBatteryCar.png";
import PortableMarkerY from "./images/midBatterySpeaker.png";
import BaseStationMarkerG from "./images/goodBatteryBase.png";
import CarMarkerG from "./images/goodBatteryCar.png";
import PortableMarkerG from "./images/goodBatterySpeaker.png";


/**
    * Funkcja Legend jest komponentem funkcyjnym w React, który używa hooka useState do zarządzania swoim stanem lokalnym. 
    * useState(false) - useState(false) jest hookiem używanym w React do przechowywania stanu w komponentach funkcyjnych. W tym przypadku tworzy zmienną isOpen. 
      isOpen będzie służyć do określania, czy legendy są otwarte czy zamknięte.
     */
const Legend = () => {
    const [isOpen, setIsOpen] = useState(false);
  
/**
    * Jest to funkcja, która jest wywoływana w momencie kliknięcia przycisku lub innego zdarzenia, które ma zmienić stan legendy.
    * toggleLegend używa funkcji setIsOpen do aktualizacji wartości isOpen. Za każdym razem, gdy jest wywoływana, setIsOpen(!isOpen) przełącza stan isOpen na przeciwny. 
    * Jeśli isOpen jest false, setIsOpen(true) ustawia isOpen na true, co otwiera legendę. Jeśli isOpen jest true, setIsOpen(false) ustawia isOpen na false, co zamyka legendę.
*/
    const toggleLegend = () => {
      setIsOpen(!isOpen);
    };

  return (
    <div className={`legend ${isOpen ? 'open' : 'closed'}`}>
      <button className="legend-toggle" onClick={toggleLegend}>
        {isOpen ? 'Hide Legend' : 'Show Legend'}
      </button>
      {isOpen && (
        <div className="legend-content">
          <h3>Legend</h3>
          <div className="legend-item">
            <img src={checked} alt="Checked Car" />
            <span>Selected Car</span>
          </div>
          <div className="legend-item">
            <img src={checked2} alt="Checked Base Station" />
            <span>Selected Base Station</span>
          </div>
          <div className="legend-item">
            <img src={checked3} alt="Checked Portable" />
            <span>Selected Portable</span>
          </div>
          <div className="legend-item">
            <img src={CarMarkerR} alt="Low Battery Car" />
            <span>Low Battery Car</span>
          </div>
          <div className="legend-item">
            <img src={CarMarkerY} alt="Medium Battery Car" />
            <span>Medium Battery Car</span>
          </div>
          <div className="legend-item">
            <img src={CarMarkerG} alt="High Battery Car" />
            <span>High Battery Car</span>
          </div>
          <div className="legend-item">
            <img src={BaseStationMarkerR} alt="Low Battery Base Station" />
            <span>Low Battery Base Station</span>
          </div>
          <div className="legend-item">
            <img src={BaseStationMarkerY} alt="Medium Battery Base Station" />
            <span>Medium Battery Base Station</span>
          </div>
          <div className="legend-item">
            <img src={BaseStationMarkerG} alt="High Battery Base Station" />
            <span>High Battery Base Station</span>
          </div>
          <div className="legend-item">
            <img src={PortableMarkerR} alt="Low Battery Portable" />
            <span>Low Battery Portable</span>
          </div>
          <div className="legend-item">
            <img src={PortableMarkerY} alt="Medium Battery Portable" />
            <span>Medium Battery Portable</span>
          </div>
          <div className="legend-item">
            <img src={PortableMarkerG} alt="High Battery Portable" />
            <span>High Battery Portable</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Legend;