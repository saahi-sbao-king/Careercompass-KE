
"use client";

import { useState } from "react";
import { NavHeader } from "@/components/nav-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, ExternalLink, Calculator, BookOpen, Search, MapPin, Globe, BookMarked, MessageSquare } from "lucide-react";

const UNIVERSITIES = [
  { name: "University of Nairobi", type: "Public", location: "Nairobi", website: "https://www.uonbi.ac.ke", programs: "240+ Programs", description: "The oldest and largest university in Kenya, offering a wide range of competitive programs." },
  { name: "Kenyatta University", type: "Public", location: "Nairobi", website: "https://www.ku.ac.ke", programs: "180+ Programs", description: "Renowned for Education, Medicine, and Arts programs with modern facilities." },
  { name: "Strathmore University", type: "Private", location: "Nairobi", website: "https://www.strathmore.edu", programs: "60+ Programs", description: "A leading non-profit private university specializing in Business, Law, and IT." },
  { name: "JKUAT", type: "Public", location: "Juja", website: "https://www.jkuat.ac.ke", programs: "150+ Programs", description: "The premier institution for Agriculture, Technology, and Engineering." },
  { name: "Moi University", type: "Public", location: "Eldoret", website: "https://www.mu.ac.ke", programs: "140+ Programs", description: "Strong focus on Medicine, Engineering, and Textile Technology." },
  { name: "Egerton University", type: "Public", location: "Njoro", website: "https://www.egerton.ac.ke", programs: "120+ Programs", description: "Kenya's premier agricultural university with a rich history in research." },
  { name: "Technical University of Kenya", type: "Public", location: "Nairobi", website: "https://www.tukenya.ac.ke", programs: "100+ Programs", description: "Specializes in technical and vocational education and training at the degree level." },
  { name: "United States International University Africa", type: "Private", location: "Nairobi", website: "https://www.usiu.ac.ke", programs: "40+ Programs", description: "Global perspective education with diverse international student body." },
  { name: "Mount Kenya University", type: "Private", location: "Thika", website: "https://www.mku.ac.ke", programs: "130+ Programs", description: "Rapidly growing private university with strong Health Sciences department." },
  { name: "Maseno University", type: "Public", location: "Kisumu", website: "https://www.maseno.ac.ke", programs: "90+ Programs", description: "The only university in the world situated on the Equator." },
  { name: "Dedan Kimathi University of Technology", type: "Public", location: "Nyeri", website: "https://www.dkut.ac.ke", programs: "70+ Programs", description: "Leading in technology, coffee technology, and food science." },
  { name: "Masinde Muliro University", type: "Public", location: "Kakamega", website: "https://www.mmust.ac.ke", programs: "80+ Programs", description: "Strong focus on disaster management and science technology." },
  { name: "Pwani University", type: "Public", location: "Kilifi", website: "https://www.pu.ac.ke", programs: "60+ Programs", description: "Focuses on Marine Sciences and Tropical Agriculture." },
  { name: "Kisii University", type: "Public", location: "Kisii", website: "https://www.kisiiuniversity.ac.ke", programs: "75+ Programs", description: "A world-class university in the heart of Kisii." },
  { name: "Chuka University", type: "Public", location: "Chuka", website: "https://www.chuka.ac.ke", programs: "65+ Programs", description: "Center of excellence in environmental and sustainable development." },
  { name: "Technical University of Mombasa", type: "Public", location: "Mombasa", website: "https://www.tum.ac.ke", programs: "85+ Programs", description: "A premier university in Engineering, Science, and Technology at the Coast." },
  { name: "Karatina University", type: "Public", location: "Karatina", website: "https://www.karu.ac.ke", programs: "50+ Programs", description: "Excellence in Environmental and Agricultural Sciences." },
  { name: "Meru University of Science and Technology", type: "Public", location: "Meru", website: "https://www.must.ac.ke", programs: "55+ Programs", description: "Focus on Innovation and Science." },
  { name: "South Eastern Kenya University", type: "Public", location: "Kitui", website: "https://www.seku.ac.ke", programs: "45+ Programs", description: "Specialized in Arid and Semi-Arid Land management." },
  { name: "Multimedia University of Kenya", type: "Public", location: "Nairobi", website: "https://www.mmu.ac.ke", programs: "40+ Programs", description: "A premier university in IT, Media, and Communication." },
  { name: "KCA University", type: "Private", location: "Nairobi", website: "https://www.kca.ac.ke", programs: "50+ Programs", description: "A leader in Business and IT education in Kenya." },
  { name: "Daystar University", type: "Private", location: "Nairobi", website: "https://www.daystar.ac.ke", programs: "45+ Programs", description: "Excellence in Communication and Leadership." },
  { name: "Kabarak University", type: "Private", location: "Nakuru", website: "https://www.kabarak.ac.ke", programs: "55+ Programs", description: "Christian institution providing holistic education." },
  { name: "Zetech University", type: "Private", location: "Ruiru", website: "https://www.zetech.ac.ke", programs: "35+ Programs", description: "Technologically driven private university." },
  { name: "Pan Africa Christian University", type: "Private", location: "Nairobi", website: "https://www.pacuniversity.ac.ke", programs: "30+ Programs", description: "Training leaders for church and society." },
  { name: "Scott Christian University", type: "Private", location: "Machakos", website: "https://www.scott.ac.ke", programs: "25+ Programs", description: "A pioneer in Christian higher education in Kenya." }
];

