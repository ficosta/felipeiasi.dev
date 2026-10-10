import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import TopBar from '@/components/TopBar';
import Hero from '@/sections/Hero';
import AiredOn from '@/sections/AiredOn';
import Systems from '@/sections/Systems';
import Rundown from '@/sections/Rundown';
import Stack from '@/sections/Stack';
import Credentials from '@/sections/Credentials';
import EndSlate from '@/sections/EndSlate';
import { siteData as data } from '@/lib/content';
import { caseIdFromSearch, searchForCase } from '@/lib/caseUrl';
import type { Project } from '@/types/site';

// Markdown rendering only loads when a case file is opened.
const CaseFile = lazy(() => import('@/components/CaseFile'));

const HOME_TITLE = document.title;

function projectFromUrl(): Project | null {
  const id = caseIdFromSearch(window.location.search);
  return data.projects.find((p) => p.id === id) ?? null;
}

function urlFor(id: string | null): string {
  return window.location.pathname + searchForCase(window.location.search, id);
}

export default function App() {
  // A shared link (?case=<id>) opens straight into that case file.
  const [openProject, setOpenProject] = useState<Project | null>(projectFromUrl);
  const opener = useRef<HTMLElement | null>(null);

  // Back and forward move between the page and the case files.
  useEffect(() => {
    const onPop = () => {
      const project = projectFromUrl();
      setOpenProject(project);
      if (!project) opener.current?.focus();
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.title = openProject ? `${openProject.title} | Felipe Iasi` : HOME_TITLE;
  }, [openProject]);

  const open = useCallback((project: Project, from: HTMLElement) => {
    opener.current = from;
    window.history.pushState({ caseFile: true }, '', urlFor(project.id));
    setOpenProject(project);
  }, []);

  const close = useCallback(() => {
    // Opened from the page: step back so the case file leaves the history.
    // Landed from a shared link: there is no entry to go back to, so rewrite it.
    if ((window.history.state as { caseFile?: boolean } | null)?.caseFile) {
      window.history.back();
      return;
    }
    window.history.replaceState(null, '', urlFor(null));
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
