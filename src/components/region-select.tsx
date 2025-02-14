import { Junction, regions, type Station } from "@/lib/regionData";
import { getRegionData } from "@/lib/utils";
import { useState } from "react";

export function RegionSelect() {
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const regionData = selectedRegion ? getRegionData(selectedRegion) : null;
    return (
        <div className="space-y-4">
            <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-2 border rounded-md"
            >
                <option value="">Select a region</option>
                {Object.keys(regions).map((region) => (
                    <option key={region} value={region}>
                        {region.replace("_", " ")}
                    </option>
                ))}
            </select>

            {regionData && (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Stations</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {regionData.stations.map((station: Station) => (
                                <li key={station.code}>{station.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold">Pipeline Junctions</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {regionData.pipelineJunctions.map((junction: Junction) => (
                                <li key={junction.code}>{junction.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
