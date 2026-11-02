// All site content, taken verbatim from the original site (sriyamud.github.io).
const base = import.meta.env.BASE_URL;
const img = (f: string) => `${base}previews/${f}`;

export const CONTACT = {
  email: "smudigonda252@gmail.com",
  github: "https://github.com/sriyamud",
  linkedin: "https://www.linkedin.com/in/saisriyamudigonda/",
};

export const NAME = "Sai Sriya Mudigonda";
export const ROLE = "CTO · Stealth deep tech · Data Engineer · Fremont Group · Masters in DS · UC Berkeley";
export const PORTRAIT = `${base}portrait.jpg`;

export const ABOUT = [
  "I'm CTO at a stealth deep tech company and a data engineer at Fremont Group. Previously at Wells Fargo, I supported enterprise cloud migration from Teradata to GCP across 90+ systems, built reusable API ingestion frameworks in Python, and integrated self-service analytics tools that help business teams make faster decisions.",
  "I'm now completing my Master of Information and Data Science at UC Berkeley (December 2026), and looking to bring that technical foundation into product management and data science — where data and decision-making meet.",
];
export const STACK = ["Python", "SQL", "R", "GCP / BigQuery", "Spark", "Databricks", "PyTorch", "XGBoost", "scikit-learn", "A/B Testing", "Tableau"];

export const EXPERIENCE = [
  {
    title: "CTO",
    org: "Stealth deep tech company",
    when: "Present",
    points: [],
  },
  {
    title: "Data Engineer",
    org: "Fremont Group",
    when: "Present",
    points: [],
  },
  {
    title: "Data Engineer",
    org: "Wells Fargo",
    when: "Previously · from 2023",
    points: [],
  },
];

export const EDUCATION = [
  {
    title: "M.S., Information & Data Science",
    org: "UC Berkeley",
    when: "2025 – Dec 2026",
    points: ["Coursework: Applied ML, ML at Scale, Statistical Methods, Data Engineering, Research Design, Python for Data Science."],
  },
  {
    title: "BS Statistics & BA Economics",
    org: "UC Davis",
    when: "2019–2023",
    points: [
      "Director of Operations, HackDavis (750+ attendees).",
      "President, largest student business org (150+ members).",
      "Lead, OWN IT Women's Leadership Conference.",
      "Managed 10+ research interns in UC Davis Student Government.",
    ],
  },
];

export const PROJECTS = [
  { title: "Predicting Flight Departure Delays at Scale", course: "Machine Learning at Scale", hook: "Distributed ML on 31.7M+ flights — predicting departure delays two hours out, at scale.", stack: ["PySpark", "PyTorch", "scikit-learn", "Databricks", "Python"], preview: img("flight-delay.jpg"), code: "https://github.com/sriyamud/flight-delay-prediction", slides: "https://github.com/sriyamud/flight-delay-prediction/blob/main/presentations/MayD%28el%29ay.pptx.pdf" },
  { title: "Predicting Hospital Readmission for Diabetic Patients", course: "Applied Machine Learning", hook: "Four classifiers on 100K+ EHR records to predict 30-day hospital readmission risk.", stack: ["Python", "scikit-learn", "XGBoost", "Transformers", "pandas"], preview: img("diabetic.jpg"), code: "https://github.com/sriyamud/diabetic-readmission-prediction", slides: "https://github.com/sriyamud/diabetic-readmission-prediction/blob/main/final_project_slides.pdf" },
  { title: "Refugee Movement Analysis with Graph & NoSQL Databases", course: "Data Engineering", hook: "Graph + NoSQL architecture mapping UNHCR refugee flows across 212 countries (2010–2022).", stack: ["Neo4j", "MongoDB", "Redis", "Python", "Cypher"], preview: img("refugee.jpg"), code: "https://github.com/sriyamud/refugee-movement-analysis", slides: "https://github.com/sriyamud/refugee-movement-analysis/blob/main/slides/presentation_datasci205_team4.pdf" },
  { title: "Behind the Charts: Musical Traits & Spotify Popularity", course: "Statistical Methods", hook: "OLS regression on 170K+ Spotify tracks — what actually drives streaming popularity?", stack: ["R", "ggplot2", "stargazer", "sandwich"], preview: img("spotify.jpg"), code: "https://github.com/sriyamud/spotify-popularity-regression", slides: "https://github.com/sriyamud/spotify-popularity-regression/blob/main/DATASCI_203_-_Lab_2_Presentation.pdf" },
  { title: "AI-Driven Financial Tools for Underbanked Communities", course: "Research Design", hook: "Designed a 600-person RCT testing AI financial tools for underbanked communities.", stack: ["Research Design", "Power Analysis", "Survey Methodology"], preview: img("ai-financial.svg"), code: "https://github.com/sriyamud/ai-financial-literacy-research/blob/main/papers/Team2_Unit13_Deliverable3_Final.pdf", slides: "https://github.com/sriyamud/ai-financial-literacy-research/blob/main/presentations/DATASCI201_Team2_Presentation.pdf" },
  { title: "COVID and Crime in Los Angeles", course: "Python for Data Science", hook: "1M+ LAPD records reveal how COVID-19 reshaped crime across 21 LA neighborhoods.", stack: ["Python", "pandas", "matplotlib", "NumPy"], preview: img("la-crime.jpg"), code: "https://github.com/sriyamud/la-crime-covid-analysis", slides: "https://github.com/sriyamud/la-crime-covid-analysis/blob/main/Exploratory%20Analysis%20on%20Crime%20Records%20in%20Los%20Angeles_Slides.pdf" },
];
