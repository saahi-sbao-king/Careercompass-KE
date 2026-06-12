
import { Question, IntelligenceType, CBEPathway, CareerInfo } from './types';

export const QUESTIONS: Question[] = [
  // Linguistic
  { id: 1, text: "I enjoy reading books and writing stories or poems.", type: "Linguistic" },
  { id: 2, text: "I am good at using words to explain complex ideas.", type: "Linguistic" },
  { id: 3, text: "I find it easy to remember jokes and stories.", type: "Linguistic" },
  { id: 4, text: "I enjoy word games like crosswords or Scrabble.", type: "Linguistic" },
  { id: 5, text: "Learning a new language is exciting for me.", type: "Linguistic" },
  // Logical-Mathematical
  { id: 6, text: "I enjoy solving math problems and puzzles.", type: "Logical-Mathematical" },
  { id: 7, text: "I like to understand how things work through logic.", type: "Logical-Mathematical" },
  { id: 8, text: "I prefer clear, organized plans over spontaneous ones.", type: "Logical-Mathematical" },
  { id: 9, text: "I am interested in scientific discoveries and experiments.", type: "Logical-Mathematical" },
  { id: 10, text: "I can easily spot patterns in data or situations.", type: "Logical-Mathematical" },
  // Spatial
  { id: 11, text: "I can easily visualize objects from different angles.", type: "Spatial" },
  { id: 12, text: "I enjoy drawing, painting, or sculpting.", type: "Spatial" },
  { id: 13, text: "I have a good sense of direction and rarely get lost.", type: "Spatial" },
  { id: 14, text: "I am interested in interior design or architecture.", type: "Spatial" },
  { id: 15, text: "I prefer information presented in charts or diagrams.", type: "Spatial" },
  // Bodily-Kinesthetic
  { id: 16, text: "I enjoy physical activities like sports or dance.", type: "Bodily-Kinesthetic" },
  { id: 17, text: "I learn best by doing something rather than reading about it.", type: "Bodily-Kinesthetic" },
  { id: 18, text: "I find it hard to sit still for long periods.", type: "Bodily-Kinesthetic" },
  { id: 19, text: "I am good at fixing things with my hands.", type: "Bodily-Kinesthetic" },
  { id: 20, text: "I have good coordination and physical balance.", type: "Bodily-Kinesthetic" },
  // Musical
  { id: 21, text: "I can easily recognize different musical instruments.", type: "Musical" },
  { id: 22, text: "I often find myself humming or tapping to a rhythm.", type: "Musical" },
  { id: 23, text: "I find it easy to remember melodies and songs.", type: "Musical" },
  { id: 24, text: "I am sensitive to the sounds in my environment.", type: "Musical" },
  { id: 25, text: "I enjoy playing an instrument or singing.", type: "Musical" },
  // Interpersonal
  { id: 26, text: "I enjoy working in groups and teams.", type: "Interpersonal" },
  { id: 27, text: "People often come to me for advice or support.", type: "Interpersonal" },
  { id: 28, text: "I am good at sensing what others are feeling.", type: "Interpersonal" },
  { id: 29, text: "I enjoy social gatherings and meeting new people.", type: "Interpersonal" },
  { id: 30, text: "I am effective at resolving conflicts between people.", type: "Interpersonal" },
  // Intrapersonal
  { id: 31, text: "I enjoy spending time alone reflecting on my thoughts.", type: "Intrapersonal" },
  { id: 32, text: "I have a clear understanding of my strengths and weaknesses.", type: "Intrapersonal" },
  { id: 33, text: "I prefer working on independent projects.", type: "Intrapersonal" },
  { id: 34, text: "I often set personal goals and track my progress.", type: "Intrapersonal" },
  { id: 35, text: "I am very aware of my own emotions and motivations.", type: "Intrapersonal" },
  // Naturalist
  { id: 36, text: "I feel a strong connection to nature and the outdoors.", type: "Naturalist" },
  { id: 37, text: "I enjoy gardening or caring for pets.", type: "Naturalist" },
  { id: 38, text: "I can easily identify different types of plants or animals.", type: "Naturalist" },
  { id: 39, text: "I am concerned about environmental issues.", type: "Naturalist" },
  { id: 40, text: "I prefer hiking or camping over city activities.", type: "Naturalist" },
  // Existential
  { id: 41, text: "I often think about the 'big questions' of life and death.", type: "Existential" },
  { id: 42, text: "I am interested in philosophy and spirituality.", type: "Existential" },
  { id: 43, text: "I seek to find deep meaning in my daily experiences.", type: "Existential" },
  { id: 44, text: "I am curious about the universe and our place in it.", type: "Existential" },
  { id: 45, text: "I value wisdom and understanding over material success.", type: "Existential" },
];

