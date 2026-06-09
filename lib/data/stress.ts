import spot from "@/data/spot-shocks.json";
import vol from "@/data/vol-shocks.json";
import stress from "@/data/stress-grid.json";
import type {
  SpotShockResult,
  VolShockResult,
  StressGridPoint,
  StressSummary,
} from "@/lib/types";

export const spotShocks = spot as SpotShockResult[];
export const volShocks = vol as VolShockResult[];
export const stressGrid = (stress as { grid: StressGridPoint[] }).grid;
export const stressSummary = (stress as { summary: StressSummary }).summary;
