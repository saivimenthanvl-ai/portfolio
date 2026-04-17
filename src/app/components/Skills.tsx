import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';
import { Badge } from './ui/badge';

const skills = [
  'Python',
  'Java',
  'JavaScript',
  'Data Structures',
  'SQL',
  'React',
  'FastAPI',
  'Docker',
  'LLM',
  'Machine Learning',
  'Deep Learning',
  'NLP',
  'OpenCV',
  'Hugging Face',
  'AWS',
  'Firebase',
  'Flutter',
  'REST APIs',
  'RAG',
];

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Code2 className="text-slate-900" size={32} />
            <h2 className="text-4xl">Skills & Technologies</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <Badge variant="outline" className="text-base px-4 py-2 hover:bg-slate-100 transition-colors">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
