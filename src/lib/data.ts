
import { Question, AssessmentCategory, CareerInfo, CBEPathway } from './types';

export const PIA_QUESTIONS: Question[] = [
  // Section 1: Passions (1-16)
  { id: 1, text: "I enjoy helping others solve problems.", section: "Passions", subSection: "Helping People", type: 'PIA' },
  { id: 2, text: "I like teaching or explaining things.", section: "Passions", subSection: "Helping People", type: 'PIA' },
  { id: 3, text: "I enjoy volunteering and community service.", section: "Passions", subSection: "Helping People", type: 'PIA' },
  { id: 4, text: "I feel fulfilled when I improve someone's life.", section: "Passions", subSection: "Helping People", type: 'PIA' },
  { id: 5, text: "I enjoy designing or building things.", section: "Passions", subSection: "Creating Things", type: 'PIA' },
  { id: 6, text: "I often think of new ideas.", section: "Passions", subSection: "Creating Things", type: 'PIA' },
  { id: 7, text: "I like creating art, music, videos, or content.", section: "Passions", subSection: "Creating Things", type: 'PIA' },
  { id: 8, text: "I enjoy inventing solutions.", section: "Passions", subSection: "Creating Things", type: 'PIA' },
  { id: 9, text: "I enjoy organizing groups.", section: "Passions", subSection: "Leading Others", type: 'PIA' },
  { id: 10, text: "I naturally take leadership roles.", section: "Passions", subSection: "Leading Others", type: 'PIA' },
  { id: 11, text: "I enjoy motivating others.", section: "Passions", subSection: "Leading Others", type: 'PIA' },
  { id: 12, text: "I like making important decisions.", section: "Passions", subSection: "Leading Others", type: 'PIA' },
  { id: 13, text: "I enjoy learning new things.", section: "Passions", subSection: "Exploring & Discovering", type: 'PIA' },
  { id: 14, text: "I like research and investigations.", section: "Passions", subSection: "Exploring & Discovering", type: 'PIA' },
  { id: 15, text: "I enjoy discovering how things work.", section: "Passions", subSection: "Exploring & Discovering", type: 'PIA' },
  { id: 16, text: "I enjoy solving mysteries and puzzles.", section: "Passions", subSection: "Exploring & Discovering", type: 'PIA' },
  // Section 2: Interests (17-48)
  { id: 17, text: "Computers interest me.", section: "Interests", subSection: "Technology", type: 'PIA' },
  { id: 18, text: "I enjoy learning about technology.", section: "Interests", subSection: "Technology", type: 'PIA' },
  { id: 19, text: "I would enjoy creating software.", section: "Interests", subSection: "Technology", type: 'PIA' },
  { id: 20, text: "AI and robotics fascinate me.", section: "Interests", subSection: "Technology", type: 'PIA' },
  { id: 21, text: "I enjoy Biology.", section: "Interests", subSection: "Health Sciences", type: 'PIA' },
  { id: 22, text: "I enjoy Chemistry.", section: "Interests", subSection: "Health Sciences", type: 'PIA' },
  { id: 23, text: "I enjoy laboratory experiments.", section: "Interests", subSection: "Health Sciences", type: 'PIA' },
  { id: 24, text: "Healthcare careers interest me.", section: "Interests", subSection: "Health Sciences", type: 'PIA' },
  { id: 25, text: "I enjoy building things.", section: "Interests", subSection: "Engineering", type: 'PIA' },
  { id: 26, text: "Mathematics interests me.", section: "Interests", subSection: "Engineering", type: 'PIA' },
  { id: 27, text: "I like machines and technology.", section: "Interests", subSection: "Engineering", type: 'PIA' },
  { id: 28, text: "I enjoy understanding systems.", section: "Interests", subSection: "Engineering", type: 'PIA' },
  { id: 29, text: "Entrepreneurship interests me.", section: "Interests", subSection: "Business", type: 'PIA' },
  { id: 30, text: "I enjoy selling ideas.", section: "Interests", subSection: "Business", type: 'PIA' },
  { id: 31, text: "I enjoy managing resources.", section: "Interests", subSection: "Business", type: 'PIA' },
  { id: 32, text: "I like financial topics.", section: "Interests", subSection: "Business", type: 'PIA' },
  { id: 33, text: "I enjoy nature.", section: "Interests", subSection: "Agriculture", type: 'PIA' },
  { id: 34, text: "Agriculture interests me.", section: "Interests", subSection: "Agriculture", type: 'PIA' },
  { id: 35, text: "Environmental conservation matters to me.", section: "Interests", subSection: "Agriculture", type: 'PIA' },
  { id: 36, text: "I enjoy working outdoors.", section: "Interests", subSection: "Agriculture", type: 'PIA' },
  { id: 37, text: "I enjoy writing.", section: "Interests", subSection: "Arts & Media", type: 'PIA' },
  { id: 38, text: "I enjoy storytelling.", section: "Interests", subSection: "Arts & Media", type: 'PIA' },
  { id: 39, text: "I enjoy public speaking.", section: "Interests", subSection: "Arts & Media", type: 'PIA' },
  { id: 40, text: "I enjoy creative expression.", section: "Interests", subSection: "Arts & Media", type: 'PIA' },
  { id: 41, text: "I enjoy teaching others.", section: "Interests", subSection: "Education", type: 'PIA' },
  { id: 42, text: "I enjoy mentoring.", section: "Interests", subSection: "Education", type: 'PIA' },
  { id: 43, text: "I like explaining concepts.", section: "Interests", subSection: "Education", type: 'PIA' },
  { id: 44, text: "I enjoy helping others learn.", section: "Interests", subSection: "Education", type: 'PIA' },
  { id: 45, text: "I enjoy debates.", section: "Interests", subSection: "Law & Governance", type: 'PIA' },
  { id: 46, text: "Justice and fairness are important to me.", section: "Interests", subSection: "Law & Governance", type: 'PIA' },
  { id: 47, text: "I enjoy discussing policies.", section: "Interests", subSection: "Law & Governance", type: 'PIA' },
  { id: 48, text: "Leadership in society interests me.", section: "Interests", subSection: "Law & Governance", type: 'PIA' },
  // Section 3: Abilities (49-72)
  { id: 49, text: "I solve problems quickly.", section: "Abilities", subSection: "Analytical Skills", type: 'PIA' },
  { id: 50, text: "Mathematics comes naturally to me.", section: "Abilities", subSection: "Analytical Skills", type: 'PIA' },
  { id: 51, text: "I enjoy logical thinking.", section: "Abilities", subSection: "Analytical Skills", type: 'PIA' },
  { id: 52, text: "I notice patterns easily.", section: "Abilities", subSection: "Analytical Skills", type: 'PIA' },
  { id: 53, text: "I communicate clearly.", section: "Abilities", subSection: "Communication Skills", type: 'PIA' },
  { id: 54, text: "I enjoy presentations.", section: "Abilities", subSection: "Communication Skills", type: 'PIA' },
  { id: 55, text: "I can persuade others effectively.", section: "Abilities", subSection: "Communication Skills", type: 'PIA' },
  { id: 56, text: "I express my ideas confidently.", section: "Abilities", subSection: "Communication Skills", type: 'PIA' },
  { id: 57, text: "I think creatively.", section: "Abilities", subSection: "Creativity", type: 'PIA' },
  { id: 58, text: "I enjoy designing solutions.", section: "Abilities", subSection: "Creativity", type: 'PIA' },
  { id: 59, text: "I often generate unique ideas.", section: "Abilities", subSection: "Creativity", type: 'PIA' },
  { id: 60, text: "I enjoy innovation.", section: "Abilities", subSection: "Creativity", type: 'PIA' },
  { id: 61, text: "I enjoy working with technology.", section: "Abilities", subSection: "Technical Skills", type: 'PIA' },
  { id: 62, text: "I learn software quickly.", section: "Abilities", subSection: "Technical Skills", type: 'PIA' },
  { id: 63, text: "I can troubleshoot problems.", section: "Abilities", subSection: "Technical Skills", type: 'PIA' },
  { id: 64, text: "I enjoy practical tasks.", section: "Abilities", subSection: "Technical Skills", type: 'PIA' },
  { id: 65, text: "People often seek my guidance.", section: "Abilities", subSection: "Leadership Skills", type: 'PIA' },
  { id: 66, text: "I can organize teams.", section: "Abilities", subSection: "Leadership Skills", type: 'PIA' },
  { id: 67, text: "I remain calm under pressure.", section: "Abilities", subSection: "Leadership Skills", type: 'PIA' },
  { id: 68, text: "I can make decisions confidently.", section: "Abilities", subSection: "Leadership Skills", type: 'PIA' },
  { id: 69, text: "I work well with others.", section: "Abilities", subSection: "Social Skills", type: 'PIA' },
  { id: 70, text: "I enjoy teamwork.", section: "Abilities", subSection: "Social Skills", type: 'PIA' },
  { id: 71, text: "I understand people's feelings.", section: "Abilities", subSection: "Social Skills", type: 'PIA' },
  { id: 72, text: "I build relationships easily.", section: "Abilities", subSection: "Social Skills", type: 'PIA' },
];

