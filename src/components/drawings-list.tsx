"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select" // Import Select components
import { useState } from "react"

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
  const [availability, setAvailability] = useState<{ [key: string]: string }>({})

  const handleDrawingSelect = (drawing: string) => {
    router.push(`/preview?drawing=${encodeURIComponent(drawing)}`)
  }

  const handleAvailabilityChange = (drawingName: string, value: string) => {
    setAvailability((prev) => ({ ...prev, [drawingName]: value }))
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{station}</CardTitle>
          <CardDescription>Select a drawing type to view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {drawings.map((drawing) => (
              <div key={drawing.name} className="flex items-center space-x-2">
                <Button
                  onClick={() => handleDrawingSelect(drawing.name)}
                  variant="outline"
                  className="flex-1 justify-start"
                  disabled={drawing.disabled}
                >
                  <span className={`w-3 h-3 rounded-full bg-${drawing.status}-500`}></span>
                  <span>{drawing.name}</span>
                </Button>
                <Select onValueChange={(value) => handleAvailabilityChange(drawing.name, value)}  >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Available" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <Select disabled={availability[drawing.name] === "no"}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A0">A0</SelectItem>
                    <SelectItem value="A1">A1</SelectItem>
                    <SelectItem value="A2">A2</SelectItem>
                    <SelectItem value="A3">A3</SelectItem>
                    <SelectItem value="A4">A4</SelectItem>
                  </SelectContent>
                </Select>
                <Select disabled={availability[drawing.name] === "no"}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dwg">DWG</SelectItem>
                    <SelectItem value="exl">EXL</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="hard copy">Hard Copy</SelectItem>
                  </SelectContent>
                </Select>
                <Select disabled={availability[drawing.name] === "no"}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Desired size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A0">A0</SelectItem>
                    <SelectItem value="A1">A1</SelectItem>
                    <SelectItem value="A2">A2</SelectItem>
                    <SelectItem value="A3">A3</SelectItem>
                    <SelectItem value="A4">A4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
