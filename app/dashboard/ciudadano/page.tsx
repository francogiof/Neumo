"use client";

import SidebarLayout, { SidebarItem } from "@/components/sidebar-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Briefcase, Star, PlusCircle, BookOpen, User } from "lucide-react";
import { useState } from "react";
import { useRequirementsForCiudadano } from "./hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MeteoDashboard from "./meteo-dashboard";

const navigationItems: SidebarItem[] = [
	{
		name: "Mis Aplicaciones",
		href: "/dashboard/ciudadano",
		icon: Briefcase,
		type: "item",
	},
	{
		type: "label",
		name: "Práctica y Premium",
	},
	{
		name: "Simular Oferta de Trabajo",
		href: "/dashboard/ciudadano/simulate",
		icon: PlusCircle,
		type: "item",
	},
	{
		name: "Ejemplos Premium",
		href: "/dashboard/ciudadano/examples",
		icon: Star,
		type: "item",
	},
	{
		type: "label",
		name: "Perfil",
	},
	{
		name: "Mi Perfil",
		href: "/dashboard/ciudadano/profile",
		icon: User,
		type: "item",
	},
];

export default function CiudadanoDashboard() {
	return <MeteoDashboard items={navigationItems} />;
}
