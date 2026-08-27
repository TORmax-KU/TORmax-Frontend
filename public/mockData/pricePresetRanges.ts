import { Language } from "./Language";

export interface PricePresetRange {
  label: string;
  min: number;
  max: number;
}

export const pricePresetRanges: Record<Language, PricePresetRange[]> = {
  en: [
    { label: "Under 50K", min: 0, max: 50000 },
    { label: "50K - 200K", min: 50000, max: 200000 },
    { label: "200K - 500K", min: 200000, max: 500000 },
    { label: "500K - 1M", min: 500000, max: 1000000 },
    { label: "1M - 5M", min: 1000000, max: 5000000 },
    { label: "5M+", min: 5000000, max: 100000000 }
  ],
  th: [
    { label: "ต่ำกว่า 50K", min: 0, max: 50000 },
    { label: "50K - 200K", min: 50000, max: 200000 },
    { label: "200K - 500K", min: 200000, max: 500000 },
    { label: "500K - 1M", min: 500000, max: 1000000 },
    { label: "1M - 5M", min: 1000000, max: 5000000 },
    { label: "5M+", min: 5000000, max: 100000000 }
  ]
};