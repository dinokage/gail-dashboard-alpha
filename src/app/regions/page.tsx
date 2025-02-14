"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { regions } from "@/lib/regionData"

export default function RegionSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen overflow-scroll bg-cyan-100">
      <header className="w-full bg-blue-600 text-white p-4 mt-6">
        <h1 className="text-center text-2xl font-bold">EDMS</h1>
      </header>
      <div className="flex flex-grow items-center justify-center mt-6">
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
      <div className="flex justify-center mt-6">
        <Image src="/pipeline-network.png" alt="Pipeline Network" className="w-full h-auto pb-20" width={600} height={300} />
      </div>
    </div>
  )
}
