"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { NavHeader } from "@/components/nav-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QUESTIONS, CAREER_MAPPING, PATHWAY_MAPPING } from "@/lib/data";
import { IntelligenceType } from "@/lib/types";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Download, Share2, Briefcase, BookOpen, Rocket, Lightbulb, Check, Loader2, Compass, Target } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function ResultsPage() {
  const [results, setResults] = useState<Record<IntelligenceType, number> | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('quiz-results');
    if (saved) {
      const answers = JSON.parse(saved);
      const scores: Record<string, number> = {};
      
      QUESTIONS.forEach(q => {
        const type = q.type as string;
        scores[type] = (scores[type] || 0) + (answers[q.id] || 0);
      });

      setResults(scores as Record<IntelligenceType, number>);
    }
  }, []);

  const analyzedResults = useMemo(() => {
    if (!results) return [];
    return Object.entries(results).map(([type, score]) => ({
      type: type as IntelligenceType,
      score,
      percentage: (score / 25) * 100
    })).sort((a, b) => b.score - a.score);
  }, [results]);

  const dominant = analyzedResults[0];
  const coDominant = analyzedResults[1];

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    
    setIsDownloading(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#f8fafc",
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CareerCompass_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!results) {
    if (!mounted) return null;
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold font-headline mb-6">No results found yet.</h1>
        <Button size="lg" className="rounded-full h-16 px-10 text-xl font-bold" asChild><a href="/quiz">Take the Test!</a></Button>
      </div>
    );
  }

  const recommendedPathway = PATHWAY_MAPPING[dominant.type];
  const careers = CAREER_MAPPING[dominant.type];

  return (
    <div className="min-h-screen bg-background pb-32">
      <NavHeader />
      
      <div className="hero-gradient py-24 text-white">
        <div className="container px-4 mx-auto text-center space-y-8">
          <Badge className="bg-white/20 text-white hover:bg-white/30 border-none px-8 py-2 rounded-full text-base font-bold backdrop-blur-md">
            Journey Assessment Complete! 🚀
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight">Your Career Compass</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            We've mapped your unique strengths to paths where you'll shine. Discover the future you were built for!
          </p>
          <div className="flex flex-wrap gap-6 justify-center pt-8">
            <Button 
              className="h-16 gap-3 bg-accent text-white hover:bg-accent/90 rounded-full px-12 font-bold text-lg shadow-2xl transition-all hover:scale-105 active:scale-95" 
              onClick={handleDownloadPdf}
              disabled={isDownloading}
            >
              {isDownloading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Download className="h-6 w-6" />}
              {isDownloading ? "Generating..." : "Get PDF Report"}
            </Button>
            <Button variant="outline" className="h-16 gap-3 border-white/40 bg-white/10 text-white hover:bg-white/20 rounded-full px-12 font-bold text-lg backdrop-blur-sm">
              <Share2 className="h-6 w-6" /> Share with Family
            </Button>
          </div>
        </div>
      </div>

      <main className="container px-4 mx-auto -mt-20 space-y-16" ref={reportRef}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Visualizer */}
          <Card className="lg:col-span-2 shadow-card border-none bg-white rounded-[40px] overflow-hidden">
            <CardHeader className="p-12 pb-0">
              <CardTitle className="font-headline text-3xl flex items-center gap-4 text-primary">
                <Compass className="h-8 w-8" /> Strength Map
              </CardTitle>
              <CardDescription className="text-lg">A visual breakdown of your Multiple Intelligences.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] sm:h-[650px] p-12">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analyzedResults}>
                    <PolarGrid stroke="#e2e8f0" strokeWidth={2} />
                    <PolarAngleAxis dataKey="type" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 14, fontWeight: 700 }} />
                    <Radar
                      name="Your Profile"
                      dataKey="score"
                      stroke="#2563EB"
                      fill="#2563EB"
                      fillOpacity={0.6}
                      strokeWidth={4}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', padding: '16px' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-muted/20 animate-pulse rounded-[40px]" />
              )}
            </CardContent>
          </Card>

          {/* Top Intelligences */}
          <div className="space-y-10">
            <Card className="border-none shadow-card bg-white rounded-[32px] overflow-hidden transform hover:scale-102 transition-transform">
              <div className="h-4 bg-primary w-full" />
              <CardHeader className="p-10">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-none font-bold px-4 py-1 rounded-full mb-4">Dominant Power</Badge>
                <CardTitle className="font-headline text-3xl text-primary">{dominant.type}</CardTitle>
              </CardHeader>
              <CardContent className="px-10 pb-10 text-lg text-muted-foreground leading-relaxed">
                Your brain naturally excels at <strong>{dominant.type.toLowerCase()}</strong> tasks. This is your core advantage in school and your future career.
              </CardContent>
            </Card>

            <Card className="border-none shadow-card bg-white rounded-[32px] overflow-hidden transform hover:scale-102 transition-transform">
              <div className="h-4 bg-secondary w-full" />
              <CardHeader className="p-10">
                <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/10 border-none font-bold px-4 py-1 rounded-full mb-4">Supporting Power</Badge>
                <CardTitle className="font-headline text-3xl text-secondary">{coDominant.type}</CardTitle>
              </CardHeader>
              <CardContent className="px-10 pb-10 text-lg text-muted-foreground leading-relaxed">
                Your <strong>{coDominant.type.toLowerCase()}</strong> abilities complement your main strengths, giving you a unique edge.
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-none rounded-[32px] p-4">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-headline flex items-center gap-3 text-primary">
                  <Rocket className="h-7 w-7 text-accent" /> CBE Pathway
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-6">
                <div className="flex items-center justify-between p-6 bg-white rounded-3xl shadow-xl border-2 border-accent/20">
                  <span className="font-black text-2xl text-primary">{recommendedPathway}</span>
                  <Badge className="bg-success text-white font-bold px-4 py-1 rounded-full">85% Match</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Career Section */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold font-headline text-primary tracking-tight">Top Career Matches</h2>
            <p className="text-muted-foreground text-2xl font-medium">Careers where you'll thrive in Kenya.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {careers.map((career, idx) => (
              <Card key={idx} className="border-none shadow-card rounded-[40px] bg-white group hover:translate-y-[-12px] transition-all duration-500 overflow-hidden">
                <div className="p-12 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="h-20 w-20 rounded-[32px] bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                      <Briefcase className="h-10 w-10" />
                    </div>
                    <Badge className="bg-success/10 text-success border-none font-bold px-4 py-1 rounded-full">Top Choice</Badge>
                  </div>
                  <div className="space-y-4">
                    <CardTitle className="font-headline text-3xl group-hover:text-primary transition-colors">{career.title}</CardTitle>
                    <CardDescription className="text-lg leading-relaxed line-clamp-2">{career.description}</CardDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-8 border-y py-8">
                    <div className="space-y-2">
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Est. Salary</p>
                      <p className="text-lg font-bold text-primary">{career.avgSalary}</p>
                    </div>
                    <div className="space-y-2 text-right">
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Demand</p>
                      <Badge className="bg-orange-500 text-white border-none font-black px-4 py-1 rounded-full">HIGH</Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {career.skills.map(s => (
                      <Badge key={s} variant="secondary" className="text-sm font-bold rounded-xl px-4 py-1.5 bg-muted/50">{s}</Badge>
                    ))}
                  </div>
                  <Button className="w-full h-16 bg-primary/5 text-primary hover:bg-primary hover:text-white border-none font-black rounded-[24px] text-lg transition-all group-hover:shadow-2xl">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Subjects & Planning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="border-none shadow-card rounded-[40px] bg-white overflow-hidden">
            <CardHeader className="bg-primary/5 p-12">
              <CardTitle className="font-headline text-3xl text-primary flex items-center gap-4">
                <BookOpen className="h-8 w-8" /> Recommended Subjects
              </CardTitle>
              <CardDescription className="text-lg font-bold">CBE Phase 4: Senior School</CardDescription>
            </CardHeader>
            <CardContent className="p-12 space-y-10">
              <div className="space-y-6">
                <h4 className="text-base font-black text-primary uppercase tracking-[0.2em]">Compulsory Core</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['English', 'Kiswahili', 'Mathematics', 'Religious Ed.'].map(s => (
                    <div key={s} className="flex items-center gap-4 p-6 bg-muted/40 rounded-[24px] text-lg font-bold border-2 border-transparent hover:border-primary/20 transition-all">
                      <Check className="h-6 w-6 text-success" /> {s}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-base font-black text-secondary uppercase tracking-[0.2em]">Your Electives</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(recommendedPathway === 'STEM' 
                    ? ['Biology', 'Chemistry', 'Physics', 'Computer Studies', 'Geography', 'Business', 'Agriculture']
                    : ['Literature', 'Geography', 'Home Science', 'Music', 'French', 'History', 'Fine Art']
                  ).map(s => (
                    <div key={s} className="flex items-center gap-4 p-6 bg-secondary/5 rounded-[24px] text-lg font-bold border-2 border-secondary/10 hover:border-secondary/40 transition-all">
                      <div className="h-3 w-3 rounded-full bg-secondary shadow-sm shadow-secondary/50" /> {s}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-card rounded-[40px] bg-white overflow-hidden">
            <CardHeader className="bg-success/5 p-12">
              <CardTitle className="font-headline text-3xl text-success flex items-center gap-4">
                <Target className="h-8 w-8" /> Your Career Roadmap
              </CardTitle>
              <CardDescription className="text-lg font-bold">Steps to your future success.</CardDescription>
            </CardHeader>
            <CardContent className="p-12">
              <div className="relative pl-12 border-l-4 border-success/10 space-y-16 py-4">
                <div className="relative">
                  <div className="absolute -left-[62px] top-0 h-10 w-10 rounded-full bg-success border-8 border-white shadow-xl ring-4 ring-success/5" />
                  <h4 className="font-bold font-headline text-2xl text-primary">High School Phase</h4>
                  <p className="text-lg text-muted-foreground mt-4 leading-relaxed font-medium">Excel in your core subjects and join clubs that match your <strong>{dominant.type}</strong> strengths.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[62px] top-0 h-10 w-10 rounded-full bg-primary border-8 border-white shadow-xl ring-4 ring-primary/5" />
                  <h4 className="font-bold font-headline text-2xl text-primary">Higher Education</h4>
                  <p className="text-lg text-muted-foreground mt-4 leading-relaxed font-medium">Target university courses like <strong>{careers[0].title}</strong>. Apply for scholarships via the CareerCompass Hub.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[62px] top-0 h-10 w-10 rounded-full bg-accent border-8 border-white shadow-xl ring-4 ring-accent/5" />
                  <h4 className="font-bold font-headline text-2xl text-primary">Career Kickoff</h4>
                  <p className="text-lg text-muted-foreground mt-4 leading-relaxed font-medium">Start with an internship at a top Kenyan firm. Your {coDominant.type} skills will help you lead!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}