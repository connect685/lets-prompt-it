"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  creationTypes,
  effectOptions,
  layoutOptions,
  outputTypes,
  styleOptions
} from "@/lib/prompt-options";
import { generatePromptResults } from "@/lib/prompt-generator";
import type { EffectOption, PromptFormState, PromptResult } from "@/lib/prompt-types";

const initialForm: PromptFormState = {
  creationType: "School Spirit Design",
  mainSubject: "",
  name: "",
  slogan: "",
  audience: "",
  purpose: "",
  style: "Luxury Editorial",
  customStyle: "",
  primaryColor: "soft blush pink",
  secondaryColor: "black",
  accentColor: "metallic gold",
  backgroundPreference: "transparent or clean white background",
  layout: "Centered",
  effects: ["Metallic Foil", "Soft Shadows"],
  outputType: "ChatGPT Image Prompt"
};

type FeedbackState = {
  rating: number;
  matchedVision: "Yes" | "No" | "";
  designType: string;
  promptUsed: string;
  loved: string;
  improved: string;
  featureRequest: string;
  imageLink: string;
};

const initialFeedback: FeedbackState = {
  rating: 0,
  matchedVision: "",
  designType: "School Spirit Design",
  promptUsed: "Professional Prompt",
  loved: "",
  improved: "",
  featureRequest: "",
  imageLink: ""
};

const feedbackDesignTypes = [
  "School Spirit Design",
  "T-Shirt Design",
  "Journal Cover",
  "Social Media Graphic",
  "Logo Concept",
  "Product Mockup",
  "Holiday Design",
  "Other"
] as const;

const promptUsedOptions = ["Simple Prompt", "Professional Prompt", "Ultra Prompt"] as const;

