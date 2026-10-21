import { motion } from 'motion/react';
import { Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';
import { ProfilePhoto } from './ProfilePhoto';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-4">
      <div className="max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ProfilePhoto />
          <h1 className="text-5xl md:text-7xl mb-4">
            Sai Vimenthan V L
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-4">
            LLM Developer · Deep Learning · NLP · AI · ML 
          </p>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-8">
            I build multilingual NLP pipelines, LLM applications, healthcare AI workflows, and research-driven machine learning systems with a focus on practical deployment, evaluation, and real-world usability.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10 text-slate-300">
            <motion.a
              href="mailto:saivimenthanvl@gmail.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Mail size={20} />
              <span>saivimenthanvl@gmail.com</span>
            </motion.a>

            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
              <MapPin size={20} />
              <span>Chennai, Tamil Nadu, India</span>
            </motion.div>

            <motion.a
              href="https://www.linkedin.com/in/saivimenthanvl-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </motion.a>

            <motion.a
              href="https://github.com/saivimenthanvl-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Github size={20} />
              <span>GitHub</span>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
