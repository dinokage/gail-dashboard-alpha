"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { regions } from "@/lib/regionData"

export default function RegionSelectionPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Select a Region</CardTitle>
          <CardDescription>Choose a region to view its stations and pipeline junctions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(regions).map((region) => (
              <Link key={region} href={`/regions/${region}`}>
                <Button variant="outline" className="w-full h-20">
                  {region.replace("_", " ")}
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
