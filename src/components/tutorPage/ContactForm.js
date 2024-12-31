import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";

export default function ContactForm() {
  return (
    <Wrapper>
      <div className="py-16">
        <Title>Get in Touch</Title>
        <form className="mt-12 max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <label className="text-secondary">Name</label>
            <input
              type="text"
              className="w-full bg-[#171919] border border-trinary p-3 rounded-lg text-white"
              placeholder="Your name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-secondary">Email</label>
            <input
              type="email"
              className="w-full bg-[#171919] border border-trinary p-3 rounded-lg text-white"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-secondary">Query Type</label>
            <select className="w-full bg-[#171919] border border-trinary p-3 rounded-lg text-white">
              <option>General Inquiry</option>
              <option>Course Details</option>
              <option>Pricing</option>
              <option>Schedule</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-secondary">Message</label>
            <textarea
              className="w-full bg-[#171919] border border-trinary p-3 rounded-lg text-white h-32"
              placeholder="Your message"
            ></textarea>
          </div>
          
          <button className="w-full bg-primary text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform">
            Send Message
          </button>
        </form>
      </div>
    </Wrapper>
  );
}