export const MI_QUESTIONS: Question[] = [
  // Linguistic (73-77)
  { id: 73, text: "I enjoy reading books, articles, or stories.", section: "MI", subSection: "Linguistic", type: 'MI' },
  { id: 74, text: "I express my thoughts clearly through writing.", section: "MI", subSection: "Linguistic", type: 'MI' },
  { id: 75, text: "I enjoy debates and discussions.", section: "MI", subSection: "Linguistic", type: 'MI' },
  { id: 76, text: "Learning new words is enjoyable for me.", section: "MI", subSection: "Linguistic", type: 'MI' },
  { id: 77, text: "I enjoy storytelling or public speaking.", section: "MI", subSection: "Linguistic", type: 'MI' },
  // Logical-Math (78-82)
  { id: 78, text: "I enjoy solving puzzles and brain teasers.", section: "MI", subSection: "Logical-Mathematical", type: 'MI' },
  { id: 79, text: "Mathematics is one of my stronger subjects.", section: "MI", subSection: "Logical-Mathematical", type: 'MI' },
  { id: 80, text: "I enjoy analyzing problems logically.", section: "MI", subSection: "Logical-Mathematical", type: 'MI' },
  { id: 81, text: "I like finding patterns and relationships.", section: "MI", subSection: "Logical-Mathematical", type: 'MI' },
  { id: 82, text: "I enjoy scientific investigations and experiments.", section: "MI", subSection: "Logical-Mathematical", type: 'MI' },
  // Spatial (83-87)
  { id: 83, text: "I can easily visualize objects in my mind.", section: "MI", subSection: "Spatial", type: 'MI' },
  { id: 84, text: "I enjoy drawing, sketching, or designing.", section: "MI", subSection: "Spatial", type: 'MI' },
  { id: 85, text: "Maps and diagrams are easy for me to understand.", section: "MI", subSection: "Spatial", type: 'MI' },
  { id: 86, text: "I notice details in images and visual presentations.", section: "MI", subSection: "Spatial", type: 'MI' },
  { id: 87, text: "I enjoy architecture, design, or visual arts.", section: "MI", subSection: "Spatial", type: 'MI' },
  // Musical (88-92)
  { id: 88, text: "I enjoy listening to music regularly.", section: "MI", subSection: "Musical", type: 'MI' },
  { id: 89, text: "I can recognize rhythms and melodies easily.", section: "MI", subSection: "Musical", type: 'MI' },
  { id: 90, text: "I enjoy singing, playing instruments, or composing music.", section: "MI", subSection: "Musical", type: 'MI' },
  { id: 91, text: "Music helps me learn or remember information.", section: "MI", subSection: "Musical", type: 'MI' },
  { id: 92, text: "I notice sounds and musical patterns around me.", section: "MI", subSection: "Musical", type: 'MI' },
  // Bodily-Kinesthetic (93-97)
  { id: 93, text: "I enjoy sports or physical activities.", section: "MI", subSection: "Bodily-Kinesthetic", type: 'MI' },
  { id: 94, text: "I learn best through hands-on experiences.", section: "MI", subSection: "Bodily-Kinesthetic", type: 'MI' },
  { id: 95, text: "I enjoy building, fixing, or making things.", section: "MI", subSection: "Bodily-Kinesthetic", type: 'MI' },
  { id: 96, text: "I have good coordination and body control.", section: "MI", subSection: "Bodily-Kinesthetic", type: 'MI' },
  { id: 97, text: "I prefer doing rather than just watching.", section: "MI", subSection: "Bodily-Kinesthetic", type: 'MI' },
  // Interpersonal (98-102)
  { id: 98, text: "I work well in teams.", section: "MI", subSection: "Interpersonal", type: 'MI' },
  { id: 99, text: "People often come to me for advice.", section: "MI", subSection: "Interpersonal", type: 'MI' },
  { id: 100, text: "I can understand how others feel.", section: "MI", subSection: "Interpersonal", type: 'MI' },
  { id: 101, text: "I enjoy leading or organizing group activities.", section: "MI", subSection: "Interpersonal", type: 'MI' },
  { id: 102, text: "I communicate effectively with different people.", section: "MI", subSection: "Interpersonal", type: 'MI' },
  // Intrapersonal (103-107)
  { id: 103, text: "I understand my strengths and weaknesses.", section: "MI", subSection: "Intrapersonal", type: 'MI' },
  { id: 104, text: "I spend time reflecting on my goals and choices.", section: "MI", subSection: "Intrapersonal", type: 'MI' },
  { id: 105, text: "I can manage my emotions effectively.", section: "MI", subSection: "Intrapersonal", type: 'MI' },
  { id: 106, text: "I enjoy setting personal goals.", section: "MI", subSection: "Intrapersonal", type: 'MI' },
  { id: 107, text: "I prefer making decisions based on self-understanding.", section: "MI", subSection: "Intrapersonal", type: 'MI' },
  // Naturalistic (108-112)
  { id: 108, text: "I enjoy spending time outdoors.", section: "MI", subSection: "Naturalistic", type: 'MI' },
  { id: 109, text: "I am interested in animals, plants, or the environment.", section: "MI", subSection: "Naturalistic", type: 'MI' },
  { id: 110, text: "I notice patterns in nature.", section: "MI", subSection: "Naturalistic", type: 'MI' },
  { id: 111, text: "I enjoy learning about ecosystems and conservation.", section: "MI", subSection: "Naturalistic", type: 'MI' },
  { id: 112, text: "I feel connected to the natural world.", section: "MI", subSection: "Naturalistic", type: 'MI' },
  // Existential (113-117)
  { id: 113, text: "I often think about the purpose of life.", section: "MI", subSection: "Existential", type: 'MI' },
  { id: 114, text: "I enjoy discussing philosophical or spiritual ideas.", section: "MI", subSection: "Existential", type: 'MI' },
  { id: 115, text: "I wonder about humanity's future.", section: "MI", subSection: "Existential", type: 'MI' },
  { id: 116, text: "I enjoy exploring questions that have no simple answers.", section: "MI", subSection: "Existential", type: 'MI' },
  { id: 117, text: "I think deeply about values, ethics, and meaning.", section: "MI", subSection: "Existential", type: 'MI' },
];

