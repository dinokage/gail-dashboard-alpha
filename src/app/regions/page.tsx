"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/AppContext"

const regions = ["TARAPUR", "DUPL-BELAPUR", "TROMBAY", "DPPL-BELAPUR", "THAL-MANGAON", "PUNE", "DHABOL"]

export default function RegionSelectionPage() {
  const router = useRouter()
  const { setRegion } = useAppContext()

  const handleRegionSelect = (region: string) => {
    setRegion(region)
    router.push("/items")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Select a Region</CardTitle>
          <CardDescription>Choose a region to view its stations and pipeline junctions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {regions.map((region) => (
              <Button key={region} onClick={() => handleRegionSelect(region)} variant="outline" className="h-20" >
                {region}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
