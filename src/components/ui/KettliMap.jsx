import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { siteConfig } from '../../data/siteConfig.js';

/**
 * Interactive map of the F-10/4 branch. Unlike the Google embed, the mouse
 * wheel zooms directly (no Ctrl needed). On touch screens one-finger drag is
 * left to the page so visitors don't get stuck scrolling the map; pinch still
 * zooms.
 */
export default function KettliMap({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const { lat, lng } = siteConfig.coordinates;
    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 16,
      scrollWheelZoom: true,
      dragging: !L.Browser.mobile,
    });

    // Standard OpenStreetMap tiles (free, no key), darkened in index.css.
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const pin = L.divIcon({ className: 'kettli-pin', html: '<span></span>', iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -30] });
    L.marker([lat, lng], { icon: pin, title: 'Kettli F-10/4' })
      .addTo(map)
      .bindPopup('<strong>Kettli F-10/4</strong><br>Sagheer Market, Street 40')
      .openPopup();

    return () => map.remove();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`isolate bg-surface-1 ${className}`}
      role='region'
      aria-label='Map showing Kettli F-10/4, Sagheer Market, Islamabad'
    />
  );
}