export const CATEGORY_QUESTION_MAP: Record<AssessmentCategory, number[]> = {
  // PIA Mapping
  'Technology': [17, 18, 19, 20, 25, 26, 27, 28, 49, 50, 51, 52, 61, 62, 63, 64],
  'Medicine & Health': [1, 2, 3, 4, 21, 22, 23, 24, 69, 70, 71, 72],
  'Engineering': [25, 26, 27, 28, 49, 50, 51, 52, 61, 62, 63, 64],
  'Business': [29, 30, 31, 32, 65, 66, 67, 68, 53, 54, 55, 56],
  'Agriculture': [33, 34, 35, 36, 49, 50, 51, 52],
  'Education': [1, 2, 3, 4, 41, 42, 43, 44, 53, 54, 55, 56],
  'Law': [45, 46, 47, 48, 53, 54, 55, 56, 65, 66, 67, 68],
  'Arts & Media': [37, 38, 39, 40, 57, 58, 59, 60],
  // MI Mapping
  'Linguistic': [73, 74, 75, 76, 77],
  'Logical-Mathematical': [78, 79, 80, 81, 82],
  'Spatial': [83, 84, 85, 86, 87],
  'Musical': [88, 89, 90, 91, 92],
  'Bodily-Kinesthetic': [93, 94, 95, 96, 97],
  'Interpersonal': [98, 99, 100, 101, 102],
  'Intrapersonal': [103, 104, 105, 106, 107],
  'Naturalistic': [108, 109, 110, 111, 112],
  'Existential': [113, 114, 115, 116, 117],
};

