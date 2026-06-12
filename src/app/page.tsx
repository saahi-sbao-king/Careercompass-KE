import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap, Briefcase, Target, Lightbulb, Compass, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavHeader } from "@/components/nav-header";
import { Card, CardContent } from "@/components/ui/card";
import placeholderData from "@/app/lib/placeholder-images.json";

export default function Home() {
  const logo = placeholderData.placeholderImages.find(img => img.id === 'app-logo');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden hero-gradient py-20 md:py-32 lg:py-40">
          <div className="container px-4 mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left space-y-8">
                <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-white mb-2">
                  <span className="flex h-2 w-2 rounded-full bg-accent mr-3 animate-pulse"></span>
                  CBE Compliant System for Kenyan Students
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-headline tracking-tight text-white leading-[1.1]">
                  Discover Your Future <span className="text-accent">Career Path.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 font-medium">
                  Find careers, courses, universities, scholarships, and opportunities tailored for Kenyan students. Your journey starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold bg-white text-primary hover:bg-white/90 gap-2 shadow-lg" asChild>
                    <Link href="/quiz">
                      Take Career Assessment <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-white text-white hover:bg-white/10" asChild>
                    <Link href="/hub">Explore Careers</Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 w-full max-w-[600px] relative hidden lg:block">
                <div className="relative rounded-3xl border-8 border-white/10 shadow-2xl overflow-hidden aspect-[4/3]">
                  <Image 
                    src="https://picsum.photos/seed/career-hero/800/600" 
                    alt="Career guidance for students" 
                    fill 
                    className="object-cover"
                    data-ai-hint="student learning"
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        98%
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Student Accuracy</p>
                        <p className="text-xs text-muted-foreground">Based on Frere Town Pilot Program</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Everything you need to succeed</h2>
              <p className="text-muted-foreground text-lg">We provide a comprehensive ecosystem for the modern Kenyan student navigating the CBE landscape.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <GraduationCap className="h-6 w-6" />, title: "University Hub", desc: "Official KUCCPS data and placement tools." },
                { icon: <Briefcase className="h-6 w-6" />, title: "Career Discovery", desc: "Map your MI profile to high-demand jobs." },
                { icon: <Compass className="h-6 w-6" />, title: "TVET Pathways", desc: "Explore technical and vocational opportunities." },
                { icon: <Globe className="h-6 w-6" />, title: "Scholarships", desc: "Access open scholarship opportunities worldwide." },
              ].map((item, i) => (
                <Card key={i} className="border-none bg-white shadow-card rounded-2xl hover:translate-y-[-4px] transition-transform">
                  <CardContent className="pt-8 px-8 pb-8 space-y-4 text-center">
                    <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold font-headline">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden">
                  {logo && (
                    <Image 
                      src={logo.imageUrl} 
                      alt="CareerCompass Kenya Logo" 
                      fill 
                      className="object-contain"
                    />
                  )}
                </div>
                <span className="text-2xl font-bold font-headline text-primary">CareerCompass Kenya</span>
              </div>
              <p className="text-muted-foreground max-w-sm text-lg leading-relaxed">
                Empowering the next generation of Kenyan talent with precision career guidance and educational resources.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold font-headline text-primary">Resources</h4>
              <nav className="flex flex-col gap-2 text-muted-foreground">
                <Link href="/hub" className="hover:text-primary transition-colors">KUCCPS Hub</Link>
                <Link href="/quiz" className="hover:text-primary transition-colors">Career Test</Link>
                <Link href="/scholarships" className="hover:text-primary transition-colors">Scholarships</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold font-headline text-primary">Support</h4>
              <nav className="flex flex-col gap-2 text-muted-foreground">
                <Link href="/help" className="hover:text-primary transition-colors">Help Center</Link>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              </nav>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>© 2024 CareerCompass Kenya. Navigating Your Future.</div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}