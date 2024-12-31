import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";

const benefits = [
  {
    title: "Personalized Learning Path",
    description: "Custom curriculum tailored to your goals and learning pace"
  },
  {
    title: "Hands-on Practice",
    description: "Real-time coding sessions with immediate feedback"
  },
  {
    title: "Industry-Ready Projects",
    description: "Build portfolio-worthy projects that showcase your skills"
  },
  {
    title: "Flexible Schedule",
    description: "Choose class times that work best for you"
  }
];

export default function WhyChooseUs() {
  return (
    <Wrapper>
      <div className="py-16">
        <Title>Why Choose Private Tutoring?</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="slick-border p-6 hover:border-primary transition-all">
              <h3 className="text-secondary text-xl font-medium mb-2">{benefit.title}</h3>
              <p className="text-trinary">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}