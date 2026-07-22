import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Layers,
  Trees,
  Compass,
  Ruler,
  Maximize2,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property, ProductType } from '../types';

interface GISModuleProps {
  properties: Property[];
  currentProduct: ProductType;
  onSelectProperty: (p: Property) => void;
}

export const GISModule: React.FC<GISModuleProps> = ({
  properties,
  currentProduct,
  onSelectProperty,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [activeLayers, setActiveLayers] = useState({
    carReserve: true,
    carApp: true,
    soilTypes: true,
    lotGrid: true,
  });

  const [carQuery, setCarQuery] = useState('SP-3543402-A89B.11C2.33E4.9902');
  const [sicarData, setSicarData] = useState<any>(null);
  const [sicarLoading, setSicarLoading] = useState(false);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = currentProduct === 'RURAL' ? -21.1704 : -23.5658;
      const initialLng = currentProduct === 'RURAL' ? -47.8103 : -46.6622;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: currentProduct === 'RURAL' ? 12 : 14,
        zoomControl: true,
      });

      // OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | WooTech GIS',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polygon || layer instanceof L.Circle) {
        map.removeLayer(layer);
      }
    });

    // Render Markers for properties
    const productProps = properties.filter((p) => p.productType === currentProduct);

    productProps.forEach((prop) => {
      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `<div style="background-color: ${
          currentProduct === 'RURAL' ? '#16A34A' : '#2563EB'
        }; color: white; padding: 4px 8px; border-radius: 8px; font-weight: bold; font-size: 11px; font-family: sans-serif; white-space: nowrap; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            ${prop.code} • R$ ${(prop.price / 1000).toFixed(0)}k
          </div>`,
        iconSize: [100, 30],
        iconAnchor: [50, 15],
      });

      const marker = L.marker([prop.latitude, prop.longitude], { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px; max-width: 200px;">
          <strong style="font-size: 13px; color: #0F172A; display: block;">${prop.title}</strong>
          <span style="font-size: 11px; color: #64748B;">${prop.city}, ${prop.state}</span>
          <div style="margin-top: 6px; font-size: 12px; font-weight: bold; color: #2563EB;">
            R$ ${prop.price.toLocaleString('pt-BR')}
          </div>
        </div>
      `);

      marker.on('click', () => onSelectProperty(prop));

      // Draw CAR Polygon overlay if Rural
      if (currentProduct === 'RURAL' && activeLayers.carReserve) {
        const polyCoords: [number, number][] = [
          [prop.latitude + 0.01, prop.longitude - 0.01],
          [prop.latitude + 0.015, prop.longitude + 0.01],
          [prop.latitude - 0.005, prop.longitude + 0.015],
          [prop.latitude - 0.01, prop.longitude - 0.005],
        ];

        L.polygon(polyCoords, {
          color: '#16A34A',
          fillColor: '#22C55E',
          fillOpacity: 0.25,
          weight: 2,
        })
          .addTo(map)
          .bindTooltip(`CAR Reserva Legal: ${prop.reservaLegalHa || 170} ha`);
      }
    });
  }, [currentProduct, properties, activeLayers]);

  // Handle SICAR Check
  const handleCheckSicar = async () => {
    if (!carQuery) return;
    setSicarLoading(true);
    setSicarData(null);

    try {
      const res = await fetch(`/api/sicar/car/${encodeURIComponent(carQuery)}`);
      const data = await res.json();
      setSicarData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSicarLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px] uppercase tracking-wider">
            Módulo GIS & Geointeligência
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">Mapeamento Espacial e Consulta SICAR / CAR</h2>
          <p className="text-xs text-slate-500">
            Camadas de satélite, declividade, Reserva Legal, APPs e cruzamento com dados ambientais oficiais.
          </p>
        </div>

        {/* CAR Search Bar */}
        <div className="flex items-center gap-2">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={carQuery}
              onChange={(e) => setCarQuery(e.target.value)}
              placeholder="Digite o código do CAR (SICAR)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 font-mono"
            />
          </div>

          <button
            onClick={handleCheckSicar}
            disabled={sicarLoading}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs transition-colors flex items-center gap-1.5 shrink-0"
          >
            {sicarLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            <span>Validar CAR</span>
          </button>
        </div>
      </div>

      {/* SICAR Result Card */}
      {sicarData && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-emerald-950 text-sm block">
                CAR Validado — Status: {sicarData.status}
              </span>
              <span className="text-emerald-800 font-mono text-[11px]">Código: {sicarData.car_id}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-emerald-900 font-medium">
            <div>
              <span className="text-emerald-600 block text-[10px]">Área Total:</span>
              <strong>{sicarData.area_total_ha} ha</strong>
            </div>
            <div>
              <span className="text-emerald-600 block text-[10px]">Reserva Legal:</span>
              <strong>{sicarData.area_reserva_legal_ha} ha ({sicarData.percentual_reserva})</strong>
            </div>
            <div>
              <span className="text-emerald-600 block text-[10px]">APP Protegida:</span>
              <strong>{sicarData.area_app_ha} ha</strong>
            </div>
          </div>
        </div>
      )}

      {/* Map & Controls Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[600px]">
        
        {/* Layer Controls Panel */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-4 overflow-y-auto">
          <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Camadas & Filtros GIS</span>
          </h3>

          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <span className="font-semibold text-slate-800">Reserva Legal (CAR)</span>
              <input
                type="checkbox"
                checked={activeLayers.carReserve}
                onChange={(e) => setActiveLayers({ ...activeLayers, carReserve: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <span className="font-semibold text-slate-800">Áreas de Preservação (APP)</span>
              <input
                type="checkbox"
                checked={activeLayers.carApp}
                onChange={(e) => setActiveLayers({ ...activeLayers, carApp: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <span className="font-semibold text-slate-800">Tipos de Solo (SoilGrids)</span>
              <input
                type="checkbox"
                checked={activeLayers.soilTypes}
                onChange={(e) => setActiveLayers({ ...activeLayers, soilTypes: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <span className="font-semibold text-slate-800">Grade de Lotes & Quadras</span>
              <input
                type="checkbox"
                checked={activeLayers.lotGrid}
                onChange={(e) => setActiveLayers({ ...activeLayers, lotGrid: e.target.checked })}
                className="w-4 h-4 text-amber-600 rounded cursor-pointer"
              />
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
            <span className="font-bold text-slate-700 block">Ferramentas de Medição:</span>
            <div className="flex gap-2">
              <button
                onClick={() => alert('Modo de medição de área (ha / m²) ativado no mapa.')}
                className="flex-1 py-2 px-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-slate-700 flex items-center justify-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Medir Área</span>
              </button>
            </div>
          </div>
        </div>

        {/* Map Canvas */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-200 overflow-hidden relative shadow-2xs">
          <div ref={mapContainerRef} className="w-full h-full min-h-[500px] z-10" />
        </div>
      </div>
    </div>
  );
};
