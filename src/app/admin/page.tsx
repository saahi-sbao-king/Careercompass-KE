
"use client";

import { useState, useEffect, useRef } from "react";
import { NavHeader } from "@/components/nav-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Users, BookOpen, GraduationCap, Download, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const pathwayData = [
  { name: 'STEM', students: 145 },
  { name: 'Social Sciences', students: 82 },
  { name: 'Arts & Sports', students: 63 },
];

const intelligenceDistribution = [
  { name: 'Linguistic', value: 45 },
  { name: 'Logical-Math', value: 65 },
  { name: 'Spatial', value: 30 },
  { name: 'Bodily-Kinesthetic', value: 40 },
  { name: 'Musical', value: 25 },
  { name: 'Interpersonal', value: 55 },
  { name: 'Intrapersonal', value: 42 },
  { name: 'Naturalist', value: 38 },
  { name: 'Existential', value: 20 },
];

const COLORS = ['#2866BD', '#14A2B9', '#4A5568', '#718096', '#A0AEC0', '#CBD5E0', '#EDF2F7', '#F7FAFC', '#2B6CB0'];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExportAdminReport = async () => {
    if (!dashboardRef.current) return;
    
    setIsDownloading(true);
    try {
      const element = dashboardRef.current;
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
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`FrereTown_Analytics_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container px-4 py-8 mx-auto space-y-8" ref={dashboardRef}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">Admin Analytics</h1>
            <p className="text-muted-foreground">School-wide Career Guidance Distribution: Frere Town Secondary</p>
          </div>
          <Button 
            className="gap-2" 
            onClick={handleExportAdminReport}
            disabled={isDownloading}
          >
            {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {isDownloading ? "Exporting..." : "Export All Reports (PDF)"}
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">290</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">STEM Pathway Demand</CardTitle>
              <BookOpen className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50%</div>
              <p className="text-xs text-muted-foreground">Highest across all streams</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Report Downloaded</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">High student engagement</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pathway Chart */}
          <Card className="shadow-sm border bg-card">
            <CardHeader>
              <CardTitle className="font-headline">CBE Pathway Distribution</CardTitle>
              <CardDescription>Recommended pathways based on student diagnostic scores.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pathwayData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{fill: 'hsl(var(--muted)/.5)'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-muted/20 animate-pulse rounded-lg" />
              )}
            </CardContent>
          </Card>

          {/* Intelligence Chart */}
          <Card className="shadow-sm border bg-card">
            <CardHeader>
              <CardTitle className="font-headline">Intelligence Heatmap</CardTitle>
              <CardDescription>Aggregate student profiles across the 9 MI types.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={intelligenceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {intelligenceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-muted/20 animate-pulse rounded-lg" />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity / Alerts */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-destructive font-headline flex items-center gap-2">
              <AlertCircle className="h-5 w-5" /> Resource Warning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive/80">
              The high demand for <strong>STEM</strong> pathways (145 students) may exceed current laboratory capacity. Consider increasing technical teacher recruitment or optimizing lab schedules.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
