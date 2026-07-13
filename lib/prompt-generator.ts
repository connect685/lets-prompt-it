import type { PromptFormState, PromptResult } from "@/lib/prompt-types";

const fallback = {
  subject: "the main subject",
  name: "the brand, school, or team",
  slogan: "the chosen phrase",
  audience: "the intended audience",
  purpose: "the design goal",
  primary: "the primary color",
  secondary: "the secondary color",
  accent: "a refined accent color",
  background: "a clean background preference"
};

export function generatePromptResults(form: PromptFormState): PromptResult[] {
  const subject = clean(form.mainSubject, fallback.subject);
  const name = clean(form.name, fallback.name);
  const slogan = clean(form.slogan, "");
  const audience = clean(form.audience, fallback.audience);
  const purpose = clean(form.purpose, fallback.purpose);
  const style = form.style === "Custom Style" ? clean(form.customStyle, "a custom premium visual style") : form.style;
  const colors = `${clean(form.primaryColor, fallback.primary)}, ${clean(form.secondaryColor, fallback.secondary)}, and ${clean(form.accentColor, fallback.accent)}`;
  const effects = form.effects.length > 0 ? form.effects.join(", ") : "subtle premium finishing details";
  const phraseLine = slogan ? ` Include the phrase "${slogan}" with clean, readable typography.` : "";
  const popDirection =
    "Use bold, vibrant colors with strong contrast so the design pops immediately and feels exciting at first sight.";

  const simple = `Create a polished ${form.outputType.toLowerCase()} for ${name} featuring ${subject}. Use a ${style} style with ${colors}. Design it for ${audience} and make it useful for ${purpose}.${phraseLine} Use a ${form.layout.toLowerCase()} layout with ${effects}. ${popDirection} Keep the design clean, high-quality, balanced, modern, and easy to understand with a strong focal point and crisp readable typography.`;

  const professional = `Create a professional ${form.creationType.toLowerCase()} as a ${form.outputType.toLowerCase()} featuring ${subject} for ${name}. The design should feel ${style.toLowerCase()}, premium, visually striking, and intentionally composed for ${audience}. Use ${colors} as the main color palette, with ${clean(form.backgroundPreference, fallback.background)}. Build the composition in a ${form.layout.toLowerCase()} format and include ${effects} as tasteful visual effects.${phraseLine} ${popDirection} Prioritize high contrast, dramatic lighting, clean spacing, crisp edges, polished professional artwork, readable typography, a strong focal point, balanced layout, and a premium designer-quality finish suitable for ${purpose}.`;

  const ultra = `Create a premium ${form.outputType} featuring ${subject} for ${name}. Use a ${style} visual direction with ${colors}. The design should serve ${audience} and support this purpose: ${purpose}.${phraseLine} Compose the artwork in a ${form.layout} format with ${effects}. ${popDirection} Create a high-impact, love-at-first-sight design with vivid color energy, premium lighting, clean edges, layered details, and a polished professional finish. Use thoughtful hierarchy, clean readable typography, refined texture, dramatic lighting, crisp edges, strong contrast, a powerful focal point, balanced layout, and a modern creative style. Background preference: ${clean(form.backgroundPreference, fallback.background)}. Make the final result eye-catching, polished, high-quality, visually balanced, professional, and ready to paste into ChatGPT Images or another AI image tool. Avoid clutter and keep the main subject clear.`;

  const negative = `Avoid blurry or low-quality output, dull colors, flat design, boring layout, weak contrast, unreadable typography, cluttered composition, amateur design, low-impact artwork, misspelled words, messy composition, distorted logos, extra fingers, warped faces, strange anatomy, random objects, flat lighting, muddy colors, pixelation, overcomplicated backgrounds, off-brand colors, awkward spacing, low contrast, and any design that looks unfinished or amateur.`;

  const tips = `Paste one prompt into ChatGPT Images, then upload or describe any reference material if needed. If the first result is close, ask for one focused improvement at a time, such as "make the text more readable," "use more ${clean(form.primaryColor, "primary color")} accents," or "simplify the background." For text-heavy designs, keep phrases short and ask for bold, clean, readable typography.`;

  return [
    { id: "simple", title: "Simple Prompt", text: simple },
    { id: "professional", title: "Professional Prompt", text: professional },
    { id: "ultra", title: "Ultra Prompt", text: ultra },
    { id: "negative", title: "Negative Prompt", text: negative },
    { id: "tips", title: "Usage Tips", text: tips }
  ];
}

function clean(value: string, fallbackValue: string) {
  return value.trim() || fallbackValue;
}
