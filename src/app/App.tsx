import { Masthead, ScrollBar } from './components/Layout';
import { Intro } from './components/Intro';
import { Work } from './components/Work';
import { Contact, Education, Experience, Skills } from './components/Record';

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <ScrollBar />
      <Masthead />
      <main>
        <Intro />
        <Work />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
