import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Navbar }   from "@/components/sections/Navbar";
import { Hero }     from "@/components/sections/Hero";
import { LogoBar }  from "@/components/sections/LogoBar";
import { Features } from "@/components/sections/Features";
import { FAQ }      from "@/components/sections/FAQ";
import { Waitlist } from "@/components/sections/Waitlist";
import { Footer }   from "@/components/sections/Footer";

export default async function RootPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    // dark-theme scopes the landing-page CSS variables independently
    // from the dashboard's light/dark toggle
    <div className="dark-theme">
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Features />
        {/* Pricing section placeholder — add when ready */}
        <FAQ />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
