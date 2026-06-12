"use client";

import { NavHeader } from "@/components/nav-header";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, BookOpen, GraduationCap, Settings, User, FileText, Calendar, MessageSquare, Briefcase, Award, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavHeader />
      <div className="flex-1 flex overflow-hidden">
        <SidebarProvider>
          <Sidebar className="hidden md:flex border-r bg-[#2563EB] text-white">
            <SidebarHeader className="p-8">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-3xl bg-white/20 flex items-center justify-center text-white font-bold text-xl shadow-lg backdrop-blur-md">
                  JD
                </div>
                <div className="overflow-hidden">
                  <p className="text-lg font-bold truncate">John Doe</p>
                  <p className="text-xs text-white/70 truncate uppercase tracking-widest font-bold">Form 3A Student</p>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent className="px-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive className="rounded-2xl h-12 data-[active=true]:bg-white data-[active=true]:text-primary mb-2 transition-all">
                    <Link href="/dashboard"><LayoutDashboard className="mr-3 h-6 w-6" /> <span className="font-bold">Dashboard</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="rounded-2xl h-12 hover:bg-white/10 mb-2">
                    <Link href="/results"><FileText className="mr-3 h-6 w-6" /> <span className="font-bold">Career Report</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="rounded-2xl h-12 hover:bg-white/10 mb-2">
                    <Link href="/hub"><GraduationCap className="mr-3 h-6 w-6" /> <span className="font-bold">University Hub</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="rounded-2xl h-12 hover:bg-white/10 mb-2">
                    <Link href="/planner"><Calendar className="mr-3 h-6 w-6" /> <span className="font-bold">Planner</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <div className="p-8 border-t border-white/10 mt-auto">
              <Button variant="outline" className="w-full gap-2 rounded-2xl font-bold border-white/40 text-white hover:bg-white hover:text-primary h-12" asChild>
                <Link href="/quiz">Retake Assessment</Link>
              </Button>
            </div>
          </Sidebar>

          <main className="flex-1 overflow-y-auto p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="space-y-3">
                  <h1 className="text-5xl font-bold font-headline text-foreground tracking-tight">Hi John! 👋</h1>
                  <p className="text-muted-foreground text-xl font-medium">You're <span className="text-success font-bold">65% of the way</span> to finding your perfect path!</p>
                </div>
                <Button variant="outline" className="gap-2 rounded-2xl border-border bg-white shadow-sm hover:bg-muted font-bold h-12 px-8">
                  <Settings className="h-5 w-5" /> Account Settings
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="border-none shadow-card bg-primary text-white rounded-[32px] transform hover:scale-105 transition-transform">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-bold opacity-80 uppercase tracking-widest flex items-center gap-2">
                      <Award className="h-4 w-4" /> Top Intelligence
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-headline">Logical-Math</div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card bg-secondary text-white rounded-[32px] transform hover:scale-105 transition-transform">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-bold opacity-80 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> CBE Pathway
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-headline">STEM</div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card bg-white rounded-[32px] transform hover:scale-105 transition-transform">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" /> Target Course
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-headline text-primary">Soft. Engineering</div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card bg-white rounded-[32px] transform hover:scale-105 transition-transform">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" /> Match Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-headline text-primary">85%</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <Card className="lg:col-span-2 border-none shadow-card bg-white rounded-[32px] overflow-hidden">
                  <CardHeader className="p-10 pb-4">
                    <CardTitle className="font-headline text-2xl text-primary flex items-center gap-3">
                      <TrendingUp className="h-7 w-7" /> Your Progress
                    </CardTitle>
                    <CardDescription className="text-lg">Track your journey to your dream career.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[350px] flex items-center justify-center bg-muted/20 rounded-[40px] border-4 border-dashed border-border/50 m-10 mt-0">
                    <div className="text-center space-y-6">
                      <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl ring-8 ring-primary/5">
                        <Award className="h-12 w-12 text-primary" />
                      </div>
                      <p className="text-muted-foreground font-bold text-xl">Detailed insights coming soon!</p>
                      <Button className="rounded-full h-14 px-8 font-bold text-lg">Update Assessment</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-card bg-white rounded-[32px] overflow-hidden flex flex-col">
                  <CardHeader className="bg-primary/5 p-10 pb-6">
                    <CardTitle className="font-headline text-2xl text-primary flex items-center gap-3">
                      <Calendar className="h-7 w-7" /> Daily Plan
                    </CardTitle>
                    <CardDescription className="font-bold">Wednesday, June 12</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-10 flex-1">
                    <div className="flex gap-6 p-6 bg-primary/5 rounded-3xl border-l-[12px] border-l-primary shadow-sm hover:translate-x-2 transition-transform">
                      <div className="text-sm font-bold text-primary w-20 pt-1">08:00 AM</div>
                      <div className="flex-1">
                        <p className="text-lg font-bold text-primary leading-none mb-1">Mathematics</p>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">CBE Core</p>
                      </div>
                      <Badge className="bg-primary h-fit text-[10px] font-bold rounded-full">ACTIVE</Badge>
                    </div>
                    <div className="flex gap-6 p-6 bg-secondary/5 rounded-3xl border-l-[12px] border-l-secondary shadow-sm hover:translate-x-2 transition-transform">
                      <div className="text-sm font-bold text-secondary w-20 pt-1">10:00 AM</div>
                      <div>
                        <p className="text-lg font-bold text-secondary leading-none mb-1">Physics</p>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pathway Elective</p>
                      </div>
                    </div>
                    <div className="flex gap-6 p-6 bg-muted/50 rounded-3xl border-l-[12px] border-l-muted-foreground hover:translate-x-2 transition-transform">
                      <div className="text-sm font-bold text-muted-foreground w-20 pt-1">02:00 PM</div>
                      <div>
                        <p className="text-lg font-bold text-foreground/80 leading-none mb-1">Literature</p>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">CBE Core</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full text-lg font-bold h-14 rounded-2xl mt-4 group" asChild>
                      <Link href="/planner">View Full Schedule <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" /></Link>
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