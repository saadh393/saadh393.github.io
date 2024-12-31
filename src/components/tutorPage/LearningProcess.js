import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";

const steps = [
  {
    number: "01",
    title: "Understand Core Concepts",
    description: "Master fundamental principles through interactive explanations"
  },
  {
    number: "02",
    title: "Watch Live Implementation",
    description: "See real-world application of concepts through live coding"
  },
  {
    number: "03",
    title: "Practice Together",
    description: "Code alongside the tutor with immediate feedback"
  },
  {
    number: "04",
    title: "Independent Building",
    description: "Apply learned concepts by building projects independently"
  }
];

export default function LearningProcess() {
  return (
    <Wrapper>
      <div className="py-16">
        <Title>How You'll Learn</Title>
        <div className="mt-12 space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-8 items-start slick-border p-6">
              <span className="text-4xl font-bold text-primary">{step.number}</span>
              <div>
                <h3 className="text-secondary text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-trinary">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}