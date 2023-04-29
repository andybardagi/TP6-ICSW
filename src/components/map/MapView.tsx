import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BsFillPinFill } from "react-icons/bs";
import ReactDOMServer from "react-dom/server";

const MapView = () => {
  const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef<L.Map>(null);
  const icon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(<BsFillPinFill className="text-3xl text-red-800"/>),
  });
  return (
    <div>
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          title="Pelotudo"
          icon={icon}
          position={{ lat: -4.043477, lng: 39.668205 }}
        >
          Pelotudo
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
