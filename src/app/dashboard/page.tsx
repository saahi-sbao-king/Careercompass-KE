
"use client";

import { NavHeader } from "@/components/nav-header";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, BookOpen, GraduationCap, Settings, User, FileText, Calendar, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavHeader />
      <div className="flex-1 flex overflow-hidden">
        <SidebarProvider>
          <Sidebar className="hidden md:flex border-r">
            <SidebarHeader className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  JD
                </div>
                <div>
                  <p className="text-sm font-bold">John Doe</p>
                  <p className="text-xs text-muted-foreground">Form 3A Student</p>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/results"><FileText className="mr-2 h-4 w-4" /> My Report</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/hub"><GraduationCap className="mr-2 h-4 w-4" /> Career Hub</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/planner"><Calendar className="mr-2 h-4 w-4" /> Academic Planner</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/mentorship"><MessageSquare className="mr-2 h-4 w-4" /> Mentorship</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold font-headline">Welcome back, John!</h1>
                  <p className="text-muted-foreground">Your career journey is 65% defined.</p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" /> Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium opacity-80 uppercase tracking-wider">Top Intelligence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold font-headline">Logical-Math</div>
                  </CardContent>
                </Card>
                <Card className="bg-accent text-accent-foreground shadow-lg shadow-accent/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium opacity-80 uppercase tracking-wider">CBE Pathway</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold font-headline">STEM</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Target Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold font-headline">Soft. Eng.</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Mentorship</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold font-headline">2 Scheduled</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="font-headline">Recent Academic Progress</CardTitle>
                    <CardDescription>Focusing on STEM pathway core subjects.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[250px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed">
                    <p className="text-muted-foreground">Performance chart integration coming soon.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline">Today's Timetable</CardTitle>
                    <CardDescription>Wednesday, 12th June</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4 p-3 bg-primary/5 rounded-lg border-l-4 border-l-primary">
                      <div className="text-xs font-bold text-primary w-12 pt-0.5">08:00</div>
                      <div>
                        <p className="text-sm font-bold">Mathematics</p>
                        <p className="text-[10px] text-muted-foreground">Compulsory Core</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-3 bg-accent/5 rounded-lg border-l-4 border-l-accent">
                      <div className="text-xs font-bold text-accent w-12 pt-0.5">10:00</div>
                      <div>
                        <p className="text-sm font-bold">Computer Studies</p>
                        <p className="text-[10px] text-muted-foreground">Pathway Elective</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-3 bg-muted rounded-lg border-l-4 border-l-muted-foreground">
                      <div className="text-xs font-bold text-muted-foreground w-12 pt-0.5">14:00</div>
                      <div>
                        <p className="text-sm font-bold">Literature</p>
                        <p className="text-[10px] text-muted-foreground">Compulsory Core</p>
                      </div>
                    </div>
                    <Button variant="link" className="w-full text-xs h-auto p-0" asChild>
                      <Link href="/planner">View Full 7-Day Plan</Link>
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
