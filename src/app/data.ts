const GH = 'https://github.com/saivimenthanvl-ai';

export const profile = {
  name: 'Sai Vimenthan V L',
  role: 'LLM Developer',
  summary:
    'I build language-model systems and the web apps around them. I fine-tune and test LLMs to give reliable, structured answers, and I build full-stack apps with React, Next.js, Supabase and Firebase so people can actually use them.',
  location: 'Chennai, India',
  email: 'saivimenthanvl@gmail.com',
  phone: '+91 7200260670',
  github: GH,
  linkedin: 'https://www.linkedin.com/in/saivimenthanvl-ai/',
};

export const stats = [
  { value: 82400, label: 'Dataset records prepared', suffix: '' },
  { value: 100, label: 'Valid JSON on Qwen3-4B eval', suffix: '%' },
  { value: 92.5, label: 'Exact match (185/200)', suffix: '%' },
  { value: 1.5, label: 'Billion-parameter CLM worked on', suffix: 'B' },
];

export const experience = [
  {
    role: 'LLM Developer',
    company: 'Deffotech AI, Chennai',
    period: 'Apr 2025 – Sep 2026',
    points: [
      'Worked on a proprietary 1.5-billion-parameter causal language model (CLM) for autoregressive next-token prediction, including training, inference, and optimization experiments using Python, Hugging Face Transformers, and RunPod H100 infrastructure.',
      'Developed data preprocessing workflows and a Thanglish-to-Tamil pipeline generating 903 synthetic instruction pairs from 72 Tamil source files; validated dataset consistency with deterministic regeneration checks and implemented Qwen2.5 LoRA training and evaluation scripts.',
    ],
    link: { label: 'thanglish-agent', href: `${GH}/thanglish-agent` },
  },
  {
    role: 'Machine Learning Intern',
    company: 'Tabtree, Chennai',
    period: 'Jul 2023 – Oct 2023',
    points: [
      'Automated document processing with Python, Tesseract OCR and PyPDF2, reducing manual processing time by a reported 70%.',
    ],
  },
  {
    role: 'Machine Learning Intern',
    company: 'Ashtrix Research Centre, Chennai',
    period: 'Feb 2023 – May 2023',
    points: [
      'Built a real-time face-recognition and biometric verification prototype using Python and OpenCV.',
    ],
  },
];

export type Project = {
  title: string;
  kind: string;
  points: string[];
  tags: string[];
  github: string;
  demo?: string;
  metric?: { value: string; label: string };
};

export const projects: Project[] = [
  {
    title: 'ASCRA',
    kind: 'Supply Chain Risk & Logistics AI Prototype',
    metric: { value: '92.5%', label: 'exact match on Qwen3-4B baseline' },
    points: [
      'Qwen3-4B instruction-tuning workflow that extracts supplier communications into standardized 13-field JSON incident records: delays, inventory shortages, quality issues, and operational safety cases.',
      'Prepared 82,400 dataset records (80,000 train / 1,200 validation / 1,200 test) across synthetic incidents, DataCo, GS1 EPCIS, M5 pricing, and tool-safety tasks.',
      'PEFT LoRA (rank 16), 4-bit NF4 QLoRA / bf16 LoRA, answer-only loss masking; baseline reached 100% valid JSON (200/200) and 62.5% (25/40) on unseen synthetic formats.',
    ],
    tags: ['Machine Learning', 'LLM', 'Python'],
    github: `${GH}/ASCRA`,
  },
  {
    title: 'SOS Healthcare',
    kind: 'Emergency & Clinical Workflow Application',
    metric: { value: '3 roles', label: 'patient, doctor, administrator' },
    points: [
      'Multi-role patient, doctor, and administrator interfaces using Next.js, TypeScript, Supabase authentication, PostgreSQL, and Realtime features.',
      'Appointment and emergency workflow API routes, Supabase row-level security policies, and Google Maps nearby-hospital discovery with GPS-radius filtering, distance/ETA displays, and map-view navigation.',
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Google Maps API'],
    github: `${GH}/sos-healthcare`,
    demo: 'https://sos-healthcare.vercel.app',
  },
  {
    title: 'Farmculture',
    kind: 'Agricultural Web Application',
    metric: { value: 'React + Firebase', label: 'farmer dashboards & weather' },
    points: [
      'React/TypeScript and Firebase application with farmer-focused dashboards, authentication, agricultural guidance, and weather-related interfaces.',
    ],
    tags: ['React', 'TypeScript', 'Firebase'],
    github: `${GH}/Farmculture`,
    demo: 'https://farmculture.vercel.app',
  },
  {
    title: 'Virus Electron Microscopy Classification',
    kind: 'Medical image classification',
    metric: { value: '3 classes', label: 'Adenovirus, Cowpox, Dengue sample (31 micrographs)' },
    points: [
      'Transfer-learning experiments for classifying virus electron-microscopy (TEM) images using ImageNet-pretrained MobileNetV2, ResNet-50 and EfficientNetB0 + LSTM models.',
      'One stratified 60/20/20 train, validation and test split with a check that no file appears in two sets; test results are reported with a 95% Wilson interval, plus stratified 5-fold cross-validation of a logistic-regression probe on frozen features.',
    ],
    tags: ['Machine learning', 'Deep learning', 'Python'],
    github: `${GH}/virus_electron_classification`,
  },
];

export const skills = [
  { group: 'Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'] },
  {
    group: 'AI / LLM',
    items: ['PyTorch', 'TensorFlow/Keras', 'Hugging Face Transformers', 'Machine learning', 'Deep learning', 'RAG', 'OpenCV'],
  },
  {
    group: 'Full-stack',
    items: ['React', 'Next.js', 'Node.js/Express', 'FastAPI', 'Firebase', 'Supabase/PostgreSQL', 'REST APIs'],
  },
  { group: 'Infrastructure', items: ['Git', 'GitHub', 'Linux'] },
];

export const education = [
  {
    title: 'B.Tech, Computer Science & Engineering (AI/ML)',
    place: 'Sri Ramachandra Faculty of Engineering and Technology',
    period: '2021 – 2025',
  },
  {
    title: 'Certificate Course, Artificial Intelligence and Data Science',
    place: 'IIT Mandi',
    period: '2025 – 2026',
  },
];

export const certifications = [
  { title: 'AWS Certified Machine Learning – Specialty', meta: 'Sep 2025 · Credential ID: 8D79F3AVR7' },
  { title: 'AWS Cloud Practitioner Essentials', meta: 'Sep 2025' },
  { title: 'Cloud Computing', meta: 'IIT Delhi / SWAYAM · 2025' },
];
