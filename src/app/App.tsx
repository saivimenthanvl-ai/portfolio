import { Nav } from './components/Nav';
import { Landing } from './components/Landing';
import { Showcase } from './components/Showcase';
import { Contact, Education, Experience, Skills } from './components/Sections';
import { Background, ScrollProgress } from './components/Motion';

export default function App() {
  return (
    <div className="min-h-screen text-slate-200 overflow-x-clip">
      <Background />
      <ScrollProgress />
      <Nav />
      <main>
        <Landing />
        <Showcase />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
