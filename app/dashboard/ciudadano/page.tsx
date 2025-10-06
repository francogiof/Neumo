"use client";

import SidebarLayout, { SidebarItem } from "@/components/sidebar-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Briefcase, Star, PlusCircle, BookOpen, User, Thermometer, Droplets, Cloud, Wind, AlertTriangle, Search, Filter, Sun, Cloudy } from "lucide-react";
import { useState } from "react";
import { useRequirementsForCiudadano } from "./hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MeteoDashboard from "./meteo-dashboard";

export default function CiudadanoDashboard() {
	// Panel meteorológico: controles y filtros avanzados
	const meteoSidebar: SidebarItem[] = [
		{ name: "Panel de Controles", type: "label" },
		{ name: "Ver pronóstico", href: "#forecast", icon: Sun, type: "item" },
		{ name: "Ver calidad de aire", href: "#airquality", icon: Cloud, type: "item" },
		{ name: "Alertas", href: "#alerts", icon: AlertTriangle, type: "item" },
		{ name: "Filtros avanzados", type: "label" },
		{ name: "Buscar zona...", href: "#search", icon: Search, type: "item" },
		{ name: "Temperatura", href: "#filter-temp", icon: Thermometer, type: "item" },
		{ name: "Humedad", href: "#filter-hum", icon: Droplets, type: "item" },
		{ name: "PM2.5 (µg/m³)", href: "#filter-pm25", icon: Filter, type: "item" },
		{ name: "PM10 (µg/m³)", href: "#filter-pm10", icon: Filter, type: "item" },
		{ name: "CO₂ (ppm)", href: "#filter-co2", icon: Wind, type: "item" },
		{ name: "O₃ (ppb)", href: "#filter-o3", icon: Wind, type: "item" },
		{ name: "NO₂ (ppb)", href: "#filter-no2", icon: Wind, type: "item" },
		{ name: "SO₂ (ppb)", href: "#filter-so2", icon: Wind, type: "item" },
		{ name: "Índice AQI", href: "#filter-aqi", icon: Cloudy, type: "item" },
	];
	return <MeteoDashboard items={meteoSidebar} />;
}
