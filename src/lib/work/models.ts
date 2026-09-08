export type StudioModel = {
  id: string;
  label: string;
  short: string;
  hint: string;
  maxTokens: number;
};

export const STUDIO_MODELS: StudioModel[] = [
  {
    id: "grok-4.6",
    label: "Grok 4.6",
    short: "4.6",
    hint: "Flagship · agents & code",
    maxTokens: 4200,
  },
  {
    id: "grok-4.5",
    label: "Grok 4.5",
    short: "4.5",
    hint: "Previous flagship",
    maxTokens: 3200,
  },
  {
    id: "grok-4.20",
    label: "Grok 4.20",
    short: "4.20",
    hint: "Long context",
    maxTokens: 3600,
  },
  {
    id: "grok-4.3",
    label: "Grok 4.3",
    short: "4.3",
    hint: "Fast mid-tier",
    maxTokens: 2400,
  },
  {
    id: "grok-build-0.1",
    label: "Grok Build",
    short: "Build",
    hint: "Vibecode",
    maxTokens: 4800,
  },
];

export const DEFAULT_MODEL_ID = "grok-4.6";

export const MODEL_IDS = new Set(STUDIO_MODELS.map((m) => m.id));

export function getModel(id: string | undefined | null): StudioModel {
  return STUDIO_MODELS.find((m) => m.id === id) ?? STUDIO_MODELS[0]!;
}
