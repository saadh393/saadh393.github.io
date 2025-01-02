import TextInsightsComponent from "@/components/utilities/TextInsights/TextInsightsComponent";
import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";

export default function TextInsights() {
  return (
    <Wrapper>
      <div className="py-16 w-full max-w-5xl mx-auto">
        <Title>Text Insights</Title>
        <p className="text-trinary text-xl mt-4 mb-8">
          Analyze your text for detailed insights and metrics
        </p>
        <TextInsightsComponent />
      </div>
    </Wrapper>
  );
}