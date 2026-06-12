"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { NavHeader } from "@/components/nav-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QUESTIONS, CAREER_MAPPING, PATHWAY_MAPPING } from "@/lib/data";
import { IntelligenceType } from "@/lib/types";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell
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
        <h1 className="text-2xl font-bold font-headline mb-4">No results found.</h1>
        <Button asChild><a href="/quiz">Take the Quiz</a></Button>
      </div>
    );
  }

  const recommendedPathway = PATHWAY_MAPPING[dominant.type];
  const careers = CAREER_MAPPING[dominant.type];

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavHeader />
      
      <div className="hero-gradient py-16 text-white">
        <div className="container px-4 mx-auto text-center space-y-6">
          <Badge variant="outline" className="border-white/30 text-white bg-white/10 px-6 py-1.5 rounded-full text-sm font-semibold">
            Assessment Complete
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">Your Career Compass Profile</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            We've mapped your unique strengths to the best-fit Kenyan career pathways and university courses.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Button 
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-8 font-bold shadow-lg" 
              onClick={handleDownloadPdf}
              disabled={isDownloading}
            >
              {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-5 w-5" />}
              {isDownloading ? "Exporting..." : "Download Report (PDF)"}
            </Button>
            <Button variant="outline" className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 rounded-xl px-8 font-bold">
              <Share2 className="h-5 w-5" /> Share with Parent
            </Button>
          </div>
        </div>
      </div>

      <main className="container px-4 mx-auto -mt-12 space-y-12" ref={reportRef}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Visualizer */}
          <Card className="lg:col-span-2 shadow-card border-none bg-white rounded-2xl">
            <CardHeader className="border-b">
              <CardTitle className="font-headline flex items-center gap-3 text-primary">
                <Compass className="h-6 w-6" /> MI Profile Visualizer
              </CardTitle>
              <CardDescription>Mapping your 9 multiple intelligences.</CardDescription>
            </CardHeader>
            <CardContent className="h-[450px] sm:h-[550px] pt-8">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analyzedResults}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="type" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 500 }} />
                    <Radar
                      name="Student Profile"
                      dataKey="score"
                      stroke="#0F4C81"
                      fill="#0F4C81"
                      fillOpacity={0.6}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-muted/20 animate-pulse rounded-2xl" />
              )}
            </CardContent>
          </Card>

          {/* Top Intelligences */}
          <div className="space-y-6">
            <Card className="border-none shadow-card bg-white rounded-2xl overflow-hidden">
              <div className="h-2 bg-primary w-full" />
              <CardHeader className="pb-4">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-none w-fit mb-2">Dominant Strength</Badge>
                <CardTitle className="font-headline text-2xl text-primary">{dominant.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  You have an exceptional aptitude for {dominant.type.toLowerCase()} reasoning. This is your primary "superpower" in learning and problem-solving.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card bg-white rounded-2xl overflow-hidden">
              <div className="h-2 bg-secondary w-full" />
              <CardHeader className="pb-4">
                <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/10 border-none w-fit mb-2">Support Strength</Badge>
                <CardTitle className="font-headline text-2xl text-secondary">{coDominant.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Your {coDominant.type.toLowerCase()} intelligence provides a powerful secondary lens through which you analyze the world.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-none rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-headline flex items-center gap-2 text-primary">
                  <Rocket className="h-5 w-5" /> Recommended Pathway
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border">
                  <span className="font-bold text-primary">{recommendedPathway}</span>
                  <Badge className="bg-success text-white">94% Match</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This CBE Senior School pathway perfectly matches your cognitive profile.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Career Section */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b pb-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-headline text-primary">Recommended Careers</h2>
              <p className="text-muted-foreground">Tailored for your {dominant.type} profile in Kenya.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career, idx) => (
              <Card key={idx} className="border-none shadow-card rounded-2xl bg-white group hover:translate-y-[-6px] transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Briefcase className="h-7 w-7" />
                    </div>
                    <Badge variant="outline" className="border-success text-success font-bold px-3">Top Match</Badge>
                  </div>
                  <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{career.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2 leading-relaxed">{career.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Avg. Salary</p>
                      <p className="text-sm font-bold text-primary">{career.avgSalary}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Demand Level</p>
                      <Badge className="bg-success/10 text-success border-none hover:bg-success/20">High</Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map(s => (
                      <Badge key={s} variant="secondary" className="text-[10px] rounded-md px-2 py-0.5">{s}</Badge>
                    ))}
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full bg-primary/5 text-primary hover:bg-primary hover:text-white border-none font-bold rounded-xl transition-all">
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Subjects & Planning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-card rounded-2xl bg-white">
            <CardHeader className="bg-primary/5 rounded-t-2xl">
              <CardTitle className="font-headline text-xl text-primary flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Optimized Subject Combination
              </CardTitle>
              <CardDescription>CBE 11-Subject Rule Compliance</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-primary uppercase tracking-widest">Compulsory Core (4)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['English', 'Kiswahili', 'Mathematics', 'Religious Ed.'].map(s => (
                    <div key={s} className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl text-sm font-medium border border-transparent">
                      <Check className="h-5 w-5 text-success" /> {s}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-widest">Recommended Electives (7)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(recommendedPathway === 'STEM' 
                    ? ['Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'Business', 'Computer']
                    : ['Literature', 'Geography', 'Home Science', 'Music', 'French', 'History', 'Agriculture']
                  ).map(s => (
                    <div key={s} className="flex items-center gap-3 p-4 bg-secondary/5 rounded-xl text-sm font-medium border border-secondary/10">
                      <div className="h-2 w-2 rounded-full bg-secondary" /> {s}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-card rounded-2xl bg-white">
            <CardHeader className="bg-success/5 rounded-t-2xl">
              <CardTitle className="font-headline text-xl text-success flex items-center gap-2">
                <Target className="h-5 w-5" /> Academic Growth Roadmap
              </CardTitle>
              <CardDescription>Your plan from Form 3 to Career</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 px-8">
              <div className="relative pl-8 border-l-2 border-success/20 space-y-12 py-4">
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 h-6 w-6 rounded-full bg-success border-4 border-white shadow-sm" />
                  <h4 className="font-bold font-headline text-lg text-primary">Senior School Phase</h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Focus on excelling in core {recommendedPathway} electives. Join the specialized subject clubs and start building a portfolio.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 h-6 w-6 rounded-full bg-secondary border-4 border-white shadow-sm" />
                  <h4 className="font-bold font-headline text-lg text-primary">Higher Education Phase</h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Target top-tier cluster points for courses like {careers[0].title}. Apply for scholarships through the CareerCompass portal.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 h-6 w-6 rounded-full bg-accent border-4 border-white shadow-sm" />
                  <h4 className="font-bold font-headline text-lg text-primary">Career Launch</h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Internship placement at industry leading firms in Kenya. Begin professional certification path.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}