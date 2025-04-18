"use client";
import { use } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { regions } from "@/lib/regionData"
import { notFound } from "next/navigation"
import  DrawingsList  from "@/components/drawings-list"

export default function DrawingsPage(
  props: { 
    params: Promise<{ 
      region: string
      item: "stations" | "junctions"
      code: string
    }> 
  }
) {
  const params = use(props.params);
  const {region, item} = params
  const regionData = regions[region]
  if (!regionData) {
    notFound()
  }

  const items = item === "stations" ? regionData.stations : regionData.pipelineJunctions
  const selectedItem = items.find(item => item.code === params.code)

  if (!selectedItem) {
    notFound()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-100">
      <Card className="w-full max-w-[1200px]">
        <CardHeader>
          <CardTitle>{selectedItem.name}</CardTitle>
          <CardDescription>Select a drawing type to view</CardDescription>
        </CardHeader>
        <CardContent>
          <DrawingsList isStation={item === "stations"} station={item} />
        </CardContent>
      </Card>
    </div>
  )
}
