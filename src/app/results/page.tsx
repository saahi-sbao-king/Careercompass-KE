
"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { NavHeader } from "@/components/nav-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_QUESTION_MAP, CAREER_MAPPING, PATHWAY_MAPPING } from "@/lib/data";
import { AssessmentCategory, CategoryResult, CareerInfo, QuizResults } from "@/lib/types";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Download, Share2, Briefcase, Rocket, Loader2, Compass, Target, GraduationCap } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Link from "next/link";

export default function ResultsPage() {
  const [results, setResults] = useState<CategoryResult[] | null>(null);
  const [quizType, setQuizType] = useState<'PIA' | 'MI'>('PIA');
  const [mounted, setMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('quiz-results');
    if (saved) {
      const data = JSON.parse(saved) as QuizResults;
      const { type, answers } = data;
      setQuizType(type);
      
      const relevantCategories: AssessmentCategory[] = type === 'PIA' 
        ? ['Technology', 'Medicine & Health', 'Engineering', 'Business', 'Agriculture', 'Education', 'Law', 'Arts & Media']
        : ['Linguistic', 'Logical-Mathematical', 'Spatial', 'Musical', 'Bodily-Kinesthetic', 'Interpersonal', 'Intrapersonal', 'Naturalistic', 'Existential'];

      const calculatedResults: CategoryResult[] = relevantCategories.map(category => {
        const questionIds = CATEGORY_QUESTION_MAP[category] || [];
        let categoryRawScore = 0;
        questionIds.forEach(id => {
          categoryRawScore += answers[id] || 0;
        });

        const maxScore = questionIds.length * 5;
        const percentage = Math.round((categoryRawScore / maxScore) * 100);

        let matchLevel = "Low Match";
        if (percentage >= 85) matchLevel = "Exceptional Strength";
        else if (percentage >= 70) matchLevel = "Strong Strength";
        else if (percentage >= 55) matchLevel = "Moderate Strength";
        else if (percentage >= 40) matchLevel = "Potential Area";

        return {
          category,
          score: categoryRawScore,
          maxScore,
          percentage,
          matchLevel
        };
      }).sort((a, b) => b.percentage - a.percentage);

      setResults(calculatedResults);
    }
  }, []);

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    
    setIsDownloading(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "hsl(var(--background))",
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CareerCompass_${quizType}_Report_${new Date().toISOString().split('T')[0]}.pdf`);
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
        <h1 className="text-3xl font-bold font-headline mb-6">No assessment results found.</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="rounded-full h-16 px-10 text-xl font-bold" asChild><Link href="/quiz?type=PIA">PIA Assessment</Link></Button>
          <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-xl font-bold" asChild><Link href="/quiz?type=MI">Career Assessment</Link></Button>
        </div>
      </div>
    );
  }

  const dominant = results[0];
  const coDominant = results[1];
  const careers = CAREER_MAPPING[dominant.category] || [];
  const recommendedPathway = PATHWAY_MAPPING[dominant.category];

  return (
    <div className="min-h-screen bg-background pb-32">
      <NavHeader />
      
      <div className="hero-gradient py-24 text-white">
        <div className="container px-4 mx-auto text-center space-y-8">
          <Badge className="bg-white/20 text-white hover:bg-white/30 border-none px-8 py-2 rounded-full text-base font-bold backdrop-blur-md">
            {quizType === 'PIA' ? 'PIA Assessment Complete! 🚀' : 'Career Intelligence Mapped! 🧠'}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight">Your Career Compass</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            We've mapped your unique {quizType === 'PIA' ? 'passions, interests, and abilities' : 'multiple intelligences'} to these top pathways.
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
              <Share2 className="h-6 w-6" /> Share Result
            </Button>
          </div>
        </div>
      </div>

      <main className="container px-4 mx-auto -mt-20 space-y-16" ref={reportRef}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Card className="lg:col-span-2 shadow-card border-none bg-card rounded-[40px] overflow-hidden">
            <CardHeader className="p-12 pb-0">
              <CardTitle className="font-headline text-3xl flex items-center gap-4 text-primary">
                <Compass className="h-8 w-8" /> {quizType === 'PIA' ? 'Match Profile' : 'Intelligence Profile'}
              </CardTitle>
              <CardDescription className="text-lg">Your top strengths and matches.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] sm:h-[650px] p-12">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={results}>
                    <PolarGrid stroke="hsl(var(--muted))" strokeWidth={2} />
                    <PolarAngleAxis dataKey="category" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }} />
                    <Radar
                      name="Your Profile"
                      dataKey="percentage"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.6}
                      strokeWidth={4}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '24px', border: 'none', backgroundColor: 'hsl(var(--card))', boxShadow: '0 10px 40px rgba(0,0,0,0.4)', padding: '16px' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-muted/20 animate-pulse rounded-[40px]" />
              )}
            </CardContent>
          </Card>

          <div className="space-y-10">
            <Card className="border-none shadow-card bg-card rounded-[32px] overflow-hidden transform hover:scale-102 transition-transform">
              <div className="h-4 bg-primary w-full" />
              <CardHeader className="p-10 pb-4">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-none font-bold px-4 py-1 rounded-full mb-4">{dominant.matchLevel}</Badge>
                <CardTitle className="font-headline text-3xl text-primary">{dominant.category}</CardTitle>
                <p className="text-4xl font-black mt-2">{dominant.percentage}%</p>
              </CardHeader>
              <CardContent className="px-10 pb-10 text-lg text-muted-foreground leading-relaxed">
                Your primary matching area is <strong>{dominant.category}</strong>. You demonstrate exceptional alignment here.
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-none rounded-[32px] p-4">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-headline flex items-center gap-3 text-primary">
                  <Rocket className="h-7 w-7 text-accent" /> Recommended CBE Pathway
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="flex items-center justify-between p-6 bg-card rounded-3xl shadow-xl border-2 border-accent/20">
                  <span className="font-black text-2xl text-primary">{recommendedPathway}</span>
                  <Badge className="bg-success text-white font-bold px-4 py-1 rounded-full">Optimal</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold font-headline text-primary tracking-tight">Top Career Matches</h2>
            <p className="text-muted-foreground text-2xl font-medium">Careers tailored for your unique profile.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {careers.map((career, idx) => (
              <Card key={idx} className="border-none shadow-card rounded-[40px] bg-card group hover:translate-y-[-12px] transition-all duration-500 overflow-hidden">
                <div className="p-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="h-16 w-16 rounded-[24px] bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <Badge className="bg-success/10 text-success border-none font-bold px-4 py-1 rounded-full">{dominant.percentage}% Match</Badge>
                  </div>
                  <div className="space-y-3">
                    <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{career.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed line-clamp-3">{career.description}</CardDescription>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Est. Salary</span>
                      <span className="text-lg font-bold text-primary">{career.avgSalary}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Demand</span>
                      <Badge className={career.demandLevel === 'High' ? "bg-orange-500" : "bg-blue-500" + " text-white border-none font-black px-4 py-1 rounded-full"}>{career.demandLevel}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Recommended Institutions</p>
                    <div className="flex flex-wrap gap-2">
                      {[...career.universities, ...career.tvetOptions].slice(0, 3).map(inst => (
                        <div key={inst} className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground">
                          <GraduationCap className="h-3 w-3" /> {inst}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full h-14 bg-primary/5 text-primary hover:bg-primary hover:text-white border-none font-black rounded-[20px] text-base transition-all group-hover:shadow-xl mt-4">
                    Explore Roadmap
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
