import React from "react";
import SidebarLayout, { SidebarItem } from "@/components/sidebar-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MeteoDashboardProps {
  items: SidebarItem[];
}

export default function MeteoDashboard({ items }: MeteoDashboardProps) {
  return (
    <SidebarLayout basePath="/dashboard/ciudadano" items={items}>
      <div className="flex flex-row h-[calc(100vh-64px)]">
        {/* Panel izquierdo */}
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
        {/* Panel mapa */}
        <div className="flex-1 relative">
          {/* Panel superior delgado */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[420px] bg-card/80 rounded-xl shadow-lg p-4 flex flex-row items-center justify-between z-10">
            <div>
              <span className="font-bold text-lg">Arequipa, Perú</span>
              <span className="ml-2 text-muted-foreground text-sm">Mapa meteorológico y calidad de aire</span>
            </div>
            <div>
              <button className="bg-primary text-primary-foreground rounded px-3 py-1 font-semibold hover:bg-primary/90 transition">Actualizar</button>
            </div>
          </div>
          {/* Mapa simulado */}
          <div className="h-full w-full bg-gradient-to-br from-blue-200 via-blue-400 to-green-200 flex items-center justify-center">
            <div className="w-[80%] h-[80%] bg-white/80 rounded-2xl shadow-xl flex items-center justify-center border-4 border-primary">
              <span className="text-3xl font-bold text-primary">[Mapa interactivo aquí]</span>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
