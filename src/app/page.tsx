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
        <section className="relative overflow-hidden hero-gradient py-24 md:py-36 lg:py-48">
          <div className="container px-4 mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left space-y-10">
                <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-5 py-2 text-sm font-semibold text-white mb-2">
                  <span className="flex h-2 w-2 rounded-full bg-accent mr-3 animate-bounce"></span>
                  Discover Your Path. Build Your Future.
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold font-headline tracking-tight text-white leading-[1.05]">
                  Navigate Your <span className="text-white/90 underline decoration-accent/60 underline-offset-8">Future</span> with Confidence.
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  The friendly career guidance platform helping Kenyan students find the perfect careers, courses, and universities.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                  <Button size="lg" className="h-16 px-10 text-xl font-bold bg-white text-primary hover:bg-white/90 gap-3 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95" asChild>
                    <Link href="/quiz">
                      Start Assessment <ArrowRight className="h-6 w-6" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-bold border-white/40 text-white hover:bg-white/10 rounded-full backdrop-blur-sm" asChild>
                    <Link href="/hub">Explore Careers</Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 w-full max-w-[650px] relative hidden lg:block">
                <div className="relative rounded-[40px] border-8 border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] overflow-hidden aspect-[4/3] transform hover:rotate-1 transition-transform duration-500">
                  <Image 
                    src="https://picsum.photos/seed/career-hero/800/600" 
                    alt="Kenyan students exploring careers" 
                    fill 
                    className="object-cover"
                    data-ai-hint="students study"
                  />
                  <div className="absolute top-10 right-10 bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-2xl animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-success/10 flex items-center justify-center text-success">
                        <Target className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Growth</p>
                        <p className="text-lg font-bold text-foreground">+95% Clarity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Playful Decorative elements */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px]" />
        </section>

        {/* Features Section */}
        <section className="py-32 bg-background">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary">Everything for your journey</h2>
              <p className="text-muted-foreground text-xl">We've built a student-first ecosystem to help you navigate the CBE landscape with joy.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: <GraduationCap className="h-8 w-8" />, title: "University Hub", desc: "Find the best Kenyan universities for your goals.", color: "bg-blue-50 text-blue-600" },
                { icon: <Briefcase className="h-8 w-8" />, title: "Career Discovery", desc: "Unlock your potential with MI profile matching.", color: "bg-teal-50 text-teal-600" },
                { icon: <Compass className="h-8 w-8" />, title: "TVET Pathways", desc: "Practical skills for the modern economy.", color: "bg-orange-50 text-orange-600" },
                { icon: <Globe className="h-8 w-8" />, title: "Scholarships", desc: "Opportunities that make education affordable.", color: "bg-green-50 text-green-600" },
              ].map((item, i) => (
                <Card key={i} className="border-none bg-white shadow-card rounded-[32px] hover:translate-y-[-10px] transition-all duration-300">
                  <CardContent className="pt-12 px-10 pb-12 space-y-6 text-center">
                    <div className={`mx-auto h-20 w-20 rounded-3xl ${item.color} flex items-center justify-center`}>
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-headline">{item.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-24 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden">
                  {logo && (
                    <Image 
                      src={logo.imageUrl} 
                      alt="CareerCompass Kenya Logo" 
                      fill 
                      className="object-contain"
                    />
                  )}
                </div>
                <span className="text-3xl font-bold font-headline text-primary">CareerCompass</span>
              </div>
              <p className="text-muted-foreground max-w-md text-xl leading-relaxed font-medium">
                Empowering Kenyan students to build a future they're excited about.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold font-headline text-primary text-lg">Resources</h4>
              <nav className="flex flex-col gap-4 text-muted-foreground font-medium">
                <Link href="/hub" className="hover:text-primary transition-colors">KUCCPS Hub</Link>
                <Link href="/quiz" className="hover:text-primary transition-colors">Career Test</Link>
                <Link href="/scholarships" className="hover:text-primary transition-colors">Scholarships</Link>
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold font-headline text-primary text-lg">Support</h4>
              <nav className="flex flex-col gap-4 text-muted-foreground font-medium">
                <Link href="/help" className="hover:text-primary transition-colors">Help Center</Link>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              </nav>
            </div>
          </div>
          <div className="border-t pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-base text-muted-foreground font-medium">
            <div>© 2024 CareerCompass Kenya. Discover Your Path.</div>
            <div className="flex gap-8">
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