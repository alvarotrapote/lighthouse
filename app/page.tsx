export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 px-6 text-white">
      <section className="w-full max-w-lg rounded-3xl border border-white/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-sm">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">
          design + AI
        </p>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Hello, world!</h1>
        <p className="mt-5 text-lg leading-8 text-blue-50">
          A small first step, ready to grow into something useful.
        </p>
      </section>
    </main>
  );
}
