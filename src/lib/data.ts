
import { Question, AssessmentCategory, CareerInfo, CBEPathway } from './types';

export const QUESTIONS: Question[] = [
  // Section 1: Passions (1-16)
  // Helping People
  { id: 1, text: "I enjoy helping others solve problems.", section: "Passions", subSection: "Helping People" },
  { id: 2, text: "I like teaching or explaining things.", section: "Passions", subSection: "Helping People" },
  { id: 3, text: "I enjoy volunteering and community service.", section: "Passions", subSection: "Helping People" },
  { id: 4, text: "I feel fulfilled when I improve someone's life.", section: "Passions", subSection: "Helping People" },
  // Creating Things
  { id: 5, text: "I enjoy designing or building things.", section: "Passions", subSection: "Creating Things" },
  { id: 6, text: "I often think of new ideas.", section: "Passions", subSection: "Creating Things" },
  { id: 7, text: "I like creating art, music, videos, or content.", section: "Passions", subSection: "Creating Things" },
  { id: 8, text: "I enjoy inventing solutions.", section: "Passions", subSection: "Creating Things" },
  // Leading Others
  { id: 9, text: "I enjoy organizing groups.", section: "Passions", subSection: "Leading Others" },
  { id: 10, text: "I naturally take leadership roles.", section: "Passions", subSection: "Leading Others" },
  { id: 11, text: "I enjoy motivating others.", section: "Passions", subSection: "Leading Others" },
  { id: 12, text: "I like making important decisions.", section: "Passions", subSection: "Leading Others" },
  // Exploring & Discovering
  { id: 13, text: "I enjoy learning new things.", section: "Passions", subSection: "Exploring & Discovering" },
  { id: 14, text: "I like research and investigations.", section: "Passions", subSection: "Exploring & Discovering" },
  { id: 15, text: "I enjoy discovering how things work.", section: "Passions", subSection: "Exploring & Discovering" },
  { id: 16, text: "I enjoy solving mysteries and puzzles.", section: "Passions", subSection: "Exploring & Discovering" },

  // Section 2: Interests (17-48)
  { id: 17, text: "Computers interest me.", section: "Interests", subSection: "Technology" },
  { id: 18, text: "I enjoy learning about technology.", section: "Interests", subSection: "Technology" },
  { id: 19, text: "I would enjoy creating software.", section: "Interests", subSection: "Technology" },
  { id: 20, text: "AI and robotics fascinate me.", section: "Interests", subSection: "Technology" },
  { id: 21, text: "I enjoy Biology.", section: "Interests", subSection: "Science & Medicine" },
  { id: 22, text: "I enjoy Chemistry.", section: "Interests", subSection: "Science & Medicine" },
  { id: 23, text: "I enjoy laboratory experiments.", section: "Interests", subSection: "Science & Medicine" },
  { id: 24, text: "Healthcare careers interest me.", section: "Interests", subSection: "Science & Medicine" },
  { id: 25, text: "I enjoy building things.", section: "Interests", subSection: "Engineering" },
  { id: 26, text: "Mathematics interests me.", section: "Interests", subSection: "Engineering" },
  { id: 27, text: "I like machines and technology.", section: "Interests", subSection: "Engineering" },
  { id: 28, text: "I enjoy understanding systems.", section: "Interests", subSection: "Engineering" },
  { id: 29, text: "Entrepreneurship interests me.", section: "Interests", subSection: "Business" },
  { id: 30, text: "I enjoy selling ideas.", section: "Interests", subSection: "Business" },
  { id: 31, text: "I enjoy managing resources.", section: "Interests", subSection: "Business" },
  { id: 32, text: "I like financial topics.", section: "Interests", subSection: "Business" },
  { id: 33, text: "I enjoy nature.", section: "Interests", subSection: "Agriculture & Environment" },
  { id: 34, text: "Agriculture interests me.", section: "Interests", subSection: "Agriculture & Environment" },
  { id: 35, text: "Environmental conservation matters to me.", section: "Interests", subSection: "Agriculture & Environment" },
  { id: 36, text: "I enjoy working outdoors.", section: "Interests", subSection: "Agriculture & Environment" },
  { id: 37, text: "I enjoy writing.", section: "Interests", subSection: "Arts & Communication" },
  { id: 38, text: "I enjoy storytelling.", section: "Interests", subSection: "Arts & Communication" },
  { id: 39, text: "I enjoy public speaking.", section: "Interests", subSection: "Arts & Communication" },
  { id: 40, text: "I enjoy creative expression.", section: "Interests", subSection: "Arts & Communication" },
  { id: 41, text: "I enjoy teaching others.", section: "Interests", subSection: "Education" },
  { id: 42, text: "I enjoy mentoring.", section: "Interests", subSection: "Education" },
  { id: 43, text: "I like explaining concepts.", section: "Interests", subSection: "Education" },
  { id: 44, text: "I enjoy helping others learn.", section: "Interests", subSection: "Education" },
  { id: 45, text: "I enjoy debates.", section: "Interests", subSection: "Law & Governance" },
  { id: 46, text: "Justice and fairness are important to me.", section: "Interests", subSection: "Law & Governance" },
  { id: 47, text: "I enjoy discussing policies.", section: "Interests", subSection: "Law & Governance" },
  { id: 48, text: "Leadership in society interests me.", section: "Interests", subSection: "Law & Governance" },

  // Section 3: Abilities (49-72)
  { id: 49, text: "I solve problems quickly.", section: "Abilities", subSection: "Analytical" },
  { id: 50, text: "Mathematics comes naturally to me.", section: "Abilities", subSection: "Analytical" },
  { id: 51, text: "I enjoy logical thinking.", section: "Abilities", subSection: "Analytical" },
  { id: 52, text: "I notice patterns easily.", section: "Abilities", subSection: "Analytical" },
  { id: 53, text: "I communicate clearly.", section: "Abilities", subSection: "Communication" },
  { id: 54, text: "I enjoy presentations.", section: "Abilities", subSection: "Communication" },
  { id: 55, text: "I can persuade others effectively.", section: "Abilities", subSection: "Communication" },
  { id: 56, text: "I express my ideas confidently.", section: "Abilities", subSection: "Communication" },
  { id: 57, text: "I think creatively.", section: "Abilities", subSection: "Creativity" },
  { id: 58, text: "I enjoy designing solutions.", section: "Abilities", subSection: "Creativity" },
  { id: 59, text: "I often generate unique ideas.", section: "Abilities", subSection: "Creativity" },
  { id: 60, text: "I enjoy innovation.", section: "Abilities", subSection: "Creativity" },
  { id: 61, text: "I enjoy working with technology.", section: "Abilities", subSection: "Technical" },
  { id: 62, text: "I learn software quickly.", section: "Abilities", subSection: "Technical" },
  { id: 63, text: "I can troubleshoot problems.", section: "Abilities", subSection: "Technical" },
  { id: 64, text: "I enjoy practical tasks.", section: "Abilities", subSection: "Technical" },
  { id: 65, text: "People often seek my guidance.", section: "Abilities", subSection: "Leadership" },
  { id: 66, text: "I can organize teams.", section: "Abilities", subSection: "Leadership" },
  { id: 67, text: "I remain calm under pressure.", section: "Abilities", subSection: "Leadership" },
  { id: 68, text: "I can make decisions confidently.", section: "Abilities", subSection: "Leadership" },
  { id: 69, text: "I work well with others.", section: "Abilities", subSection: "Social" },
  { id: 70, text: "I enjoy teamwork.", section: "Abilities", subSection: "Social" },
  { id: 71, text: "I understand people's feelings.", section: "Abilities", subSection: "Social" },
  { id: 72, text: "I build relationships easily.", section: "Abilities", subSection: "Social" },
];