export default function HubPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUnis = UNIVERSITIES.filter(uni => 
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    uni.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container px-4 py-12 mx-auto space-y-12">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <Badge className="bg-primary/10 text-primary border-none px-4 py-1 rounded-full text-sm font-bold">The Hub</Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-primary leading-tight">University & Career Hub</h1>
          <p className="text-muted-foreground text-lg md:text-xl font-medium">Explore institutions, calculate your cluster points, and find official resources for your next big step.</p>
        </div>

        <Tabs defaultValue="universities" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-muted p-1 rounded-2xl h-14">
              <TabsTrigger value="universities" className="rounded-xl px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg h-12">Institutions</TabsTrigger>
              <TabsTrigger value="resources" className="rounded-xl px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg h-12">Resources</TabsTrigger>
              <TabsTrigger value="calculator" className="rounded-xl px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg h-12">Cluster Calculator</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="universities" className="space-y-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by university name or city..." 
                className="pl-12 h-14 rounded-2xl border-2 focus:border-primary transition-all bg-card"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUnis.map((uni, i) => (
                <Card key={i} className="border-none shadow-card rounded-[32px] overflow-hidden group hover:-translate-y-2 transition-all duration-300 bg-card flex flex-col">
                  <div className="p-8 bg-primary/5 border-b flex justify-between items-center">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <Badge className="bg-white/90 text-primary border-none font-bold shadow-sm">{uni.type}</Badge>
                  </div>
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">{uni.name}</CardTitle>
                    <div className="flex flex-wrap gap-4 pt-2">
                       <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground"><MapPin className="h-3 w-3" /> {uni.location}</span>
                       <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground"><BookMarked className="h-3 w-3" /> {uni.programs}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-6 flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {uni.description}
                    </p>
                  </CardContent>
                  <CardFooter className="px-8 pb-8 pt-0 flex gap-3 mt-auto">
                    <Button className="flex-1 rounded-xl font-bold h-11" asChild>
                      <a href={uni.website} target="_blank" rel="noopener noreferrer">Website <Globe className="ml-2 h-4 w-4" /></a>
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl font-bold h-11">Programs</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="max-w-xl mx-auto">
            <Card className="border-none shadow-card rounded-[40px] bg-card overflow-hidden">
              <CardHeader className="p-10 bg-primary/5 text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Calculator className="h-8 w-8" />
                </div>
                <CardTitle className="text-3xl font-headline text-primary">Cluster Points Estimator</CardTitle>
                <CardDescription className="text-lg">Estimate your competitive advantage for university placement based on recent KUCCPS trends.</CardDescription>
              </CardHeader>
              <CardContent className="p-10 space-y-6">
                <div className="grid gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-black text-muted-foreground uppercase tracking-widest">Aggregate Mean Score</label>
                      <Input type="number" placeholder="e.g. 75" className="h-12 rounded-xl" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">Eng/Kis Points</label>
                        <Input type="number" placeholder="12" className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">Math/Sci Points</label>
                        <Input type="number" placeholder="12" className="h-12 rounded-xl" />
                      </div>
                   </div>
                </div>
                <Button className="w-full h-14 rounded-2xl font-bold text-lg bg-primary shadow-xl">Calculate My Cluster</Button>
                <p className="text-[10px] text-center text-muted-foreground font-medium italic">Calculations are unofficial estimates for guidance only.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-none shadow-card rounded-[32px] bg-card p-4">
                <CardHeader>
                  <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-headline">KUCCPS Portal</CardTitle>
                  <CardDescription className="text-base">The official gateway for national course placement and revision.</CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Select your preferred courses during the revision windows. Ensure you meet the cluster requirements for your dream career path.</p>
                  <Button variant="outline" className="w-full h-12 rounded-xl font-bold gap-2" asChild>
                    <a href="https://students.kuccps.net" target="_blank" rel="noopener noreferrer">Open KUCCPS <ExternalLink className="h-4 w-4" /></a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-card rounded-[32px] bg-card p-4">
                <CardHeader>
                  <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-headline">KICD Hub</CardTitle>
                  <CardDescription className="text-base">Competency Based Education (CBE) materials and curriculum designs.</CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Stay updated with the latest Senior School pathways and curriculum changes mandated by the Ministry of Education.</p>
                  <Button variant="outline" className="w-full h-12 rounded-xl font-bold gap-2" asChild>
                    <a href="https://kicd.ac.ke" target="_blank" rel="noopener noreferrer">Visit KICD <ExternalLink className="h-4 w-4" /></a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 border-dashed bg-accent/5 border-2 border-accent/20 rounded-[40px] p-10">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                   <div className="space-y-4 text-center md:text-left">
                      <div className="h-14 w-14 rounded-2xl bg-accent text-white flex items-center justify-center mx-auto md:mx-0 shadow-lg">
                        <MessageSquare className="h-7 w-7" />
                      </div>
                      <h3 className="text-3xl font-bold font-headline text-primary">Mentorship Directory</h3>
                      <p className="text-muted-foreground font-medium max-w-md">Connect with industry professionals and find established organizations offering student mentorship.</p>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
                      {[
                        { name: "Equity Wings to Fly", label: "Scholarships", url: "https://equitygroupfoundation.com/wings-to-fly/" },
                        { name: "AKAD Education", label: "Career Prep", url: "https://akadeducationafrica.com/" },
                        { name: "KCB Foundation", label: "Skills Training", url: "https://foundation.kcbgroup.com/" },
                        { name: "Global Peace", label: "Leadership", url: "https://www.globalpeace.org/kenya" }
                      ].map((ment, i) => (
                        <a key={i} href={ment.url} target="_blank" rel="noopener noreferrer" className="bg-white p-5 rounded-[24px] shadow-sm hover:shadow-md hover:border-primary/40 border border-transparent transition-all flex items-center justify-between group">
                          <div>
                            <p className="font-bold text-sm text-primary group-hover:underline">{ment.name}</p>
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{ment.label}</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-30 group-hover:opacity-100" />
                        </a>
                      ))}
                   </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
