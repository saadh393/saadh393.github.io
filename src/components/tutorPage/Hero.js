import Title from "@/components/utility/Title";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <Title>Master React & Next.js with Private Tutoring</Title>
        <p className="text-trinary text-xl mt-6">
          Personalized 1-on-1 guidance to help you become a professional frontend developer
        </p>
        <button className="mt-8 bg-primary text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform">
          Book Your First Class
        </button>
      </div>
    </section>
  );
}