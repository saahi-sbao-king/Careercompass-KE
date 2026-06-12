import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Briefcase, GraduationCap, Laptop, Stethoscope, Scale, HardHat, BookOpen, Plane, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavHeader } from "@/components/nav-header";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = [
  { icon: <Stethoscope className="h-8 w-8" />, title: "Health Sciences", color: "bg-red-50 text-red-600" },
  { icon: <Laptop className="h-8 w-8" />, title: "Technology", color: "bg-blue-50 text-blue-600" },
  { icon: <Scale className="h-8 w-8" />, title: "Law", color: "bg-purple-50 text-purple-600" },
  { icon: <HardHat className="h-8 w-8" />, title: "Engineering", color: "bg-orange-50 text-orange-600" },
  { icon: <BookOpen className="h-8 w-8" />, title: "Education", color: "bg-green-50 text-green-600" },
  { icon: <Plane className="h-8 w-8" />, title: "Aviation", color: "bg-cyan-50 text-cyan-600" },
  { icon: <Sprout className="h-8 w-8" />, title: "Agriculture", color: "bg-emerald-50 text-emerald-600" },
  { icon: <Briefcase className="h-8 w-8" />, title: "Business", color: "bg-indigo-50 text-indigo-600" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden hero-gradient py-20 md:py-32">
          <div className="container px-4 mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left space-y-8">
                <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-5 py-2 text-sm font-semibold text-white mb-2">
                  👋 Welcome to CareerCompass Kenya
                </div>
                <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-white leading-tight">
                  Discover Your Path.<br />
                  <span className="text-white/90">Build Your Future.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 font-medium">
                  Explore careers, courses, universities, TVET pathways, scholarships and opportunities tailored for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold bg-white text-primary hover:bg-white/90 gap-2 rounded-full shadow-lg transition-all hover:-translate-y-1" asChild>
                    <Link href="/quiz">
                      Take Career Assessment <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-white/40 text-white hover:bg-white/10 rounded-full backdrop-blur-sm" asChild>
                    <Link href="/hub">Explore Careers</Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 w-full max-w-[550px] relative hidden lg:block">
                <div className="relative rounded-[32px] border-4 border-white/20 shadow-2xl overflow-hidden aspect-[4/3]">
                  <Image 
                    src="https://picsum.photos/seed/career-kenya/800/600" 
                    alt="Kenyan students exploring careers" 
                    fill 
                    className="object-cover"
                    data-ai-hint="student smiling"
                  />
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                      <Target className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Growth</p>
                      <p className="text-sm font-bold text-foreground">Future Focused</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">Explore Career Categories</h2>
            <p className="text-muted-foreground text-lg">Find your passion across diverse professional fields in Kenya.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {CATEGORIES.map((cat, i) => (
              <Card key={i} className="border-none bg-white shadow-card rounded-[24px] hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center gap-4">
                  <div className={`h-16 w-16 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold font-headline">{cat.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Motivational Quote Section */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-3xl mx-auto space-y-8 bg-white p-12 rounded-[40px] shadow-card">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold font-headline leading-tight italic">
                "The best way to predict your future is to create it."
              </h2>
              <p className="text-muted-foreground font-medium">Your journey starts with a single step today.</p>
              <Button size="lg" className="rounded-full h-12 px-8 font-bold" asChild>
                <Link href="/quiz">Start Your Assessment</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-16 bg-white">
        <div className="container px-4 mx-auto text-center space-y-8">
          <div className="flex flex-col items-center gap-4">
            <span className="text-2xl font-bold font-headline text-primary">CareerCompass</span>
            <p className="text-muted-foreground max-w-md font-medium">
              Empowering the next generation of Kenyan talent. Discover Your Path. Build Your Future.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/hub" className="hover:text-primary transition-colors">Careers</Link>
            <Link href="/hub" className="hover:text-primary transition-colors">Universities</Link>
            <Link href="/hub" className="hover:text-primary transition-colors">Scholarships</Link>
            <Link href="/quiz" className="hover:text-primary transition-colors">Career Test</Link>
          </nav>
          <div className="text-sm text-muted-foreground font-medium pt-8 border-t">
            © 2024 CareerCompass Kenya. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}