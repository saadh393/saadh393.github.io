import Hero from "@/components/tutorPage/Hero";
import WhyChooseUs from "@/components/tutorPage/WhyChooseUs";
import LearningProcess from "@/components/tutorPage/LearningProcess";
import Projects from "@/components/tutorPage/Projects";
import AboutTutor from "@/components/tutorPage/AboutTutor";
import Pricing from "@/components/tutorPage/Pricing";
import ContactForm from "@/components/tutorPage/ContactForm";
import CallToAction from "@/components/tutorPage/CallToAction";

export default function TutorLanding() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <WhyChooseUs />
      <LearningProcess />
      <Projects />
      <AboutTutor />
      <Pricing />
      <ContactForm />
      <CallToAction />
    </main>
  );
}