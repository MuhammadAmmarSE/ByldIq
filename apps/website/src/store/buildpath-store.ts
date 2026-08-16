import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

import type {
  AiFeatureSuggestion,
  BuildPathAnswers,
  BuildPathStage,
  ConversationMessage,
  DiscoveryAnswers,
  EntryContext,
  IntegrationCategory,
  ProblemStatement,
  ProductFeature,
  ProjectType,
  TargetUserGroup,
} from "@/features/buildpath/types";
import { defaultDiscoveryAnswers, defaultProblemStatement } from "@/features/buildpath/types";

export const defaultBuildPathAnswers: BuildPathAnswers = {
  stage: "idea",
  entryContext: null,
  projectTypes: [],
  conversation: [],
  discovery: defaultDiscoveryAnswers,
  problemStatement: defaultProblemStatement,
  targetUserGroups: [],
  features: [],
  aiSuggestions: [],
  integrations: [],
  canvasExtras: { platforms: [], constraints: "" },
  startedAt: null,
  completedAt: null,
};

export interface BuildPathActions {
  /** True once `persist.rehydrate()` has resolved for this store instance — see `BuildPathStoreProvider`. Not part of `BuildPathAnswers`; it's runtime-only, not a visitor answer. */
  setHasHydrated: (value: boolean) => void;
  setStage: (stage: BuildPathStage) => void;
  /** Applies referrer context (CLAUDE.md §2) only on a genuinely fresh session — never overwrites an in-progress plan. */
  applyEntryContext: (context: EntryContext, prefillProjectTypes: ProjectType[]) => void;
  toggleProjectType: (type: ProjectType) => void;
  addConversationMessage: (message: ConversationMessage) => void;
  updateDiscovery: (patch: Partial<DiscoveryAnswers>) => void;
  updateProblemStatement: (patch: Partial<ProblemStatement>) => void;
  confirmProblemStatement: () => void;
  addTargetUserGroup: (group: TargetUserGroup) => void;
  updateTargetUserGroup: (id: string, patch: Partial<TargetUserGroup>) => void;
  removeTargetUserGroup: (id: string) => void;
  addFeature: (feature: ProductFeature) => void;
  updateFeature: (id: string, patch: Partial<ProductFeature>) => void;
  removeFeature: (id: string) => void;
  setAiSuggestions: (suggestions: AiFeatureSuggestion[]) => void;
  acceptAiSuggestion: (id: string) => void;
  ignoreAiSuggestion: (id: string) => void;
  toggleIntegration: (category: IntegrationCategory) => void;
  updateCanvasExtras: (patch: Partial<BuildPathAnswers["canvasExtras"]>) => void;
  markCompleted: () => void;
  reset: () => void;
}

export type BuildPathStore = BuildPathAnswers & BuildPathActions & { hasHydrated: boolean };

/** Same private-browsing/quota fallback as `app-store.ts` — CLAUDE.md Part 10: "Storage blocked -> Session memory." */
function createSafeStorage(): StateStorage {
  const memory = new Map<string, string>();
  return {
    getItem: (name) => {
      try {
        return localStorage.getItem(name);
      } catch {
        return memory.get(name) ?? null;
      }
    },
    setItem: (name, value) => {
      try {
        localStorage.setItem(name, value);
      } catch {
        memory.set(name, value);
      }
    },
    removeItem: (name) => {
      try {
        localStorage.removeItem(name);
      } catch {
        memory.delete(name);
      }
    },
  };
}

/**
 * Factory rather than a module-level singleton, for the same SSR-safety
 * reason as `createAppStore`. Answers persist (CLAUDE.md §26: "Visitors
 * should be able to save progress, resume later" — "Anonymous sessions
 * can initially use local/session persistence"); generated recommendations
 * (architecture, technology, roadmap, effort, risks, summary) deliberately
 * aren't part of this store at all — see `types.ts`'s doc comment.
 */
export function createBuildPathStore(initState: BuildPathAnswers = defaultBuildPathAnswers) {
  return createStore<BuildPathStore>()(
    persist(
      (set) => ({
        ...initState,
        hasHydrated: false,
        setHasHydrated: (value) => set({ hasHydrated: value }),
        setStage: (stage) => set({ stage }),
        applyEntryContext: (context, prefillProjectTypes) =>
          set((state) => {
            // Never clobber an in-progress plan with a new referrer's context.
            // Stamping startedAt here (rather than leaving it null until some
            // later "real" action) is what makes that guard actually fire on
            // a second visit — this is the first thing that happens on every
            // fresh /buildpath load.
            if (state.startedAt) return {};
            return {
              entryContext: context,
              projectTypes:
                prefillProjectTypes.length > 0 ? prefillProjectTypes : state.projectTypes,
              startedAt: new Date().toISOString(),
            };
          }),
        toggleProjectType: (type) =>
          set((state) => ({
            projectTypes: state.projectTypes.includes(type)
              ? state.projectTypes.filter((candidate) => candidate !== type)
              : [...state.projectTypes, type],
          })),
        addConversationMessage: (message) =>
          set((state) => ({ conversation: [...state.conversation, message] })),
        updateDiscovery: (patch) =>
          set((state) => ({ discovery: { ...state.discovery, ...patch } })),
        updateProblemStatement: (patch) =>
          set((state) => ({
            problemStatement: { ...state.problemStatement, ...patch, confirmed: false },
          })),
        confirmProblemStatement: () =>
          set((state) => ({ problemStatement: { ...state.problemStatement, confirmed: true } })),
        addTargetUserGroup: (group) =>
          set((state) => ({ targetUserGroups: [...state.targetUserGroups, group] })),
        updateTargetUserGroup: (id, patch) =>
          set((state) => ({
            targetUserGroups: state.targetUserGroups.map((group) =>
              group.id === id ? { ...group, ...patch } : group,
            ),
          })),
        removeTargetUserGroup: (id) =>
          set((state) => ({
            targetUserGroups: state.targetUserGroups.filter((group) => group.id !== id),
          })),
        addFeature: (feature) => set((state) => ({ features: [...state.features, feature] })),
        updateFeature: (id, patch) =>
          set((state) => ({
            features: state.features.map((feature) =>
              feature.id === id ? { ...feature, ...patch } : feature,
            ),
          })),
        removeFeature: (id) =>
          set((state) => ({ features: state.features.filter((feature) => feature.id !== id) })),
        setAiSuggestions: (suggestions) => set({ aiSuggestions: suggestions }),
        acceptAiSuggestion: (id) =>
          set((state) => ({
            aiSuggestions: state.aiSuggestions.map((suggestion) =>
              suggestion.id === id ? { ...suggestion, status: "added" } : suggestion,
            ),
          })),
        ignoreAiSuggestion: (id) =>
          set((state) => ({
            aiSuggestions: state.aiSuggestions.map((suggestion) =>
              suggestion.id === id ? { ...suggestion, status: "ignored" } : suggestion,
            ),
          })),
        toggleIntegration: (category) =>
          set((state) => ({
            integrations: state.integrations.includes(category)
              ? state.integrations.filter((candidate) => candidate !== category)
              : [...state.integrations, category],
          })),
        updateCanvasExtras: (patch) =>
          set((state) => ({ canvasExtras: { ...state.canvasExtras, ...patch } })),
        markCompleted: () => set({ completedAt: new Date().toISOString() }),
        reset: () => set({ ...defaultBuildPathAnswers, startedAt: new Date().toISOString() }),
      }),
      {
        name: "byld-iq-buildpath-store",
        storage: createJSONStorage(() => createSafeStorage()),
        skipHydration: true,
      },
    ),
  );
}
