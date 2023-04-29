import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [center, setCenter] = useState({ lat: -31.4201, lng: -64.1888 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef<any>();
  return (
    <div>
        <input type="text"/>
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[center.lat, center.lng]}></Marker>
      </MapContainer>
    </div>
  );
}
