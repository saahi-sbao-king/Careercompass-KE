
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NavHeader } from "@/components/nav-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PIA_QUESTIONS, MI_QUESTIONS } from "@/lib/data";
import { AssessmentType, QuizResults } from "@/lib/types";
import { Check, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get('type') as AssessmentType) || 'PIA';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [mounted, setMounted] = useState(false);

  const questions = type === 'PIA' ? PIA_QUESTIONS : MI_QUESTIONS;
  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnswer = (value: number) => {
    const currentQuestion = questions[currentStep];
    setAnswers({ ...answers, [currentQuestion.id]: value });
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishQuiz = () => {
    const results: QuizResults = {
      type,
      answers,
      timestamp: Date.now()
    };
    localStorage.setItem('quiz-results', JSON.stringify(results));
    router.push('/results');
  };

  if (!mounted) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  const currentQuestion = questions[currentStep];

  return (
    <main className="container max-w-2xl px-4 py-12 mx-auto">
      <div className="mb-10 space-y-4 text-center">
         <p className="text-xs font-black text-primary uppercase tracking-widest">
           {type === 'PIA' ? 'Passions • Interests • Abilities' : 'Multiple Intelligences'} Assessment
         </p>
         <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Question {currentStep + 1} of {totalSteps}</p>
         <h2 className="text-3xl font-bold font-headline">{type === 'PIA' ? 'Find Your Path' : 'Discover Your Intelligences'}</h2>
         <div className="space-y-2">
          <Progress value={progress} className="h-2.5 rounded-full bg-blue-100 dark:bg-slate-800" />
          <p className="text-xs font-bold text-muted-foreground text-right">{Math.round(progress)}% Complete</p>
         </div>
      </div>

      <Card className="border-none shadow-card rounded-[32px] overflow-hidden bg-card">
        <CardHeader className="p-10 pb-6 text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold leading-tight font-headline">
            "{currentQuestion.text}"
          </CardTitle>
          <CardDescription className="text-lg pt-4">
            Rate how much you agree from 1 (Not at all) to 5 (Exactly me).
          </CardDescription>
        </CardHeader>
        <CardContent className="px-10 pb-10">
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((val) => (
              <Button
                key={val}
                variant={answers[currentQuestion.id] === val ? "default" : "outline"}
                className={`h-16 text-lg justify-between px-8 rounded-2xl border-2 transition-all ${
                  answers[currentQuestion.id] === val 
                    ? "border-primary bg-primary text-white shadow-xl scale-[1.02]" 
                    : "hover:border-primary/40 hover:bg-primary/5"
                }`}
                onClick={() => handleAnswer(val)}
              >
                <span className="font-black">{val}</span>
                <span className="text-sm font-bold opacity-80">
                  {val === 1 ? "Strongly Disagree" : 
                   val === 3 ? "Neutral" : 
                   val === 5 ? "Strongly Agree" : ""}
                </span>
                {answers[currentQuestion.id] === val && <Check className="h-6 w-6" />}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-8 bg-muted/20 border-t">
          <Button variant="ghost" onClick={goToPrevious} disabled={currentStep === 0} className="gap-2 font-bold h-12 rounded-xl">
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          {currentStep === totalSteps - 1 ? (
            <Button onClick={finishQuiz} disabled={!answers[currentQuestion.id]} className="gap-2 bg-accent hover:bg-accent/90 rounded-xl h-12 px-8 font-bold shadow-lg text-white">
              View My Results <Check className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep + 1)} disabled={!answers[currentQuestion.id]} className="gap-2 rounded-xl h-12 font-bold">
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      <p className="text-center text-xs text-muted-foreground mt-8 font-medium">
        Precision Student Diagnostics • Pilot Version
      </p>
    </main>
  );
}

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }>
        <QuizContent />
      </Suspense>
    </div>
  );
}
