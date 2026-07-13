import type { creationTypes, effectOptions, layoutOptions, outputTypes, styleOptions } from "@/lib/prompt-options";

export type CreationType = (typeof creationTypes)[number];
export type StyleOption = (typeof styleOptions)[number];
export type LayoutOption = (typeof layoutOptions)[number];
export type EffectOption = (typeof effectOptions)[number];
export type OutputType = (typeof outputTypes)[number];

export type PromptFormState = {
  creationType: CreationType;
  mainSubject: string;
  name: string;
  slogan: string;
  audience: string;
  purpose: string;
  style: StyleOption;
  customStyle: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundPreference: string;
  layout: LayoutOption;
  effects: EffectOption[];
  outputType: OutputType;
};

export type PromptResult = {
  id: "simple" | "professional" | "ultra" | "negative" | "tips";
  title: string;
  text: string;
};
