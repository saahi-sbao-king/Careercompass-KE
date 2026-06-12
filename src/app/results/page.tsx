"use client";

import { useEffect, useState, useRef } from "react";
import { NavHeader } from "@/components/nav-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CATEGORY_QUESTION_MAP, CAREER_MAPPING, MI_INFO_MAP, PIA_QUESTIONS, MI_QUESTIONS } from "@/lib/data";
import { AssessmentCategory, CategoryResult, QuizResults } from "@/lib/types";
import { 
  Download, Rocket, Loader2, Briefcase, Target, GraduationCap, BookOpen, CheckSquare, ListChecks, Info, ShieldCheck, Compass, ArrowDown
} from "lucide-react";
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
  const [assessmentDate, setAssessmentDate] = useState("");
  const [subSectionScores, setSubSectionScores] = useState<Record<string, number>>({});
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setAssessmentId(`CCK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    setAssessmentDate(new Date().toLocaleDateString());
    
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
        return {
          category,
          score: categoryRawScore,
          maxScore,
          percentage,
          matchLevel: percentage >= 85 ? "Excellent Match" : percentage >= 70 ? "Strong Match" : "Good Match"
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
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
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
        <Button size="lg" className="rounded-full h-16 px-10 text-xl font-bold" asChild><Link href="/quiz?type=PIA">Take Assessment</Link></Button>
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
            Official Assessment Report
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight">Your Career Compass</h1>
          <div className="max-w-md mx-auto space-y-4">
            <Input 
              className="h-14 bg-white/10 border-white/20 text-white rounded-2xl text-center text-lg font-bold"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <Button 
              className="h-16 gap-3 bg-accent text-white rounded-full px-12 font-bold text-lg shadow-2xl" 
              onClick={handleDownloadPdf}
              disabled={isDownloading}
            >
              {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {isDownloading ? "Generating..." : "Download Report PDF"}
            </Button>
          </div>
        </div>
      </div>

      <main className="container px-4 mx-auto -mt-20 space-y-16">
        <div ref={reportRef} className="bg-white text-slate-900 rounded-[40px] shadow-2xl p-10 md:p-16 space-y-12 max-w-[900px] mx-auto border border-slate-200">
          
          <div className="border-b-8 border-primary pb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-primary font-headline uppercase tracking-tighter">CareerCompass Kenya</h2>
              <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">
                {quizType === 'PIA' ? "PASSIONS • INTERESTS • ABILITIES (PIA) REPORT" : "MULTIPLE INTELLIGENCES REPORT"}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-1 text-sm text-right">
              <p><strong>Student Name:</strong> {studentName}</p>
              <p><strong>Assessment Date:</strong> {assessmentDate}</p>
              <p><strong>Assessment ID:</strong> {assessmentId}</p>
            </div>
          </div>

          {quizType === 'PIA' ? (
            <div className="space-y-12">
              <section className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-primary">CAREER PROFILE SUMMARY</h3>
                <p className="text-muted-foreground font-medium">Based on your responses, this assessment has identified the areas where your passions, interests, and abilities are most strongly aligned.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 text-center">
                    <p className="text-[10px] font-black uppercase mb-1">Career Readiness Score</p>
                    <span className="text-4xl font-black text-primary">{dominant.percentage}%</span>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl text-center">
                    <p className="text-[10px] font-black uppercase mb-1">Top Career Cluster</p>
                    <p className="font-black text-primary text-sm uppercase">{dominant.category}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl text-center">
                    <p className="text-[10px] font-black uppercase mb-1">Secondary Cluster</p>
                    <p className="font-bold text-sm uppercase">{results[1]?.category}</p>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight border-l-4 border-primary pl-4">YOUR PASSIONS</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Helping People', 'Creating Things', 'Leading Others'].map(p => (
                    <div key={p} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                      <p className="text-[10px] font-black uppercase mb-2">{p}</p>
                      <p className="text-3xl font-black text-primary">{subSectionScores[p] || 0}%</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex gap-4">
                  <Info className="h-5 w-5 text-primary shrink-0" />
                  <p className="text-xs font-medium leading-relaxed"><strong>What This Means:</strong> These are the activities and experiences that naturally motivate you. Careers aligning with these are likely to provide long-term fulfillment.</p>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight border-l-4 border-secondary pl-4">YOUR INTERESTS</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Technology', 'Health Sciences', 'Engineering', 'Business', 'Agriculture', 'Education', 'Law & Governance', 'Arts & Media'].map(i => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100">
                      <span className="text-[10px] font-black uppercase">{i}</span>
                      <span className="text-xs font-black text-secondary">{subSectionScores[i] || 0}%</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight border-l-4 border-accent pl-4">YOUR ABILITIES</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Analytical Skills', 'Communication Skills', 'Leadership Skills', 'Technical Skills', 'Creativity', 'Social Skills'].map(a => (
                    <div key={a} className="p-4 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100">
                      <span className="text-[10px] font-black uppercase">{a}</span>
                      <span className="text-xs font-black text-accent">{subSectionScores[a] || 0}%</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-widest text-center py-4">TOP CAREER MATCHES</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {careers.slice(0, 4).map((c, i) => (
                    <div key={i} className="p-8 border-2 border-slate-100 rounded-[32px] space-y-4">
                       <div className="flex justify-between items-center">
                          <h5 className="font-black uppercase">{c.title}</h5>
                          <Badge className="bg-primary text-white text-[10px]">Score: {dominant.percentage - (i*3)}%</Badge>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-primary">Why This Fits You:</p>
                          <ul className="text-xs font-bold text-muted-foreground list-disc pl-4 space-y-1">
                             <li>{c.whyFit}</li>
                             <li>Matches your {dominant.category} orientation.</li>
                          </ul>
                       </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <h3 className="text-lg font-black uppercase">UNIVERSITY COURSES</h3>
                    <ul className="space-y-2 text-xs font-bold uppercase">
                      {["BSc. " + dominant.category, "Applied " + dominant.category, "B.Tech in " + dominant.category].map(p => (
                        <li key={p} className="flex items-center gap-2"><CheckSquare className="h-3 w-3 text-primary" /> {p}</li>
                      ))}
                    </ul>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-lg font-black uppercase">TVET PROGRAMMES</h3>
                    <ul className="space-y-2 text-xs font-bold uppercase">
                      {["Diploma in " + dominant.category, "Craft Certificate in " + dominant.category].map(p => (
                        <li key={p} className="flex items-center gap-2"><CheckSquare className="h-3 w-3 text-secondary" /> {p}</li>
                      ))}
                    </ul>
                 </div>
              </section>

              <section className="p-8 bg-slate-50 rounded-[32px] space-y-4">
                <h3 className="text-lg font-black uppercase">SENIOR SCHOOL SUBJECT RECOMMENDATIONS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black uppercase text-primary mb-2">Core Subjects:</p>
                    <ul className="text-xs font-bold space-y-1">• Mathematics • English • Kiswahili</ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-primary mb-2">Optional Subjects:</p>
                    <ul className="text-xs font-bold space-y-1">• Physics/Bio/Chem • Business/CS • Agriculture</ul>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-lg font-black uppercase">CAREER DEVELOPMENT PLAN</h3>
                <div className="space-y-3">
                  {["Focus on KCSE excellence.", "Seek relevant University/TVET entry.", "Secure first industry internship."].map((goal, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl items-center">
                      <span className="font-black text-primary">{i === 0 ? "1-2Y" : i === 1 ? "3-5Y" : "5+ Y"}</span>
                      <p className="text-xs font-bold uppercase">{goal}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="p-8 bg-primary text-white rounded-[32px] text-center space-y-4">
                <h3 className="text-xl font-black uppercase">FINAL RECOMMENDATION</h3>
                <p className="text-sm font-medium">You are best suited for careers within: <strong>{dominant.category.toUpperCase()}</strong>. Explore educational opportunities and seek practical experience.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <section className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-primary">INTELLIGENCE PROFILE SUMMARY</h3>
                <p className="text-muted-foreground font-medium">This report identifies your strongest intelligences based on Howard Gardner's theory.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {results.slice(0, 3).map((res, i) => (
                    <div key={res.category} className="p-6 bg-primary/5 rounded-3xl border border-primary/10 text-center">
                      <p className="text-[10px] font-black uppercase mb-2">{i === 0 ? "Top" : i === 1 ? "Secondary" : "Third"} Intelligence</p>
                      <p className="text-lg font-black mb-1">{res.category}</p>
                      <Badge className="bg-white text-primary text-[10px]">Score: {res.score} / 25</Badge>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight">INTELLIGENCE SCORES</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {results.map(res => (
                    <div key={res.category} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black uppercase">{res.category} Intelligence</span>
                      <span className="text-xs font-black">{res.score} / 25</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-10">
                <h3 className="text-xl font-black uppercase tracking-widest text-center">TOP THREE INTELLIGENCES</h3>
                {results.slice(0, 3).map((res, i) => {
                  const info = MI_INFO_MAP[res.category] || { desc: "", learn: "", strengths: [] };
                  return (
                    <div key={res.category} className="p-8 border-2 border-slate-50 rounded-[40px] space-y-6">
                      <h5 className="text-xl font-black text-primary uppercase">{i+1}. {res.category}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <p className="text-[10px] font-black uppercase mb-1">Description:</p>
                          <p className="text-sm font-medium leading-relaxed">{info.desc}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase mb-1">How You Learn Best:</p>
                          <p className="text-sm font-black text-primary">{info.learn}</p>
                        </div>
                      </div>
                      <div className="pt-2">
                         <p className="text-[10px] font-black uppercase mb-3">Potential Strengths:</p>
                         <div className="flex flex-wrap gap-2">
                            {info.strengths.map(s => <span key={s} className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold">• {s}</span>)}
                         </div>
                      </div>
                    </div>
                  );
                })}
              </section>

              <section className="p-10 bg-slate-50 rounded-[40px] space-y-8">
                 <h3 className="text-xl font-black uppercase text-center">YOUR LEARNING STYLE</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Reading & Writing", "Problem Solving", "Visual Learning", "Practical Activities", "Collaboration", "Self-Reflection", "Nature-Based Learning"].map(style => (
                      <div key={style} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-100">
                         <CheckSquare className="h-4 w-4 text-primary" />
                         <span className="text-[10px] font-bold uppercase">{style}</span>
                      </div>
                    ))}
                 </div>
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase">Recommended Study Techniques:</p>
                    <ul className="text-xs font-bold space-y-2 pl-4">
                       <li>• Use {results[0].category.toLowerCase()} based mind mapping.</li>
                       <li>• Group discussion and peer teaching.</li>
                       <li>• Deep self-reflection and independent study.</li>
                    </ul>
                 </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-xl font-black uppercase text-center">RECOMMENDED CAREERS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {careers.slice(0, 5).map((c, i) => (
                    <div key={i} className="p-6 border-2 border-slate-100 rounded-3xl flex justify-between items-center">
                       <span className="font-black uppercase text-sm">Career {i+1}: {c.title}</span>
                       <Badge variant="outline" className="text-[10px] font-black">Score: {dominant.percentage - (i*2)}%</Badge>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <h3 className="text-lg font-black uppercase">UNIVERSITY PROGRAMMES</h3>
                    <ul className="space-y-2 text-xs font-bold uppercase">• BSc. {dominant.category} • B.Tech {dominant.category}</ul>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-lg font-black uppercase">TVET PROGRAMMES</h3>
                    <ul className="space-y-2 text-xs font-bold uppercase">• Diploma in {dominant.category} • Certificate in {dominant.category}</ul>
                 </div>
              </section>

              <div className="p-8 bg-slate-900 text-white rounded-[40px] text-center space-y-4">
                <h3 className="text-xl font-black uppercase">FINAL INSIGHT</h3>
                <p className="text-sm font-medium">Your intelligence profile demonstrates unique strengths. Success is not determined by a single intelligence but by understanding and developing your combination of strengths.</p>
              </div>
            </div>
          )}

          <section className="p-10 bg-slate-100 rounded-[50px] space-y-8 text-center">
             <h3 className="text-2xl font-black uppercase tracking-[0.2em]">CAREER ROADMAP</h3>
             <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-black uppercase">
                <span className="p-3 bg-white rounded-xl shadow-sm">Current Education Level</span>
                <ArrowDown className="md:rotate-[-90deg] h-4 w-4 text-primary" />
                <span className="p-3 bg-white rounded-xl shadow-sm">Senior School Pathway</span>
                <ArrowDown className="md:rotate-[-90deg] h-4 w-4 text-primary" />
                <span className="p-3 bg-white rounded-xl shadow-sm">University / TVET</span>
                <ArrowDown className="md:rotate-[-90deg] h-4 w-4 text-primary" />
                <span className="p-3 bg-white rounded-xl shadow-sm">Internship</span>
                <ArrowDown className="md:rotate-[-90deg] h-4 w-4 text-primary" />
                <span className="p-3 bg-white rounded-xl shadow-sm">Entry Career</span>
                <ArrowDown className="md:rotate-[-90deg] h-4 w-4 text-primary" />
                <span className="p-3 bg-white rounded-xl shadow-sm">Professional Career</span>
             </div>
          </section>

          <footer className="text-center pt-10 border-t-2 border-slate-100 space-y-4">
             <div className="flex justify-center gap-6 opacity-20"><ShieldCheck /><Compass /><Target /></div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Generated by CareerCompass Kenya</p>
             <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Discover Your Path. Build Your Future.</p>
          </footer>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-10">
           <Button variant="outline" size="lg" className="rounded-full h-16 px-12 font-black uppercase text-xs" asChild><Link href="/hub">Explore Hub</Link></Button>
           <Button size="lg" className="rounded-full h-16 px-12 font-black uppercase text-xs shadow-2xl bg-primary text-white" asChild><Link href="/dashboard">Dashboard</Link></Button>
        </div>
      </main>
    </div>
  );
}