export const MI_INFO_MAP: Record<string, { desc: string, learn: string, strengths: string[] }> = {
  'Linguistic': {
    desc: "The ability to use language effectively to express yourself and remember information.",
    learn: "Reading, writing, and word-based explanations.",
    strengths: ["Storytelling", "Persuasion", "Memorization", "Clear writing"]
  },
  'Logical-Mathematical': {
    desc: "The ability to analyze problems logically, carry out mathematical operations, and investigate issues scientifically.",
    learn: "Logical sequences, problem-solving, and abstract reasoning.",
    strengths: ["Pattern recognition", "Scientific investigation", "Critical thinking"]
  },
  'Spatial': {
    desc: "The capacity to think in images and pictures, to visualize accurately and abstractly.",
    learn: "Visual aids, diagrams, and spatial relationships.",
    strengths: ["Design", "Visualization", "Graphic representation", "Orientation"]
  },
  'Musical': {
    desc: "Skill in the performance, composition, and appreciation of musical patterns.",
    learn: "Rhythm, sound, and musical mnemonics.",
    strengths: ["Rhythmic awareness", "Melody recognition", "Audio sensitivity"]
  },
  'Bodily-Kinesthetic': {
    desc: "The potential of using one's whole body or parts of the body to solve problems.",
    learn: "Physical activity, hands-on tasks, and movement.",
    strengths: ["Coordination", "Manual dexterity", "Physical focus", "Object manipulation"]
  },
  'Interpersonal': {
    desc: "The capacity to understand and interact effectively with others.",
    learn: "Social interaction, group work, and communication.",
    strengths: ["Empathy", "Leadership", "Mediation", "Teamwork"]
  },
  'Intrapersonal': {
    desc: "The capacity to understand oneself and one's thoughts and feelings.",
    learn: "Self-reflection, independent study, and goal-setting.",
    strengths: ["Self-awareness", "Reflection", "Strategic planning", "Independence"]
  },
  'Naturalistic': {
    desc: "The ability to identify and classify patterns in nature.",
    learn: "Interaction with the natural world and observation.",
    strengths: ["Environmental awareness", "Observation", "Biological classification"]
  },
  'Existential': {
    desc: "The sensitivity and capacity to tackle deep questions about human existence.",
    learn: "Philosophical discussion and exploring deep concepts.",
    strengths: ["Abstract thinking", "Ethical reasoning", "Holistic perspective"]
  }
};

