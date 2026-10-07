import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import TopBar from '@/components/TopBar';
import Hero from '@/sections/Hero';
import AiredOn from '@/sections/AiredOn';
import Systems from '@/sections/Systems';
import Rundown from '@/sections/Rundown';
import Stack from '@/sections/Stack';
import Credentials from '@/sections/Credentials';
import EndSlate from '@/sections/EndSlate';
import { siteData as data } from '@/lib/content';
import type { Project } from '@/types/site';

// Markdown rendering only loads when a case file is opened.
const CaseFile = lazy(() => import('@/components/CaseFile'));

export default function App() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((project: Project, from: HTMLElement) => {
    opener.current = from;
    setOpenProject(project);
  }, []);

  const close = useCallback(() => {
    setOpenProject(null);
    opener.current?.focus();
  }, []);

  return (
    <>
      <TopBar base={data.profile.availability?.base.split(',')[0] ?? ''} />
      <main>
        <Hero data={data.profile} />
        <AiredOn />
        <Systems projects={data.projects} onOpen={open} />
        <Rundown items={data.experience} />
        <Stack layers={data.profile.stackByLayer} />
        <Credentials
          education={data.education}
          certifications={data.certifications}
          presentations={data.presentations}
          languages={data.profile.languages}
        />
      </main>
      <EndSlate data={data.profile} />
      {openProject && (
        <Suspense fallback={null}>
          <CaseFile project={openProject} onClose={close} />
        </Suspense>
      )}
    </>
  );
}
