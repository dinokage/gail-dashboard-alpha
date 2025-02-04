"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/AppContext"
import { regions } from "@/lib/regionData"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"

export default function ItemsPage() {
  const router = useRouter()
  const { region, setStation, setIsStation } = useAppContext()
  const [showingType, setShowingType] = useState<"none" | "stations" | "junctions">("none")

  const regionData = regions[region as keyof typeof regions] || { stations: [], pipelineJunctions: [] }

  const handleItemSelect = (item: string, isStation: boolean) => {
    setStation(item)
    setIsStation(isStation)
    router.push("/drawings")
  }

  const renderInitialChoice = () => (
    <div className="grid grid-cols-2 gap-8">
      <Button
        onClick={() => setShowingType("stations")}
        variant="outline"
        className="h-40 text-xl"
      >
        Stations
      </Button>
      <Button
        onClick={() => setShowingType("junctions")}
        variant="outline"
        className="h-40 text-xl"
      >
        Pipeline Junctions
      </Button>
    </div>
  )

  const renderTable = (type: "stations" | "junctions") => {
    const items = type === "stations" ? regionData.stations : regionData.pipelineJunctions
    
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => setShowingType("none")} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to selection
        </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              {type === "junctions" && <TableHead>Pipe Size</TableHead>}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                {type === "junctions" && (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <TableCell>{(item as any).pipeSize || "N/A"}</TableCell>
                )}
                <TableCell>
                  <Button
                    onClick={() => handleItemSelect(item.name, type === "stations")}
                    variant="outline"
                  >
                    Select
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-[1200px]">
        <CardHeader>
          <CardTitle>{region}</CardTitle>
          <CardDescription>
            {showingType === "none" 
              ? "Select type of location" 
              : `Select from available ${showingType}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showingType === "none" 
            ? renderInitialChoice()
            : renderTable(showingType)}
        </CardContent>
      </Card>
    </div>
  )
}

