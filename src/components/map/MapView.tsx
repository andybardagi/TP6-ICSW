import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { BsFillPinFill } from 'react-icons/bs';
import ReactDOMServer from 'react-dom/server';
import { Recenter } from './Recenter';

interface MapViewProps {
  onChange: (lat: number, lng: number) => void
  latitud: number
  longitud: number
  address: Address
}

const MapView = ({ onChange, latitud, longitud, address }: MapViewProps) => {
  const [center, setCenter] = useState({ lat: latitud, lng: longitud });
  const [position, setPosition] = useState({ lat: latitud, lng: longitud });
  const ZOOM_LEVEL = 11;
  const mapRef = useRef<L.Map>(null);
  const icon = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(
      <BsFillPinFill className="text-3xl text-myRed" />
    ),
  });

  useEffect(() => {
    setCenter({ lat: latitud, lng: longitud });
    setPosition({ lat: latitud, lng: longitud });
  }, [latitud, longitud]);

  const MapEvents = () => {
    useMapEvents({
      click(e: L.LeafletMouseEvent) {
        const { lat, lng } = e.latlng;
        onChange(lat, lng);
        setCenter({ lat, lng });
        setPosition({ lat, lng });
      },
    });
    return null;
  };
  return (
    <div>
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker title="Ping" icon={icon} position={position}></Marker>
        <MapEvents />
        <Recenter lat={center.lat} lng={center.lng} />
      </MapContainer>
    </div>
  );
};

export default MapView;
