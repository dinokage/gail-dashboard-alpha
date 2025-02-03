import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRegionData(regionName: string) {
    const regionData = regions[regionName as keyof typeof regions];
    return {
        stations: regionData?.stations || [],
        pipelineJunctions: regionData?.pipelineJunctions || []
    };
}
