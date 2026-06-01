// Minimal stub store to satisfy imports during development.
// Replace with the app's actual state management (e.g., Zustand) later.
export function useExtractStore() {
  return {
    extracts: [] as any[],
    setExtracts: (_: any[]) => {},
    addExtract: (_: any) => {},
    clearExtracts: () => {},
  };
}
