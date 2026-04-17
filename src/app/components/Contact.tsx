import { motion } from "motion/react";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl mb-6">Let’s Build Something Useful</h2>
          <p className="text-slate-300 text-lg mb-12 max-w-3xl mx-auto leading-8">
            I am open to AI engineering roles, internships, hackathons, research collaborations, and product-focused work involving LLMs, NLP, healthcare AI, computer vision, or intelligent systems.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.a
              href="mailto:saivimenthanvl@gmail.com"
              className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Mail size={32} />
              <div>
                <p className="text-sm text-slate-400 mb-1">Email</p>
                <p className="text-white">saivimenthanvl@gmail.com</p>
              </div>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/saivimenthanvl-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Linkedin size={32} />
              <div>
                <p className="text-sm text-slate-400 mb-1">LinkedIn</p>
                <p className="text-white">Connect with me</p>
              </div>
            </motion.a>
            <motion.a
              href="https://github.com/saivimenthanvl-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Github size={32} />
              <div>
                <p className="text-sm text-slate-400 mb-1">GitHub</p>
                <p className="text-white">View repositories</p>
              </div>
            </motion.a>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-400">
            <MapPin size={20} />
            <span>Chennai, Tamil Nadu, India</span>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800">
            <p className="text-slate-400">© 2026 Sai Vimenthan V L · saivimenthanvl-ai.com</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
