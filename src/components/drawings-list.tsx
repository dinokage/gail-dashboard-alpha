"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
type DrawingFormat = "dwg" | "exl" | "pdf" | "hard copy"
type PaperSize = "A0" | "A1" | "A2" | "A3" | "A4"

type DrawingType = {
  name: string
  status: "green" | "yellow" | "orange"
  disabled?: boolean
  isAvailable?: boolean
  availableSize?: PaperSize[]
  availableFormat?: DrawingFormat[]
  desiredSize?: PaperSize
}

// Move the drawings data here
const stationDrawings: DrawingType[] = [
    { name: "A. Plot Plan", status: "green" },
    { name: "B. Piping and Instrumentation Diagram", status: "yellow" },
    { name: "C. Piping GAD", status: "orange" },
    { name: "D. Hazardous and Classification", status: "green" },
    { name: "E. Electrical Signalling Diagram", status: "green" },
    { name: "F. Earthing / Lightning Protection GRID", status: "yellow" },
    { name: "G. CP System Drawing", status: "orange" },
    { name: "H. Building Plan & Elevations", status: "green" },
    { name: "I. Isometrics", status: "orange", disabled: true },
  ]
  
  const junctionDrawings: DrawingType[] = [
    { name: "A. Single Line Diagram", status: "green" },
    { name: "B. Route Map", status: "yellow" },
    { name: "C. Alignment Sheet", status: "orange" },
    { name: "D. Pipe Book", status: "green" },
    { name: "E. Crossing Section Drawings", status: "yellow" },
    { name: "F. Original / Design cadastral Drawing", status: "orange" },
    { name: "G. As on Date / As Build Cadastral Drawing", status: "orange" },
  ]

export default function DrawingsList({ isStation, station }: { isStation: boolean, station: string }) {
  const router = useRouter()
  const drawings = isStation ? stationDrawings : junctionDrawings
  

  const handleDrawingSelect = (drawing: string) => {
    router.push(`/preview?drawing=${encodeURIComponent(drawing)}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>{station}</CardTitle>
          <CardDescription>Select a drawing type to view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {drawings.map((drawing) => (
              <Button
                key={drawing.name}
                onClick={() => handleDrawingSelect(drawing.name)}
                variant="outline"
                className="w-full justify-between"
                disabled={drawing.disabled}
              >
                <span>{drawing.name}</span>
                <span className={`w-3 h-3 rounded-full bg-${drawing.status}-500`}></span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
