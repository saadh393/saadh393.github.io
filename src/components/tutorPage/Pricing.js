import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";

export default function Pricing() {
  return (
    <Wrapper>
      <div className="py-16">
        <Title>Pricing</Title>
        <div className="mt-12 slick-border p-8 max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary">$10/hour</h3>
            <p className="text-secondary mt-4">15 classes per month</p>
            <p className="text-trinary mt-2">Maximum 2 hours per day</p>
          </div>
          
          <div className="mt-8 space-y-4">
            <h4 className="text-secondary text-xl">What&apos;s Included:</h4>
            <ul className="space-y-2 text-trinary">
              <li>• One-on-one personalized instruction</li>
              <li>• Project-based learning materials</li>
              <li>• Code review and feedback</li>
              <li>• Flexible scheduling</li>
              <li>• Money-back guarantee if not satisfied</li>
            </ul>
          </div>
          
          <button className="w-full mt-8 bg-primary text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform">
            Book Your First Class
          </button>
        </div>
      </div>
    </Wrapper>
  );
}