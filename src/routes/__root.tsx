import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Matheus Scherer | Automação de Planilhas e Diagnóstico de Custo com Python";
const APP_DESCRIPTION =
  "Transformo planilha suja em decisão clara. Diagnóstico de custo operacional (hora extra, estoque, no-show) e automação de relatórios com Python e Pandas. Porto Alegre · Remoto.";
const host = import.meta.env.VITE_PUBLIC_HOSTNAME;
const siteUrl = host ? `https://${host}` : "https://mtsch.vercel.app";
const ogImage = `${siteUrl}/og.jpg`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Matheus Scherer",
  jobTitle: "Python Data Analyst | Spreadsheet Automation | Process Cost Analysis",
  url: siteUrl,
  email: "contatomatheusscherer@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Porto Alegre",
    addressRegion: "RS",
    addressCountry: "BR",
  },
  sameAs: [
    "https://github.com/matheusscherer",
    "https://linkedin.com/in/scherermatheus",
    "https://x.com/mattschererr",
  ],
  knowsAbout: [
    "Python",
    "Pandas",
    "Automação de planilhas",
    "Diagnóstico de custo operacional",
    "Limpeza de dados",
    "Análise de hora extra",
    "Validação de bases",
  ],
  offers: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Diagnóstico de custo operacional e automação de planilhas",
      description:
        "Scripts em Python que transformam planilhas operacionais em relatórios claros de custo e listas de ação.",
      areaServed: {
        "@type": "Country",
        name: "Brasil",
      },
    },
  },
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      { name: "description", content: APP_DESCRIPTION },
      {
        name: "keywords",
        content:
          "automação de planilhas Python, diagnóstico de custo operacional, limpeza de dados Excel, análise de hora extra, Python Porto Alegre, Pandas, validação de bases",
      },
      { name: "author", content: "Matheus Scherer" },
      { name: "robots", content: "index, follow" },
      { name: "apple-mobile-web-app-title", content: "MTSCH" },
      { name: "theme-color", content: "#000000" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: APP_NAME },
      { name: "twitter:description", content: APP_DESCRIPTION },
      { name: "twitter:image", content: ogImage },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "MTSCH — Dados & Automação" },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: APP_DESCRIPTION },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "MTSCH — Planilha suja. Relatório na mão." },
    ],
    links: [
      { rel: "canonical", href: siteUrl },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: () => (
    <html lang="pt-BR" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="w-full max-w-full overflow-x-clip bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            className: "border-line bg-bg-elevated text-fg",
          }}
        />
        <Scripts />
      </body>
    </html>
  ),
});
