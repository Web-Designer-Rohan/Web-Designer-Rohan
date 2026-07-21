import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';

const PROJECTS = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

const TOTAL_CARDS = PROJECTS.length;

function ProjectCard({
  project,
  index,
  containerRef,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const targetScale = 1 - (TOTAL_CARDS - 1 - index) * 0.03;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <article
      className="h-[85vh] sticky top-24 md:top-32"
      style={{ top: `${index * 28}px` }}
      aria-label={`Project ${project.number}: ${project.name}`}
    >
      <motion.div
        style={{ scale, background: '#0C0C0C' }}
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8"
      >
        {/* Header row - responsive: side-by-side on sm+, stacked on mobile */}
        <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:gap-4">
          <span
            className="font-black text-[#D7E2EA] leading-none flex-shrink-0"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 3rem)' }}
            aria-hidden="true"
          >
            {project.number}
          </span>
          <div className="flex flex-col gap-0.5 sm:gap-1 flex-1">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light">
              {project.category}
            </span>
            <h3
              className="font-medium uppercase text-[#D7E2EA] leading-tight"
              style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.6rem)' }}
            >
              {project.name}
            </h3>
          </div>
          <div className="mt-1 sm:mt-0 sm:ml-auto">
            <LiveProjectButton />
          </div>
        </div>

        {/* Image grid */}
        <div className="flex gap-3 sm:gap-4">
          {/* Left column (40%) */}
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4">              <img
              src={project.col1Image1}
              alt={`${project.name} screenshot 1`}
              loading="lazy"
              decoding="async"
              width={460}
              height={230}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
              style={{ height: 'clamp(100px, 14vw, 230px)' }}
            />
            <img
              src={project.col1Image2}
              alt={`${project.name} screenshot 2`}
              loading="lazy"
              decoding="async"
              width={460}
              height={340}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
              style={{ height: 'clamp(120px, 18vw, 340px)' }}
            />
          </div>
          {/* Right column (60%) */}
          <div className="w-[60%]">
            <img
              src={project.col2Image}
              alt={`${project.name} main screenshot`}
              loading="lazy"
              decoding="async"
              width={690}
              height={570}
              className="h-full w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
            />
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      className="relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] z-10 -mt-10 sm:-mt-12 md:-mt-14 px-5 pb-20 sm:px-8 sm:pb-24 md:px-10 md:pb-32"
      style={{ background: '#0C0C0C' }}
      aria-label="Projects"
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center pt-16 sm:pt-20 md:pt-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </h2>

      <div ref={containerRef} className="mt-12 sm:mt-16 md:mt-20">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
          />
        ))}
      </div>
    </section>
  );
}
