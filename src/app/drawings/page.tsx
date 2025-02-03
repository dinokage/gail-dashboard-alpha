"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/AppContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

type DrawingFormat = "dwg" | "exl" | "pdf" | "hard copy"
type PaperSize = "A0" | "A1" | "A2" | "A3" | "A4"

type DrawingType = {
  name: string
  status: "green" | "yellow" | "orange"
  disabled?: boolean
  isAvailable: boolean
  availableSize: PaperSize[]
  availableFormat: DrawingFormat[]
  desiredSize: PaperSize
}

const stationDrawings: DrawingType[] = [
  {
    name: "A. Plot Plan",
    status: "green",
    isAvailable: true,
    availableSize: ["A1", "A2"],
    availableFormat: ["dwg", "pdf"],
    desiredSize: "A1"
  },
  {
    name: "B. Piping and Instrumentation Diagram",
    status: "yellow",
    isAvailable: true,
    availableSize: ["A0", "A1"],
    availableFormat: ["dwg", "pdf", "hard copy"],
    desiredSize: "A0"
  },
  { name: "C. Piping GAD", status: "orange", isAvailable: true, availableSize: ["A1"], availableFormat: ["dwg"], desiredSize: "A1" },
  { name: "D. Hazardous and Classification", status: "green", isAvailable: true, availableSize: ["A2"], availableFormat: ["pdf"], desiredSize: "A2" },
  { name: "E. Electrical Signalling Diagram", status: "green", isAvailable: true, availableSize: ["A3"], availableFormat: ["dwg", "pdf"], desiredSize: "A3" },
  { name: "F. Earthing / Lightning Protection GRID", status: "yellow", isAvailable: true, availableSize: ["A4"], availableFormat: ["pdf"], desiredSize: "A4" },
  { name: "G. CP System Drawing", status: "orange", isAvailable: true, availableSize: ["A1"], availableFormat: ["dwg"], desiredSize: "A1" },
  { name: "H. Building Plan & Elevations", status: "green", isAvailable: true, availableSize: ["A2"], availableFormat: ["pdf"], desiredSize: "A2" },
  { name: "I. Isometrics", status: "orange", disabled: true, isAvailable: false, availableSize: [], availableFormat: [], desiredSize: "A0" },
]

const junctionDrawings: DrawingType[] = [
  {
    name: "A. Single Line Diagram",
    status: "green",
    isAvailable: true,
    availableSize: ["A3", "A4"],
    availableFormat: ["pdf", "hard copy"],
    desiredSize: "A3"
  },
  {
    name: "B. Route Map",
    status: "yellow",
    isAvailable: false,
    availableSize: [],
    availableFormat: [],
    desiredSize: "A2"
  },
  { name: "C. Alignment Sheet", status: "orange", isAvailable: true, availableSize: ["A1"], availableFormat: ["dwg"], desiredSize: "A1" },
  { name: "D. Pipe Book", status: "green", isAvailable: true, availableSize: ["A2"], availableFormat: ["pdf"], desiredSize: "A2" },
  { name: "E. Crossing Section Drawings", status: "yellow", isAvailable: true, availableSize: ["A3"], availableFormat: ["dwg", "pdf"], desiredSize: "A3" },
  { name: "F. Original / Design cadastral Drawing", status: "orange", isAvailable: true, availableSize: ["A4"], availableFormat: ["pdf"], desiredSize: "A4" },
  { name: "G. As on Date / As Build Cadastral Drawing", status: "orange", isAvailable: true, availableSize: ["A1"], availableFormat: ["dwg"], desiredSize: "A1" },
]

function DrawingRow({ drawing: initialDrawing }: { drawing: DrawingType }) {
  const router = useRouter()
  const [drawing, setDrawing] = useState(initialDrawing)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof DrawingType, value: any) => {
    setDrawing(prev => ({ ...prev, [field]: value }))
  }

  const handleView = () => {
    if (!drawing.isAvailable) {
      alert("Drawing is not available")
      return
    }

    const params = new URLSearchParams({
      name: drawing.name,
      format: drawing.availableFormat[0] || "",
      size: drawing.availableSize[0] || "",
      status: drawing.status
    })

    router.push(`/preview?${params.toString()}`)
  }

  return (
    <div className="grid grid-cols-6 gap-2 items-center py-2 border-b">
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full bg-${drawing.status}-500`} />
        <span className="truncate">{drawing.name}</span>
      </div>
      
      <Select
        value={drawing.isAvailable ? "yes" : "no"}
        onValueChange={(value) => handleChange("isAvailable", value === "yes")}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yes">Yes</SelectItem>
          <SelectItem value="no">No</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={drawing.desiredSize}
        onValueChange={(value) => handleChange("desiredSize", value as PaperSize)}
        disabled={drawing.disabled || !drawing.isAvailable}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["A0", "A1", "A2", "A3", "A4"].map(size => (
            <SelectItem key={size} value={size}>{size}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={drawing.availableSize[0] || "none"}
        onValueChange={(value) => handleChange("availableSize", value === "none" ? [] : [value as PaperSize])}
        disabled={drawing.disabled || !drawing.isAvailable}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          {["A0", "A1", "A2", "A3", "A4"].map(size => (
            <SelectItem key={size} value={size}>{size}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={drawing.availableFormat[0] || "none"}
        onValueChange={(value) => handleChange("availableFormat", value === "none" ? [] : [value as DrawingFormat])}
        disabled={drawing.disabled || !drawing.isAvailable}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          {["dwg", "exl", "pdf", "hard copy"].map(format => (
            <SelectItem key={format} value={format}>{format.toUpperCase()}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        disabled={drawing.disabled || !drawing.isAvailable}
        onClick={handleView}
      >
        View
      </Button>
    </div>
  )
}

export default function DrawingsPage() {
  // const router = useRouter()
  const { station, isStation } = useAppContext()
  const drawings = isStation ? stationDrawings : junctionDrawings

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-[1200px]">
        <CardHeader>
          <CardTitle>{station}</CardTitle>
          <CardDescription>Select a drawing type to view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2 mb-4 font-medium">
            <div>Drawing Name</div>
            <div>Available</div>
            <div>Desired Size</div>
            <div>Available Size</div>
            <div>Format</div>
            <div>Action</div>
          </div>
          <div className="space-y-1">
            {drawings.map((drawing) => (
              <DrawingRow key={drawing.name} drawing={drawing} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

