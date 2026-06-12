
"use client";

import { NavHeader } from "@/components/nav-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, ExternalLink, Calculator, BookOpen, Link as LinkIcon, MessageSquare } from "lucide-react";

export default function HubPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container px-4 py-12 mx-auto space-y-12">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold font-headline tracking-tight text-primary">KUCCPS & Mentorship Hub</h1>
          <p className="text-muted-foreground text-lg">Official resources, cluster point calculators, and mentorship opportunities for Kenyan students.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cluster Calculator */}
          <Card className="lg:col-span-1 border-2 border-primary/10 shadow-lg">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2 font-headline">
                <Calculator className="h-5 w-5 text-primary" /> Cluster Point Estimator
              </CardTitle>
              <CardDescription>Estimate your competitive advantage for university placement.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Mean Grade Score (e.g., 75)</label>
                <Input type="number" placeholder="Enter your aggregate score" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject 1 (English/Kiswahili)</label>
                <Input type="number" placeholder="Grade point" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject 2 (Math/Science)</label>
                <Input type="number" placeholder="Grade point" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Calculate Cluster</Button>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t pt-4">
              <p className="text-[10px] text-muted-foreground text-center w-full">Note: Calculations are estimates based on previous KUCCPS trends.</p>
            </CardFooter>
          </Card>

          {/* Official Resources */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-accent" /> KUCCPS Portal
                </CardTitle>
                <CardDescription>Placement for Universities and Colleges.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Official platform for course selection and revision during the national placement cycle.</p>
                <Button variant="outline" className="w-full gap-2" asChild>
                  <a href="https://students.kuccps.net" target="_blank" rel="noopener noreferrer">
                    Visit Portal <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" /> KICD Resources
                </CardTitle>
                <CardDescription>CBE Curriculum Materials.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Access official curriculum designs and learning materials for Senior School.</p>
                <Button variant="outline" className="w-full gap-2" asChild>
                  <a href="https://kicd.ac.ke" target="_blank" rel="noopener noreferrer">
                    Visit KICD <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border-dashed bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" /> Mentorship Directory
                </CardTitle>
                <CardDescription>Connect with professionals in your field of interest.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">Equity Wings to Fly</span>
                    <span className="text-xs text-muted-foreground">Leadership & Scholarship</span>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">AKAD Education</span>
                    <span className="text-xs text-muted-foreground">Career Mentorship</span>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">KCB Foundation</span>
                    <span className="text-xs text-muted-foreground">Skills Development</span>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">Frere Town Alumni</span>
                    <span className="text-xs text-muted-foreground">Local School Network</span>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
