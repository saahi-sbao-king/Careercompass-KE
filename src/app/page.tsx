
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Target, 
  Briefcase, 
  GraduationCap, 
  Laptop, 
  Stethoscope, 
  Scale, 
  HardHat, 
  BookOpen, 
  Sprout, 
  Check, 
  Users, 
  Compass, 
  Award,
  ChevronLeft,
  ChevronRight,
  Plane,
  Palette,
  ChefHat,
  Mic,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavHeader } from "@/components/nav-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const CATEGORIES = [
  { icon: <Laptop className="h-8 w-8" />, title: "Technology", color: "bg-blue-500 text-white" },
  { icon: <Stethoscope className="h-8 w-8" />, title: "Health Sciences", color: "bg-blue-500 text-white" },
  { icon: <Scale className="h-8 w-8" />, title: "Law", color: "bg-blue-500 text-white" },
  { icon: <HardHat className="h-8 w-8" />, title: "Engineering", color: "bg-blue-500 text-white" },
  { icon: <Sprout className="h-8 w-8" />, title: "Agriculture", color: "bg-blue-500 text-white" },
  { icon: <BookOpen className="h-8 w-8" />, title: "Education", color: "bg-blue-500 text-white" },
  { icon: <Palette className="h-8 w-8" />, title: "Arts & Design", color: "bg-blue-500 text-white" },
  { icon: <ChefHat className="h-8 w-8" />, title: "Hospitality", color: "bg-blue-500 text-white" },
  { icon: <Plane className="h-8 w-8" />, title: "Aviation", color: "bg-blue-500 text-white" },
  { icon: <Mic className="h-8 w-8" />, title: "Media & Comms", color: "bg-blue-500 text-white" },
  { icon: <Trophy className="h-8 w-8" />, title: "Sports", color: "bg-blue-500 text-white" },
  { icon: <Users className="h-8 w-8" />, title: "Social Sciences", color: "bg-blue-500 text-white" },
];

const STATS = [
  { label: "Career Paths", value: "5,000+", icon: <Briefcase /> },
  { label: "Unis & TVETs", value: "300+", icon: <GraduationCap /> },
  { label: "Scholarships", value: "1,200+", icon: <Award /> },
  { label: "Students Guided", value: "50,000+", icon: <Users /> },
];

const UNIVERSITIES = [
  { 
    name: "University of Nairobi", 
    program: "Computer Science", 
    requirements: "KCSE Grade C+ and above",
    image: "https://picsum.photos/seed/uon-1/400/200" 
  },
  { 
    name: "Technical University of Kenya", 
    program: "Engineering", 
    requirements: "KCSE Grade C+ and above",
    image: "https://picsum.photos/seed/tuk-1/400/200" 
  },
  { 
    name: "Strathmore University", 
    program: "Business & IT", 
    requirements: "Interview & Grade B",
    image: "https://picsum.photos/seed/strath-1/400/200" 
  },
];

const SCHOLARSHIPS = [
  { name: "Equity Wings To Fly", tag: "Fully Funded", deadline: "Dec 2024" },
  { name: "Mastercard Foundation", tag: "Partial", deadline: "Nov 2024" },
  { name: "Government Bursaries", tag: "Open", deadline: "Rolling" },
];

