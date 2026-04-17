import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function Education() {
  return (
    <section id="education" className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap className="text-slate-900" size={32} />
            <h2 className="text-4xl">Education</h2>
          </div>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Sri Ramachandra Faculty of Engineering and Technology</CardTitle>
              <CardDescription className="text-lg mt-2">
                B. Tech Computer Science & Engineering (Artificial Intelligence and Machine Learning)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">2021-2025</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
