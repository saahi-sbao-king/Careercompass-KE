
"use client";

import { useEffect, useState, useMemo } from "react";
import { NavHeader } from "@/components/nav-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QUESTIONS, CAREER_MAPPING, PATHWAY_MAPPING } from "@/lib/data";
import { IntelligenceType, IntelligenceResult, CBEPathway, CareerInfo } from "@/lib/types";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { Download, Share2, Briefcase, BookOpen, Rocket, Lightbulb } from "lucide-react";

export default function ResultsPage() {
  const [results, setResults] = useState<Record<IntelligenceType, number> | null>(null);

  useEffect(() => {
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
      fullType: type,
      percentage: (score / 25) * 100 // Max score per type is 5 questions * 5 = 25
    })).sort((a, b) => b.score - a.score);
  }, [results]);

  const dominant = analyzedResults[0];
  const coDominant = analyzedResults[1];

  if (!results) {
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
      
      <div className="bg-primary py-12 text-primary-foreground">
        <div className="container px-4 mx-auto text-center space-y-4">
          <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-white/10 px-4 py-1">
            Diagnostic Analysis Complete
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold font-headline">Your Career Compass Profile</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Based on your responses, we've identified your dominant intelligences and mapped them to the Kenyan CBE framework.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button variant="secondary" className="gap-2">
              <Download className="h-4 w-4" /> Download Report
            </Button>
            <Button variant="outline" className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-white/10">
              <Share2 className="h-4 w-4" /> Share with Parent
            </Button>
          </div>
        </div>
      </div>

      <main className="container px-4 mx-auto -mt-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Visualizer */}
          <Card className="lg:col-span-2 shadow-lg border-2">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" /> Intelligence Profile
              </CardTitle>
              <CardDescription>Visualizing your strengths across nine domains.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] sm:h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analyzedResults}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="type" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <Radar
                    name="Student Profile"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Intelligences */}
          <div className="space-y-6">
            <Card className="border-l-4 border-l-primary shadow-md">
              <CardHeader className="pb-2">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">Dominant</p>
                <CardTitle className="font-headline text-2xl">{dominant.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You possess a high degree of {dominant.type.toLowerCase()} ability. This means you likely process information through {dominant.type === 'Logical-Mathematical' ? 'patterns and logical reasoning' : 'your natural inclinations'}.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent shadow-md">
              <CardHeader className="pb-2">
                <p className="text-xs font-bold text-accent uppercase tracking-widest">Co-Dominant</p>
                <CardTitle className="font-headline text-2xl">{coDominant.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your {coDominant.type.toLowerCase()} intelligence strongly supports your primary strengths, creating a unique problem-solving profile.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 border-dashed border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" /> CBE Pathway
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Recommended:</span>
                  <Badge className="bg-accent text-accent-foreground text-sm px-3">{recommendedPathway}</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This pathway is perfectly aligned with the {dominant.type} profile, focusing on {recommendedPathway === 'STEM' ? 'scientific and technical' : 'social and artistic'} excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Insights */}
        <Tabs defaultValue="careers" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50 p-1">
            <TabsTrigger value="careers" className="font-medium gap-2">
              <Briefcase className="h-4 w-4" /> Recommended Careers
            </TabsTrigger>
            <TabsTrigger value="subjects" className="font-medium gap-2">
              <BookOpen className="h-4 w-4" /> Subject Combinations
            </TabsTrigger>
            <TabsTrigger value="planner" className="font-medium gap-2">
              <Rocket className="h-4 w-4" /> Growth Plan
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="careers" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careers.map((career, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-all border-none shadow-sm ring-1 ring-border">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none">Top Match</Badge>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Demand</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <div key={s} className={`h-1.5 w-3 rounded-full ${s <= career.demandScore/2 ? 'bg-accent' : 'bg-muted'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="font-headline">{career.title}</CardTitle>
                    <CardDescription>{career.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-sm p-3 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Avg. Salary (KE)</span>
                      <span className="font-bold text-foreground">{career.avgSalary}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map(s => (
                        <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">CBE 11-Subject Rule Compliance</CardTitle>
                <CardDescription>Your optimized combination for {recommendedPathway} pathway.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-primary uppercase flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Compulsory Subjects (4)
                  </h4>
                  <ul className="space-y-2">
                    {['English', 'Kiswahili', 'Mathematics', 'Religious Education (CRE/IRE/HRE)'].map(s => (
                      <li key={s} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg text-sm border border-transparent hover:border-primary/20 transition-all">
                        <Check className="h-4 w-4 text-primary" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-accent uppercase flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" /> Recommended Electives (7)
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {(recommendedPathway === 'STEM' 
                      ? ['Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'Business Studies', 'Computer Studies']
                      : ['Literature', 'Geography', 'Home Science', 'Music', 'French', 'History', 'Agriculture']
                    ).map(s => (
                      <li key={s} className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg text-sm border border-transparent hover:border-accent/20 transition-all">
                        <div className="h-2 w-2 rounded-full bg-accent/30" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planner" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Career Development Plan</CardTitle>
                <CardDescription>Short, Medium, and Long-term growth strategy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative pl-8 border-l-2 border-primary/20 space-y-8 py-4">
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 h-6 w-6 rounded-full bg-primary border-4 border-background" />
                    <h4 className="font-bold font-headline text-lg">Short Term (Form 3-4)</h4>
                    <p className="text-sm text-muted-foreground mt-1">Focus on excelling in {dominant.type}-related subjects. Join the Science/Arts club and participate in national competitions.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 h-6 w-6 rounded-full bg-accent border-4 border-background" />
                    <h4 className="font-bold font-headline text-lg">Medium Term (University)</h4>
                    <p className="text-sm text-muted-foreground mt-1">Target Cluster Points for KUCCPS admission into courses like {careers[0].title}. Apply for mentorship through the CareerCompass portal.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 h-6 w-6 rounded-full bg-muted border-4 border-background" />
                    <h4 className="font-bold font-headline text-lg">Long Term (Career)</h4>
                    <p className="text-sm text-muted-foreground mt-1">Establish yourself as a professional in Kenya's {recommendedPathway} sector. Aim for leadership roles by your 5th year of practice.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