export function PromptStudio() {
  const [form, setForm] = useState<PromptFormState>(initialForm);
  const [results, setResults] = useState<PromptResult[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState>(initialFeedback);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackCopied, setFeedbackCopied] = useState(false);
  const formRef = useRef<HTMLElement>(null);

  function updateForm(updates: Partial<PromptFormState>) {
    setForm((current) => ({ ...current, ...updates }));
  }

  function updateFeedback(updates: Partial<FeedbackState>) {
    setFeedback((current) => ({ ...current, ...updates }));
  }

  function toggleEffect(effect: EffectOption) {
    updateForm({
      effects: form.effects.includes(effect)
        ? form.effects.filter((item) => item !== effect)
        : [...form.effects, effect]
    });
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleGenerate() {
    setResults(generatePromptResults(form));
  }

  function handleStartOver() {
    const confirmed = window.confirm("Are you sure you want to clear your answers?");
    if (!confirmed) {
      return;
    }

    setForm(initialForm);
    setResults([]);
    window.setTimeout(scrollToForm, 50);
  }

  function updateResult(id: PromptResult["id"], text: string) {
    setResults((current) => current.map((result) => (result.id === id ? { ...result, text } : result)));
  }

  function buildFeedbackMessage() {
    return [
      "Let's Prompt It Beta Feedback",
      "",
      `Experience Rating: ${feedback.rating || "Not selected"}`,
      `Did the image match my vision? ${feedback.matchedVision || "Not selected"}`,
      `Design Type: ${feedback.designType}`,
      `Prompt Used: ${feedback.promptUsed}`,
      "",
      `What I loved: ${feedback.loved || "Not provided"}`,
      `What should improve: ${feedback.improved || "Not provided"}`,
      `Feature request: ${feedback.featureRequest || "Not provided"}`,
      `Image link: ${feedback.imageLink || "Not provided"}`
    ].join("\n");
  }

  async function copyFeedback() {
    await navigator.clipboard.writeText(buildFeedbackMessage());
    setFeedbackCopied(true);
    window.setTimeout(() => setFeedbackCopied(false), 1600);
  }

  function submitFeedback() {
    const feedbackUrl = process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL?.trim();

    if (feedbackUrl) {
      window.open(feedbackUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setFeedbackMessage(
      "Thank you for testing Let's Prompt It! Please share your answers inside the Better Together community."
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8f9] text-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 rounded-lg border border-[#f0d9d6] bg-white/90 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/" className="text-sm font-black uppercase tracking-[0.18em] text-[#b9954b]">
                Let&apos;s Prompt It
              </Link>
              <BetaBadge />
            </div>
            <h1 className="mt-2 text-3xl font-black text-black">The Prompt Studio</h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-600">
            Answer the guided questions, then generate polished prompts you can copy into ChatGPT Images.
          </p>
        </header>

        <section className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-[#f0d9d6] bg-white p-5 shadow-sm">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <BetaBadge />
              <span className="rounded-full bg-[#fff2f4] px-3 py-1 text-xs font-black uppercase tracking-wide text-zinc-700">
                Private Beta
              </span>
            </div>
            <h2 className="text-2xl font-black text-black">Welcome, Better Together tester</h2>
            <p className="mt-3 text-base leading-7 text-zinc-700">
              You&apos;re one of the first people invited to test Let&apos;s Prompt It. Create a prompt, paste it into
              ChatGPT Images, and let me know how the final image turns out. Your feedback will help shape the official
              version.
            </p>
            <p className="mt-4 rounded-lg border border-[#f0d9d6] bg-[#fff8f9] px-4 py-3 text-sm font-bold text-zinc-700">
              This is an early test version. Features and prompt results may continue to improve.
            </p>
          </div>

          <BetaChallenge onStart={scrollToForm} />
        </section>

        <HowToUsePrompt />

        <div className="grid gap-5 lg:grid-cols-[440px_1fr]">
          <section ref={formRef} className="scroll-mt-5 rounded-lg border border-[#f0d9d6] bg-white p-5 shadow-sm">
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b9954b]">Step-by-step builder</p>
              <h2 className="mt-2 text-2xl font-black">Build your prompt</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Keep it simple. Short answers work beautifully, and you can edit the final prompts after generating.
              </p>
            </div>

            <div className="space-y-6">
              <FormSection number="1" title="What are you creating?">
                <SelectField
                  label="Creation type"
                  value={form.creationType}
                  options={creationTypes}
                  onChange={(value) => updateForm({ creationType: value })}
                  help="Choose the closest match. Custom details can go in the fields below."
                />
              </FormSection>

              <FormSection number="2" title="Main Details">
                <TextField
                  label="Main subject"
                  value={form.mainSubject}
                  onChange={(value) => updateForm({ mainSubject: value })}
                  placeholder="A fierce tiger mascot, a candle brand, a holiday phrase..."
                  help="What should the image focus on?"
                />
                <TextField
                  label="Business, school, or team name"
                  value={form.name}
                  onChange={(value) => updateForm({ name: value })}
                  placeholder="Pink Pearl Studio"
                  help="This helps the prompt feel custom and branded."
                />
                <TextField
                  label="Slogan or phrase"
                  value={form.slogan}
                  onChange={(value) => updateForm({ slogan: value })}
                  placeholder="Shine different"
                  help="Leave blank if you do not want text included."
                />
                <TextField
                  label="Audience"
                  value={form.audience}
                  onChange={(value) => updateForm({ audience: value })}
                  placeholder="Boutique shoppers, football moms, teachers..."
                  help="Who is this design for?"
                />
                <TextField
                  label="Purpose of the design"
                  value={form.purpose}
                  onChange={(value) => updateForm({ purpose: value })}
                  placeholder="A DTF transfer, Instagram post, logo concept..."
                  help="Tell the AI how the final design will be used."
                />
              </FormSection>

              <FormSection number="3" title="Style">
                <SelectField
                  label="Visual style"
                  value={form.style}
                  options={styleOptions}
                  onChange={(value) => updateForm({ style: value })}
                  help="Pick the overall creative direction."
                />
                {form.style === "Custom Style" ? (
                  <TextField
                    label="Custom style"
                    value={form.customStyle}
                    onChange={(value) => updateForm({ customStyle: value })}
                    placeholder="Soft glam Y2K with luxury boutique details"
                    help="Describe your custom look in a sentence."
                  />
                ) : null}
              </FormSection>

              <FormSection number="4" title="Colors">
                <div className="grid gap-3 sm:grid-cols-3">
                  <TextField
                    label="Primary color"
                    value={form.primaryColor}
                    onChange={(value) => updateForm({ primaryColor: value })}
                    placeholder="Blush pink"
                  />
                  <TextField
                    label="Secondary color"
                    value={form.secondaryColor}
                    onChange={(value) => updateForm({ secondaryColor: value })}
                    placeholder="Black"
                  />
                  <TextField
                    label="Accent color"
                    value={form.accentColor}
                    onChange={(value) => updateForm({ accentColor: value })}
                    placeholder="Gold"
                  />
                </div>
                <TextField
                  label="Background preference"
                  value={form.backgroundPreference}
                  onChange={(value) => updateForm({ backgroundPreference: value })}
                  placeholder="Transparent, white, soft blush gradient..."
                  help="Use transparent if you plan to place the design on products."
                />
              </FormSection>

              <FormSection number="5" title="Layout">
                <SelectField
                  label="Layout"
                  value={form.layout}
                  options={layoutOptions}
                  onChange={(value) => updateForm({ layout: value })}
                  help="This controls how the final design should be composed."
                />
              </FormSection>

              <FormSection number="6" title="Effects">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {effectOptions.map((effect) => (
                    <label
                      key={effect}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-bold transition ${
                        form.effects.includes(effect)
                          ? "border-[#b9954b] bg-[#fff2f4] text-black"
                          : "border-zinc-200 bg-white text-zinc-600 hover:border-[#e8c9c5]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.effects.includes(effect)}
                        onChange={() => toggleEffect(effect)}
                        className="h-4 w-4 accent-[#b9954b]"
                      />
                      {effect}
                    </label>
                  ))}
                </div>
              </FormSection>

              <FormSection number="7" title="Output Type">
                <SelectField
                  label="Output type"
                  value={form.outputType}
                  options={outputTypes}
                  onChange={(value) => updateForm({ outputType: value })}
                  help="Choose where you plan to use the prompt."
                />
              </FormSection>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="rounded-lg bg-black px-5 py-4 text-base font-black text-white shadow-lg shadow-[#f0d9d6] transition hover:-translate-y-0.5 hover:bg-zinc-800"
                >
                  Let&apos;s Prompt It
                </button>
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="rounded-lg border border-[#b9954b] px-5 py-4 text-sm font-black uppercase tracking-wide text-black transition hover:bg-[#fff2f4]"
                >
                  Start Over
                </button>
              </div>
            </div>
          </section>

          <ResultsSection
            results={results}
            feedback={feedback}
            feedbackMessage={feedbackMessage}
            feedbackCopied={feedbackCopied}
            onChange={updateResult}
            onCreateAnother={scrollToForm}
            onFeedbackChange={updateFeedback}
            onFeedbackCopy={copyFeedback}
            onFeedbackSubmit={submitFeedback}
          />
        </div>
      </div>
    </main>
  );
}

function BetaBadge() {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-[#b9954b] bg-[#fff8f0] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#8a6a2c]">
      Better Together Beta
    </span>
  );
}

function BetaChallenge({ onStart }: { onStart: () => void }) {
  const steps = [
    "Create at least one design prompt.",
    "Copy the Professional or Ultra Prompt.",
    "Paste it into ChatGPT Images.",
    "Review the image ChatGPT creates.",
    "Return here and share your honest feedback."
  ];

  return (
    <aside className="rounded-lg border border-[#f0d9d6] bg-black p-5 text-white shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6b35f]">Your Beta Challenge</p>
      <h2 className="mt-2 text-2xl font-black">Try it like a real project</h2>
      <ol className="mt-4 space-y-2 text-sm leading-6 text-zinc-100">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#d6b35f] text-xs font-black text-black">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={onStart}
        className="mt-5 w-full rounded-lg bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-[#fff2f4]"
      >
        Start My Beta Challenge
      </button>
    </aside>
  );
}

function HowToUsePrompt() {
  const steps = [
    "Copy your preferred prompt.",
    "Open ChatGPT and ask it to create the image.",
    "Return and tell us how the result turned out."
  ];

  return (
    <section className="mb-6 rounded-lg border border-[#f0d9d6] bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b9954b]">How to Use Your Prompt</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step} className="rounded-lg border border-[#f0d9d6] bg-[#fffbfb] p-4">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-black text-sm font-black text-white">
              {index + 1}
            </span>
            <p className="mt-3 text-sm font-bold leading-6 text-zinc-700">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FormSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-[#f0d9d6] bg-[#fffbfb] p-4">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-black text-sm font-black text-white">{number}</span>
        <h3 className="text-lg font-black">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  help
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  help?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-black text-zinc-800">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#b9954b] focus:ring-4 focus:ring-[#f5e7e5]"
      />
      {help ? <span className="mt-1 block text-xs leading-5 text-zinc-500">{help}</span> : null}
    </label>
  );
}

function SelectField<TOption extends string>({
  label,
  value,
  options,
  onChange,
  help
}: {
  label: string;
  value: TOption;
  options: readonly TOption[];
  onChange: (value: TOption) => void;
  help?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-black text-zinc-800">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as TOption)}
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-3 text-sm font-bold outline-none transition focus:border-[#b9954b] focus:ring-4 focus:ring-[#f5e7e5]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {help ? <span className="mt-1 block text-xs leading-5 text-zinc-500">{help}</span> : null}
    </label>
  );
}

function ResultsSection({
  results,
  feedback,
  feedbackMessage,
  feedbackCopied,
  onChange,
  onCreateAnother,
  onFeedbackChange,
  onFeedbackCopy,
  onFeedbackSubmit
}: {
  results: PromptResult[];
  feedback: FeedbackState;
  feedbackMessage: string;
  feedbackCopied: boolean;
  onChange: (id: PromptResult["id"], text: string) => void;
  onCreateAnother: () => void;
  onFeedbackChange: (updates: Partial<FeedbackState>) => void;
  onFeedbackCopy: () => void;
  onFeedbackSubmit: () => void;
}) {
  return (
    <section className="rounded-lg border border-[#f0d9d6] bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b9954b]">Copy-ready results</p>
        <h2 className="mt-2 text-2xl font-black">Your prompts</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Generate prompts, edit the text if you want, then copy your favorite version into ChatGPT Images.
        </p>
      </div>

      {results.length === 0 ? (
        <div className="grid min-h-[480px] place-items-center rounded-lg border border-dashed border-[#e8c9c5] bg-[#fff8f9] p-8 text-center">
          <div>
            <p className="text-4xl font-black text-[#b9954b]">Let&apos;s Prompt It</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-600">
              Your simple, professional, ultra, negative, and usage-tip prompts will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <PromptCard key={result.id} result={result} onChange={onChange} />
          ))}

          <button
            type="button"
            onClick={onCreateAnother}
            className="w-full rounded-lg border border-[#b9954b] px-5 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-[#fff2f4]"
          >
            Create Another Prompt
          </button>

          <FeedbackSection
            feedback={feedback}
            feedbackMessage={feedbackMessage}
            feedbackCopied={feedbackCopied}
            onChange={onFeedbackChange}
            onCopy={onFeedbackCopy}
            onSubmit={onFeedbackSubmit}
          />
        </div>
      )}
    </section>
  );
}

function PromptCard({
  result,
  onChange
}: {
  result: PromptResult;
  onChange: (id: PromptResult["id"], text: string) => void;
}) {
  const [copyMessage, setCopyMessage] = useState("");

  async function copyPrompt() {
    await navigator.clipboard.writeText(result.text);
    setCopyMessage("Prompt copied! Now paste it into ChatGPT Images.");
    window.setTimeout(() => setCopyMessage(""), 1800);
  }

  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-black">{result.title}</h3>
        <button
          type="button"
          onClick={copyPrompt}
          className="rounded-lg border border-[#b9954b] px-3 py-2 text-xs font-black uppercase tracking-wide text-black transition hover:bg-[#fff2f4]"
        >
          Copy Prompt
        </button>
      </div>
      {copyMessage ? (
        <p className="mb-3 rounded-lg bg-[#fff8f0] px-3 py-2 text-sm font-bold text-[#8a6a2c]">{copyMessage}</p>
      ) : null}
      <textarea
        value={result.text}
        onChange={(event) => onChange(result.id, event.target.value)}
        className="min-h-36 w-full resize-y rounded-lg border border-zinc-200 bg-[#fffbfb] p-3 text-sm leading-6 outline-none transition focus:border-[#b9954b] focus:ring-4 focus:ring-[#f5e7e5]"
      />
    </article>
  );
}

function FeedbackSection({
  feedback,
  feedbackMessage,
  feedbackCopied,
  onChange,
  onCopy,
  onSubmit
}: {
  feedback: FeedbackState;
  feedbackMessage: string;
  feedbackCopied: boolean;
  onChange: (updates: Partial<FeedbackState>) => void;
  onCopy: () => void;
  onSubmit: () => void;
}) {
  return (
    <section className="rounded-lg border border-[#f0d9d6] bg-[#fffbfb] p-5">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b9954b]">Beta feedback</p>
      <h2 className="mt-2 text-2xl font-black">How Did Your Image Turn Out?</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Your answers stay on this page unless you copy them or open the optional feedback form.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <span className="mb-2 block text-sm font-black text-zinc-800">Experience rating</span>
          <div className="flex gap-2" role="radiogroup" aria-label="Experience rating">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                role="radio"
                aria-checked={feedback.rating === rating}
                aria-label={`${rating} star${rating === 1 ? "" : "s"}`}
                onClick={() => onChange({ rating })}
                className={`text-3xl transition ${
                  feedback.rating >= rating ? "text-[#b9954b]" : "text-zinc-300 hover:text-[#d6b35f]"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-sm font-black text-zinc-800">
            Did the image match what you imagined?
          </span>
          <div className="grid gap-2 sm:grid-cols-2">
            {(["Yes", "No"] as const).map((answer) => (
              <button
                key={answer}
                type="button"
                onClick={() => onChange({ matchedVision: answer })}
                className={`rounded-lg border px-4 py-3 text-sm font-black transition ${
                  feedback.matchedVision === answer
                    ? "border-[#b9954b] bg-[#fff2f4] text-black"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-[#e8c9c5]"
                }`}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>

        <SelectField
          label="What did you create?"
          value={feedback.designType}
          options={feedbackDesignTypes}
          onChange={(value) => onChange({ designType: value })}
        />

        <SelectField
          label="Which prompt did you use?"
          value={feedback.promptUsed}
          options={promptUsedOptions}
          onChange={(value) => onChange({ promptUsed: value })}
        />

        <TextAreaField
          label="What did you love about the result?"
          value={feedback.loved}
          onChange={(value) => onChange({ loved: value })}
          placeholder="Tell us what worked well."
        />
        <TextAreaField
          label="What should be improved?"
          value={feedback.improved}
          onChange={(value) => onChange({ improved: value })}
          placeholder="Tell us what felt off or confusing."
        />
        <TextAreaField
          label="What feature would you like added?"
          value={feedback.featureRequest}
          onChange={(value) => onChange({ featureRequest: value })}
          placeholder="Share your dream feature."
        />
        <TextField
          label="Paste a link to your generated image or screenshot, if available."
          value={feedback.imageLink}
          onChange={(value) => onChange({ imageLink: value })}
          placeholder="https://..."
        />

        {feedbackMessage ? (
          <p className="rounded-lg border border-[#f0d9d6] bg-white px-4 py-3 text-sm font-bold text-zinc-700">
            {feedbackMessage}
          </p>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onSubmit}
            className="rounded-lg bg-black px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-zinc-800"
          >
            Send My Feedback
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="rounded-lg border border-[#b9954b] px-5 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-[#fff2f4]"
          >
            {feedbackCopied ? "Feedback Copied" : "Copy My Feedback"}
          </button>
        </div>
      </div>
    </section>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-black text-zinc-800">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 w-full resize-y rounded-lg border border-zinc-200 bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-[#b9954b] focus:ring-4 focus:ring-[#f5e7e5]"
      />
    </label>
  );
}
