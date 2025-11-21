
import { Professor, Grade } from './types';

export const POSITIVE_TAGS = [
  "Python Friendly", "Live Coding", "High-Tech Setup", "Industry Veteran", "Certifiable Skills", "Considerate Deadlines", "Open Notes", "Auto-Checked Code", "Capstone Expert", "AI Allowed", "Clear Criteria", "Engaging Lectures", "Curved Grading"
];

export const NEGATIVE_TAGS = [
  "Paper Exams", "Terror Prof", "Strict on Syntax", "Legacy Tech", "Slow Internet", "Monotone", "No IDE Allowed", "Group Project Heavy", "Attendance Strict", "Unclear Grading"
];

export const NEUTRAL_TAGS = [
  "Cisco Packet Tracer", "Math Heavy", "Self-Study Heavy", "Quarterm Pacing", "Recitation", "Board Exam Focused", "Blended Learning", "Fast Paced", "High Standards"
];

export const UNIVERSITIES = [
  "Mapúa University - Makati",
  "Mapúa University - Intramuros",
  "Malayan Colleges Laguna",
  "Mapúa Malayan Mindanao"
];

// High Fidelity Logo Data URI (Acts as a static asset)
export const SOIT_LOGO_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUwIDUwIEwyNSAyNSBMNTAgMCBMNzUgMjVaIiBmaWxsPSIjRjNDNjIzIi8+PHBhdGggZD0iTTUwIDUwIEw3NSA3NSBMNTAgMTAwIEwyNSA3NVoiIGZpbGw9IiNGM0M2MjMiLz48cGF0aCBkPSJNNTAgNTAgTDc1IDI1IEwxMDAgNTAgTDc1IDc1WiIgZmlsbD0iI0MwMjYyRSIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iNTAiIHI9IjEyIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik02MyA1MCBRNzUgMzggODcgNTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik02MyA1MCBRNzUgNjIgODcgNTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik03NSAzOCBRNjggNTAgNzUgNjIiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik03NSAzOCBRODIgNTAgNzUgNjIiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik01MCA1MCBMMjUgNzUgTDAgNTAgTDI1IDI1WiIgZmlsbD0iI2UyZThmMCIvPjxwYXRoIGQ9Ik0yNSAyNSBMMTIuNSAzNy41IEwyNSA1MCBMMzcuNSAzNy41WiIgZmlsbD0iI0MwMjYyRSIvPjxwYXRoIGQ9Ik0xMi41IDM3LjUgTDAgNTAgTDEyLjUgNjIuNSBMMjUgNTBaIiBmaWxsPSIjRjNDNjIzIi8+PHBhdGggZD0iTTI1IDUwIEwxMi41IDYyLjUgTDI1IDc1IEwzNy41IDYyLjVaIiBmaWxsPSIjNjQ3NDhiIi8+PHBhdGggZD0iTTM3LjUgMzcuNSBMMjUgNTAgTDM3LjUgNjIuNSBMNTAgNTBaIiBmaWxsPSIjQzAyNjJFIi8+PC9zdmc+";

// --- MOCK DATA GENERATION HELPERS ---

const MOCK_COMMENTS = [
  "One of the best profs in SOIT! Explains concepts very clearly and makes sure everyone understands.",
  "Very considerate with deadlines. The workload is manageable even with the quarterm pacing.",
  "Highly recommended! The exams are fair and based on the lectures. Just study the slides.",
  "A bit strict with attendance, but you will learn a lot. Very knowledgeable about the industry.",
  "Classes are fun and engaging. Uses modern tools and allows AI for assistance if cited properly.",
  "Great mentor for Capstone. Gives very practical advice and constructive feedback.",
  "Explains complex programming concepts in a simple way. Very beginner-friendly.",
  "Tests are challenging but they really test your understanding. Curves grades if the batch average is low.",
  "Very approachable. You can ask questions anytime via Teams and he/she replies fast.",
  "Solid choice. Straightforward teaching style and fair grading system.",
  "Lectures are recorded so you can rewatch them. Very helpful for review.",
  "Actually codes during class instead of just reading slides. Super helpful."
];

const MOCK_DEPARTMENTS = [
  "Computer Science", "Information Technology", "Information Systems", "Data Analytics", "Network Security", "Application Dev"
];

