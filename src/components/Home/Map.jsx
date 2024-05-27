// Importuje biblioteki React oraz wymagane komponenty i style
import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import './map.css';
import './MyComponent.jsx';
import { useTextContext } from './TextContext.jsx';
import Legend from './Legend.jsx';

// Importuje obrazy wykorzystywane jako ikony na mapie
import anotherSymbol from "./images/error.png";
import anotherSymbol1 from "./images/error1.png";

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




// Definiuje początkowe centrum mapy
const center = {
  lat: 50.047,
  lng: 19.94,
};

// Funkcja obliczająca odległość pomiędzy dwoma punktami za pomocą wzoru Haversine'a
const haversineDistance = (point1, point2) => {
  const toRadians = (angle) => angle * (Math.PI / 180);
  const R = 6371; 
  const lat1 = point1.lat;
  const lon1 = point1.lng;
  const lat2 = point2.lat;
  const lon2 = point2.lng;

/**
 * Oblicza odległość między dwoma punktami na powierzchni Ziemi przy użyciu wzoru Haversine.
 * @param {number} lat1, lat2 - Szerokość geograficzna punktów
 * @param {number} lon1, lon2 - Długość geograficzna punktów 
 */
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  // Oblicza centralny kąt między dwoma punktami na sferze (w radianach)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};



function Map() {
  // Pobiera i ustawia funkcję setText oraz zmienną text z kontekstu tekstowego
  const { setText } = useTextContext();
  const { text } = useTextContext();

  // Ładuje bibliotekę Google Maps (API KEY)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAbnOeBButjAIqOSf3dhOovloj20abEzps",
  });

  // Definiuje stany komponentu
  const [data, setData] = useState([]);
  const [nearestMarkers, setNearestMarkers] = useState([]);
  const [lines, setLines] = useState([]);
  const [map, setMap] = React.useState(null);
  const [mapCentered, setMapCentered] = useState(false);

  // Funkcja obsługująca kliknięcia na markery na mapie
  const handleMarkerClick = (name) => {
    console.log('Kliknięto na punkt:', name);

    const clickedMarker = data.find((item) => item.Name === name);
    if (!clickedMarker) return;

    

    // Oblicza odległości do innych markerów i sortuje je
    const distances = data
      .filter((item) => item.Name !== name)
      .map((item) => ({
        name: item.Name,
        type: item.Type,
        distance: haversineDistance(
          { lat: clickedMarker.Position.Lat, lng: clickedMarker.Position.Lon },
          { lat: item.Position.Lat, lng: item.Position.Lon }
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
    
    
    // Wybiera dwa najbliższe markery
    const nearestNames = distances.slice(0, 2).map(item => item.name);

    if (name === "") {
      setNearestMarkers(nearestNames);
    } else {
      setNearestMarkers([]);
    }

    const index = data.findIndex((item) => item.Name === name);
    console.log('Indeks wiersza:', index);
    setText(index + 1);

    createLines(clickedMarker);
  };

  

  /**
 * Funkcja createLines tworzy linie między klikniętymi markerami na mapie oraz oznacza ich długości
 * @param {object} clickedMarker - Kliknięty marker
 */
  const createLines = (clickedMarker) => {
    const clickedMarkerCoords = { 
        lat: parseFloat(clickedMarker.Position.Lat), 
        lng: parseFloat(clickedMarker.Position.Lon) 
    };

    setLines(prevLines => {
        console.log("Prev Lines:", prevLines);

        if (prevLines.length > 0) {
            const firstPoint = prevLines[0][0]; // Pierwszy zaznaczony punkt
            const lastLine = prevLines[prevLines.length - 1];
            const lastPoint = lastLine[lastLine.length - 1];

            console.log("First Point:", firstPoint);
            console.log("Last Point:", lastPoint);
            console.log("Clicked Marker Coords:", clickedMarkerCoords);

            if (firstPoint && lastPoint) {
                const distance = haversineDistance(firstPoint, clickedMarkerCoords).toFixed(2);
                
                const line = new google.maps.Polyline({
                    path: [firstPoint, clickedMarkerCoords],
                    map: map,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                });

                const midpoint = {
                    lat: (firstPoint.lat + clickedMarkerCoords.lat) / 2,
                    lng: (firstPoint.lng + clickedMarkerCoords.lng) / 2
                };

                const distanceMarker = new google.maps.Marker({
                    position: midpoint,
                    map: map,
                    label: distance + ' km',
                });

                return [...prevLines, [firstPoint, clickedMarkerCoords]];
            }
        } else {
            return [[clickedMarkerCoords, clickedMarkerCoords]];
        }
    });
};

  // Funkcja pobiera dane z serwera 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/radios/');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Ustawienie interwału na pobieranie danych co 5 sekund
    const interval = setInterval(fetchData, 5000);

    // Zwolnienie interwału przy wyłączeniu komponentu
    return () => clearInterval(interval);
  }, []);

  // Funkcja obsługująca załadowanie mapy
  const onLoad = React.useCallback(
    (mapInstance) => {
      setMap(mapInstance);
      if (!mapCentered) {
        mapInstance.panTo(center);
        setMapCentered(true);
      }
      const bounds = new window.google.maps.LatLngBounds();
      data.forEach((point) => {
        bounds.extend(new window.google.maps.LatLng(point.Position.Lat, point.Position.Lon));
      });
      mapInstance.fitBounds(bounds);
    },
    [data, mapCentered]
  );

  // Funkcja używana do zapamiętania funkcji zeby nie tworzyć jej ponownie przy każdorazowym renderowaniu komponentu
  const onUnmount = React.useCallback(() => setMap(null), []);

  // Renderuje mapę, markery, linie oraz legendę
  return isLoaded ? (
    <div className='main'>
      <div className='map rainbow-border'> {/* Dodano klasę rainbow-border */}
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {data.map((point) => {
            let iconUrl;
            let n = point.Name;
            let t = point.Type;
            if (n === text) {
              switch (t) {
                case "Car":
                  iconUrl = checked;
                  break;
                case "BaseStation":
                  iconUrl = checked2;
                  break;
                case "Portable":
                  iconUrl = checked3;
                  break;
                default:
                  iconUrl = anotherSymbol;
              }
            } else if (n === "") {
              iconUrl = anotherSymbol;
            } else {
              if (nearestMarkers.includes(point.Name)) {
                iconUrl = anotherSymbol1;
              } else {
                switch (point.Type) {
                  case "Car":
                    if (point.BatteryLevel >= 0 && point.BatteryLevel <= 35) {
                      iconUrl = CarMarkerR;
                    } else if (point.BatteryLevel > 35 && point.BatteryLevel <= 75) {
                      iconUrl = CarMarkerY;
                    } else {
                      iconUrl = CarMarkerG;
                    }
                    break;
                  case "BaseStation":
                    if (point.BatteryLevel >= 0 && point.BatteryLevel <= 35) {
                      iconUrl = BaseStationMarkerR;
                    } else if (point.BatteryLevel > 35 && point.BatteryLevel <= 75) {
                      iconUrl = BaseStationMarkerY;
                    } else {
                      iconUrl = BaseStationMarkerG;
                    }
                    break;
                  case "Portable":
                    if (point.BatteryLevel >= 0 && point.BatteryLevel <= 35) {
                      iconUrl = PortableMarkerR;
                    } else if (point.BatteryLevel > 35 && point.BatteryLevel <= 75) {
                      iconUrl = PortableMarkerY;
                    } else {
                      iconUrl = PortableMarkerG;
                    }
                    break;
                  default:
                    iconUrl = null;
                }
              }
            }
  
            if (iconUrl) {
              return (
                <Marker
                  key={point.Id}
                  position={{ lat: parseFloat(point.Position.Lat), lng: parseFloat(point.Position.Lon) }}
                  title={n}
                  icon={{
                    url: iconUrl,
                    scaledSize: new window.google.maps.Size(80, 80),
                  }}
                  onClick={() => handleMarkerClick(point.Name)}
                />
              );
            } else {
              return null;
            }
          })}
          {/* Funkcja używana do rysowania na mapie linii o zdefiniowanych współrzędnych i stylach */}
          {lines.map((line, index) => (
            <Polyline
              key={index}
              path={line}
              options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }}
            />
          ))}
          <Legend/>
        </GoogleMap>
      </div>
    </div>
    
  ) : <></>;
}  


// Eksportuje komponent Map w (React.memo) w celu optymalizacji
export default React.memo(Map);