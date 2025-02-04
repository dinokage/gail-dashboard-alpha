import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { regions } from "@/lib/regionData"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function RegionPage({ params }: { params: { region: string } }) {
  const regionData = regions[params.region]
  
  if (!regionData) {
    notFound()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-[1200px]">
        <CardHeader>
          <CardTitle>{params.region.replace("_", " ")}</CardTitle>
          <CardDescription>Select type of location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <Link href={`/regions/${params.region}/stations`}>
              <Button variant="outline" className="w-full h-40 text-xl">
                Stations
              </Button>
            </Link>
            <Link href={`/regions/${params.region}/junctions`}>
              <Button variant="outline" className="w-full h-40 text-xl">
                Pipeline Junctions
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
