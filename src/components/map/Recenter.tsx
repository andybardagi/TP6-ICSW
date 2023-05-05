import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type RecenterProps = {
  lat: number;
  lng: number;
};

export const Recenter = ({ lat, lng }: RecenterProps) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};
