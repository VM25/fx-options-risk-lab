import book from "@/data/options-book.json";
import pricing from "@/data/pricing-results.json";
import greeks from "@/data/greeks-results.json";
import type { FXOption, PricingResult, GreeksResult, BookSummary } from "@/lib/types";

export const optionsBook = book as FXOption[];
export const pricingResults = (pricing as { instruments: PricingResult[] }).instruments;
export const greeksResults = (greeks as { instruments: GreeksResult[] }).instruments;
export const bookSummary = (pricing as { summary: BookSummary }).summary;
