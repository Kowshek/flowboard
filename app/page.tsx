import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Navbar }   from "@/components/sections/Navbar";
import { Hero }     from "@/components/sections/Hero";
import { LogoBar }  from "@/components/sections/LogoBar";
import { Features } from "@/components/sections/Features";

export default async function RootPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    // dark-theme isolates the landing page CSS variables from the light dashboard
    <div className="dark-theme">
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Features />
      </main>
    </div>
  );
}
