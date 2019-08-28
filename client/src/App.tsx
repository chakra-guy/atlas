import React, { useState, useEffect } from "react";
import { Map } from "./components";
import "./app.css";

interface Place {
  id: number;
  name: string;
  lat: Float32Array;
  lon: Float32Array;
}

const baseURL = "http://localhost:4000/api/place";
// const baseURL = "http://192.168.1.242:4000/api/place";

export default function App() {
  const [lat, setLat] = useState(47.497903);
  const [lon, setLon] = useState(19.054647);
  const [distance, setDistance] = useState(150);
  const [places, setPlaces] = useState<Array<Place>>([]);

  useEffect(() => {
    fetch(`${baseURL}?lat=${lat}&lon=${lon}&distance=${distance}`)
      .then(response => response.json())
      .then(({ data }) => setPlaces(data));
  }, [lat, lon, distance]);

  return (
    <>
      <div className="input-container">
        distance
        <input
          type="text"
          value={distance}
          onChange={e => setDistance(Number(e.target.value))}
        />
      </div>
      <div className="map-container">
        <Map
          places={places}
          setCoordinatinates={(newLat: any, newLon: any) => {
            setLat(newLat);
            setLon(newLon);
          }}
        />
      </div>
    </>
  );
}
