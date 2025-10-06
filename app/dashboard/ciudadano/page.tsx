"use client";

import SidebarLayout, { SidebarItem } from "@/components/sidebar-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Briefcase, Star, PlusCircle, BookOpen, User } from "lucide-react";
import { useState } from "react";
import { useRequirementsForCiudadano } from "./hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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

const defaultJobOffers = [
	{
		id: 1,
		title: "Ingeniero Frontend en Acme Corp",
		company: "Acme Corp",
		status: "En Progreso",
		appliedAt: "2025-06-01",
	},
	{
		id: 2,
		title: "Desarrollador Backend en BetaTech",
		company: "BetaTech",
		status: "Entrevista Programada",
		appliedAt: "2025-06-10",
	},
	{
		id: 3,
		title: "Desarrollador Fullstack (Simulado)",
		company: "SamanthaAI Premium",
		status: "Modo Práctica",
		appliedAt: "2025-06-15",
		premium: true,
	},
];

// Type for job offers to allow DB and hardcoded offers
type JobOffer = {
	id: string | number;
	title: string;
	company: string;
	status: string;
	appliedAt: string;
	premium?: boolean;
	requirementId?: number;
};

// Dummy userId for demo; replace with real user context
const userId = 36; // TODO: Replace with actual logged-in user id

export default function CiudadanoDashboard() {
	const [search, setSearch] = useState("");
	const [jobOffers, setJobOffers] = useState(defaultJobOffers);
	const [newSimUrl, setNewSimUrl] = useState("");
	const router = useRouter();

	const { requirements, loading } = useRequirementsForCiudadano(userId);
	const dbOffers: JobOffer[] = requirements.map((req) => ({
		id: `db-${req.requirement_id}`,
		title: req.role_name,
		company: req.creator_role === "ciudadano" ? "Simulado (Tú)" : "Institución",
		status: req.creator_role === "ciudadano" ? "Modo Práctica" : "En Progreso",
		appliedAt: "--",
		premium: false,
		requirementId: req.requirement_id,
	}));
	const allOffers: JobOffer[] = [...jobOffers, ...dbOffers];
	const filteredOffers = allOffers.filter((offer) =>
		offer.title.toLowerCase().includes(search.toLowerCase()) ||
		offer.company.toLowerCase().includes(search.toLowerCase())
	);

	// Simulate adding a new simulated job offer
	function handleSimulateSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!newSimUrl) return;
		setJobOffers([
			...jobOffers,
			{
				id: Date.now(),
				title: `Simulado: ${newSimUrl}`,
				company: "Agente SamanthaAI",
				status: "Modo Práctica",
				appliedAt: new Date().toISOString().slice(0, 10),
				premium: false,
			},
		]);
		setNewSimUrl("");
	}

	return (
		<SidebarLayout items={navigationItems} basePath="/dashboard/ciudadano">
			<div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card className="col-span-1 md:col-span-2 lg:col-span-3">
					<CardHeader>
						<CardTitle>Mis Aplicaciones de Trabajo</CardTitle>
						<CardDescription>Rastrea todas tus aplicaciones activas y de práctica. Selecciona una para ver su proceso.</CardDescription>
					</CardHeader>
					<CardContent>
						<Input
							placeholder="Buscar ofertas de trabajo..."
							value={search}
							onChange={e => setSearch(e.target.value)}
							className="mb-4"
						/>
						<div className="space-y-2">
							{filteredOffers.length === 0 && <div className="text-muted-foreground">No se encontraron ofertas de trabajo.</div>}
							{filteredOffers.map((offer: JobOffer) => (
								<Card
									key={offer.id}
									className="flex flex-col md:flex-row items-center justify-between p-4 mb-2 border bg-muted/50 cursor-pointer hover:bg-primary/10 transition"
									onClick={() => {
										if (offer.requirementId) {
											router.push(`/dashboard/ciudadano/application/${offer.requirementId}`);
										}
									}}
								>
									<div>
										<div className="font-semibold text-lg">{offer.title}</div>
										<div className="text-sm text-muted-foreground">{offer.company}</div>
									</div>
									<div className="flex flex-col md:items-end gap-1 mt-2 md:mt-0">
										<span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium">{offer.status}</span>
										<span className="text-xs text-muted-foreground">Aplicado: {offer.appliedAt}</span>
										{offer.premium && <span className="text-xs text-yellow-600 font-semibold">Ejemplo Premium</span>}
									</div>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>
				<Card className="col-span-1 md:col-span-2 lg:col-span-1">
					<CardHeader>
						<CardTitle>Simular un Proceso de Oferta de Trabajo</CardTitle>
						<CardDescription>Pega un enlace de oferta de trabajo para practicar un proceso de contratación simulado impulsado por agentes SamanthaAI.</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSimulateSubmit} className="flex flex-col gap-2">
							<Input
								placeholder="Pega el enlace de la oferta de trabajo..."
								value={newSimUrl}
								onChange={e => setNewSimUrl(e.target.value)}
							/>
							<button
								type="submit"
								className="bg-primary text-primary-foreground rounded px-4 py-2 font-semibold hover:bg-primary/90 transition"
							>
								Crear Proceso Simulado
							</button>
						</form>
					</CardContent>
				</Card>
				<Card className="col-span-1 md:col-span-2 lg:col-span-2">
					<CardHeader>
						<CardTitle>Ejemplos de Práctica Premium</CardTitle>
						<CardDescription>Prueba simulaciones de ofertas de trabajo premium preconstruidas para experimentar flujos de contratación avanzados.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-2">
							<Card className="p-3 border bg-muted/50">
								<div className="font-semibold">Ingeniero Fullstack en SamanthaAI (Premium)</div>
								<div className="text-xs text-muted-foreground">Incluye interacciones avanzadas con agentes, entrevistas de múltiples etapas y reportes de retroalimentación.</div>
							</Card>
							<Card className="p-3 border bg-muted/50">
								<div className="font-semibold">Científico de Datos en OpenAI (Premium)</div>
								<div className="text-xs text-muted-foreground">Practica con desafíos de datos del mundo real y puntuación impulsada por IA.</div>
							</Card>
						</div>
					</CardContent>
				</Card>
			</div>
		</SidebarLayout>
	);
}