const ADDITIONAL_FACULTY = [
    "Arciaga, Ronald L.", "Dadigan, Robert M.", "Gabriel, Antonette D.", 
    "Isip, Cheryl Mari M.", "Layno, Renilda S.", "Resuello, Geldof B.", 
    "Rey, William P.", "Sedilla, Raymond B.", "Serrano, Elcid A.", 
    "Tomas, Mary Christine A", "Torres, William T.", "Villaluz, Alberto C.",
    "Acorda, Erwin E.", "Costales, Jefferson A.", "Diamante, John Christian S.",
    "Dimaunahan, Ericson D.", "Doma Jr., Bonifacio T.", "Marayag, Vida Marie P.",
    "Prepotente Jr., Francisco A.", "Aquino, Don Angelo S.", "Ballenas, Riza Mae A.",
    "Basinillo, Andrea Ranaika B.", "Bejasa, Warren P.", "Bernardo, Ronaldo Q.",
    "Cacanindin, Marion S.", "Camus, Rosette Eira E.", "Deveza, Miguel Paulo P.",
    "Fran, Bon Ryan F.", "Gabriel, Leopoldo T.", "Guinto, Martin Joseph O.",
    "Lascano, Samuel John Marvin B.", "San Juan, Ken Robert D.", "Santos, Natalie Bridgette D.",
    "Tabian, Carl Jayson", "Vega, Asaph F.", "Vergonio, Frances Neele B.",
    "Bautista, Maylyn N.", "Devaraj, Madhavi"
];

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomScore = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomSubset = <T>(arr: T[], count: number): T[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const GENERATED_PROFESSORS: Professor[] = ADDITIONAL_FACULTY.map((name, index) => {
    const numReviews = Math.floor(Math.random() * 3) + 2; // 2 to 4 reviews per prof
    
    const reviews = Array.from({ length: numReviews }).map((_, i) => {
        const quality = getRandomScore(4.0, 5.0); // Skewed to good reviews as requested
        const difficulty = getRandomScore(2.5, 4.0);
        const grade = Math.random() > 0.3 ? Grade.A : Grade.B;

        return {
            id: `gen-rev-${index}-${i}`,
            courseCode: getRandom(['CS101', 'IT110', 'WEB102', 'NET101', 'DATA101', 'MOB101', 'SEC101']),
            semester: getRandom(['1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter']),
            year: getRandom([2023, 2024]),
            gradeReceived: grade,
            qualityRating: quality,
            difficultyRating: difficulty,
            wouldTakeAgain: true,
            tags: getRandomSubset(POSITIVE_TAGS, 2),
            comment: getRandom(MOCK_COMMENTS),
            helpfulCount: Math.floor(Math.random() * 30) + 1,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]
        };
    });

    return {
        id: `gen-auth-${index}`,
        name: name,
        department: getRandom(MOCK_DEPARTMENTS),
        university: 'Mapúa University - Makati',
        avatarUrl: '',
        reviews: reviews
    };
});

