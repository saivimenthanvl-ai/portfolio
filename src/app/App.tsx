import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { WorkExperience } from './components/WorkExperience';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navigation />
      <Hero />
      <Projects />
      <WorkExperience />
      <Skills />
      <Education />
      <Certificates />
      <Contact />
    </div>
  );
}
