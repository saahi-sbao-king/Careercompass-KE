"use client";

import { NavHeader } from "@/components/nav-header";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, BookOpen, GraduationCap, Settings, User, FileText, Calendar, MessageSquare, Briefcase, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavHeader />
      <div className="flex-1 flex overflow-hidden">
        <SidebarProvider>
          <Sidebar className="hidden md:flex border-r bg-white">
            <SidebarHeader className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
                  JD
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-primary truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">Form 3A Student</p>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent className="px-3">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive className="rounded-xl h-11 data-[active=true]:bg-primary data-[active=true]:text-white">
                    <Link href="/dashboard"><LayoutDashboard className="mr-3 h-5 w-5" /> Dashboard</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="rounded-xl h-11">
                    <Link href="/results"><FileText className="mr-3 h-5 w-5" /> My Career Report</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="rounded-xl h-11">
                    <Link href="/hub"><GraduationCap className="mr-3 h-5 w-5" /> University Hub</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="rounded-xl h-11">
                    <Link href="/planner"><Calendar className="mr-3 h-5 w-5" /> Academic Planner</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="rounded-xl h-11">
                    <Link href="/mentorship"><MessageSquare className="mr-3 h-5 w-5" /> Mentorship</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <div className="p-6 border-t mt-auto">
              <Button variant="outline" className="w-full gap-2 rounded-xl font-bold border-primary text-primary hover:bg-primary hover:text-white" asChild>
                <Link href="/quiz">Retake Assessment</Link>
              </Button>
            </div>
          </Sidebar>

          <main className="flex-1 overflow-y-auto p-4 md:p-10">
            <div className="max-w-6xl mx-auto space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold font-headline text-primary tracking-tight">Welcome back, John! 👋</h1>
                  <p className="text-muted-foreground text-lg">Your career journey is <span className="text-success font-bold">65% complete</span>. Almost there!</p>
                </div>
                <Button variant="outline" className="gap-2 rounded-xl border-border bg-white shadow-sm hover:bg-muted font-bold h-11 px-6">
                  <Settings className="h-4 w-4" /> Account Settings
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-card bg-primary text-white rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-bold opacity-80 uppercase tracking-widest flex items-center gap-2">
                      <Award className="h-3 w-3" /> Top Intelligence
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold font-headline">Logical-Math</div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card bg-secondary text-white rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-bold opacity-80 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase className="h-3 w-3" /> CBE Pathway
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold font-headline">STEM</div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card bg-white rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <GraduationCap className="h-3 w-3" /> Target Course
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold font-headline text-primary">Soft. Engineering</div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card bg-white rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <TrendingUp className="h-3 w-3" /> Mentorship
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold font-headline text-primary">2 Sessions</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none shadow-card bg-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl text-primary flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" /> Recent Academic Progress
                    </CardTitle>
                    <CardDescription>Performance tracking for STEM core subjects.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center bg-muted/20 rounded-2xl border-2 border-dashed border-border/50 m-6 mt-0">
                    <div className="text-center space-y-4">
                      <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground font-medium">Performance analytics integration coming soon.</p>
                      <Button variant="link" className="text-primary font-bold">Import KCPE/Mock Data</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-card bg-white rounded-2xl overflow-hidden">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="font-headline text-xl text-primary flex items-center gap-2">
                      <Calendar className="h-5 w-5" /> Daily Planner
                    </CardTitle>
                    <CardDescription>Wednesday, 12th June</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="flex gap-4 p-4 bg-primary/5 rounded-2xl border-l-4 border-l-primary shadow-sm">
                      <div className="text-xs font-bold text-primary w-14 pt-0.5">08:00 AM</div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-primary">Mathematics</p>
                        <p className="text-[10px] font-medium text-muted-foreground">Compulsory Core</p>
                      </div>
                      <Badge className="bg-primary h-fit text-[10px]">NOW</Badge>
                    </div>
                    <div className="flex gap-4 p-4 bg-secondary/5 rounded-2xl border-l-4 border-l-secondary shadow-sm">
                      <div className="text-xs font-bold text-secondary w-14 pt-0.5">10:00 AM</div>
                      <div>
                        <p className="text-sm font-bold text-secondary">Computer Studies</p>
                        <p className="text-[10px] font-medium text-muted-foreground">Pathway Elective</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-muted/50 rounded-2xl border-l-4 border-l-muted-foreground">
                      <div className="text-xs font-bold text-muted-foreground w-14 pt-0.5">02:00 PM</div>
                      <div>
                        <p className="text-sm font-bold text-foreground/80">Literature</p>
                        <p className="text-[10px] font-medium text-muted-foreground">Compulsory Core</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full text-sm font-bold h-12 rounded-xl mt-4" asChild>
                      <Link href="/planner">View Weekly Timetable <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}