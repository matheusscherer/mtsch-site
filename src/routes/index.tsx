import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Cases, Method, ProofBar, Services } from "@/components/site/sections";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { MobileCta } from "@/components/site/mobile-cta";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-svh w-full max-w-full overflow-x-clip bg-bg text-fg">
      <Header />
      <main className="w-full max-w-full overflow-x-clip">
        <Hero />
        <ProofBar />
        <Services />
        <Method />
        <Cases />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
