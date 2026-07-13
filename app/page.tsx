import Link from "next/link";

const features = [
  "Answer beginner-friendly questions",
  "Choose style, colors, layout, effects, and output type",
  "Copy polished prompts into ChatGPT Images"
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fff8f9] text-zinc-950">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-10 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#b9954b]">
              The Prompt Studio
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-none text-black sm:text-6xl lg:text-7xl">
              Let&apos;s Prompt It
            </h1>
            <p className="mt-5 max-w-2xl text-2xl font-bold text-zinc-800">
              The Prompt Studio that turns your ideas into bold, vibrant AI prompts.
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Answer a few simple questions and get polished AI prompts you can copy into ChatGPT Images.
            </p>
            <div className="mt-8">
              <Link
                href="/studio"
                className="inline-flex items-center justify-center rounded-lg bg-black px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-[#f0d9d6] transition hover:-translate-y-0.5 hover:bg-zinc-800"
              >
                Let&apos;s Build My Prompt
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-[#f0d9d6] bg-white p-5 shadow-sm">
            <div className="rounded-lg bg-[#fff8f9] p-5">
              <div className="rounded-lg border border-[#e8c9c5] bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#b9954b]" />
                  <span className="h-3 w-3 rounded-full bg-[#f0d9d6]" />
                  <span className="h-3 w-3 rounded-full bg-black" />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b9954b]">Ultra Prompt</p>
                <p className="mt-4 text-2xl font-black leading-tight text-black">
                  Create a premium image prompt featuring your subject, brand, colors, layout, effects, and finish.
                </p>
                <p className="mt-4 rounded-lg bg-black p-4 text-sm leading-6 text-white">
                  Polished, high-quality, visually balanced, professional, and ready to paste into ChatGPT Images.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature} className="rounded-lg border border-[#f0d9d6] bg-white p-5 shadow-sm">
              <p className="text-sm font-black text-zinc-800">{feature}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
