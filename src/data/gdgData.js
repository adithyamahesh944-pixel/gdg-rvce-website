// Data extracted from prototype.html
export const COLORS = {
  b: "#4285F4",
  r: "#EA4335",
  y: "#FBBC05",
  g: "#34A853",
};

export const VERTICALS = [
  ["Machine Learning & AI", "Cpu", COLORS.b, "Models, vision and GenAI builds with Gemini and TensorFlow."],
  ["Cloud Computing", "Cloud", COLORS.r, "Deploy, scale and ship on Google Cloud."],
  ["Open-Source & Development", "Code", COLORS.g, "Web and app projects built in the open."],
  ["Competitive Programming", "Trophy", COLORS.y, "Contests, problem-solving and interview prep."],
  ["Cybersecurity", "Shield", COLORS.r, "CTFs, secure coding and threat basics."],
  ["Research & Projects", "Flask", COLORS.b, "Papers, prototypes and student research."],
  ["Design & Marketing", "Palette", COLORS.y, "Brand, UI and stories that bring people in."],
];

export const MILESTONES = [
  ["2021", "Chapter founded at RVCE"],
  ["2022", "First Cloud Study Jams"],
  ["2023", "First flagship hackathon"],
  ["2024", "Verticals expand across tracks"],
  ["2025", "Open-source projects go public"],
  ["2026", "1,100+ members, The Google Arsenal"],
];

export const CATEGORIES = {
  hack: "Hackathon",
  work: "Workshop & Study Jam",
  talk: "Speaker Session",
};

export const EVENTS = [
  {
    id: 1,
    t: "The Google Arsenal",
    cat: "hack",
    d: "Aug 2026",
    up: 0,
    c: COLORS.b,
    tm: "10:00 AM – 5:00 PM",
    v: "RVCE Main Auditorium",
    tag: ["Dev Tools", "Marketplace", "Challenge"],
    ds: "An interactive dev-tool marketplace challenge. Teams explored Google’s developer tools, picked their arsenal and built against live problem statements.",
  },
  {
    id: 2,
    t: "Under the Floodlights",
    cat: "hack",
    d: "Sep 2026",
    up: 0,
    c: COLORS.y,
    tm: "2:00 PM – 6:00 PM",
    v: "CS Seminar Hall",
    tag: ["AI", "Image Generation", "Challenge"],
    ds: "An AI image challenge: craft prompts, direct visuals and tell the sharpest story under the spotlight.",
  },
  {
    id: 3,
    t: "DevSprint ’26: Ok Google, Build my AI",
    cat: "hack",
    d: "Oct 2026",
    up: 0,
    c: COLORS.g,
    tm: "9:00 AM – 9:00 PM",
    v: "RVCE Innovation Lab",
    tag: ["AI", "Sprint", "Gemini"],
    ds: "A one-day sprint where teams turned an idea into a working AI product with Google’s AI stack.",
  },
  {
    id: 4,
    t: "How to Win a Hackathon",
    cat: "talk",
    d: "Sep 2026",
    up: 0,
    c: COLORS.r,
    tm: "4:00 PM – 5:30 PM",
    v: "Seminar Hall 2",
    tag: ["Speaker Session", "Hackathons", "Career"],
    ds: "Practical lessons on picking a problem, scoping fast, building a demo and pitching it clearly.",
  },
  {
    id: 5,
    t: "TechTank",
    cat: "hack",
    d: "Jan 2027",
    up: 1,
    c: COLORS.r,
    tm: "9:00 AM – 6:00 PM",
    v: "RVCE Campus, Bengaluru",
    tag: ["State-wide", "Shark Tank", "Startups"],
    ds: "A state-wide Shark Tank-style hackathon. Build a product, pitch it to a panel and defend your idea.",
  },
  {
    id: 6,
    t: "Google Cloud Study Jams",
    cat: "work",
    d: "Dec 2026",
    up: 1,
    c: COLORS.b,
    tm: "10:00 AM – 1:00 PM",
    v: "Online + RVCE Labs",
    tag: ["Google Cloud", "Hands-on", "Beginner friendly"],
    ds: "Guided, hands-on labs on Google Cloud with mentors on hand. Bring a laptop and learn by building.",
  },
];

export const TEAM = [
  ["Dr. Meira Iyer", "Faculty Advisor", "org", "Organizers", COLORS.y],
  ["Ananya Rao", "GDGoC Organizer", "org", "Organizers", COLORS.b],
  ["Rohan Shetty", "GDGoC Organizer", "org", "Organizers", COLORS.g],
  ["Karthik Nair", "Cloud Lead", "ai", "AI/ML & Cloud", COLORS.r],
  ["Priya Menon", "AIML Lead", "ai", "AI/ML & Cloud", COLORS.b],
  ["Arjun Bhat", "Development Lead", "dev", "Dev & Open Source", COLORS.g],
  ["Sneha Kulkarni", "Open Source Lead", "dev", "Dev & Open Source", COLORS.g],
  ["Vikram Reddy", "CP Lead", "cp", "CP & Cybersecurity", COLORS.y],
  ["Isha Gupta", "Cybersecurity Lead", "cp", "CP & Cybersecurity", COLORS.r],
  ["Rahul Desai", "Research Lead", "res", "Research & Events", COLORS.b],
  ["Divya Hegde", "Events Lead", "res", "Research & Events", COLORS.y],
];

