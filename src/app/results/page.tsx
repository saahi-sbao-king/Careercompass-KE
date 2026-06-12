
"use client";

import { useEffect, useState, useRef } from "react";
import { NavHeader } from "@/components/nav-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_QUESTION_MAP, CAREER_MAPPING, PATHWAY_MAPPING, MI_INFO_MAP } from "@/lib/data";
import { AssessmentCategory, CategoryResult, QuizResults } from "@/lib/types";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Download, Share2, Briefcase, Rocket, Loader2, Compass, GraduationCap, Calendar, User, FileText, CheckCircle, MapPin } from "lucide-react";
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
      
      // Multi-page logic if content is too long
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
  const careers = CAREER_MAPPING[dominant.category] || [];
  const recommendedPathway = PATHWAY_MAPPING[dominant.category];

  return (
    <div className="min-h-screen bg-background pb-32">
      <NavHeader />
      
      <div className="hero-gradient py-24 text-white">
        <div className="container px-4 mx-auto text-center space-y-8">
          <Badge className="bg-white/20 text-white hover:bg-white/30 border-none px-8 py-2 rounded-full text-base font-bold backdrop-blur-md">
            {quizType === 'PIA' ? 'Passions • Interests • Abilities Analysis' : 'Multiple Intelligences Profile'}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight">Your Career Compass</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Download your professional career report based on your unique profile.
          </p>
          <div className="flex flex-wrap gap-6 justify-center pt-8">
            <Button 
              className="h-16 gap-3 bg-accent text-white hover:bg-accent/90 rounded-full px-12 font-bold text-lg shadow-2xl transition-all hover:scale-105 active:scale-95" 
              onClick={handleDownloadPdf}
              disabled={isDownloading}
            >
              {isDownloading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Download className="h-6 w-6" />}
              {isDownloading ? "Generating Report..." : "Get PDF Report"}
            </Button>
            <Button variant="outline" className="h-16 gap-3 border-white/40 bg-white/10 text-white hover:bg-white/20 rounded-full px-12 font-bold text-lg backdrop-blur-sm">
              <Share2 className="h-6 w-6" /> Share Result
            </Button>
          </div>
        </div>
      </div>

      <main className="container px-4 mx-auto -mt-20 space-y-16">
        {/* REPORT CONTENT WRAPPER */}
        <div ref={reportRef} className="bg-white text-slate-900 rounded-[40px] shadow-2xl overflow-hidden p-8 md:p-16 space-y-16">
          
          {/* Report Header */}
          <div className="border-b-4 border-primary pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-primary font-headline uppercase tracking-tighter">CareerCompass Kenya</h2>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Official Assessment Report</p>
            </div>
            <div className="text-right space-y-1">
               <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Generated On</p>
               <p className="font-bold flex items-center justify-end gap-2"><Calendar className="h-4 w-4" /> {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Profile Summary */}
          <section className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-none font-black px-4 py-1 rounded-full uppercase text-xs tracking-widest">Profile Summary</Badge>
                <h3 className="text-4xl font-bold font-headline leading-tight">Your {quizType === 'PIA' ? 'Passions & Interests' : 'Intelligence Profile'}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Based on your responses, we've identified <strong>{dominant.category}</strong> as your strongest area. This alignment suggests a natural affinity for roles that demand these specific traits.
                </p>
                <div className="p-8 bg-primary/5 rounded-[32px] border-2 border-primary/10 space-y-4">
                  <p className="text-sm font-black text-primary uppercase tracking-widest">Primary Match Score</p>
                  <div className="flex items-end gap-4">
                    <span className="text-6xl font-black text-primary leading-none">{dominant.percentage}%</span>
                    <Badge className="bg-success text-white font-bold h-8 mb-1">{dominant.matchLevel}</Badge>
                  </div>
                </div>
              </div>
              <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={results}>
                    <PolarGrid stroke="#e2e8f0" strokeWidth={2} />
                    <PolarAngleAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                    <Radar
                      name="Your Profile"
                      dataKey="percentage"
                      stroke="#2563EB"
                      fill="#2563EB"
                      fillOpacity={0.5}
                      strokeWidth={4}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Specific MI/PIA Details */}
          {quizType === 'MI' && (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {results.slice(0, 3).map((res, i) => {
                const info = MI_INFO_MAP[res.category] || { desc: "", learn: "", strengths: [] };
                return (
                  <Card key={i} className="border-2 border-slate-100 shadow-none rounded-[32px] p-6 space-y-4">
                    <Badge className="bg-secondary/10 text-secondary border-none font-bold">Top Strength {i+1}</Badge>
                    <h4 className="text-2xl font-bold font-headline text-primary">{res.category}</h4>
                    <p className="text-sm text-muted-foreground">{info.desc}</p>
                    <div className="pt-4 space-y-2">
                       <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">How You Learn Best</p>
                       <p className="text-sm font-bold">{info.learn}</p>
                    </div>
                  </Card>
                );
              })}
            </section>
          )}

          {/* Recommended Pathway */}
          <section className="bg-slate-50 rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-slate-100">
             <div className="space-y-2 text-center md:text-left">
               <h4 className="text-2xl font-bold font-headline text-primary">Recommended CBE Pathway</h4>
               <p className="text-muted-foreground font-medium">This is the optimal curriculum path for your strengths in Senior School.</p>
             </div>
             <div className="p-8 bg-white rounded-3xl shadow-xl border-2 border-primary/20 flex items-center gap-6">
                <div className="h-16 w-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                  <Rocket className="h-8 w-8" />
                </div>
                <div>
                   <span className="text-4xl font-black text-primary">{recommendedPathway}</span>
                   <p className="text-xs font-bold text-success uppercase tracking-widest mt-1">Highly Compatible</p>
                </div>
             </div>
          </section>

          {/* Career Matches */}
          <section className="space-y-10">
            <div className="text-center space-y-2">
               <h3 className="text-3xl font-bold font-headline">Top Career Opportunities</h3>
               <p className="text-muted-foreground font-medium">Careers tailored for your {quizType === 'PIA' ? 'PIA profile' : 'intelligence type'}.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {careers.slice(0, 4).map((career, i) => (
                 <div key={i} className="p-8 border-2 border-slate-100 rounded-[32px] hover:border-primary/20 transition-all space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Briefcase className="h-7 w-7" />
                      </div>
                      <Badge className="bg-primary/5 text-primary border-none font-bold">{dominant.percentage}% Match</Badge>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-2xl font-bold font-headline">{career.title}</h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">{career.description}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-700 italic border-l-4 border-primary">
                      " {career.whyFit} "
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Required Subjects</p>
                          <p className="text-xs font-bold text-slate-800">{career.subjects.slice(0, 2).join(", ")}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Top Universities</p>
                          <p className="text-xs font-bold text-slate-800">{career.universities.slice(0, 2).join(", ")}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          {/* Roadmap Footer */}
          <section className="bg-primary p-12 rounded-[40px] text-white space-y-10 relative overflow-hidden">
             <div className="relative z-10 space-y-6">
                <h4 className="text-3xl font-bold font-headline">Your Career Journey</h4>
                <div className="flex flex-col md:flex-row justify-between gap-8">
                   {[
                     { step: "Senior School", label: recommendedPathway },
                     { step: "Tertiary", label: "Uni / TVET" },
                     { step: "Internship", label: "Practical Prep" },
                     { step: "Professional", label: dominant.category }
                   ].map((item, i) => (
                     <div key={i} className="flex-1 space-y-2 relative">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-full bg-white text-primary flex items-center justify-center font-black text-lg shadow-xl">
                              {i + 1}
                           </div>
                           {i < 3 && <div className="hidden md:block absolute left-10 top-5 w-full h-1 bg-white/20" />}
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest opacity-70">{item.step}</p>
                        <p className="font-bold text-lg">{item.label}</p>
                     </div>
                   ))}
                </div>
             </div>
             {/* Decorative */}
             <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl" />
          </section>

          <footer className="text-center pt-8 border-t border-slate-100">
             <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">© 2026 CareerCompass Kenya • Discover Your Path. Build Your Future.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
