import HeroSection from '@/components/common/sections/HeroSection';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HeroSection />

      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow border border-pink-200">
          <h2 className="text-xl text-purple-800 font-bold mb-3">Disease Guide</h2>
          <p>Learn symptoms, causes, precautions, and common health advice.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border border-pink-200">
          <h2 className="text-xl text-purple-800 font-bold mb-3">Find Doctors</h2>
          <p>Search doctors by field, experience, and consultation information.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border border-pink-200">
          <h2 className="text-xl text-purple-800 font-bold mb-3">Medicine Info</h2>
          <p>Check dosage, usage, warnings, side effects, and medicine files.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border border-pink-200">
          <h2 className="text-xl text-purple-800 font-bold mb-3">Food & Nutrition</h2>
          <p>Get diet and nutrition suggestions based on disease or health needs.</p>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-pink-200 to-purple-100 rounded-2xl p-8 shadow border border-pink-200">
          <h2 className="text-2xl font-bold text-purple-800 mb-3">AI Doctor Assistant</h2>
          <p className="mb-4">
            Get basic health guidance from the AI assistant. This should not replace a real doctor.
          </p>
          <button className="bg-purple-500 text-white px-5 py-3 rounded-xl hover:bg-purple-800 transition">
            Open AI Doctor
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow border border-pink-200">
          <h2 className="text-2xl font-bold text-purple-800 mb-3">Upload Reports</h2>
          <p className="mb-4">
            Upload medical reports, prescriptions, or PDFs for review and safe storage.
          </p>
          <button className="bg-pink-400 text-white px-5 py-3 rounded-xl hover:bg-pink-500 transition">
            Upload Now
          </button>
        </div>
      </section>
    </div>
  );
}