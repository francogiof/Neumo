import React, { useEffect, useRef, useState } from "react";
import SidebarLayout, { SidebarItem } from "@/components/sidebar-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Declaración global para Leaflet
declare global {
  interface Window {
    L: any;
  }
}

interface MeteoDashboardProps {
  items: SidebarItem[];
}

export default function MeteoDashboard({ items }: MeteoDashboardProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [airData, setAirData] = useState<Array<{ parametro: string; valor: number | string; unidad: string }>>([]);

  useEffect(() => {
    let leafletLoaded = false;
    let mapInstance: any = null;
    const mapDiv = mapRef.current;
    // Carga Leaflet solo en el cliente
    if (typeof window !== "undefined" && mapDiv) {
      // Cargar scripts y estilos Leaflet dinámicamente
      if (!window.L) {
        const leafletCss = document.createElement("link");
        leafletCss.rel = "stylesheet";
        leafletCss.href = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css";
        document.head.appendChild(leafletCss);

        const leafletScript = document.createElement("script");
        leafletScript.src = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js";
        leafletScript.async = true;
        leafletScript.onload = () => {
          leafletLoaded = true;
          initMap();
        };
        document.body.appendChild(leafletScript);
      } else {
        leafletLoaded = true;
        initMap();
      }
    }

    function initMap() {
      if (!window.L || !mapDiv) return;
      const API_KEY = "b76a2862d586e02a39e13de8b6fac76f";
      // Evita doble inicialización
      if (mapDiv.childNodes.length === 0) {
        mapInstance = window.L.map(mapDiv).setView([-16.409, -71.5375], 8);
        const base = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap'
        }).addTo(mapInstance);
        // Capas meteorológicas
        const temp = window.L.tileLayer(`https://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?fill_bound=true&opacity=0.7&palette=-65:821692;-30:208cec;-10:20c4e8;0:23dddd;10:c2ff28;20:fff028;30:fc8014&appid=${API_KEY}`);
        const viento = window.L.tileLayer(`https://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?use_norm=true&arrow_step=16&appid=${API_KEY}`);
        const nubes = window.L.tileLayer(`https://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}?opacity=0.6&appid=${API_KEY}`);
        const lluvia = window.L.tileLayer(`https://maps.openweathermap.org/maps/2.0/weather/PR0/{z}/{x}/{y}?opacity=0.6&appid=${API_KEY}`);
        const humedad = window.L.tileLayer(`https://maps.openweathermap.org/maps/2.0/weather/HRD0/{z}/{x}/{y}?opacity=0.6&appid=${API_KEY}`);
        const presion = window.L.tileLayer(`https://maps.openweathermap.org/maps/2.0/weather/APM/{z}/{x}/{y}?opacity=0.6&appid=${API_KEY}`);
        const baseMaps = { "OpenStreetMap": base };
        const overlayMaps = {
          "🌡️ Temperatura": temp,
          "💨 Viento": viento,
          "☁️ Nubes": nubes,
          "🌧️ Precipitación": lluvia,
          "💧 Humedad": humedad,
          "⚙️ Presión": presion
        };
        window.L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(mapInstance);
      }
    }
    // Limpieza al desmontar
    return () => {
      if (mapInstance && mapInstance.remove) {
        mapInstance.remove();
      } else if (mapDiv) {
        mapDiv.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    // API de contaminantes del aire
    const API_KEY = "b76a2862d586e02a39e13de8b6fac76f";
    const lat = -16.3989;
    const lon = -71.5350;
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.list && data.list.length > 0) {
          const components = data.list[0].components;
          const result = Object.entries(components).map(([k, v]) => ({
            parametro: k.toUpperCase(),
            valor: typeof v === "number" ? v : Number(v),
            unidad: "µg/m³"
          }));
          setAirData(result);
        } else {
          setAirData([{ parametro: "N/A", valor: "N/A", unidad: "N/A" }]);
        }
      })
      .catch(() => setAirData([{ parametro: "N/A", valor: "N/A", unidad: "N/A" }]));
  }, []);

  const showSidebar = Array.isArray(items) && items.length > 0;

  return (
    <SidebarLayout basePath="/dashboard/ciudadano" items={items}>
      <div className="flex flex-row h-[calc(100vh-64px)]">
        {showSidebar && (
          <div className="w-80 bg-card p-6 flex flex-col gap-4 border-r border-muted">
            <Card>
              <CardHeader>
                <CardTitle>Panel de Controles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button className="w-full bg-primary text-primary-foreground rounded px-4 py-2 font-semibold hover:bg-primary/90 transition">Ver pronóstico</button>
                  <button className="w-full bg-secondary text-secondary-foreground rounded px-4 py-2 font-semibold hover:bg-secondary/90 transition">Ver calidad de aire</button>
                  <button className="w-full bg-muted text-muted-foreground rounded px-4 py-2 font-semibold hover:bg-muted/90 transition">Alertas</button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <input type="text" placeholder="Buscar zona..." className="w-full border rounded px-2 py-1" />
                  <select className="w-full border rounded px-2 py-1">
                    <option>Temperatura</option>
                    <option>Humedad</option>
                    <option>PM2.5</option>
                    <option>PM10</option>
                    <option>CO₂</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div className="flex-1 relative flex flex-col items-center justify-center">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[420px] bg-card/80 rounded-xl shadow-lg p-4 flex flex-row items-center justify-between z-10">
            <div>
              <span className="font-bold text-lg">Arequipa, Perú</span>
              <span className="ml-2 text-muted-foreground text-sm">Mapa meteorológico y calidad de aire</span>
            </div>
            <div>
              <button className="bg-primary text-primary-foreground rounded px-3 py-1 font-semibold hover:bg-primary/90 transition">Actualizar</button>
            </div>
          </div>
          <div ref={mapRef} id="map" style={{ width: "100%", height: "600px", borderRadius: "16px", marginTop: "64px", boxShadow: "0 2px 16px #0002" }} />
          <div className="w-full max-w-xl mx-auto mt-8">
            <Card>
              <CardHeader>
                <CardTitle>💨 Contaminantes del aire en Arequipa</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm border rounded overflow-hidden">
                  <thead>
                    <tr className="bg-muted">
                      <th className="py-2 px-3 text-left">Parámetro</th>
                      <th className="py-2 px-3 text-left">Valor</th>
                      <th className="py-2 px-3 text-left">Unidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {airData.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-2 px-3 font-semibold">{row.parametro}</td>
                        <td className="py-2 px-3">{row.valor}</td>
                        <td className="py-2 px-3">{row.unidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
