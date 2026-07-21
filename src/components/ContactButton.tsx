import { ArrowRight } from 'lucide-react';

interface ContactButtonProps {
  className?: string;
}

export default function ContactButton({ className = '' }: ContactButtonProps) {
  return (
    <a
      href="#contact"
      aria-label="Contact Me"
      className={`inline-flex items-center gap-2 rounded-full font-medium uppercase tracking-widest text-white
        px-6 py-2.5 sm:px-10 sm:py-3.5 md:px-12 md:py-4
        text-xs sm:text-sm md:text-base
        transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4
        ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset, 0 0 0 2px white, 0 0 0 5px transparent',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
    </a>
  );
}