export default function Home() {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const visibleCategories = showAllCategories ? CATEGORIES : CATEGORIES.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <NavHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden hero-gradient py-20 md:py-32">
          <div className="container px-4 mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-white leading-tight">
                  Discover Your Path.<br />
                  <span className="text-white/90">Build Your Future.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 font-medium">
                  Explore careers, universities, TVET courses, scholarships and opportunities tailored for Kenyan students.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Button size="lg" className="h-14 px-10 text-lg font-bold bg-white text-primary hover:bg-white/90 gap-2 rounded-full shadow-lg transition-all hover:-translate-y-1" asChild>
                    <Link href="/quiz">
                      Take Career Assessment
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-white/40 text-white hover:bg-white/10 rounded-full backdrop-blur-sm" asChild>
                    <Link href="/hub">Explore Careers</Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 w-full max-w-[600px] relative hidden lg:block">
                <div className="relative rounded-[32px] border-8 border-white/20 shadow-2xl overflow-hidden aspect-[4/3]">
                  <Image 
                    src="https://picsum.photos/seed/kenya-students-hero/800/600" 
                    alt="Kenyan students exploring careers" 
                    fill 
                    className="object-cover"
                    data-ai-hint="kenyan students"
                  />
                  <div className="absolute inset-0 bg-primary/10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Discovery & Stats Section */}
        <section className="py-24 container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Explore Career Opportunities</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Discover careers based on your interests, subjects and strengths. We help you map out your entire journey from KCPE to professional success.
                </p>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]">
                <Image src="https://picsum.photos/seed/discovery-img/800/600" alt="Discovery" fill className="object-cover" />
              </div>
              <Button size="lg" className="rounded-full px-10 font-bold" asChild>
                <Link href="/quiz">Start Assessment</Link>
              </Button>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:max-w-md">
              {STATS.map((stat, i) => (
                <Card key={i} className="border-none shadow-card rounded-[24px] bg-white hover:scale-105 transition-transform">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-3xl font-black text-primary">{stat.value}</p>
                      <p className="text-sm font-bold text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-primary/5">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Explore Career Categories</h2>
              <p className="text-muted-foreground text-lg italic">"Chart your path to success in any field."</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
              {visibleCategories.map((cat, i) => (
                <Card key={i} className="border-none bg-primary shadow-card rounded-[20px] hover:-translate-y-2 transition-all duration-300 group cursor-pointer text-white">
                  <CardContent className="p-10 flex flex-col items-center text-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <h3 className="text-xl font-bold font-headline">{cat.title}</h3>
                    <p className="text-white/70 text-sm">Discover top roles and learning pathways in this field.</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button 
                size="lg" 
                className="rounded-full px-10 font-bold h-12"
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories ? "Show Less" : "View All Categories"}
              </Button>
            </div>
          </div>
        </section>

        {/* Assessment Section */}
        <section className="py-24 container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 relative w-full aspect-video lg:aspect-square rounded-[40px] overflow-hidden shadow-2xl">
              <Image src="https://picsum.photos/seed/assessment-kenya/800/800" alt="Assessment" fill className="object-cover" />
            </div>
            <div className="flex-1 space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Find Your Perfect Career Match</h2>
                <p className="text-muted-foreground text-lg">Our diagnostic tool uses proven methods to align your natural talents with the Kenyan job market.</p>
              </div>
              <div className="space-y-6">
                {[
                  "Discover your unique strengths",
                  "Match careers to your favorite subjects",
                  "Explore TVET and University pathways",
                  "Find scholarships and funding",
                  "Plan your future career roadmap"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">{text}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="rounded-full px-12 h-14 font-bold bg-primary shadow-xl" asChild>
                <Link href="/quiz">Take Career Assessment</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* University Section */}
        <section className="py-24 bg-primary text-white">
          <div className="container px-4 mx-auto text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold font-headline">Top University & TVET Partners</h2>
              <p className="text-white/70 text-lg">Explore where you'll gain the skills for your dream career.</p>
            </div>
            
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {UNIVERSITIES.map((uni, i) => (
                  <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 p-4">
                    <Card className="border-none rounded-[24px] bg-white text-primary overflow-hidden shadow-2xl">
                       <div className="relative h-48 w-full">
                          <Image src={uni.image} alt={uni.name} fill className="object-cover" />
                       </div>
                       <CardContent className="p-8 text-left space-y-4">
                          <div className="space-y-1">
                             <h4 className="text-xl font-bold font-headline">{uni.name}</h4>
                             <p className="text-secondary font-bold text-sm">{uni.program}</p>
                          </div>
                          <p className="text-muted-foreground text-sm font-medium">{uni.requirements}</p>
                          <Button className="w-full rounded-xl font-bold" variant="outline">View Programs</Button>
                       </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-16 bg-white/20 text-white hover:bg-white/40 border-none" />
              <CarouselNext className="hidden md:flex -right-16 bg-white/20 text-white hover:bg-white/40 border-none" />
            </Carousel>
          </div>
        </section>

        {/* Scholarships Section */}
        <section className="py-24 container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Scholarships & Opportunities</h2>
              <p className="text-muted-foreground text-lg">Find financial support to fuel your educational journey.</p>
            </div>
            <Button variant="link" className="font-bold text-primary text-lg" asChild>
              <Link href="/hub">View All <ArrowRight className="h-5 w-5 ml-2" /></Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SCHOLARSHIPS.map((sch, i) => (
              <Card key={i} className="border-none shadow-card rounded-[24px] bg-white group hover:-translate-y-2 transition-all">
                <CardContent className="p-8 space-y-6">
                  <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                    <Award className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-headline">{sch.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-success" />
                      <span className="text-sm font-black text-success uppercase tracking-widest">{sch.tag}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t flex justify-between items-center">
                    <p className="text-sm text-muted-foreground font-bold">Deadline: {sch.deadline}</p>
                    <Button variant="ghost" className="font-bold text-primary p-0 h-auto">Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 container px-4 mx-auto">
           <Card className="hero-gradient border-none rounded-[40px] p-12 md:p-24 text-center text-white space-y-10 shadow-2xl relative overflow-hidden">
             <div className="relative z-10 space-y-6">
               <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">Ready to Discover Your Future?</h2>
               <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
                 Take our career assessment and explore opportunities tailored exactly to your strengths.
               </p>
               <Button size="lg" className="rounded-full px-12 h-16 text-lg font-bold bg-white text-primary hover:bg-white/90 shadow-2xl" asChild>
                 <Link href="/quiz">Get Started Now</Link>
               </Button>
             </div>
             {/* Decorative Elements */}
             <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px]" />
           </Card>
        </section>
      </main>

      <footer className="border-t py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <span className="text-2xl font-bold font-headline text-primary">CareerCompass Kenya</span>
              <p className="text-muted-foreground font-medium">
                Discover careers, courses, universities and opportunities tailored for Kenyan students. Navigate your future with precision.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-lg font-bold font-headline">Explore</h4>
              <nav className="flex flex-col gap-4 text-sm font-semibold text-muted-foreground">
                <Link href="/hub" className="hover:text-primary transition-colors">Careers</Link>
                <Link href="/hub" className="hover:text-primary transition-colors">Universities</Link>
                <Link href="/hub" className="hover:text-primary transition-colors">TVET Pathways</Link>
                <Link href="/hub" className="hover:text-primary transition-colors">Scholarships</Link>
                <Link href="/quiz" className="hover:text-primary transition-colors">Career Assessment</Link>
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="text-lg font-bold font-headline">Resources</h4>
              <nav className="flex flex-col gap-4 text-sm font-semibold text-muted-foreground">
                <Link href="/hub" className="hover:text-primary transition-colors">Career Guides</Link>
                <Link href="/hub" className="hover:text-primary transition-colors">Mentorship Hub</Link>
                <Link href="/hub" className="hover:text-primary transition-colors">KUCCPS Portal</Link>
                <Link href="/hub" className="hover:text-primary transition-colors">FAQs</Link>
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="text-lg font-bold font-headline">Follow Us</h4>
              <div className="flex gap-4">
                {['Facebook', 'Instagram', 'TikTok', 'LinkedIn'].map(p => (
                   <div key={p} className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all cursor-pointer">
                      <span className="sr-only">{p}</span>
                      <Compass className="h-5 w-5" />
                   </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground font-medium pt-8 border-t text-center">
            © 2026 CareerCompass Kenya. All rights reserved. Precision career guidance for the next generation.
          </div>
        </div>
      </footer>
    </div>
  );
}
