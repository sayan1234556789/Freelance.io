import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-[#F9F7F7] min-h-screen text-[#112D4E] antialiased">
      <Navbar />

      <section className="relative overflow-hidden bg-[#F9F7F7]">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #DBE2EF 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#DBE2EF]/50 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full bg-[#DBE2EF]/30 blur-[80px]" />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 pt-12 pb-24 md:pt-16 md:pb-28 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Build, collaborate, and manage projects in one place
            </h1>

            <p className="text-[#112D4E]/60 text-lg max-w-[450px]">
              Post projects, hire freelancers, assign tasks, and collaborate in
              real-time — all in one platform.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <button className="bg-[#112D4E] text-[#F9F7F7] px-7 py-3 rounded-lg font-semibold hover:bg-[#3F72AF] transition">
                Start Hiring
              </button>

              <button className="border border-[#112D4E]/30 px-7 py-3 rounded-lg hover:bg-[#112D4E] hover:text-white transition">
                Browse Projects
              </button>
            </div>

            <p className="text-sm text-[#112D4E]/50 mt-2">
              Trusted by{" "}
              <span className="font-semibold text-[#112D4E]">10,000+</span>{" "}
              freelancers
            </p>
          </div>

          <div className="relative flex flex-col gap-6">
            <div className="w-full h-[220px] md:h-[260px] rounded-xl overflow-hidden border border-[#DBE2EF] shadow-sm bg-[#DBE2EF]/40 flex items-center justify-center">
              <img
                src="\public\luke-peters-B6JINerWMz0-unsplash.jpg"
                alt="Platform preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white rounded-xl border border-[#DBE2EF] shadow-md p-5 space-y-4">
              <div className="flex justify-between">
                <p className="font-semibold text-sm">Active Projects</p>
                <span className="text-[#3F72AF] font-bold">12</span>
              </div>

              <div className="flex justify-between">
                <p className="font-semibold text-sm">Pending Tasks</p>
                <span className="text-yellow-500 font-bold">4</span>
              </div>

              <div className="flex justify-between">
                <p className="font-semibold text-sm">Earnings</p>
                <span className="text-green-500 font-bold">$2.4k</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[#DBE2EF]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-2 md:grid-cols-4 text-center">
          {[
            { value: "10K+", label: "Freelancers" },
            { value: "5K+", label: "Projects" },
            { value: "98%", label: "Success Rate" },
            { value: "24/7", label: "Support" },
          ].map((item, i) => (
            <div
              key={i}
              className="py-10 border-r last:border-none border-[#DBE2EF]"
            >
              <h2 className="text-2xl font-bold text-[#3F72AF]">
                {item.value}
              </h2>
              <p className="text-sm text-[#112D4E]/60">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-[#F9F7F7]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2 className="text-2xl font-bold text-center mb-12">
            Platform Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#DBE2EF] hover:shadow-md transition">
              <h3 className="font-semibold mb-2">Post Projects</h3>
              <p className="text-[#112D4E]/60 text-sm">
                Clients can post projects and hire freelancers easily.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#DBE2EF] hover:shadow-md transition">
              <h3 className="font-semibold mb-2">Apply & Work</h3>
              <p className="text-[#112D4E]/60 text-sm">
                Freelancers can apply and start working instantly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#DBE2EF] hover:shadow-md transition">
              <h3 className="font-semibold mb-2">Manage Tasks</h3>
              <p className="text-[#112D4E]/60 text-sm">
                Track progress with built-in task management.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
