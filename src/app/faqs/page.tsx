"use client";

import { NavHeader } from "@/components/nav-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, HelpCircle, Mail, Phone } from "lucide-react";

const FAQS = [
  {
    question: "What is the PIA Assessment?",
    answer: "The PIA (Passions, Interests, Abilities) Assessment is a comprehensive 72-question tool designed specifically for Kenyan students. it maps your personal preferences and natural talents to real-world career clusters and educational pathways in Kenya.",
  },
  {
    question: "How do I calculate my cluster points?",
    answer: "Cluster points are calculated based on your KCSE results in four key subject groups. You can use our 'Cluster Calculator' in the Hub section to get an unofficial estimate of your points for various degree programs.",
  },
  {
    question: "What is the difference between University and TVET?",
    answer: "Universities focus on academic and theoretical knowledge, granting degrees. TVET (Technical and Vocational Education and Training) institutions focus on practical, hands-on skills training, granting certificates and diplomas that are highly valued in technical industries.",
  },
  {
    question: "Is CareerCompass Kenya free to use?",
    answer: "The core assessments and university directory are currently free for students as part of our pilot program to improve career guidance accessibility across Kenya.",
  },
  {
    question: "How do I apply for the scholarships listed?",
    answer: "Each scholarship card in our database includes an 'Apply' button that takes you directly to the official provider's portal (e.g., Equity Wings to Fly, Mastercard Foundation). Always ensure you check their specific eligibility criteria before applying.",
  },
  {
    question: "Can I share my assessment report with my school counselor?",
    answer: "Yes! After completing either the PIA or MI assessment, you can download a professional PDF report. We highly encourage sharing this with teachers, parents, and counselors to facilitate better-informed career discussions.",
  },
  {
    question: "What is the Multiple Intelligences (MI) Test?",
    answer: "Based on Howard Gardner's theory, the MI test identifies how you learn best across 9 types of intelligence (e.g., Logical, Linguistic, Spatial). This helps you choose study techniques and careers that match your natural 'brain type'.",
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container px-4 py-16 mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <Badge className="bg-primary/10 text-primary border-none px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about navigating your future with CareerCompass Kenya.
          </p>
        </div>

        <Card className="border-none shadow-card rounded-[40px] bg-card overflow-hidden">
          <CardHeader className="p-10 bg-primary/5 border-b">
            <CardTitle className="flex items-center gap-3 text-2xl font-headline">
              <HelpCircle className="text-primary h-6 w-6" /> Common Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-muted last:border-0 py-2">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-none shadow-card rounded-[32px] bg-primary text-white p-8 space-y-4 text-center">
            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-2">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-headline">Email Us</h3>
            <p className="text-white/80 text-sm">Have a specific question? Our support team is here to help.</p>
            <p className="font-bold text-lg">sadiq14526@gmail.com</p>
          </Card>

          <Card className="border-none shadow-card rounded-[32px] bg-secondary text-white p-8 space-y-4 text-center">
            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-2">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-headline">Call or WhatsApp</h3>
            <p className="text-white/80 text-sm">Reach out directly for urgent career guidance assistance.</p>
            <p className="font-bold text-lg">+254 117 448 455</p>
          </Card>
        </div>

        <div className="text-center pt-8">
           <p className="text-sm text-muted-foreground italic">
             Can't find what you're looking for? Join our community on WhatsApp for real-time mentorship.
           </p>
        </div>
      </main>
    </div>
  );
}
