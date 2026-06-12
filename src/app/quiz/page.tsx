
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NavHeader } from "@/components/nav-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QUESTIONS } from "@/lib/data";
import { IntelligenceType } from "@/lib/types";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const totalSteps = QUESTIONS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [QUESTIONS[currentStep].id]: value });
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
    // Save to local storage for demo purposes
    localStorage.setItem('quiz-results', JSON.stringify(answers));
    router.push('/results');
  };

  const currentQuestion = QUESTIONS[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container max-w-2xl px-4 py-12 mx-auto">
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">Step {currentStep + 1} of {totalSteps}</p>
              <h2 className="text-2xl font-bold font-headline">MI Diagnostic Engine</h2>
            </div>
            <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="pb-8">
            <CardTitle className="text-xl md:text-2xl font-medium leading-relaxed font-headline text-center">
              "{currentQuestion.text}"
            </CardTitle>
            <CardDescription className="text-center pt-2">
              Rate how much you agree with this statement on a scale of 1 (Not at all) to 5 (Exactly me).
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3">
              {[1, 2, 3, 4, 5].map((val) => (
                <Button
                  key={val}
                  variant={answers[currentQuestion.id] === val ? "default" : "outline"}
                  className={`h-14 text-lg justify-between px-6 transition-all border-2 ${
                    answers[currentQuestion.id] === val ? "border-primary" : "hover:border-primary/50"
                  }`}
                  onClick={() => handleAnswer(val)}
                >
                  <span className="font-bold">{val}</span>
                  <span className="text-sm font-normal">
                    {val === 1 ? "Not at all like me" : 
                     val === 3 ? "Sometimes like me" : 
                     val === 5 ? "Exactly like me" : ""}
                  </span>
                  {answers[currentQuestion.id] === val && <Check className="h-5 w-5" />}
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-8 border-t bg-muted/10">
            <Button variant="ghost" onClick={goToPrevious} disabled={currentStep === 0} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
            {currentStep === totalSteps - 1 ? (
              <Button onClick={finishQuiz} disabled={!answers[currentQuestion.id]} className="gap-2 bg-accent hover:bg-accent/90">
                View Results <Check className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep + 1)} disabled={!answers[currentQuestion.id]} className="gap-2">
                Next Question <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-8 px-4">
          Frere Town Secondary Pilot Version. Your data is protected and used only for academic guidance.
        </p>
      </main>
    </div>
  );
}
