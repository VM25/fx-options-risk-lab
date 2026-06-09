import attribution from "@/data/attribution-results.json";
import validation from "@/data/validation-summary.json";
import type { PnLAttribution, ValidationSummary } from "@/lib/types";

export const attributionResults = attribution as PnLAttribution[];
export const validationSummary = validation as ValidationSummary;
