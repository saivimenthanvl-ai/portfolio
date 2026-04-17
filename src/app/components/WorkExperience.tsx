import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const experiences = [
  {
    company: 'Deffotech AI',
    role: 'LLM Developer',
    location: 'Chennai, Tamilnadu',
    period: 'Apr 2025 - Present',
    achievements: [
      'Developed and optimized Large Language Model (LLM) applications using Python and advanced algorithms',
      'Implemented data preprocessing pipelines with focus on algorithmic efficiency and memory optimization',
      'Utilized cutting-edge design principles to build scalable model training frameworks',
      'Deployed models using distributed systems concepts on Run Pod H100 GPUs for performance optimization',
      'Collaborated with cross-functional teams to implement scalable LLM solutions, boosting model deployment efficiency by 50% and facilitating over 1000 fast iteration cycles within the project timeline',
      'Text generation model by fine-tuning GPT-2, Qwen2VLB on a specialized dataset using Hugging Face, resulting in a 40% improvement in accuracy over baseline models',
      'Engineered data preprocessing pipelines that increased dataset quality and diversity, leading to a 25% reduction in model training time while enhancing output consistency',
      'Annotated the Data NLP pipelines utilizing the Machine learning and Deep learning algorithms 83% accuracy',
      'Building Natural Language Processing and Part Of Speech stopword model using word tagger to determine the better tag in grammatically which model gives maximum accuracy'
    ]
  },
  {
    company: 'Tabtree',
    role: 'Machine Learning Intern',
    location: 'Chennai, Tamilnadu',
    period: 'Jul 2023 - Oct 2023',
    achievements: [
      'Built OCR system using Python with emphasis on string processing algorithms and data structure optimization',
      'Implemented document processing algorithms including PDFP2 with focus on memory-efficient data handling',
      'Designed automated workflows reducing manual processing time by 70% through algorithmic improvements',
      'Applied complexity analysis to optimize text extraction performance'
    ]
  },
  {
    company: 'Ashtrix Research',
    role: 'Machine Learning Intern',
    location: 'Chennai, Tamilnadu',
    period: 'Feb 2023 - May 2023',
    achievements: [
      'Developed face recognition system using Python and OpenCV with focus on algorithmic accuracy',
      'Implemented real-time video processing using efficient data structures and algorithm optimization',
      'Designed biometric identification system with attention to time and space complexity considerations',
      'Built verification system using object-oriented programming principles'
    ]
  }
];

export function WorkExperience() {
  return (
    <section id="experience" className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="text-slate-900" size={32} />
            <h2 className="text-4xl">Work Experience</h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <CardTitle className="text-2xl">{exp.company}</CardTitle>
                        <CardDescription className="text-lg mt-1">{exp.role}</CardDescription>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-1 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{exp.period}</span>
                        </div>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-slate-600 mt-1.5">•</span>
                          <span className="text-slate-700">{achievement}</span>
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
