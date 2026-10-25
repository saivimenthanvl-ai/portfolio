import { useState, useEffect, lazy, Suspense } from 'react';
import { Masthead } from './components/Layout';
import { Intro } from './components/Intro';
import { Work } from './components/Work';
import { Contact, Education, Experience, Skills } from './components/Record';

const DemoPage = lazy(() => import('./components/DemoPage').then((m) => ({ default: m.DemoPage })));

export default function App() {
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const checkDemo = () => {
      const isDemoPath = window.location.pathname.startsWith('/demo');
      const isDemoQuery = new URLSearchParams(window.location.search).has('demo');
      setIsDemo(isDemoPath || isDemoQuery);
    };

    checkDemo();
    window.addEventListener('popstate', checkDemo);
    return () => window.removeEventListener('popstate', checkDemo);
  }, []);

  if (isDemo) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-paper" />}>
        <DemoPage />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
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
