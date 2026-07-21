import { ExternalLink } from 'lucide-react';

interface LiveProjectButtonProps {
  className?: string;
}

export default function LiveProjectButton({ className = '' }: LiveProjectButtonProps) {
  return (
    <a
      href="#"
      aria-label="View live project"
      className={`inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] font-medium uppercase tracking-widest text-[#D7E2EA]
        px-6 py-2.5 sm:px-10 sm:py-3.5 text-xs sm:text-base
        transition-colors duration-200 hover:bg-[#D7E2EA]/10 focus-visible:bg-[#D7E2EA]/10
        ${className}`}
    >
      Live Project
      <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
    </a>
  );
}
