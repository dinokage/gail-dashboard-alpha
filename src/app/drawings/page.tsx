"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/AppContext"

type DrawingType = {
  name: string
  status: "green" | "yellow" | "orange"
  disabled?: boolean
}

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

export default function DrawingsPage() {
  const router = useRouter()
  const { station, isStation } = useAppContext()

  const drawings = isStation ? stationDrawings : junctionDrawings

  const handleDrawingSelect = (drawing: string) => {
    router.push(`/preview?drawing=${encodeURIComponent(drawing)}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-100">
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

