'use client'
import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import type { Starter } from '@/lib/types'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix default icon paths broken by webpack
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const OSLO = { lat: 59.9275, lng: 10.728 }

function breadIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:44px;height:44px;border-radius:50%;
      background:#FBF6EE;border:2.5px solid #B8873A;
      display:flex;align-items:center;justify-content:center;
      font-size:20px;box-shadow:0 2px 8px rgba(92,45,30,0.18);
      position:relative;
    ">🍞<div style="
      position:absolute;bottom:-7px;left:50%;transform:translateX(-50%);
      width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;
      border-top:7px solid #B8873A;
    "></div></div>`,
    iconSize: [44, 52],
    iconAnchor: [22, 52],
  })
}

export default function StarterMap({ starters, onSelect }: { starters: Starter[]; onSelect: (s: Starter) => void }) {
  return (
    <MapContainer
      center={[OSLO.lat, OSLO.lng]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      <Circle
        center={[OSLO.lat, OSLO.lng]}
        radius={10000}
        pathOptions={{ color: '#B8873A', fillColor: '#B8873A', fillOpacity: 0.04, weight: 1.5, dashArray: '6 4' }}
      />
      {starters.map(s => (
        <Marker
          key={s.id}
          position={[s.location_lat, s.location_lng]}
          icon={breadIcon()}
          eventHandlers={{ click: () => onSelect(s) }}
        >
          <Popup>
            <div style={{ fontFamily: 'Georgia, serif', minWidth: 140 }}>
              <strong style={{ color: '#7B3F2B' }}>{s.name}</strong>
              <div style={{ fontSize: 11, color: '#9B7B6A', marginTop: 2 }}>by {s.profiles?.username}</div>
              {s.age_days && <div style={{ fontSize: 11, marginTop: 4 }}>🕐 {s.age_days} days old</div>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
