import React from "react";

export interface SkillCardProps {
  title: string;
  description: string;
  tags?: string[];
}

export default function SkillCard({ title, description, tags = [] }: SkillCardProps) {
  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-blue-600 dark:text-slate-100">
        {title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {description}
      </p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
