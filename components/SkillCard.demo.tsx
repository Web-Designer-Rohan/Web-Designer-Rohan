import SkillCard from "./SkillCard";

export default function SkillCardDemo() {
  return (
    <div className="grid gap-4 p-6 sm:grid-cols-2">
      <SkillCard
        title="Frontend Design"
        description="Crafting accessible, responsive, and polished user interfaces with modern React and Tailwind CSS."
        tags={["React", "Tailwind", "Accessibility"]}
      />
      <SkillCard
        title="CLI Automation"
        description="Building robust command-line tools and CI/CD pipelines that streamline development workflows."
        tags={["Node.js", "GitHub Actions", "Bash"]}
      />
    </div>
  );
}
