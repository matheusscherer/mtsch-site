import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Cases, Method, ProofBar, Services } from "@/components/site/sections";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-svh bg-bg text-fg">
      <Header />
      <main>
        <Hero />
        <ProofBar />
        <Services />
        <Method />
        <Cases />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
