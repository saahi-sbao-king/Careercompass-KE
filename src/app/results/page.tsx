
"use client";

import { useEffect, useState, useRef } from "react";
import { NavHeader } from "@/components/nav-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CATEGORY_QUESTION_MAP, CAREER_MAPPING, PATHWAY_MAPPING, MI_INFO_MAP, PIA_QUESTIONS, MI_QUESTIONS } from "@/lib/data";
import { AssessmentCategory, CategoryResult, QuizResults } from "@/lib/types";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Download, Share2, Briefcase, Rocket, Loader2, Calendar, User, FileText, CheckCircle, Lightbulb, Target } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Link from "next/link";

export default function ResultsPage() {
  const [results, setResults] = useState<CategoryResult[] | null>(null);
  const [quizType, setQuizType] = useState<'PIA' | 'MI'>('PIA');
  const [mounted, setMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [assessmentId, setAssessmentId] = useState("");
  const [subSectionScores, setSubSectionScores] = useState<Record<string, number>>({});
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setAssessmentId(`CCK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    const saved = localStorage.getItem('quiz-results');
    if (saved) {
      const data = JSON.parse(saved) as QuizResults;
      const { type, answers } = data;
      setQuizType(type);
      
      const questions = type === 'PIA' ? PIA_QUESTIONS : MI_QUESTIONS;
      
      // Calculate Sub-section percentages
      const subScores: Record<string, { current: number, max: number }> = {};
      questions.forEach(q => {
        if (q.subSection) {
          if (!subScores[q.subSection]) subScores[q.subSection] = { current: 0, max: 0 };
          subScores[q.subSection].current += answers[q.id] || 0;
          subScores[q.subSection].max += 5;
        }
      });
      
      const finalSubScores: Record<string, number> = {};
      Object.entries(subScores).forEach(([key, val]) => {
        finalSubScores[key] = Math.round((val.current / val.max) * 100);
      });
      setSubSectionScores(finalSubScores);

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
        if (percentage >= 85) matchLevel = quizType === 'PIA' ? "Excellent Match" : "Exceptional Strength";
        else if (percentage >= 70) matchLevel = quizType === 'PIA' ? "Strong Match" : "Strong Strength";
        else if (percentage >= 55) matchLevel = quizType === 'PIA' ? "Good Match" : "Moderate Strength";
        else if (percentage >= 40) matchLevel = quizType === 'PIA' ? "Potential Match" : "Developing Area";

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
  }, [quizType]);

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setIsDownloading(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = 295;
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`CareerCompass_${quizType}_Report_${studentName || 'Student'}.pdf`);
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
  const careers = CAREER_MAPPING[dominant.category] || [];
  const recommendedPathway = PATHWAY_MAPPING[dominant.category];

  return (
    <div className="min-h-screen bg-background pb-32">
      <NavHeader />
      
      <div className="hero-gradient py-24 text-white">
        <div className="container px-4 mx-auto text-center space-y-8">
          <Badge className="bg-white/20 text-white border-none px-8 py-2 rounded-full text-base font-bold backdrop-blur-md uppercase">
            {quizType === 'PIA' ? 'Passions • Interests • Abilities Report' : 'Multiple Intelligences Report'}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight">Your Career Compass</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Personalize and download your comprehensive career guidance report.
          </p>
          <div className="max-w-md mx-auto space-y-4">
            <Input 
              placeholder="Enter Your Full Name" 
              className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl text-center text-lg font-bold"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="h-16 gap-3 bg-accent text-white hover:bg-accent/90 rounded-full px-12 font-bold text-lg shadow-2xl transition-all hover:scale-105" 
                onClick={handleDownloadPdf}
                disabled={isDownloading}
              >
                {isDownloading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Download className="h-6 w-6" />}
                {isDownloading ? "Generating..." : "Download Report PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container px-4 mx-auto -mt-20 space-y-16">
        <div ref={reportRef} className="bg-white text-slate-900 rounded-[40px] shadow-2xl overflow-hidden p-8 md:p-16 space-y-12">
          
          {/* Header */}
          <div className="border-b-4 border-primary pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-primary font-headline uppercase tracking-tighter">CareerCompass Kenya</h2>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Official Assessment Report</p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground">Student Name</p>
                <p className="font-bold underline decoration-primary/30 decoration-2 underline-offset-4">{studentName || "____________________"}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground">Date</p>
                <p className="font-bold">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground">Assessment ID</p>
                <p className="font-bold">{assessmentId}</p>
              </div>
            </div>
          </div>

          {quizType === 'PIA' ? (
            /* PIA REPORT CONTENT */
            <>
              <section className="space-y-8">
                <div className="p-8 bg-primary/5 rounded-[32px] border-2 border-primary/10 flex flex-col md:flex-row items-center gap-10">
                   <div className="flex-1 space-y-4">
                      <Badge className="bg-primary text-white border-none font-black px-4 py-1 rounded-full uppercase text-xs">Career Profile Summary</Badge>
                      <h3 className="text-3xl font-bold font-headline">Passions & Interests Alignment</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        This report identifies the areas where your <strong>Passions, Interests, and Abilities</strong> are most strongly aligned for the Kenyan job market.
                      </p>
                   </div>
                   <div className="text-center p-8 bg-white rounded-[24px] shadow-xl border-2 border-primary/10 min-w-[200px]">
                      <p className="text-[10px] font-black text-primary uppercase mb-2">Readiness Score</p>
                      <span className="text-5xl font-black text-primary">{dominant.percentage}%</span>
                      <p className="text-xs font-bold text-success mt-2">{dominant.matchLevel}</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <Card className="rounded-[24px] border-none bg-slate-50 p-6 space-y-4">
                      <h4 className="font-bold text-primary border-b pb-2 flex items-center gap-2"><Rocket className="h-4 w-4" /> Top Cluster</h4>
                      <p className="text-2xl font-black">{dominant.category}</p>
                   </Card>
                   <Card className="rounded-[24px] border-none bg-slate-50 p-6 space-y-4">
                      <h4 className="font-bold text-slate-400 border-b pb-2">Secondary Cluster</h4>
                      <p className="text-xl font-bold">{results[1].category}</p>
                   </Card>
                   <Card className="rounded-[24px] border-none bg-slate-50 p-6 space-y-4">
                      <h4 className="font-bold text-slate-400 border-b pb-2">Third Cluster</h4>
                      <p className="text-xl font-bold">{results[2].category}</p>
                   </Card>
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <section className="space-y-6">
                    <h4 className="text-xl font-bold font-headline border-l-4 border-primary pl-4">Your Passions</h4>
                    <p className="text-sm text-muted-foreground italic">"These activities naturally motivate and energize you."</p>
                    <div className="space-y-4">
                       {['Helping People', 'Creating Things', 'Leading Others', 'Exploring & Discovering'].map(p => (
                         <div key={p} className="space-y-1">
                            <div className="flex justify-between text-sm font-bold">
                               <span>{p}</span>
                               <span className="text-primary">{subSectionScores[p] || 0}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                               <div className="h-full bg-primary" style={{ width: `${subSectionScores[p] || 0}%` }} />
                            </div>
                         </div>
                       ))}
                    </div>
                 </section>

                 <section className="space-y-6">
                    <h4 className="text-xl font-bold font-headline border-l-4 border-secondary pl-4">Your Interests</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {['Technology', 'Health Sciences', 'Engineering', 'Business', 'Agriculture', 'Education', 'Law & Governance', 'Arts & Media'].map(i => (
                         <div key={i} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100">
                            <span className="text-xs font-bold text-slate-600">{i}</span>
                            <span className="text-xs font-black text-secondary">{subSectionScores[i] || 0}%</span>
                         </div>
                       ))}
                    </div>
                 </section>
              </div>

              <section className="space-y-6">
                <h4 className="text-xl font-bold font-headline border-l-4 border-accent pl-4">Your Abilities</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                   {['Analytical Skills', 'Communication Skills', 'Leadership Skills', 'Technical Skills', 'Creativity', 'Social Skills'].map(a => (
                      <div key={a} className="p-6 bg-white rounded-[24px] border-2 border-slate-50 shadow-sm text-center">
                         <p className="text-2xl font-black text-accent">{subSectionScores[a] || 0}%</p>
                         <p className="text-xs font-bold text-muted-foreground uppercase mt-1">{a}</p>
                      </div>
                   ))}
                </div>
              </section>
            </>
          ) : (
            /* MI REPORT CONTENT */
            <>
              <section className="space-y-8">
                <div className="p-8 bg-secondary/5 rounded-[32px] border-2 border-secondary/10 flex flex-col md:flex-row items-center gap-10">
                   <div className="flex-1 space-y-4">
                      <Badge className="bg-secondary text-white border-none font-black px-4 py-1 rounded-full uppercase text-xs">Intelligence Profile Summary</Badge>
                      <h3 className="text-3xl font-bold font-headline">Multiple Intelligences Profile</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Based on Howard Gardner's theory, this report identifies your strongest intelligences and how they relate to your learning style and career.
                      </p>
                   </div>
                   <div className="min-w-[300px] h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={results}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="category" tick={{fontSize: 8}} />
                          <Radar name="Profile" dataKey="percentage" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.6} />
                        </RadarChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {results.slice(0, 3).map((res, i) => (
                     <Card key={res.category} className="rounded-[24px] border-none bg-slate-50 p-6">
                        <Badge className="bg-secondary/10 text-secondary border-none mb-4 uppercase text-[10px] font-black">
                          {i === 0 ? "Primary" : i === 1 ? "Secondary" : "Third"} Intelligence
                        </Badge>
                        <p className="text-2xl font-black text-secondary">{res.category}</p>
                        <p className="text-xs font-bold text-muted-foreground mt-1">Score: {Math.round(res.score)}/25</p>
                     </Card>
                   ))}
                </div>
              </section>

              <section className="space-y-10">
                <h4 className="text-2xl font-bold font-headline text-center">Top Intelligence Details</h4>
                <div className="space-y-8">
                  {results.slice(0, 3).map((res, i) => {
                    const info = MI_INFO_MAP[res.category] || { desc: "", learn: "", strengths: [] };
                    return (
                      <div key={res.category} className="p-8 border-2 border-slate-100 rounded-[32px] space-y-4">
                        <div className="flex justify-between items-center">
                          <h5 className="text-2xl font-bold text-primary font-headline">{i+1}. {res.category}</h5>
                          <Badge className="bg-primary/5 text-primary border-none font-bold">Exceptional Strength</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                          <div className="space-y-2">
                             <p className="text-xs font-black text-muted-foreground uppercase">Description</p>
                             <p className="text-sm leading-relaxed">{info.desc}</p>
                          </div>
                          <div className="space-y-2">
                             <p className="text-xs font-black text-muted-foreground uppercase">How You Learn Best</p>
                             <p className="text-sm leading-relaxed font-bold">{info.learn}</p>
                          </div>
                        </div>
                        <div className="pt-4 space-y-2">
                           <p className="text-xs font-black text-muted-foreground uppercase">Potential Strengths</p>
                           <div className="flex flex-wrap gap-2">
                              {info.strengths.map(s => <Badge key={s} variant="outline" className="border-primary/20 bg-primary/5">{s}</Badge>)}
                           </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}

          {/* SHARED CAREER & ROADMAP CONTENT */}
          <section className="space-y-12">
            <h4 className="text-2xl font-bold font-headline text-center border-t pt-12">Top Career Matches</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {careers.slice(0, 4).map((c, i) => (
                <div key={i} className="p-8 border-2 border-slate-100 rounded-[32px] space-y-6 relative overflow-hidden group hover:border-primary/30 transition-all">
                   <div className="flex justify-between items-start">
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Briefcase className="h-7 w-7" />
                      </div>
                      <Badge className="bg-primary text-white font-bold">{dominant.percentage}% Match</Badge>
                   </div>
                   <div className="space-y-2">
                      <h5 className="text-2xl font-bold font-headline">{c.title}</h5>
                      <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-primary italic text-xs font-medium">
                     " {c.whyFit} "
                   </div>
                   <div className="grid grid-cols-2 gap-4 text-xs font-bold pt-4 border-t">
                      <div className="space-y-1">
                         <p className="text-[10px] uppercase text-muted-foreground">KCSE Subjects</p>
                         <p>{c.subjects.slice(0, 3).join(", ")}</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] uppercase text-muted-foreground">Top Universities</p>
                         <p>{c.universities.slice(0, 2).join(", ")}</p>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-primary p-12 rounded-[40px] text-white space-y-10">
             <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-2">
                   <h4 className="text-3xl font-bold font-headline">Your Career Roadmap</h4>
                   <p className="text-white/70 font-medium">Step-by-step guide to achieving your {dominant.category} goals.</p>
                </div>
                <Badge className="bg-white/20 text-white border-none px-6 py-2 rounded-full font-bold">Pathway: {recommendedPathway}</Badge>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {[
                  { step: "Education", desc: "Senior School Pathway" },
                  { step: "Tertiary", desc: "Uni / TVET Program" },
                  { step: "Experience", desc: "Internships & Skills" },
                  { step: "Career", desc: "Entry-Level Position" }
                ].map((item, i) => (
                  <div key={i} className="space-y-4 relative">
                     <div className="h-12 w-12 rounded-full bg-white text-primary flex items-center justify-center font-black text-xl shadow-xl z-10 relative">
                        {i + 1}
                     </div>
                     <div className="space-y-1">
                        <p className="text-xs font-black uppercase opacity-70 tracking-widest">{item.step}</p>
                        <p className="font-bold text-lg leading-tight">{item.desc}</p>
                     </div>
                  </div>
                ))}
                {/* Connector line */}
                <div className="hidden md:block absolute top-6 left-6 right-6 h-1 bg-white/20 -z-0" />
             </div>
          </section>

          <footer className="text-center pt-12 border-t space-y-4">
             <div className="flex justify-center gap-8">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <Target className="h-4 w-4" /> Focus on Strengths
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <Lightbulb className="h-4 w-4" /> Continuous Learning
                </div>
             </div>
             <p className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">© 2026 CareerCompass Kenya • Generated by Precision Diagnostics Engine</p>
          </footer>
        </div>

        <div className="flex justify-center gap-4">
           <Button variant="outline" className="rounded-full h-14 px-10 font-bold" asChild>
             <Link href="/hub">Explore Universities</Link>
           </Button>
           <Button className="rounded-full h-14 px-10 font-bold shadow-xl" asChild>
             <Link href="/dashboard">Go to Student Dashboard</Link>
           </Button>
        </div>
      </main>
    </div>
  );
}
