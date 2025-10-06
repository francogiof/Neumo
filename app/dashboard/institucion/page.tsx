"use client";

import SidebarLayout, { SidebarItem } from "@/components/sidebar-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BarChart4, Users, Globe, ShoppingBag, Columns3, Locate } from "lucide-react";
import { useState } from "react";

const navigationItems: SidebarItem[] = [
	{
		name: "Overview",
		href: "/dashboard/institucion",
		icon: Globe,
		type: "item",
	},
	{
		type: "label",
		name: "Management",
	},
	{
		name: "Ciudadanos",
		href: "/dashboard/institucion/ciudadanos",
		icon: Users,
		type: "item",
	},
	{
		name: "Jobs",
		href: "/dashboard/institucion/jobs",
		icon: ShoppingBag,
		type: "item",
	},
	{
		name: "Segments",
		href: "/dashboard/institucion/segments",
		icon: Columns3,
		type: "item",
	},
	{
		name: "Regions",
		href: "/dashboard/institucion/regions",
		icon: Locate,
		type: "item",
	},
	{
		type: "label",
		name: "Analytics",
	},
	{
		name: "Reports",
		href: "/dashboard/institucion/reports",
		icon: BarChart4,
		type: "item",
	},
];

export default function InstitucionDashboard() {
	// Example state for search/filter
	const [search, setSearch] = useState("");

	return (
		<SidebarLayout items={navigationItems} basePath="/dashboard/institucion">
			<div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Búsqueda de Ciudadanos</CardTitle>
						<CardDescription>
							Encuentra ciudadanos por nombre, habilidad o estado.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Input
							placeholder="Buscar ciudadanos..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</CardContent>
				</Card>
				{/* Add more cards/widgets here as needed */}
			</div>
		</SidebarLayout>
	);
}
