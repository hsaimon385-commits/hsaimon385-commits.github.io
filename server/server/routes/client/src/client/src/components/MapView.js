import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapView({ events }) {
  // Default position (London) - change to your preferred default
  const position = [51.505, -0.09]; 

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events && events.map((event) => (
           // Note: You need lat/lng in your event data for this to work
           event.lat && event.lng && (
            <Marker key={event._id} position={[event.lat, event.lng]}>
              <Popup>
                <strong>{event.title}</strong><br />
                {event.location}
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