export const CAREER_MAPPING: Record<AssessmentCategory, CareerInfo[]> = {
  // PIA & General
  'Technology': [
    { title: "Software Engineer", description: "Design, develop, and maintain software systems.", avgSalary: "KES 120,000", demandLevel: "High", skills: ["Coding", "System Design"], subjects: ["Math", "Physics", "Computer Studies"], universities: ["University of Nairobi", "JKUAT", "Strathmore"], tvetOptions: ["Technical University of Kenya", "Mombasa Polytechnic"], whyFit: "Matches your strong analytical skills and interest in creating digital solutions." },
    { title: "Data Scientist", description: "Analyze and interpret complex data to help organizations make decisions.", avgSalary: "KES 150,000", demandLevel: "High", skills: ["Statistics", "Python"], subjects: ["Math", "Business"], universities: ["Strathmore", "UoN"], tvetOptions: [], whyFit: "Leverages your ability to find patterns and enjoy logical reasoning." },
    { title: "AI Engineer", description: "Build and deploy artificial intelligence models.", avgSalary: "KES 180,000", demandLevel: "High", skills: ["Machine Learning", "Algorithms"], subjects: ["Math", "Physics"], universities: ["JKUAT", "UoN"], tvetOptions: [], whyFit: "Perfect for your curiosity in future-tech and high technical ability." }
  ],
  'Medicine & Health': [
    { title: "Doctor", description: "Diagnose and treat illnesses and injuries.", avgSalary: "KES 200,000", demandLevel: "High", skills: ["Diagnosis", "Compassion"], subjects: ["Biology", "Chemistry", "Physics"], universities: ["UoN", "Kenyatta University", "Moi University"], tvetOptions: [], whyFit: "Connects your passion for helping people with your science aptitude." },
    { title: "Nurse", description: "Provide care and support to patients.", avgSalary: "KES 80,000", demandLevel: "High", skills: ["Patient Care", "Medical Knowledge"], subjects: ["Biology", "Chemistry"], universities: ["KMTC", "UoN", "KU"], tvetOptions: ["Kenya Medical Training College"], whyFit: "Utilizes your strong social skills and desire for meaningful community service." }
  ],
  'Engineering': [
    { title: "Civil Engineer", description: "Design and oversee infrastructure projects.", avgSalary: "KES 110,000", demandLevel: "High", skills: ["Project Management", "Design"], subjects: ["Math", "Physics", "Chemistry"], universities: ["UoN", "JKUAT", "KU"], tvetOptions: ["TUK", "Technical University of Mombasa"], whyFit: "Combines your practical building interest with mathematical precision." }
  ],
  'Business': [
    { title: "Entrepreneur", description: "Start and manage your own business ventures.", avgSalary: "Variable", demandLevel: "Medium", skills: ["Risk Taking", "Leadership"], subjects: ["Business Studies", "Math"], universities: ["Strathmore", "UoN", "KU"], tvetOptions: [], whyFit: "Ideal for your leadership traits and passion for inventing solutions." }
  ],
  'Agriculture': [
    { title: "Agronomist", description: "Expert in soil management and crop production.", avgSalary: "KES 85,000", demandLevel: "High", skills: ["Soil Science", "Crop Protection"], subjects: ["Agriculture", "Biology", "Chemistry"], universities: ["Egerton", "JKUAT", "UoN"], tvetOptions: ["Bukura Agricultural College"], whyFit: "Syncs with your love for the outdoors and interest in food security." }
  ],
  'Education': [
    { title: "Teacher", description: "Educate and inspire students in specific subjects.", avgSalary: "KES 50,000", demandLevel: "High", skills: ["Teaching", "Patience"], subjects: ["Subject of choice"], universities: ["KU", "UoN", "CUEA"], tvetOptions: ["Teacher Training Colleges"], whyFit: "Reflects your passion for mentoring and clear communication." }
  ],
  'Law': [
    { title: "Lawyer", description: "Provide legal advice and representation.", avgSalary: "KES 150,000", demandLevel: "High", skills: ["Advocacy", "Research"], subjects: ["English", "History"], universities: ["UoN", "Strathmore", "KU"], tvetOptions: ["Kenya School of Law"], whyFit: "Matches your value for justice and skill in logical debate." }
  ],
  'Arts & Media': [
    { title: "Graphic Designer", description: "Create visual concepts to communicate ideas.", avgSalary: "KES 60,000", demandLevel: "High", skills: ["Adobe Suite", "Creativity"], subjects: ["Fine Art", "Computer Studies"], universities: ["UoN", "KU", "Technical University of Kenya"], tvetOptions: ["Nairobi Institute of Technology"], whyFit: "Excellent for your creative expression and visual intelligence." }
  ],
  // MI Specific or mapped
  'Linguistic': [
    { title: "Journalist", description: "Report news and write articles for various media.", avgSalary: "KES 70,000", demandLevel: "Medium", skills: ["Writing", "Investigation"], subjects: ["English", "History"], universities: ["Daystar", "UoN", "KU"], tvetOptions: ["KIMC"], whyFit: "Uses your linguistic strength to tell important stories." }
  ],
  'Logical-Mathematical': [
    { title: "Actuary", description: "Evaluate financial risks using math and statistics.", avgSalary: "KES 160,000", demandLevel: "High", skills: ["Math", "Risk Assessment"], subjects: ["Math"], universities: ["JKUAT", "UoN"], tvetOptions: [], whyFit: "Demands the high-level logical reasoning you possess." }
  ],
  'Spatial': [
    { title: "Architect", description: "Design buildings and structures.", avgSalary: "KES 110,000", demandLevel: "High", skills: ["Design", "Visualization"], subjects: ["Math", "Physics", "Fine Art"], universities: ["UoN", "JKUAT"], tvetOptions: ["TUK"], whyFit: "Your spatial visualization makes you a natural designer." }
  ],
  'Musical': [
    { title: "Sound Engineer", description: "Record and mix audio for various media.", avgSalary: "KES 75,000", demandLevel: "Medium", skills: ["Audio Mixing", "Acoustics"], subjects: ["Physics"], universities: ["Kenyatta University"], tvetOptions: ["KIMC"], whyFit: "Leverages your acute audio sensitivity." }
  ],
  'Bodily-Kinesthetic': [
    { title: "Pilot", description: "Operate aircraft for commercial or private use.", avgSalary: "KES 250,000", demandLevel: "High", skills: ["Coordination", "Decision Making"], subjects: ["Physics", "Math", "English"], universities: ["Kenya School of Flying"], tvetOptions: [], whyFit: "Requires the coordination and physical focus you've shown." }
  ],
  'Interpersonal': [
    { title: "Counselor", description: "Provide emotional and mental support.", avgSalary: "KES 65,000", demandLevel: "High", skills: ["Empathy", "Listening"], subjects: ["English", "Religious Education"], universities: ["CUEA", "KU"], tvetOptions: [], whyFit: "Perfect for your high empathy and interpersonal skills." }
  ],
  'Intrapersonal': [
    { title: "Psychologist", description: "Study human mind and behavior.", avgSalary: "KES 90,000", demandLevel: "High", skills: ["Analysis", "Patience"], subjects: ["Biology", "English"], universities: ["USIU", "KU"], tvetOptions: [], whyFit: "Suits your reflective and self-aware nature." }
  ],
  'Naturalistic': [
    { title: "Wildlife Biologist", description: "Study animals and their ecosystems.", avgSalary: "KES 85,000", demandLevel: "Medium", skills: ["Observation", "Research"], subjects: ["Biology", "Geography"], universities: ["KU", "Moi University"], tvetOptions: [], whyFit: "Your connection to nature is key to this role." }
  ],
  'Existential': [
    { title: "Diplomat", description: "Represent the country in international relations.", avgSalary: "KES 180,000", demandLevel: "Medium", skills: ["Negotiation", "Cultural Intelligence"], subjects: ["International Relations", "History"], universities: ["USIU", "UoN"], tvetOptions: [], whyFit: "Leverages your deep understanding of global ethics." }
  ],
};

export const PATHWAY_MAPPING: Record<AssessmentCategory, CBEPathway> = {
  'Technology': 'STEM',
  'Engineering': 'STEM',
  'Medicine & Health': 'STEM',
  'Agriculture': 'STEM',
  'Logical-Mathematical': 'STEM',
  'Spatial': 'Arts & Sports',
  'Musical': 'Arts & Sports',
  'Bodily-Kinesthetic': 'Arts & Sports',
  'Arts & Media': 'Arts & Sports',
  'Education': 'Social Sciences',
  'Business': 'Social Sciences',
  'Law': 'Social Sciences',
  'Linguistic': 'Social Sciences',
  'Interpersonal': 'Social Sciences',
  'Intrapersonal': 'Social Sciences',
  'Naturalistic': 'STEM',
  'Existential': 'Social Sciences',
};
