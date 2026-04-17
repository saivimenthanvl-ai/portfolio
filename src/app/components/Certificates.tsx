import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const certificates = [
  {
    title: 'Introduction to Generative AI Outskill',
    date: 'November 2025',
    highlights: [
      'Gaining hands-on exposure to modern generative AI concepts, LLM capabilities, and real-world AI solution design',
      'Participated in a 2-Day AI Mastermind Workshop, developing practical problem-solving skills and positioning as a go-to resource for AI-driven solutions'
    ]
  },
  {
    title: 'Tata Group Data Analytics Job Simulation on Forage',
    date: 'November 2025',
    highlights: [
      'Completed a job simulation involving AI-powered data analytics and strategy development for the Financial Services team at Tata iQ',
      'Conducted exploratory data analysis (EDA) using GenAI tools to assess data quality, identify risk indicators, and structure insights for predictive modelling',
      'Proposed and drafted an initial no-code predictive modelling framework to assess customer delinquency risk, leveraging GenAI for structured model logic and evaluation criteria',
      'Designed an AI-driven collections strategy leveraging agentic AI and automation, incorporating ethical AI principles, regulatory compliance, and scalable implementation frameworks'
    ]
  },
  {
    title: 'AWS Cloud Practitioner Essentials',
    date: 'September 2025',
    highlights: [
      'Completed foundational AWS cloud training covering core services, global infrastructure, security, pricing, and architectural best practices',
      'Demonstrated understanding of AWS compute models (EC2, serverless concepts) and how AWS enables scalable, highly available applications',
      'Gained hands-on knowledge of AWS networking and storage concepts, including VPC fundamentals, Amazon S3 storage tiers, and data lifecycle policies',
      'Learned AWS database services and migration strategies, supporting data movement and modernization use cases',
      'Acquired working knowledge of AWS AI/ML and Generative AI services, ETL data pipelines, and their role in cloud-native analytics',
      'Understood AWS security, monitoring, compliance, and governance services for protecting data and responding to incidents',
      'Studied AWS pricing models, support plans, and the six pillars of the AWS Well-Architected Framework'
    ]
  },
  {
    title: 'AWS Certified Machine Learning Specialty',
    date: 'September 2025',
    highlights: [
      'Completed advanced training on end-to-end machine learning pipelines on AWS, from data ingestion to model deployment at scale',
      'Gained exposure to AWS ML and AI services for NLP, speech, and conversational systems (e.g., Amazon Polly, Amazon Lex)',
      'Learned data warehousing and analytics workflows using Amazon Redshift and Amazon S3 within ML pipelines',
      'Developed understanding of ML system design trade-offs, business-driven ML decision-making, and production deployment considerations',
      'Studied scalable model training, inference, and monitoring patterns in cloud-based machine learning systems'
    ]
  },
  {
    title: 'PwC Switzerland Power BI Job Simulation on Forage',
    date: 'March 2025',
    highlights: [
      'Completed a job simulation where I strengthened my Power BI skills to better understand clients and their data visualisation needs',
      'Demonstrated expertise in data visualization through the creation of Power BI dashboards that effectively conveyed KPIs, showcasing the ability to respond to client requests with well-designed solutions',
      'Strong communication skills reflected in the concise and informative email communication with engagement partners, delivering valuable insights and actionable suggestions based on data analysis',
      'Leveraged analytical problem-solving skills to examine HR data, particularly focusing on gender-related KPIs, and identified root causes for gender balance issues at the executive management level, highlighting a commitment to data-driven decision-making'
    ]
  },
  {
    title: 'Kaggle 5 Day Intrusive Google Agent AI',
    date: 'December 2025',
    highlights: [
      'Focused on designing, building, and evaluating production-ready AI agents',
      'Built an AI Agent Capstone Project addressing a real-world productivity or enterprise use case, with a clear problem–solution pitch and actionable impact',
      'Designed and implemented multi-agent systems (parallel, sequential, and loop-based agents) powered by LLMs',
      'Integrated tools and APIs including custom tools, built-in tools code execution, MCP, and OpenAPI-based integrations',
      'Implemented session and state management, long-term memory, and context engineering techniques',
      'Applied observability and evaluation practices, including logging, tracing, metrics, and agent performance assessment',
      'Published agent code publicly (GitHub / Kaggle Notebooks) and authored a structured technical project write-up articulating business value and impact',
      'Earned Kaggle badge and certificate for successful capstone submission; project eligible for recognition and awards within K 5 AI Agents track'
    ]
  },
  {
    title: 'Deloitte Australia Data Analytics Job Simulation on Forage',
    date: 'January 2026',
    highlights: [
      'Completed a Deloitte job simulation involving data analysis and forensic technology',
      'Created a data dashboard using Tableau',
      'Used Excel to classify data and draw business conclusions'
    ]
  },
  {
    title: 'AWS APAC Solutions Architecture virtual experience program on Forage',
    date: 'January 2026',
    highlights: [
      'Designed and simple and scalable hosting architecture based on Elastic Beanstalk for a client experiencing significant growth and slow response times',
      'Described my proposed architecture in plain language ensuring my client understood how it works and how costs will be calculated for it'
    ]
  },
  {
    title: 'JPMorganChase Software Engineering Job Simulation on Forage',
    date: 'January 2026',
    highlights: [
      'Integrated Kafka into a Spring Boot microservice to consume and deserialize high-volume transaction messages using a configurable topic and embedded Kafka test framework',
      'Implemented user authentication and persistence logic with Spring Data JPA and an H2 SQL database, including entity modelling and balance updates across relational User records',
      'Connected the service to an external REST incentive API using REST Template, processing incentive responses and error-free handling into transactional workflows',
      'Developed a REST endpoint for querying user balances, returning JSON responses through a Spring controller with proper REST design and architectural boundaries',
      'Verified system behaviour using Maven test suites and debugger-driven inspection, ensuring reliability across message ingestion, database operations, and external API interactions'
    ]
  },
  {
    title: 'IBM Dev Day – AI Demystified Hackathon',
    date: 'Jan 29 – Feb 1, 2026',
    highlights: [
      'Built an Agentic AI system for elderly mental-health support during a 3-day IBM hackathon using IBM watsons and Granite LLMs',
      'Designed a multi-agent prompt architecture including intent classification, psychological support, wellness actions, monitoring, and human escalation',
      'Implemented LLM + RAG workflows to generate context-aware, empathetic responses grounded in curated knowledge sources',
      'Developed a Human Escalation Agent with safety guardrails to detect high-risk emotional signals and route conversations appropriately',
      'Applied structured prompt engineering, AI guardrails, and rejection handling to ensure safe handling of sensitive inputs',
      'Prototyped and validated agent flows in watsons Prompt Lab under real-time constraints typical of production AI systems'
    ]
  }
];

export function Certificates() {
  return (
    <section id="certificates" className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Award className="text-slate-900" size={32} />
            <h2 className="text-4xl">Certificates & Achievements</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                    <CardDescription>{cert.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {cert.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <span className="text-slate-600 mt-1">•</span>
                          <span className="text-slate-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
