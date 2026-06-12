"use client";

import { NavHeader } from "@/components/nav-header";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Compass, GraduationCap, BookOpen, Award, TrendingUp, Calendar, Heart, FileText, Settings, ArrowRight, Wallet } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavHeader />
      <div className="flex-1 flex overflow-hidden">
        <SidebarProvider>
          <Sidebar className="hidden md:flex border-r bg-[#2563EB] text-white">
            <SidebarHeader className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  JD
                </div>
                <div>
                  <p className="font-bold truncate">John Doe</p>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest font-black">Student</p>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent className="px-3 py-4">
              <SidebarMenu>
                {[
                  { icon: <LayoutDashboard />, label: "Dashboard", href: "/dashboard", active: true },
                  { icon: <Compass />, label: "Career Matches", href: "/results" },
                  { icon: <GraduationCap />, label: "Universities", href: "/hub" },
                  { icon: <BookOpen />, label: "Courses", href: "/hub" },
                  { icon: <Wallet />, label: "Scholarships", href: "/hub" },
                  { icon: <TrendingUp />, label: "Progress", href: "/dashboard" },
                ].map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton asChild isActive={item.active} className="rounded-xl h-11 data-[active=true]:bg-white data-[active=true]:text-primary mb-1">
                      <Link href={item.href}>
                        <div className="mr-3">{item.icon}</div>
                        <span className="font-bold">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <div className="p-6 mt-auto">
              <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild className="rounded-xl h-11 hover:bg-white/10">
                      <Link href="/dashboard"><Settings className="mr-3" /> <span className="font-bold">Settings</span></Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </Sidebar>

          <main className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="max-w-6xl mx-auto space-y-10">
              {/* Top Welcome Card */}
              <Card className="border-none shadow-card bg-primary text-white rounded-[32px] overflow-hidden relative">
                <div className="p-10 z-10 relative">
                  <h1 className="text-4xl font-bold font-headline mb-3">Welcome Back, John 👋</h1>
                  <p className="text-white/80 text-lg font-medium mb-8">Continue exploring your future. You're 80% through your assessment!</p>
                  <Button className="bg-white text-primary hover:bg-white/90 rounded-full h-12 px-8 font-bold shadow-xl">
                    Resume Exploration
                  </Button>
                </div>
                {/* Decorative background circles */}
                <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[20%] w-[200px] h-[200px] bg-secondary/20 rounded-full blur-2xl" />
              </Card>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Career Matches", value: "12", icon: <Compass className="text-primary" />, color: "bg-blue-50" },
                  { label: "Scholarships Saved", value: "8", icon: <Wallet className="text-secondary" />, color: "bg-teal-50" },
                  { label: "Universities Viewed", value: "24", icon: <GraduationCap className="text-accent" />, color: "bg-orange-50" },
                  { label: "Assessment Progress", value: "80%", icon: <TrendingUp className="text-success" />, color: "bg-emerald-50" },
                ].map((stat, i) => (
                  <Card key={i} className="border-none shadow-card rounded-[24px]">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-2xl ${stat.color} flex items-center justify-center`}>
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                        <p className="text-2xl font-black text-foreground">{stat.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* University Section */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold font-headline text-foreground">Top University Choices</h2>
                    <Button variant="link" className="font-bold text-primary p-0 h-auto">View All</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: "University of Nairobi", location: "Nairobi", programs: "240+ Programs" },
                      { name: "Strathmore University", location: "Nairobi", programs: "60+ Programs" }
                    ].map((uni, i) => (
                      <Card key={i} className="border-none shadow-card rounded-[24px] overflow-hidden hover:-translate-y-1 transition-transform">
                        <div className="h-32 bg-muted relative">
                           <Image src={`https://picsum.photos/seed/uni-${i}/400/200`} alt={uni.name} fill className="object-cover" />
                        </div>
                        <CardHeader className="p-6 pb-2">
                          <CardTitle className="text-lg font-headline">{uni.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2"><Compass className="h-3 w-3" /> {uni.location}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                          <Badge variant="secondary" className="bg-primary/5 text-primary font-bold">{uni.programs}</Badge>
                          <Button className="w-full rounded-xl font-bold">View Programs</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Scholarship Section */}
                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold font-headline text-foreground">Scholarships</h2>
                    <Button variant="link" className="font-bold text-primary p-0 h-auto">See More</Button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: "Equity Wings to Fly", deadline: "June 15, 2024", funding: "Fully Funded" },
                      { name: "KCB Foundation", deadline: "July 20, 2024", funding: "Partial" }
                    ].map((sch, i) => (
                      <Card key={i} className="border-none shadow-card rounded-[24px]">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-foreground">{sch.name}</h3>
                            <Badge className="bg-success text-white font-bold">OPEN</Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Deadline</p>
                            <p className="text-sm font-semibold">{sch.deadline}</p>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-sm font-bold text-primary">{sch.funding}</span>
                            <Button variant="outline" size="sm" className="rounded-lg font-bold">Apply</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Career Roadmap Section */}
              <Card className="border-none shadow-card rounded-[32px] overflow-hidden">
                <CardHeader className="p-10 pb-6">
                  <CardTitle className="text-2xl font-headline flex items-center gap-3">
                    <TrendingUp className="text-primary h-6 w-6" /> Your Software Engineer Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0">
                  <div className="relative pl-10 border-l-4 border-primary/20 space-y-12">
                    {[
                      { step: "KCSE", desc: "Target B+ and above with strong Math/Physics", icon: <Award /> },
                      { step: "Computer Science", desc: "Enroll in a top tier Kenyan university", icon: <GraduationCap /> },
                      { step: "Internship", desc: "Gain 3-6 months experience in a tech firm", icon: <Briefcase /> },
                      { step: "Junior Developer", desc: "First professional role in Nairobi tech hub", icon: <TrendingUp /> }
                    ].map((path, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[54px] top-0 h-10 w-10 rounded-full bg-white border-4 border-primary flex items-center justify-center text-primary shadow-lg">
                          {path.icon}
                        </div>
                        <h4 className="font-bold text-lg text-foreground">{path.step}</h4>
                        <p className="text-muted-foreground font-medium">{path.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}