export const INITIAL_PROFESSORS: Professor[] = [
  {
    id: '1',
    name: 'Balan, Ariel Kelly D.',
    department: 'Computer Science',
    university: 'Mapúa University - Makati',
    avatarUrl: '',
    reviews: [
      {
        id: 'r1',
        courseCode: 'CSS124',
        semester: '1st Quarter',
        year: 2023,
        gradeReceived: Grade.A,
        qualityRating: 5,
        difficultyRating: 3,
        wouldTakeAgain: true,
        tags: ['Python Friendly', 'Industry Veteran', 'Auto-Checked Code'],
        comment: "Uses an automated checker for coding exercises so you know your grade instantly. Very logical approach to algorithms.",
        helpfulCount: 42,
        createdAt: '2023-10-15'
      },
      {
        id: 'r2',
        courseCode: 'CS101',
        semester: '3rd Quarter',
        year: 2023,
        gradeReceived: Grade.B,
        qualityRating: 4.5,
        difficultyRating: 4,
        wouldTakeAgain: true,
        tags: ['Live Coding', 'Open Notes'],
        comment: "He codes live during lectures which helps a lot. Exams are open notes but time pressure is real due to the quarterm system.",
        helpfulCount: 12,
        createdAt: '2024-02-20'
      }
    ]
  },
  {
    id: '2',
    name: 'Blancaflor, Eric B.',
    department: 'Network Security',
    university: 'Mapúa University - Makati',
    avatarUrl: '',
    reviews: [
      {
        id: 'r3',
        courseCode: 'IT131',
        semester: '2nd Quarter',
        year: 2023,
        gradeReceived: Grade.B,
        qualityRating: 4.0,
        difficultyRating: 5,
        wouldTakeAgain: true,
        tags: ['Cisco Packet Tracer', 'Terror Prof', 'Strict on Syntax'],
        comment: "Expects you to memorize Cisco commands by heart. Very strict but makes sure you are ready for the field.",
        helpfulCount: 55,
        createdAt: '2023-12-05'
      }
    ]
  },
  {
    id: '3',
    name: 'Fuentes, Gloren S.',
    department: 'Application Dev',
    university: 'Mapúa University - Makati',
    avatarUrl: '',
    reviews: [
      {
        id: 'r4',
        courseCode: 'WEB101',
        semester: '4th Quarter',
        year: 2023,
        gradeReceived: Grade.A,
        qualityRating: 5,
        difficultyRating: 2,
        wouldTakeAgain: true,
        tags: ['High-Tech Setup', 'Certifiable Skills', 'Considerate Deadlines'],
        comment: "Best prof for Web Dev! She teaches the latest React hooks. Very kind and approachable.",
        helpfulCount: 120,
        createdAt: '2023-06-10'
      }
    ]
  },
  {
    id: '4',
    name: 'Intal, Grace Lorraine D.',
    department: 'Data Analytics',
    university: 'Mapúa University - Makati',
    avatarUrl: '',
    reviews: [
      {
        id: 'r5',
        courseCode: 'DATA101',
        semester: '1st Quarter',
        year: 2023,
        gradeReceived: Grade.B,
        qualityRating: 4.5,
        difficultyRating: 5,
        wouldTakeAgain: true,
        tags: ['Math Heavy', 'Python Friendly'],
        comment: "She is a genius at Statistics but you need to brush up on your Calculus. Allows Python for the final project.",
        helpfulCount: 30,
        createdAt: '2023-09-20'
      }
    ]
  },
  {
    id: '5',
    name: 'Samonte, Mary Jane C.',
    department: 'Information Systems',
    university: 'Mapúa University - Makati',
    avatarUrl: '',
    reviews: [
      {
        id: 'r6',
        courseCode: 'IS201',
        semester: '2nd Quarter',
        year: 2023,
        gradeReceived: Grade.A,
        qualityRating: 5,
        difficultyRating: 1,
        wouldTakeAgain: true,
        tags: ['Considerate Deadlines', 'Capstone Expert', 'Industry Veteran'],
        comment: "Gives very practical advice on Capstone projects. She really helps you refine your documentation.",
        helpfulCount: 80,
        createdAt: '2023-11-18'
      }
    ]
  },
  {
    id: '6',
    name: 'De Goma, Joel C.',
    department: 'Computer Engineering',
    university: 'Mapúa University - Makati',
    avatarUrl: '',
    reviews: [
      {
        id: 'r7',
        courseCode: 'CPE101',
        semester: '1st Quarter',
        year: 2023,
        gradeReceived: Grade.B,
        qualityRating: 3.8,
        difficultyRating: 5,
        wouldTakeAgain: true,
        tags: ['Paper Exams', 'Strict on Syntax', 'Board Exam Focused'],
        comment: "Old school. We write Assembly code on yellow paper. Strict but fair.",
        helpfulCount: 65,
        createdAt: '2023-09-10'
      }
    ]
  },
  {
    id: '7',
    name: 'Pascua, Cristina A.',
    department: 'Game Development',
    university: 'Mapúa University - Makati',
    avatarUrl: '',
    reviews: [
      {
        id: 'r8',
        courseCode: 'GAM110',
        semester: '3rd Quarter',
        year: 2024,
        gradeReceived: Grade.A,
        qualityRating: 4.8,
        difficultyRating: 4,
        wouldTakeAgain: true,
        tags: ['High-Tech Setup', 'Live Coding', 'Considerate Deadlines'],
        comment: "Uses Unity Enterprise. Her assets are industry standard. Very fun class but heavy workload.",
        helpfulCount: 25,
        createdAt: '2024-03-15'
      }
    ]
  },
  {
    id: '8',
    name: 'Tomas, John Paul Q.',
    department: 'Information Technology',
    university: 'Mapúa University - Makati',
    avatarUrl: '',
    reviews: [
      {
        id: 'r10',
        courseCode: 'IT105',
        semester: '4th Quarter',
        year: 2024,
        gradeReceived: Grade.B,
        qualityRating: 4.2,
        difficultyRating: 3,
        wouldTakeAgain: true,
        tags: ['Self-Study Heavy', 'Quarterm Pacing', 'Blended Learning'],
        comment: "Mostly asynchronous via Blackboard. You watch videos and submit code. Good if you are a working student.",
        helpfulCount: 42,
        createdAt: '2024-05-15'
      }
    ]
  },
  ...GENERATED_PROFESSORS
];