export const CATEGORY_QUESTION_MAP: Record<AssessmentCategory, number[]> = {
  'Technology': [17, 18, 19, 20, 25, 26, 27, 28, 49, 50, 51, 52, 61, 62, 63, 64],
  'Medicine & Health': [1, 2, 3, 4, 21, 22, 23, 24, 69, 70, 71, 72],
  'Engineering': [25, 26, 27, 28, 49, 50, 51, 52, 61, 62, 63, 64],
  'Business': [29, 30, 31, 32, 65, 66, 67, 68, 53, 54, 55, 56],
  'Agriculture': [33, 34, 35, 36, 49, 50, 51, 52],
  'Education': [1, 2, 3, 4, 41, 42, 43, 44, 53, 54, 55, 56],
  'Law': [45, 46, 47, 48, 53, 54, 55, 56, 65, 66, 67, 68],
  'Arts & Media': [37, 38, 39, 40, 57, 58, 59, 60],
};

export const CAREER_MAPPING: Record<AssessmentCategory, CareerInfo[]> = {
  'Technology': [
    { title: "Software Engineer", description: "Design, develop, and maintain software systems.", avgSalary: "KES 120,000", demandLevel: "High", skills: ["Coding", "System Design"], subjects: ["Math", "Physics", "Computer Studies"], universities: ["University of Nairobi", "JKUAT", "Strathmore"], tvetOptions: ["Technical University of Kenya", "Mombasa Polytechnic"] },
    { title: "Data Scientist", description: "Analyze and interpret complex data to help organizations make decisions.", avgSalary: "KES 150,000", demandLevel: "High", skills: ["Statistics", "Python"], subjects: ["Math", "Business"], universities: ["Strathmore", "UoN"], tvetOptions: [] },
    { title: "AI Engineer", description: "Build and deploy artificial intelligence models.", avgSalary: "KES 180,000", demandLevel: "High", skills: ["Machine Learning", "Algorithms"], subjects: ["Math", "Physics"], universities: ["JKUAT", "UoN"], tvetOptions: [] },
    { title: "Cybersecurity Analyst", description: "Protect organizations from digital threats.", avgSalary: "KES 130,000", demandLevel: "High", skills: ["Networking", "Security Protocols"], subjects: ["Math", "Physics"], universities: ["Kenyatta University", "JKUAT"], tvetOptions: ["TUK"] },
    { title: "Robotics Engineer", description: "Design and build robotic systems.", avgSalary: "KES 140,000", demandLevel: "High", skills: ["Mechanical Design", "Coding"], subjects: ["Physics", "Math"], universities: ["JKUAT", "Dedan Kimathi"], tvetOptions: ["RVIST"] }
  ],
  'Medicine & Health': [
    { title: "Doctor", description: "Diagnose and treat illnesses and injuries.", avgSalary: "KES 200,000", demandLevel: "High", skills: ["Diagnosis", "Compassion"], subjects: ["Biology", "Chemistry", "Physics"], universities: ["UoN", "Kenyatta University", "Moi University"], tvetOptions: [] },
    { title: "Nurse", description: "Provide care and support to patients.", avgSalary: "KES 80,000", demandLevel: "High", skills: ["Patient Care", "Medical Knowledge"], subjects: ["Biology", "Chemistry"], universities: ["KMTC", "UoN", "KU"], tvetOptions: ["Kenya Medical Training College"] },
    { title: "Pharmacist", description: "Prepare and dispense medications.", avgSalary: "KES 100,000", demandLevel: "Medium", skills: ["Chemistry", "Accuracy"], subjects: ["Chemistry", "Biology"], universities: ["UoN", "KU"], tvetOptions: ["KMTC"] },
    { title: "Physiotherapist", description: "Help patients recover physical function.", avgSalary: "KES 70,000", demandLevel: "Medium", skills: ["Anatomy", "Physical Therapy"], subjects: ["Biology", "Physics"], universities: ["KMTC", "KU"], tvetOptions: ["KMTC"] },
    { title: "Public Health Officer", description: "Promote health and prevent disease in communities.", avgSalary: "KES 75,000", demandLevel: "High", skills: ["Community Health", "Policy"], subjects: ["Biology", "Geography"], universities: ["KU", "UoN"], tvetOptions: ["KMTC"] }
  ],
  'Engineering': [
    { title: "Civil Engineer", description: "Design and oversee infrastructure projects.", avgSalary: "KES 110,000", demandLevel: "High", skills: ["Project Management", "Design"], subjects: ["Math", "Physics", "Chemistry"], universities: ["UoN", "JKUAT", "KU"], tvetOptions: ["TUK", "Technical University of Mombasa"] },
    { title: "Mechanical Engineer", description: "Design and manufacture machinery.", avgSalary: "KES 100,000", demandLevel: "High", skills: ["Thermodynamics", "Design"], subjects: ["Math", "Physics"], universities: ["UoN", "JKUAT"], tvetOptions: ["TUK"] },
    { title: "Electrical Engineer", description: "Design and maintain electrical systems.", avgSalary: "KES 105,000", demandLevel: "High", skills: ["Circuit Design", "Power Systems"], subjects: ["Math", "Physics"], universities: ["JKUAT", "UoN"], tvetOptions: ["TUK"] },
    { title: "Mechatronics Engineer", description: "Combine mechanical and electronic engineering.", avgSalary: "KES 120,000", demandLevel: "High", skills: ["Robotics", "Control Systems"], subjects: ["Math", "Physics"], universities: ["JKUAT", "Dedan Kimathi"], tvetOptions: [] }
  ],
  'Business': [
    { title: "Entrepreneur", description: "Start and manage your own business ventures.", avgSalary: "Variable", demandLevel: "Medium", skills: ["Risk Taking", "Leadership"], subjects: ["Business Studies", "Math"], universities: ["Strathmore", "UoN", "KU"], tvetOptions: [] },
    { title: "Accountant", description: "Manage financial records and taxes.", avgSalary: "KES 90,000", demandLevel: "High", skills: ["Financial Analysis", "Integrity"], subjects: ["Math", "Business Studies"], universities: ["UoN", "Strathmore", "KCA University"], tvetOptions: ["KASNEB Courses"] },
    { title: "Financial Analyst", description: "Evaluate investment opportunities.", avgSalary: "KES 110,000", demandLevel: "High", skills: ["Statistics", "Reporting"], subjects: ["Math", "Economics"], universities: ["Strathmore", "UoN"], tvetOptions: [] },
    { title: "Marketing Manager", description: "Promote products and services.", avgSalary: "KES 95,000", demandLevel: "Medium", skills: ["Creativity", "Strategy"], subjects: ["English", "Business"], universities: ["USIU", "KU", "UoN"], tvetOptions: [] }
  ],
  'Agriculture': [
    { title: "Agronomist", description: "Expert in soil management and crop production.", avgSalary: "KES 85,000", demandLevel: "High", skills: ["Soil Science", "Crop Protection"], subjects: ["Agriculture", "Biology", "Chemistry"], universities: ["Egerton", "JKUAT", "UoN"], tvetOptions: ["Bukura Agricultural College"] },
    { title: "Agricultural Engineer", description: "Design farm machinery and irrigation systems.", avgSalary: "KES 95,000", demandLevel: "Medium", skills: ["Irrigation Design", "Mechanization"], subjects: ["Math", "Physics", "Agriculture"], universities: ["JKUAT", "Egerton"], tvetOptions: [] },
    { title: "Environmental Scientist", description: "Protect and manage the environment.", avgSalary: "KES 80,000", demandLevel: "High", skills: ["Ecology", "Analysis"], subjects: ["Biology", "Geography"], universities: ["KU", "UoN", "Egerton"], tvetOptions: [] },
    { title: "Food Scientist", description: "Analyze and improve food quality and safety.", avgSalary: "KES 90,000", demandLevel: "Medium", skills: ["Food Chemistry", "Microbiology"], subjects: ["Chemistry", "Biology"], universities: ["JKUAT", "UoN"], tvetOptions: [] }
  ],
  'Education': [
    { title: "Teacher", description: "Educate and inspire students in specific subjects.", avgSalary: "KES 50,000", demandLevel: "High", skills: ["Teaching", "Patience"], subjects: ["Subject of choice"], universities: ["KU", "UoN", "CUEA"], tvetOptions: ["Teacher Training Colleges"] },
    { title: "Lecturer", description: "Teach and conduct research at the university level.", avgSalary: "KES 150,000", demandLevel: "Medium", skills: ["Research", "Public Speaking"], subjects: ["PhD in specialty"], universities: ["Any Accredited University"], tvetOptions: [] },
    { title: "Curriculum Developer", description: "Design educational materials and plans.", avgSalary: "KES 110,000", demandLevel: "Medium", skills: ["Planning", "Educational Theory"], subjects: ["Education", "Psychology"], universities: ["KU", "UoN"], tvetOptions: [] },
    { title: "Education Officer", description: "Manage and oversee educational systems.", avgSalary: "KES 95,000", demandLevel: "Medium", skills: ["Administration", "Policy"], subjects: ["Education Management"], universities: ["KU", "UoN"], tvetOptions: [] }
  ],
  'Law': [
    { title: "Lawyer", description: "Provide legal advice and representation.", avgSalary: "KES 150,000", demandLevel: "High", skills: ["Advocacy", "Research"], subjects: ["English", "History"], universities: ["UoN", "Strathmore", "KU"], tvetOptions: ["Kenya School of Law"] },
    { title: "Judge", description: "Preside over legal cases and deliver judgments.", avgSalary: "KES 400,000", demandLevel: "Low", skills: ["Judicial Reasoning", "Integrity"], subjects: ["Law Degree + Experience"], universities: ["UoN", "KU"], tvetOptions: [] },
    { title: "Policy Analyst", description: "Analyze and develop public policies.", avgSalary: "KES 110,000", demandLevel: "High", skills: ["Critical Thinking", "Analysis"], subjects: ["History", "Economics"], universities: ["UoN", "KU", "Strathmore"], tvetOptions: [] },
    { title: "Diplomat", description: "Represent the country in international relations.", avgSalary: "KES 180,000", demandLevel: "Medium", skills: ["Negotiation", "Cultural Intelligence"], subjects: ["International Relations", "History"], universities: ["USIU", "UoN"], tvetOptions: [] }
  ],
  'Arts & Media': [
    { title: "Graphic Designer", description: "Create visual concepts to communicate ideas.", avgSalary: "KES 60,000", demandLevel: "High", skills: ["Adobe Suite", "Creativity"], subjects: ["Fine Art", "Computer Studies"], universities: ["UoN", "KU", "Technical University of Kenya"], tvetOptions: ["Nairobi Institute of Technology"] },
    { title: "Journalist", description: "Report news and write articles for various media.", avgSalary: "KES 70,000", demandLevel: "Medium", skills: ["Writing", "Investigation"], subjects: ["English", "History"], universities: ["Daystar", "UoN", "KU"], tvetOptions: ["Kenya Institute of Mass Communication"] },
    { title: "Filmmaker", description: "Direct and produce movies and videos.", avgSalary: "Variable", demandLevel: "High", skills: ["Directing", "Editing"], subjects: ["Literature", "Media Studies"], universities: ["Daystar", "KU"], tvetOptions: ["KIMC"] },
    { title: "Animator", description: "Create animated sequences for movies and games.", avgSalary: "KES 80,000", demandLevel: "High", skills: ["Drawing", "3D Modeling"], subjects: ["Fine Art", "Math"], universities: ["Nairobi Institute of Technology", "UoN"], tvetOptions: [] },
    { title: "Content Creator", description: "Create digital content for online audiences.", avgSalary: "Variable", demandLevel: "High", skills: ["Digital Marketing", "Video Editing"], subjects: ["Media Studies", "English"], universities: ["Any"], tvetOptions: [] }
  ]
};

export const PATHWAY_MAPPING: Record<AssessmentCategory, CBEPathway> = {
  'Technology': 'STEM',
  'Engineering': 'STEM',
  'Medicine & Health': 'STEM',
  'Agriculture': 'STEM',
  'Arts & Media': 'Arts & Sports',
  'Education': 'Social Sciences',
  'Business': 'Social Sciences',
  'Law': 'Social Sciences',
};
