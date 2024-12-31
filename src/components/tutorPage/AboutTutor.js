import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";
import Image from "next/image";

export default function AboutTutor() {
  return (
    <Wrapper>
      <div className="py-16">
        <Title>Meet Your Tutor</Title>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] slick-border overflow-hidden rounded-lg">
            <Image 
              src="https://saadh393.github.io/images/saad-2.jpg"
              alt="Saad Hasan"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-secondary">Saad Hasan</h3>
              <p className="text-primary">Frontend Developer & Educator</p>
            </div>
            
            <p className="text-trinary">
              Professional Frontend Developer with over a decade of programming experience,
              specializing in React and Next.js development. Started the self-taught programming
              journey in 2011 and has been helping others learn coding ever since.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 slick-border !p-2 !py-4 lg:!py-2 !min-h-min !rounded-xl">
                <div className="flex items-center gap-4">
                  <Image src="/images/experience/analyzen.svg" alt="Analyzen" width={40} height={40} />
                  <span className="text-primary">Analyzen</span>
                </div>
                <p className="text-trinary text-sm">Jr. Software Engineer</p>
              </div>
              
              <div className="flex items-center gap-4 slick-border !p-2 !py-4 lg:!py-2 !min-h-min !rounded-xl">
                <div className="flex items-center gap-4">
                  <Image src="/images/experience/lws.svg" alt="Learn with Sumit" width={40} height={40} />
                  <span className="text-primary">Learn with Sumit</span>
                </div>
                <p className="text-trinary text-sm">Product Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}