import varEs from "@/data/var-es-results.json";
import limits from "@/data/risk-limits.json";
import type { RiskMeta, RiskLimitStatus } from "@/lib/types";

export const riskMeta = varEs as RiskMeta;
export const varEsResults = riskMeta.varEs;
export const histogram = riskMeta.histogram;
export const riskLimits = limits as RiskLimitStatus[];