export const CAREER_MAPPING: Record<IntelligenceType, CareerInfo[]> = {
  Linguistic: [
    { title: "Journalist", description: "Reporting news and stories.", avgSalary: "KES 60,000 - 150,000", demandScore: 7, skills: ["Writing", "Interviewing"] },
    { title: "Lawyer", description: "Legal representation and advocacy.", avgSalary: "KES 100,000 - 500,000", demandScore: 8, skills: ["Public Speaking", "Logic"] }
  ],
  "Logical-Mathematical": [
    { title: "Software Engineer", description: "Building digital solutions.", avgSalary: "KES 80,000 - 350,000", demandScore: 9, skills: ["Coding", "Problem Solving"] },
    { title: "Data Analyst", description: "Interpreting complex data patterns.", avgSalary: "KES 70,000 - 200,000", demandScore: 9, skills: ["Statistics", "Visualization"] }
  ],
  Spatial: [
    { title: "Architect", description: "Designing buildings and structures.", avgSalary: "KES 90,000 - 250,000", demandScore: 7, skills: ["Design", "AutoCAD"] },
    { title: "Graphic Designer", description: "Visual communication and branding.", avgSalary: "KES 40,000 - 120,000", demandScore: 8, skills: ["Creativity", "Photoshop"] }
  ],
  "Bodily-Kinesthetic": [
    { title: "Surgeon", description: "Performing precise medical operations.", avgSalary: "KES 200,000 - 800,000", demandScore: 9, skills: ["Precision", "Medical Knowledge"] },
    { title: "Professional Athlete", description: "Competing in sports events.", avgSalary: "KES 30,000 - 1M+", demandScore: 6, skills: ["Agility", "Endurance"] }
  ],
  Musical: [
    { title: "Music Producer", description: "Creating and arranging music.", avgSalary: "KES 50,000 - 300,000", demandScore: 6, skills: ["Audio Mixing", "Creativity"] },
    { title: "Music Teacher", description: "Educating others in music theory.", avgSalary: "KES 40,000 - 100,000", demandScore: 7, skills: ["Patience", "Theory"] }
  ],
  Interpersonal: [
    { title: "Diplomat", description: "Representing the country internationally.", avgSalary: "KES 150,000 - 500,000", demandScore: 7, skills: ["Negotiation", "Cultural Intelligence"] },
    { title: "HR Manager", description: "Managing people and workplace culture.", avgSalary: "KES 80,000 - 250,000", demandScore: 8, skills: ["Empathy", "Management"] }
  ],
  Intrapersonal: [
    { title: "Psychologist", description: "Counseling and mental health support.", avgSalary: "KES 70,000 - 200,000", demandScore: 8, skills: ["Empathy", "Research"] },
    { title: "Entrepreneur", description: "Starting and leading a business.", avgSalary: "Variable", demandScore: 7, skills: ["Resilience", "Self-Motivation"] }
  ],
  Naturalist: [
    { title: "Environmental Scientist", description: "Studying and protecting nature.", avgSalary: "KES 60,000 - 180,000", demandScore: 9, skills: ["Fieldwork", "Biology"] },
    { title: "Vet Surgeon", description: "Animal healthcare and surgery.", avgSalary: "KES 80,000 - 250,000", demandScore: 8, skills: ["Compassion", "Science"] }
  ],
  Existential: [
    { title: "Philosopher/Theologian", description: "Academic research on existence.", avgSalary: "KES 50,000 - 150,000", demandScore: 5, skills: ["Critical Thinking", "Ethics"] },
    { title: "Policy Researcher", description: "Analyzing societal impacts and ethics.", avgSalary: "KES 90,000 - 220,000", demandScore: 7, skills: ["Analysis", "Ethics"] }
  ]
};

export const PATHWAY_MAPPING: Record<IntelligenceType, CBEPathway> = {
  Linguistic: "Social Sciences",
  "Logical-Mathematical": "STEM",
  Spatial: "Arts & Sports",
  "Bodily-Kinesthetic": "Arts & Sports",
  Musical: "Arts & Sports",
  Interpersonal: "Social Sciences",
  Intrapersonal: "Social Sciences",
  Naturalist: "STEM",
  Existential: "Social Sciences"
};
