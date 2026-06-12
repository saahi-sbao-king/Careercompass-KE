
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, ArrowRight, CheckCircle2, Award, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavHeader } from "@/components/nav-header";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left space-y-6">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-2">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                  CBE Compliant System for Kenyan Students
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-foreground leading-[1.1]">
                  Navigate Your Future with <span className="text-primary">Precision.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  Discover your 9 multiple intelligences, find your CBE pathway, and build a career plan aligned with the Kenyan job market.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="h-12 px-8 text-base gap-2" asChild>
                    <Link href="/quiz">
                      Take MI Diagnostic <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                    <Link href="/dashboard">View Sample Report</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    45-Question Engine
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    KUCCPS Ready
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full max-w-[600px] relative">
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl" />
                <div className="relative rounded-2xl border bg-card shadow-2xl overflow-hidden aspect-[4/3]">
                  <Image 
                    src="https://picsum.photos/seed/career-hero/800/600" 
                    alt="Career guidance for students" 
                    fill 
                    className="object-cover"
                    data-ai-hint="student learning"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur p-4 rounded-xl border shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        98%
                      </div>
                      <div>
                        <p className="text-sm font-bold">Student Accuracy</p>
                        <p className="text-xs text-muted-foreground">Based on Frere Town Pilot Program</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats / Features Section */}
        <section className="py-20 bg-muted/30 border-y">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none bg-transparent shadow-none">
                <CardContent className="pt-6 space-y-4 text-center">
                  <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-headline">MI Diagnostic</h3>
                  <p className="text-muted-foreground">Comprehensive mapping across Howard Gardner's nine intelligence types.</p>
                </CardContent>
              </Card>
              <Card className="border-none bg-transparent shadow-none">
                <CardContent className="pt-6 space-y-4 text-center">
                  <div className="mx-auto h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-headline">CBE Optimization</h3>
                  <p className="text-muted-foreground">Smart subject combinations validated against the 11-subject rule.</p>
                </CardContent>
              </Card>
              <Card className="border-none bg-transparent shadow-none">
                <CardContent className="pt-6 space-y-4 text-center">
                  <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-headline">KUCCPS Integration</h3>
                  <p className="text-muted-foreground">Direct cluster calculation and university pathway prediction tools.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold font-headline text-primary">CareerCompass Kenya</span>
              </div>
              <p className="text-sm text-muted-foreground">Empowering Kenyan students for the global stage.</p>
            </div>
            <div className="flex gap-8 text-sm font-medium">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 CareerCompass Kenya. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
