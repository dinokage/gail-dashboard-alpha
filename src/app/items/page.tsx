"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/AppContext"

const stations = ["DT-DABHOL", "SV-4 Khudukkhurd", "SV-5 Hatip", "SV-6 Jalgaon", "SV-7 Vinoshi"]
const pipelineJunctions = ["DPPL_IP2 USARGHAR-RT DABHOL", "Dabhol DT - Patgaon  IP-1"]

export default function ItemsPage() {
  const router = useRouter()
  const { region, setStation, setIsStation } = useAppContext()

  const handleItemSelect = (item: string, isStation: boolean) => {
    setStation(item)
    setIsStation(isStation)
    router.push("/drawings")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[800px]">
        <CardHeader>
          <CardTitle>{region}</CardTitle>
          <CardDescription>Select a station or pipeline junction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Stations</h3>
              <div className="space-y-2">
                {stations.map((station) => (
                  <Button
                    key={station}
                    onClick={() => handleItemSelect(station, true)}
                    variant="outline"
                    className="w-full"
                  >
                    {station}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Pipeline Junctions</h3>
              <div className="space-y-2">
                {pipelineJunctions.map((junction) => (
                  <Button
                    key={junction}
                    onClick={() => handleItemSelect(junction, false)}
                    variant="outline"
                    className="w-full"
                  >
                    {junction}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

