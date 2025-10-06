import { FeatureGrid } from "@/components/features";
import { Hero } from "@/components/hero";
import { stackServerApp } from "@/stack";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ComponentIcon, Users } from "lucide-react";
import Waves from "./waves-client";

export default async function IndexPage() {
  const project = await stackServerApp.getProject();
  if (!project.config.clientTeamCreationEnabled) {
    return (
      <div className="w-full min-h-96 flex items-center justify-center">
        <div className="max-w-xl gap-4">
          <p className="font-bold text-xl">Setup Required</p>
          <p className="">
            {
              "To start using this project, please enable client-side team creation in the Stack Auth dashboard (Project > Team Settings). This message will disappear once the feature is enabled."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <Waves />
        <Hero
          capsuleText="AireLocal — Pronóstico y Alertas de Calidad del Aire"
          capsuleLink="/"
          title="AireLocal: predice y reduce tu exposición a la contaminación atmosférica."
          subtitle="Integramos datos TEMPO (satélite), estaciones en tierra (OpenAQ/Pandora) y meteorología para generar predicciones locales y alertas de salud pública." 
          primaryCtaText="🌤️ Ver Predicciones Locales"
          primaryCtaLink={stackServerApp.urls.signUp}
          secondaryCtaText="📚 Recursos y Datos"
          secondaryCtaLink="/resources"
          credits={
            <>
              Datos de TMPO/Temporales, OpenAQ, y fuentes meteorológicas. Gratis para uso público; cite las fuentes.
            </>
          }
        />
      </div>

      <div id="features" />
      <FeatureGrid
        title="Pronóstico y Vigilancia de Calidad del Aire"
        subtitle="Combina datos de TEMPO, estaciones en tierra y meteorología para ofrecer pronósticos locales, visualizaciones claras y alertas de salud pública."
        items={[
          {
            icon: <span className="text-3xl">🛰️</span>,
            title: "Integración TEMPO (Satélite)",
            description: "Ingesta de productos TEMPO en tiempo real para estimar columnas de contaminantes y tendencias espaciales.",
          },
          {
            icon: <span className="text-3xl">�</span>,
            title: "Mediciones en Tierra (OpenAQ / Pandora)",
            description: "Validación cruzada y ajuste local usando redes de estaciones para mejorar la precisión del pronóstico.",
          },
          {
            icon: <span className="text-3xl">☁️</span>,
            title: "Datos Meteorológicos",
            description: "Viento, temperatura y estabilidad atmosférica para modelar transporte y dispersión de contaminantes.",
          },
          {
            icon: <span className="text-3xl">�</span>,
            title: "Pronósticos Locales",
            description: "Modelos simples y pipelines de fusión de datos que generan predicciones de AQI a nivel de barrio.",
          },
          {
            icon: <span className="text-3xl">�</span>,
            title: "Alertas y Notificaciones",
            description: "Alertas proactivas cuando se esperan niveles perjudiciales para grupos sensibles; configurable por área y umbral.",
          },
          {
            icon: <span className="text-3xl">�️</span>,
            title: "Visualizaciones Claras",
            description: "Mapas de calor, series temporales y paneles de comparación entre satélite y estaciones para comunicación pública.",
          },
        ]}
      />

      
    </>
  );
}
