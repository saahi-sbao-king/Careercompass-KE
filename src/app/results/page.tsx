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
import { Download, Rocket, Loader2, Briefcase, Target, Lightbulb, GraduationCap, BookOpen, User, Calendar, ShieldCheck, CheckSquare, ListChecks, TrendingUp, Info } from "lucide-react";
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
      pdf.save(`CareerCompass_${quizType}_Report_${studentName.replace(/\s+/g, '_')}.pdf`);
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
        <div ref={reportRef} className="bg-white text-slate-900 rounded-[40px] shadow-2xl overflow-hidden p-8 md:p-16 space-y-12 max-w-[900px] mx-auto border border-slate-200">
          
          {/* HEADER TEMPLATE */}
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
            <div className="space-y-12">
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-black font-headline uppercase tracking-tight">Career Profile Summary</h3>
                </div>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  Based on your responses, this assessment has identified the areas where your passions, interests, and abilities are most strongly aligned for the Kenyan job market.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                  <div className="text-center p-6 bg-primary/5 rounded-3xl border-2 border-primary/10">
                    <p className="text-[10px] font-black text-primary uppercase mb-1">Overall Readiness</p>
                    <span className="text-4xl font-black text-primary">{dominant.percentage}%</span>
                  </div>
                  <div className="md:col-span-1 p-6 bg-slate-50 rounded-3xl text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Top Cluster</p>
                    <p className="font-black text-primary text-sm">{dominant.category}</p>
                  </div>
                  <div className="md:col-span-1 p-6 bg-slate-50 rounded-3xl text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Secondary</p>
                    <p className="font-bold text-sm">{results[1].category}</p>
                  </div>
                  <div className="md:col-span-1 p-6 bg-slate-50 rounded-3xl text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Third</p>
                    <p className="font-bold text-sm">{results[2].category}</p>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <h4 className="text-xl font-black font-headline border-l-8 border-primary pl-4 uppercase tracking-tighter">Your Passions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Helping People', 'Creating Things', 'Leading Others'].map((p) => (
                    <div key={p} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2">{p}</p>
                      <p className="text-3xl font-black text-primary">{subSectionScores[p] || 0}%</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex gap-4 items-start">
                  <Info className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-black text-primary uppercase mb-1">What This Means</p>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                      These are the activities that naturally motivate and energize you. Careers that align with these passions are more likely to provide satisfaction and long-term fulfillment.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <h4 className="text-xl font-black font-headline border-l-8 border-secondary pl-4 uppercase tracking-tighter">Your Interests</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Technology', 'Health Sciences', 'Engineering', 'Business', 'Agriculture', 'Education', 'Law & Governance', 'Arts & Media'].map(i => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-slate-100">
                      <span className="text-[10px] font-black text-slate-600 uppercase">{i}</span>
                      <span className="text-xs font-black text-secondary">{subSectionScores[i] || 0}%</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-8">
                <h4 className="text-xl font-black font-headline border-l-8 border-accent pl-4 uppercase tracking-tighter">Your Abilities</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {['Analytical Skills', 'Communication Skills', 'Leadership Skills', 'Technical Skills', 'Creativity', 'Social Skills'].map(a => (
                    <div key={a} className="p-6 bg-white rounded-[32px] border-2 border-slate-100 shadow-sm text-center">
                      <p className="text-3xl font-black text-accent">{subSectionScores[a] || 0}%</p>
                      <p className="text-[10px] font-black text-muted-foreground uppercase mt-2">{a}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-12 pt-8">
                <h4 className="text-3xl font-black font-headline text-center uppercase tracking-[0.3em] text-primary">Top Career Matches</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {careers.slice(0, 4).map((c, i) => (
                    <div key={i} className="p-10 border-4 border-slate-100 rounded-[40px] space-y-6 relative overflow-hidden group">
                       <div className="flex justify-between items-start relative z-10">
                          <Briefcase className="h-10 w-10 text-primary" />
                          <Badge className="bg-primary text-white font-black uppercase text-[10px]">{dominant.percentage - (i*3)}% Match</Badge>
                       </div>
                       <h5 className="text-xl font-black font-headline uppercase relative z-10">{i+1}. {c.title}</h5>
                       <div className="space-y-3 relative z-10">
                          <p className="text-[10px] font-black text-primary uppercase">Why This Fits You</p>
                          <ul className="space-y-2">
                             <li className="text-xs font-bold text-muted-foreground leading-relaxed">• {c.whyFit}</li>
                             <li className="text-xs font-bold text-muted-foreground leading-relaxed">• Aligns with your high {subSectionScores['Analytical Skills'] > 50 ? 'analytical' : 'creative'} ability scores.</li>
                          </ul>
                       </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-8 pt-8">
                <h4 className="text-2xl font-black font-headline text-center uppercase tracking-widest">Educational Recommendations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 bg-primary/5 rounded-[40px] space-y-6 border border-primary/10">
                      <h5 className="text-lg font-black uppercase flex items-center gap-2"><GraduationCap className="h-5 w-5" /> University Courses</h5>
                      <ul className="space-y-3">
                        {["BSc. " + dominant.category, "Applied " + dominant.category + " & Innovation", "B.Tech in " + dominant.category].map(prog => (
                          <li key={prog} className="text-xs font-bold uppercase text-slate-700 flex items-center gap-2">
                            <CheckSquare className="h-3 w-3 text-primary" /> {prog}
                          </li>
                        ))}
                      </ul>
                   </div>
                   <div className="p-8 bg-secondary/5 rounded-[40px] space-y-6 border border-secondary/10">
                      <h5 className="text-lg font-black uppercase flex items-center gap-2"><BookOpen className="h-5 w-5" /> TVET Programmes</h5>
                      <ul className="space-y-3">
                        {["Diploma in " + dominant.category, "Certificate in " + dominant.category + " Practice", "Craft Course in " + dominant.category].map(prog => (
                          <li key={prog} className="text-xs font-bold uppercase text-slate-700 flex items-center gap-2">
                            <CheckSquare className="h-3 w-3 text-secondary" /> {prog}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
              </section>

              <section className="space-y-8 pt-8">
                <h4 className="text-2xl font-black font-headline uppercase text-center tracking-widest">Senior School Subject Recommendations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-accent/5 rounded-[32px] border border-accent/10">
                    <p className="text-sm font-black text-accent uppercase mb-4">Core Subjects</p>
                    <ul className="space-y-2 text-xs font-bold text-slate-600">
                      <li>• Mathematics (Compulsory)</li>
                      <li>• English & Kiswahili</li>
                      <li>• Biology/Chemistry/Physics</li>
                    </ul>
                  </div>
                  <div className="p-8 bg-accent/5 rounded-[32px] border border-accent/10">
                    <p className="text-sm font-black text-accent uppercase mb-4">Optional Subjects</p>
                    <ul className="space-y-2 text-xs font-bold text-slate-600">
                      <li>• Computer Studies / Business</li>
                      <li>• Agriculture / Home Science</li>
                      <li>• History & Geography</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-8 pt-8">
                <h4 className="text-2xl font-black font-headline uppercase text-center tracking-widest">Career Development Plan</h4>
                <div className="space-y-4">
                  {[
                    { period: "Short-Term (1-2 Years)", goal: "Focus on KCSE excellence and identifying target universities." },
                    { period: "Medium-Term (3-5 Years)", goal: "Complete relevant degree or diploma and seek first industry internship." },
                    { period: "Long-Term (5+ Years)", goal: "Secure professional role and begin specialized certification in your field." }
                  ].map((plan, i) => (
                    <div key={i} className="flex gap-6 items-start p-6 bg-slate-50 rounded-2xl">
                      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-black shrink-0">{i+1}</div>
                      <div>
                        <p className="text-xs font-black text-primary uppercase mb-1">{plan.period}</p>
                        <p className="text-sm font-medium text-muted-foreground">{plan.goal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="p-10 bg-slate-900 text-white rounded-[40px] text-center space-y-4 shadow-xl">
                <h4 className="text-xl font-black uppercase tracking-widest">Final Recommendation</h4>
                <p className="text-sm font-medium text-slate-300 leading-relaxed">
                  Your assessment suggests that you are best suited for careers within <span className="text-primary font-black">{dominant.category}</span>. 
                  You demonstrate strong potential in these areas and are encouraged to continue developing relevant skills and seeking practical experience.
                </p>
              </div>
            </div>
          ) : (
            /* MI ASSESSMENT REPORT CONTENT */
            <div className="space-y-12">
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <Target className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-black font-headline uppercase tracking-tight">Intelligence Profile Summary</h3>
                </div>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  This report identifies your strongest intelligences based on Howard Gardner's theory and explains how they relate to learning styles and career pathways.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {results.slice(0, 3).map((res, i) => (
                    <div key={res.category} className="p-8 bg-secondary/5 rounded-3xl border-2 border-secondary/10 text-center">
                      <p className="text-[10px] font-black text-secondary uppercase mb-2">
                        {i === 0 ? "Top" : i === 1 ? "Secondary" : "Third"} Intelligence
                      </p>
                      <p className="text-lg font-black mb-1">{res.category}</p>
                      <div className="inline-block px-3 py-1 bg-white rounded-full text-xs font-black text-secondary border border-secondary/20">
                        Score: {res.score} / 25
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h4 className="text-xl font-black uppercase tracking-widest border-b-2 border-slate-100 pb-2">Intelligence Scores</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {results.map(res => (
                    <div key={res.category} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-600 uppercase">{res.category}</span>
                      <span className="text-xs font-black text-secondary">{res.score} / 25</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-10 pt-8">
                <h4 className="text-2xl font-black font-headline text-center uppercase tracking-[0.2em] text-primary">Top Three Intelligences</h4>
                <div className="space-y-8">
                  {results.slice(0, 3).map((res, i) => {
                    const info = MI_INFO_MAP[res.category] || { desc: "", learn: "", strengths: [] };
                    return (
                      <div key={res.category} className="p-10 border-4 border-slate-50 rounded-[50px] space-y-6 bg-white shadow-sm">
                        <div className="flex justify-between items-center">
                          <h5 className="text-2xl font-black text-primary font-headline uppercase">{i+1}. {res.category}</h5>
                          <Badge className="bg-primary/10 text-primary border-none text-xs font-black uppercase">{res.percentage}% Strength</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-3">
                             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Description</p>
                             <p className="text-sm font-medium leading-relaxed">{info.desc}</p>
                          </div>
                          <div className="space-y-3">
                             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">How You Learn Best</p>
                             <p className="text-sm font-black text-primary bg-primary/5 p-3 rounded-xl border border-primary/10">{info.learn}</p>
                          </div>
                        </div>
                        <div className="pt-4 space-y-4">
                           <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Potential Strengths</p>
                           <div className="flex flex-wrap gap-3">
                              {info.strengths.map(s => <span key={s} className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold flex items-center gap-2"><CheckSquare className="h-3 w-3 text-primary" /> {s}</span>)}
                           </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="p-12 bg-slate-50 rounded-[50px] space-y-10 border border-slate-200 shadow-inner">
                 <h4 className="text-xl font-black font-headline uppercase text-center tracking-widest">Your Learning Style</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Preferred Methods</p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {["Reading & Writing", "Problem Solving", "Visual Learning", "Practical Activities", "Collaboration", "Self-Reflection", "Nature-Based Learning"].map(style => (
                            <div key={style} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                               <CheckSquare className={`h-5 w-5 ${results[0].category.includes(style.split(' ')[0]) ? 'text-primary' : 'text-slate-300'}`} />
                               <span className="text-[10px] font-bold uppercase">{style}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-6">
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Recommended Study Techniques</p>
                       <ul className="space-y-3">
                          <li className="text-xs font-bold text-slate-700 flex items-center gap-3"><ListChecks className="h-4 w-4 text-primary" /> Use {results[0].category.toLowerCase()} based mind mapping.</li>
                          <li className="text-xs font-bold text-slate-700 flex items-center gap-3"><ListChecks className="h-4 w-4 text-primary" /> Create study groups for peer discussion.</li>
                          <li className="text-xs font-bold text-slate-700 flex items-center gap-3"><ListChecks className="h-4 w-4 text-primary" /> Focus on deep self-reflection sessions.</li>
                       </ul>
                    </div>
                 </div>
              </section>

              <section className="space-y-10 pt-8">
                <h4 className="text-2xl font-black font-headline text-center uppercase tracking-widest text-primary">Recommended Career Clusters</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {careers.slice(0, 6).map((c, i) => (
                    <div key={i} className="p-8 border-2 border-slate-100 rounded-3xl space-y-4 hover:border-primary/20 transition-all">
                       <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                          <Briefcase className="h-5 w-5" />
                       </div>
                       <h5 className="text-base font-black uppercase">{c.title}</h5>
                       <p className="text-[10px] font-bold text-muted-foreground leading-relaxed">{c.description}</p>
                       <Badge variant="outline" className="text-[10px] font-black uppercase border-primary/20 text-primary">{dominant.percentage - (i*2)}% Match</Badge>
                    </div>
                  ))}
                </div>
              </section>

              <section className="p-10 bg-primary/5 rounded-[40px] border border-primary/10 space-y-6">
                 <h4 className="text-lg font-black uppercase text-center tracking-widest">Skills to Develop</h4>
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {['Communication', 'Digital Literacy', 'Leadership', 'Critical Thinking', 'Problem Solving'].map(skill => (
                      <div key={skill} className="p-4 bg-white rounded-2xl text-center border border-primary/10">
                         <p className="text-[10px] font-black text-primary uppercase">{skill}</p>
                      </div>
                    ))}
                 </div>
              </section>
            </div>
          )}

          {/* SHARED ROADMAP SECTION */}
          <section className="bg-slate-900 p-12 rounded-[50px] text-white space-y-12 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
             <h4 className="text-2xl font-black font-headline uppercase text-center tracking-[0.3em] relative z-10">Your Success Roadmap</h4>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center relative z-10">
                {[
                  { step: "Education", label: "KCSE Excellence" },
                  { step: "Tertiary", label: "University/TVET" },
                  { step: "Practical", label: "Internships" },
                  { step: "Professional", label: "Career Success" }
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                     <div className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-black mx-auto shadow-lg border-4 border-white/20">{i + 1}</div>
                     <p className="font-black text-xs uppercase tracking-widest">{item.label}</p>
                  </div>
                ))}
             </div>
          </section>

          <footer className="text-center pt-16 border-t-4 border-slate-50 space-y-6">
             <div className="flex justify-center gap-10 opacity-30">
                <ShieldCheck className="h-10 w-10" />
                <GraduationCap className="h-10 w-10" />
                <Compass className="h-10 w-10" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">© 2026 CareerCompass Kenya • PRECISION DIAGNOSTICS</p>
             <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Discover Your Path. Build Your Future.</p>
          </footer>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-10">
           <Button variant="outline" size="lg" className="rounded-full h-16 px-12 font-black uppercase text-xs border-2 hover:bg-muted" asChild>
             <Link href="/hub">Explore Universities</Link>
           </Button>
           <Button size="lg" className="rounded-full h-16 px-12 font-black uppercase text-xs shadow-2xl bg-primary hover:bg-primary/90 text-white" asChild>
             <Link href="/dashboard">Go to Student Dashboard</Link>
           </Button>
        </div>
      </main>
    </div>
  );
}
