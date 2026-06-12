
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
import { Download, Rocket, Loader2, Briefcase, Target, Lightbulb, GraduationCap, BookOpen, User, Calendar, ShieldCheck } from "lucide-react";
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
        windowWidth: 1200 // Ensure consistent rendering
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
        <div ref={reportRef} className="bg-white text-slate-900 rounded-[40px] shadow-2xl overflow-hidden p-8 md:p-16 space-y-12 max-w-[900px] mx-auto">
          
          {/* HEADER (Both Templates) */}
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
                <p className="font-bold underline decoration-primary/30 decoration-2 underline-offset-4">{studentName || "____________________"}</p>
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
                    <Card className="md:col-span-1 rounded-3xl border-none bg-slate-50 p-6 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Top Cluster</p>
                      <p className="font-black text-primary">{dominant.category}</p>
                    </Card>
                    <Card className="md:col-span-1 rounded-3xl border-none bg-slate-50 p-6 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Secondary</p>
                      <p className="font-bold">{results[1].category}</p>
                    </Card>
                    <Card className="md:col-span-1 rounded-3xl border-none bg-slate-50 p-6 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Third</p>
                      <p className="font-bold">{results[2].category}</p>
                    </Card>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-xl font-black font-headline border-l-8 border-primary pl-4 uppercase tracking-tighter">Your Passions</h4>
                      <p className="text-xs text-muted-foreground italic font-medium">"These activities naturally motivate and energize you."</p>
                    </div>
                    <div className="space-y-6">
                      {['Helping People', 'Creating Things', 'Leading Others', 'Exploring & Discovering'].map((p, i) => (
                        <div key={p} className="space-y-2">
                          <div className="flex justify-between text-sm font-black">
                            <span>{i+1}. {p}</span>
                            <span className="text-primary">{subSectionScores[p] || 0}%</span>
                          </div>
                          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${subSectionScores[p] || 0}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h4 className="text-xl font-black font-headline border-l-8 border-secondary pl-4 uppercase tracking-tighter">Your Interests</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {['Technology', 'Health Sciences', 'Engineering', 'Business', 'Agriculture', 'Education', 'Law & Governance', 'Arts & Media'].map(i => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-slate-100">
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{i}</span>
                          <span className="text-xs font-black text-secondary">{subSectionScores[i] || 0}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-10 space-y-8">
                  <h4 className="text-xl font-black font-headline border-l-8 border-accent pl-4 uppercase tracking-tighter">Your Abilities</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {['Analytical Skills', 'Communication Skills', 'Leadership Skills', 'Technical Skills', 'Creativity', 'Social Skills'].map(a => (
                      <div key={a} className="p-8 bg-white rounded-[32px] border-2 border-slate-100 shadow-sm text-center">
                        <p className="text-3xl font-black text-accent">{subSectionScores[a] || 0}%</p>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">{a}</p>
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
                    This report identifies your strongest intelligences and explains how they relate to learning styles, academic strengths, and career pathways based on Howard Gardner's theory.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    {results.slice(0, 3).map((res, i) => (
                      <div key={res.category} className="p-6 bg-white rounded-3xl shadow-lg border-2 border-secondary/5">
                        <p className="text-[10px] font-black text-secondary uppercase mb-2">
                          {i === 0 ? "Top" : i === 1 ? "Secondary" : "Third"} Intelligence
                        </p>
                        <p className="text-xl font-black">{res.category}</p>
                        <p className="text-sm font-bold text-muted-foreground mt-1">{res.score} / 25</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                   <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={results}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="category" tick={{fontSize: 8, fontWeight: 900, fill: '#64748b'}} />
                          <Radar name="Profile" dataKey="percentage" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.6} />
                        </RadarChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-xl font-black uppercase tracking-widest border-b-2 pb-2">Intelligence Scores</h4>
                      <div className="grid grid-cols-1 gap-2">
                         {results.map(res => (
                           <div key={res.category} className="flex justify-between items-center py-1 text-xs font-bold border-b border-slate-50 last:border-0">
                             <span className="text-slate-600">{res.category}</span>
                             <span className="font-black text-secondary">{res.score} / 25</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="space-y-10 pt-10">
                  <h4 className="text-2xl font-black font-headline text-center uppercase tracking-[0.2em]">Top Three Intelligences</h4>
                  <div className="space-y-8">
                    {results.slice(0, 3).map((res, i) => {
                      const info = MI_INFO_MAP[res.category] || { desc: "", learn: "", strengths: [] };
                      return (
                        <div key={res.category} className="p-10 border-4 border-slate-100 rounded-[40px] space-y-6">
                          <div className="flex justify-between items-center">
                            <h5 className="text-2xl font-black text-primary font-headline uppercase">{i+1}. {res.category}</h5>
                            <Badge className="bg-primary text-white font-black px-4 py-1 rounded-full uppercase text-[10px]">Strength Level: Exceptional</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Description</p>
                               <p className="text-sm leading-relaxed font-medium">{info.desc}</p>
                            </div>
                            <div className="space-y-3">
                               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">How You Learn Best</p>
                               <p className="text-sm leading-relaxed font-black text-primary">{info.learn}</p>
                            </div>
                          </div>
                          <div className="pt-4 space-y-3">
                             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Potential Strengths</p>
                             <div className="flex flex-wrap gap-3">
                                {info.strengths.map(s => <span key={s} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700">• {s}</span>)}
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
                           <div className="h-6 w-6 rounded border-2 border-primary flex items-center justify-center">
                              {subSectionScores[style] > 60 && <div className="h-3 w-3 bg-primary rounded-sm" />}
                           </div>
                           <span className="text-xs font-bold uppercase tracking-tighter">{style}</span>
                        </div>
                      ))}
                   </div>
                   <div className="pt-6 space-y-3">
                      <p className="text-[10px] font-black text-muted-foreground uppercase text-center">Recommended Study Techniques</p>
                      <div className="flex flex-wrap justify-center gap-3">
                         {["Active Recall", "Mind Mapping", "Group Discussion", "Practical Labs", "Self-Testing"].map(tech => (
                           <Badge key={tech} variant="outline" className="border-primary/20 text-primary font-black uppercase text-[10px] px-4 py-1.5">{tech}</Badge>
                         ))}
                      </div>
                   </div>
                </div>
              </section>
            </>
          )}

          {/* SHARED CAREER & ROADMAP CONTENT (Standardized for both) */}
          <section className="space-y-16 pt-16 border-t-8 border-slate-50">
            <h4 className="text-3xl font-black font-headline text-center uppercase tracking-[0.3em]">Recommended Careers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {careers.slice(0, 5).map((c, i) => (
                <div key={i} className="p-10 border-4 border-slate-100 rounded-[40px] space-y-6 relative overflow-hidden group hover:border-primary/30 transition-all">
                   <div className="flex justify-between items-start">
                      <div className="h-16 w-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary">
                        <Briefcase className="h-8 w-8" />
                      </div>
                      <Badge className="bg-primary text-white font-black uppercase text-[10px] py-1 px-4">{dominant.percentage}% Match</Badge>
                   </div>
                   <div className="space-y-3">
                      <h5 className="text-2xl font-black font-headline uppercase">{i+1}. {c.title}</h5>
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-2">{c.description}</p>
                   </div>
                   {i === 0 && (
                     <div className="p-6 bg-slate-50 rounded-3xl border-l-8 border-primary italic text-xs font-bold text-slate-700 leading-relaxed">
                       "Why This Career Fits You: {c.whyFit}"
                     </div>
                   )}
                   <div className="grid grid-cols-2 gap-6 text-[10px] font-black uppercase pt-6 border-t border-slate-50">
                      <div className="space-y-2">
                         <p className="text-muted-foreground tracking-widest">KCSE Subjects</p>
                         <p className="text-slate-900">{c.subjects.slice(0, 3).join(", ")}</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-muted-foreground tracking-widest">Top Universities</p>
                         <p className="text-slate-900">{c.universities.slice(0, 2).join(", ")}</p>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-12 pt-16">
            <h4 className="text-2xl font-black font-headline uppercase text-center tracking-widest">Educational Recommendations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="p-10 bg-primary/5 rounded-[40px] space-y-6">
                  <div className="flex items-center gap-4">
                    <GraduationCap className="text-primary h-8 w-8" />
                    <h5 className="text-xl font-black uppercase tracking-tight">University Programmes</h5>
                  </div>
                  <ul className="space-y-3">
                    {["Bachelor of Science in " + dominant.category, "Computational " + dominant.category, "Applied Sciences in " + dominant.category].map(prog => (
                      <li key={prog} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tighter text-slate-700">
                        <div className="h-2 w-2 rounded-full bg-primary" /> {prog}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="p-10 bg-secondary/5 rounded-[40px] space-y-6">
                  <div className="flex items-center gap-4">
                    <BookOpen className="text-secondary h-8 w-8" />
                    <h5 className="text-xl font-black uppercase tracking-tight">TVET Programmes</h5>
                  </div>
                  <ul className="space-y-3">
                    {["Diploma in " + dominant.category, "Certificate in Technical " + dominant.category, "Advanced Craft in " + dominant.category].map(prog => (
                      <li key={prog} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tighter text-slate-700">
                        <div className="h-2 w-2 rounded-full bg-secondary" /> {prog}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </section>

          <section className="bg-primary p-12 rounded-[50px] text-white space-y-12 shadow-2xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-2">
                   <h4 className="text-4xl font-black font-headline uppercase tracking-tight">Career Roadmap</h4>
                   <p className="text-white/80 font-bold uppercase text-[10px] tracking-[0.3em]">Precision Success Pathway • 2026</p>
                </div>
                <Badge className="bg-white text-primary border-none px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs">
                  Pathway: {recommendedPathway}
                </Badge>
             </div>
             
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-10">
                {[
                  { step: "Education", label: "KCSE Level", desc: "Target B+ and above in core subjects" },
                  { step: "Tertiary", label: "Uni / TVET", desc: "Enroll in accredited " + recommendedPathway + " program" },
                  { step: "Experience", label: "Internships", desc: "Gain 6-12 months industry exposure" },
                  { step: "Career", label: "Professional", desc: "Start entry-level role in " + dominant.category }
                ].map((item, i) => (
                  <div key={i} className="space-y-4 relative group">
                     <div className="h-14 w-14 rounded-full bg-white text-primary flex items-center justify-center font-black text-2xl shadow-xl z-20 relative transition-transform group-hover:scale-110">
                        {i + 1}
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em]">{item.step}</p>
                        <p className="font-black text-lg leading-tight uppercase tracking-tight">{item.label}</p>
                        <p className="text-xs text-white/70 font-medium leading-relaxed">{item.desc}</p>
                     </div>
                  </div>
                ))}
                {/* Connector line */}
                <div className="hidden md:block absolute top-7 left-10 right-10 h-1 bg-white/20 -z-0" />
             </div>
             {/* Decorative Elements */}
             <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-white/10 rounded-full blur-[100px]" />
          </section>

          <footer className="text-center pt-16 border-t-8 border-slate-50 space-y-6">
             <div className="flex justify-center gap-10">
                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <Target className="h-5 w-5 text-primary" /> Focus on Strengths
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <Lightbulb className="h-5 w-5 text-accent" /> Continuous Learning
                </div>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">© 2026 CareerCompass Kenya • PRECISION DIAGNOSTICS ENGINE</p>
             <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Discover Your Path. Build Your Future.</p>
          </footer>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-10">
           <Button variant="outline" className="rounded-full h-16 px-12 font-black uppercase tracking-widest text-xs border-2 hover:bg-slate-50" asChild>
             <Link href="/hub">Explore Universities</Link>
           </Button>
           <Button className="rounded-full h-16 px-12 font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-transform" asChild>
             <Link href="/dashboard">Go to Student Dashboard</Link>
           </Button>
        </div>
      </main>
    </div>
  );
}
