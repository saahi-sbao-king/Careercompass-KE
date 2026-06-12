
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
} from "recharts";
import { Download, Rocket, Loader2, Briefcase, Target, Lightbulb, GraduationCap, BookOpen, User, Calendar, ShieldCheck, CheckSquare } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Link from "next/link";

export default function ResultsPage() {
  const [results, setResults] = useState<CategoryResult[] | null>(null);
  const [quizType, setQuizType] = useState<'PIA' | 'MI'>('PIA');
  const [mounted, setMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [studentName, setStudentName] = useState("Saddiq Ali");
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
        if (percentage >= 85) matchLevel = type === 'PIA' ? "Excellent Match" : "Exceptional Strength";
        else if (percentage >= 70) matchLevel = type === 'PIA' ? "Strong Match" : "Strong Strength";
        else if (percentage >= 55) matchLevel = type === 'PIA' ? "Good Match" : "Moderate Strength";
        else if (percentage >= 40) matchLevel = type === 'PIA' ? "Potential Match" : "Developing Area";

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
        backgroundColor: "#ffffff",
      });
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
      pdf.save(`CareerCompass_${quizType}_Report_${studentName}.pdf`);
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
          <Button size="lg" className="rounded-full h-16 px-10 text-xl font-bold" asChild><Link href="/quiz?type=PIA">Take PIA Test</Link></Button>
          <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-xl font-bold" asChild><Link href="/quiz?type=MI">Take MI Test</Link></Button>
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
          <div className="max-w-md mx-auto space-y-4">
            <Input 
              placeholder="Enter Your Full Name" 
              className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl text-center text-lg font-bold"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
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

      <main className="container px-4 mx-auto -mt-20 space-y-16">
        <div ref={reportRef} className="bg-white text-slate-900 rounded-[40px] shadow-2xl overflow-hidden p-8 md:p-16 space-y-12 max-w-[900px] mx-auto">
          
          {/* HEADER */}
          <div className="border-b-8 border-primary pb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-primary font-headline uppercase tracking-tighter">CareerCompass Kenya</h2>
              <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">
                {quizType === 'PIA' ? "PASSIONS • INTERESTS • ABILITIES (PIA) REPORT" : "MULTIPLE INTELLIGENCES REPORT"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div className="border-l-2 border-slate-100 pl-4">
                <p className="text-[10px] font-black uppercase text-muted-foreground">Student Name</p>
                <p className="font-bold underline decoration-primary/30 decoration-2 underline-offset-4">{studentName}</p>
              </div>
              <div className="border-l-2 border-slate-100 pl-4">
                <p className="text-[10px] font-black uppercase text-muted-foreground">Date</p>
                <p className="font-bold">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="border-l-2 border-slate-100 pl-4">
                <p className="text-[10px] font-black uppercase text-muted-foreground">Assessment ID</p>
                <p className="font-bold">{assessmentId}</p>
              </div>
            </div>
          </div>

          {quizType === 'PIA' ? (
            /* PIA ASSESSMENT REPORT CONTENT */
            <>
              <section className="space-y-8">
                <div className="p-10 bg-primary/5 rounded-[40px] border-2 border-primary/10 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black font-headline uppercase tracking-tight">Career Profile Summary</h3>
                    <ShieldCheck className="text-primary h-8 w-8" />
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed max-w-2xl">
                    Based on your responses, this assessment has identified the areas where your passions, interests, and abilities are most strongly aligned for the Kenyan job market.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
                    <div className="text-center p-6 bg-white rounded-3xl shadow-lg border-2 border-primary/5">
                      <p className="text-[10px] font-black text-primary uppercase mb-2">Overall Score</p>
                      <span className="text-4xl font-black text-primary">{dominant.percentage}%</span>
                    </div>
                    <Card className="md:col-span-1 rounded-3xl border-none bg-slate-50 p-6 shadow-sm text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Top Cluster</p>
                      <p className="font-black text-primary">{dominant.category}</p>
                    </Card>
                    <Card className="md:col-span-1 rounded-3xl border-none bg-slate-50 p-6 shadow-sm text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Secondary</p>
                      <p className="font-bold">{results[1].category}</p>
                    </Card>
                    <Card className="md:col-span-1 rounded-3xl border-none bg-slate-50 p-6 shadow-sm text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Third</p>
                      <p className="font-bold">{results[2].category}</p>
                    </Card>
                  </div>
                </div>

                <div className="space-y-8 pt-10">
                  <h4 className="text-xl font-black font-headline border-l-8 border-primary pl-4 uppercase tracking-tighter">Your Passions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['Helping People', 'Creating Things', 'Leading Others'].map((p) => (
                      <div key={p} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">{p}</p>
                        <p className="text-2xl font-black text-primary">{subSectionScores[p] || 0}%</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic font-medium">What This Means: These are the activities that naturally motivate and energize you.</p>
                </div>

                <div className="space-y-8 pt-10">
                  <h4 className="text-xl font-black font-headline border-l-8 border-secondary pl-4 uppercase tracking-tighter">Your Interests</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Technology', 'Health Sciences', 'Engineering', 'Business', 'Agriculture', 'Education', 'Law & Governance', 'Arts & Media'].map(i => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-slate-100">
                        <span className="text-[10px] font-black text-slate-600 uppercase">{i}</span>
                        <span className="text-xs font-black text-secondary">{subSectionScores[i] || 0}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8 pt-10">
                  <h4 className="text-xl font-black font-headline border-l-8 border-accent pl-4 uppercase tracking-tighter">Your Abilities</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {['Analytical Skills', 'Communication Skills', 'Leadership Skills', 'Technical Skills', 'Creativity', 'Social Skills'].map(a => (
                      <div key={a} className="p-6 bg-white rounded-[32px] border-2 border-slate-100 shadow-sm text-center">
                        <p className="text-3xl font-black text-accent">{subSectionScores[a] || 0}%</p>
                        <p className="text-[10px] font-black text-muted-foreground uppercase mt-2">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : (
            /* MI ASSESSMENT REPORT CONTENT */
            <>
              <section className="space-y-12">
                <div className="p-10 bg-secondary/5 rounded-[40px] border-2 border-secondary/10 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black font-headline uppercase tracking-tight">Intelligence Profile Summary</h3>
                    <ShieldCheck className="text-secondary h-8 w-8" />
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed max-w-2xl">
                    This report identifies your strongest intelligences and explains how they relate to learning styles and career pathways.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    {results.slice(0, 3).map((res, i) => (
                      <div key={res.category} className="p-6 bg-white rounded-3xl shadow-lg border-2 border-secondary/5 text-center">
                        <p className="text-[10px] font-black text-secondary uppercase mb-2">
                          {i === 0 ? "Top" : i === 1 ? "Secondary" : "Third"} Intelligence
                        </p>
                        <p className="text-xl font-black">{res.category}</p>
                        <p className="text-sm font-bold text-muted-foreground mt-1">{res.score} / 25</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-12 pt-10">
                  <h4 className="text-xl font-black uppercase tracking-widest border-b-2 pb-2">Intelligence Scores</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {results.map(res => (
                      <div key={res.category} className="flex justify-between items-center p-3 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-600">{res.category}</span>
                        <span className="text-xs font-black text-secondary">{res.score} / 25</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-10 pt-10">
                  <h4 className="text-2xl font-black font-headline text-center uppercase tracking-[0.2em]">Top Three Intelligences</h4>
                  <div className="space-y-8">
                    {results.slice(0, 3).map((res, i) => {
                      const info = MI_INFO_MAP[res.category] || { desc: "", learn: "", strengths: [] };
                      return (
                        <div key={res.category} className="p-10 border-4 border-slate-100 rounded-[40px] space-y-6">
                          <h5 className="text-2xl font-black text-primary font-headline uppercase">{i+1}. {res.category}</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                               <p className="text-[10px] font-black text-muted-foreground uppercase">Description</p>
                               <p className="text-sm font-medium">{info.desc}</p>
                            </div>
                            <div className="space-y-3">
                               <p className="text-[10px] font-black text-muted-foreground uppercase">How You Learn Best</p>
                               <p className="text-sm font-black text-primary">{info.learn}</p>
                            </div>
                          </div>
                          <div className="pt-4 space-y-3">
                             <p className="text-[10px] font-black text-muted-foreground uppercase">Potential Strengths</p>
                             <div className="flex flex-wrap gap-3">
                                {info.strengths.map(s => <span key={s} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold">• {s}</span>)}
                             </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-12 p-10 bg-slate-50 rounded-[40px] space-y-8">
                   <h4 className="text-xl font-black font-headline uppercase text-center tracking-widest">Your Learning Style</h4>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {["Reading & Writing", "Problem Solving", "Visual Learning", "Practical Activities", "Collaboration", "Self-Reflection", "Nature-Based Learning"].map(style => (
                        <div key={style} className="flex items-center gap-3">
                           <CheckSquare className={`h-5 w-5 ${results[0].category.includes(style.split(' ')[0]) ? 'text-primary' : 'text-slate-300'}`} />
                           <span className="text-[10px] font-bold uppercase">{style}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </section>
            </>
          )}

          {/* SHARED CAREER SECTION */}
          <section className="space-y-16 pt-16 border-t-8 border-slate-50">
            <h4 className="text-3xl font-black font-headline text-center uppercase tracking-[0.3em]">Recommended Careers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {careers.slice(0, 5).map((c, i) => (
                <div key={i} className="p-10 border-4 border-slate-100 rounded-[40px] space-y-6">
                   <div className="flex justify-between items-start">
                      <Briefcase className="h-10 w-10 text-primary" />
                      <Badge className="bg-primary text-white font-black uppercase text-[10px]">{dominant.percentage}% Match</Badge>
                   </div>
                   <h5 className="text-xl font-black font-headline uppercase">{i+1}. {c.title}</h5>
                   <p className="text-xs text-muted-foreground font-medium">{c.description}</p>
                   {i === 0 && <p className="text-[10px] font-bold italic text-primary">Why This Fits You: {c.whyFit}</p>}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-12 pt-16">
            <h4 className="text-2xl font-black font-headline uppercase text-center tracking-widest">Educational Recommendations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="p-10 bg-primary/5 rounded-[40px] space-y-6">
                  <h5 className="text-xl font-black uppercase">University Courses</h5>
                  <ul className="space-y-3">
                    {["BSc. " + dominant.category, "Applied " + dominant.category, "Computational " + dominant.category].map(prog => (
                      <li key={prog} className="text-xs font-bold uppercase text-slate-700">• {prog}</li>
                    ))}
                  </ul>
               </div>
               <div className="p-10 bg-secondary/5 rounded-[40px] space-y-6">
                  <h5 className="text-xl font-black uppercase">TVET Programmes</h5>
                  <ul className="space-y-3">
                    {["Diploma in " + dominant.category, "Certificate in " + dominant.category, "Craft Course in " + dominant.category].map(prog => (
                      <li key={prog} className="text-xs font-bold uppercase text-slate-700">• {prog}</li>
                    ))}
                  </ul>
               </div>
            </div>
          </section>

          {quizType === 'PIA' && (
            <section className="space-y-12 pt-16">
              <h4 className="text-2xl font-black font-headline uppercase text-center tracking-widest">Subject Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-10 bg-accent/5 rounded-[40px] space-y-4">
                  <p className="text-sm font-black text-accent uppercase">Core Subjects</p>
                  <p className="text-xs font-bold">Maths, English, Kiswahili, Sciences</p>
                </div>
                <div className="p-10 bg-accent/5 rounded-[40px] space-y-4">
                  <p className="text-sm font-black text-accent uppercase">Optional Subjects</p>
                  <p className="text-xs font-bold">Physics, Computer Studies, Business, Geography</p>
                </div>
              </div>
            </section>
          )}

          <section className="bg-primary p-12 rounded-[50px] text-white space-y-12 shadow-2xl relative overflow-hidden">
             <h4 className="text-3xl font-black font-headline uppercase text-center">Career Roadmap</h4>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
                {[
                  { step: "Education", label: "KCSE Level" },
                  { step: "Tertiary", label: "Uni / TVET" },
                  { step: "Experience", label: "Internships" },
                  { step: "Career", label: "Professional" }
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                     <div className="h-12 w-12 rounded-full bg-white text-primary flex items-center justify-center font-black mx-auto">{i + 1}</div>
                     <p className="font-black text-sm uppercase">{item.label}</p>
                  </div>
                ))}
             </div>
          </section>

          <footer className="text-center pt-16 border-t-8 border-slate-50 space-y-6">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">© 2026 CareerCompass Kenya • PRECISION DIAGNOSTICS</p>
             <p className="text-[9px] font-bold text-slate-300 uppercase">Discover Your Path. Build Your Future.</p>
          </footer>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-10">
           <Button variant="outline" className="rounded-full h-16 px-12 font-black uppercase text-xs border-2" asChild>
             <Link href="/hub">Explore Universities</Link>
           </Button>
           <Button className="rounded-full h-16 px-12 font-black uppercase text-xs shadow-2xl" asChild>
             <Link href="/dashboard">Go to Student Dashboard</Link>
           </Button>
        </div>
      </main>
    </div>
  );
}
