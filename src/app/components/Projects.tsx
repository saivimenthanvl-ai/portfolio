import { motion } from "motion/react";
import { Rocket, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

const projects = [
  {
  title: "Farmculture",
  link: "https://github.com/saivimenthanvl-ai/farmculture",
  description:
    "An AI-powered smart farming assistant that helps farmers with real-time weather insights, crop guidance, disease detection, and multilingual support for better agricultural decision-making and sustainable productivity.",
  achievements: [
    "Integrated real-time weather updates to support irrigation, sowing, and harvesting decisions",
    "Built a crop recommendation system based on soil type, season, and climatic conditions",
    "Enabled pest and disease alert workflows to help farmers take preventive action early",
    "Implemented image-based plant disease detection using AI models for faster field diagnosis",
    "Designed a multilingual voice and chat interface to make the platform accessible to diverse farming communities",
    "Added soil and crop health analysis features to suggest fertilizer usage and soil improvement practices",
  ],
  technologies: [
    "React",
    "Node.js",
    "Firebase",
    "TensorFlow",
    "PyTorch",
    "Hugging Face API",
    "Weather API",
    "Satellite Data",
    "Machine Learning",
  ],
},
  {
    title: "AI-Farmer-Rural Innovation",
    link: "https://github.com/saivimenthanvl-ai/AI-Farmer-Rural-Innovation",
    description:
      "Develop an end-to-end product of an AI assistant that offers information such as crop diseases, treatment, markets, government schemes, etc., in one go.",
    achievements: [
      "It also employed FastAPI to implement its backend service, providing insights with an AI-driven system, and then deployed it with Render and Swagger",
      "Built a Flutter-driven web application that works well with low-bandwidth and low-literacy environments and hosted it with Firebase hosting",
      "Facilitates detection of crop disease with confidence scores and visual explanation. Provided medication instructions, including safe practices, enabled voice support in multilingual",
      "Receive real-time data on mandi price trends, day-over-day price comparisons determination of government plans including links and hints in respect to contextuality",
      "Designed a voice-first summarized experience for a less possibly literate farmer reduction in decision time by identifying diseased crops",
      "Enhancement of knowledge of farmers, small-scale farmers in particular, regarding the",
      "Easy accessibility to government plans was facilitated through the discovery process made possible by artificial intelligence mediation",
    ],
    technologies: [
      "AI",
      "FastAPI",
      "Flutter",
      "Firebase",
      "Swagger",
    ],
  },
  {
    title: "Eldercare Agentic RAG System (IBM watsons)",
    link: "https://github.com/saivimenthanvl-ai/eldercare-agentic-rag",
    period: "Jan 2026 - Feb 2026",
    description:
      "Built an Agentic AI system for elderly mental-health support during a 3 day IBM hackathon using IBM watsons and Granite LLMs.",
    achievements: [
      "Designed a multi-agent prompt architecture including intent classification, psychological support, wellness actions, monitoring, and human escalation",
      "Implemented LLM + RAG workflows to generate context-aware, empathetic responses grounded in curated knowledge sources",
      "Developed a Human Escalation Agent with safety guardrails to detect high-risk emotional signals and route conversations appropriately",
      "Applied structured prompt engineering, AI guardrails, and rejection handling to ensure safe handling of sensitive inputs",
      "Prototyped and validated agent flows in watsons Prompt Lab under real-time constraints typical of production AI systems",
    ],
    technologies: [
      "IBM Watson",
      "Granite LLM",
      "RAG",
      "Multi-Agent AI",
    ],
  },
  {
    title:
      "Automated Medical Diagnosis and Personalized Treatment Optimization",
    link: "https://github.com/saivimenthanvl-ai/Automated-Medical-Diagnosis-Personalized-Treatment-Optimization",
    description:
      "A layered clinical decision-support framework for automated medical diagnosis and personalized treatment optimization using multiple reinforcement learning approaches.",
    achievements: [
      "Implemented Classical Reinforcement Learning algorithms including SARSA, Q-Learning, and Monte Carlo methods for treatment decision optimization",
      "Developed Deep Reinforcement Learning models using DQN and Double DQN for handling complex state spaces in medical diagnosis",
      "Applied Inverse Reinforcement Learning to infer reward functions from expert medical trajectories and clinical best practices",
      "Built Multi-Agent Reinforcement Learning system for coordinated care agents managing different aspects of patient treatment",
      "Integrated safety guardrails and explainability layers to ensure transparent and accountable healthcare decision support",
    ],
    technologies: [
      "Reinforcement Learning",
      "Deep RL (DQN)",
      "Inverse RL",
      "Multi-Agent RL",
      "Healthcare AI",
      "Explainable AI",
    ],
  },
  {
    title: "AI Edge Tracking System",
    link: "https://github.com/saivimenthanvl-ai/Object-Detection-IoT-based-Edge-AI-system",
    description:
      "A minimal AI video analytics pipeline for person and vehicle tracking using Ultralytics YOLO and ByteTrack, designed as a safe starter system for real-time object tracking.",
    achievements: [
      "Implemented person tracking with high accuracy using Ultralytics YOLO object detection model",
      "Integrated vehicle tracking capabilities with consistent track ID assignment across video frames",
      "Deployed ByteTrack algorithm for robust multi-object tracking in real-time video streams",
      "Generated annotated video outputs with bounding boxes and track IDs for visual verification",
      "Designed modular architecture to enable future extensions like helmet violation detection and number plate OCR",
    ],
    technologies: [
      "Ultralytics YOLO",
      "ByteTrack",
      "Computer Vision",
      "Video Analytics",
      "Python",
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Rocket className="text-slate-900" size={32} />
            <h2 className="text-4xl">Project Experience</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {project.title}
                        </CardTitle>
                        {project.period && (
                          <CardDescription className="text-sm mb-2">
                            {project.period}
                          </CardDescription>
                        )}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-slate-900 transition-colors"
                        title="View on GitHub"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                    <p className="text-slate-700 text-sm">
                      {project.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {project.achievements
                        .slice(0, 3)
                        .map((achievement, idx) => (
                          <li
                            key={idx}
                            className="flex gap-2 text-sm"
                          >
                            <span className="text-slate-600 mt-1">
                              •
                            </span>
                            <span className="text-slate-600">
                              {achievement}
                            </span>
                          </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-slate-600 transition-colors"
                    >
                      View Project
                      <ExternalLink size={16} />
                    </a>
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