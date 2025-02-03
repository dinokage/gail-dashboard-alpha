"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type DrawingStatus = {
  name: string
  status: "Approved" | "Review in Progress" | "Yet to be Reviewed"
}

const drawingStatuses: DrawingStatus[] = [
  { name: "Piping and Instrumentation Diagram", status: "Approved" },
  { name: "Equipment Layout", status: "Review in Progress" },
  { name: "Electrical Single Line Diagram", status: "Yet to be Reviewed" },
  { name: "HVAC Layout", status: "Approved" },
  { name: "Pipeline Alignment Sheet", status: "Approved" },
  { name: "Valve Station Layout", status: "Review in Progress" },
  { name: "Cathodic Protection Diagram", status: "Yet to be Reviewed" },
]

const getStatusColor = (status: DrawingStatus["status"]) => {
  switch (status) {
    case "Approved":
      return "bg-green-500"
    case "Review in Progress":
      return "bg-yellow-500"
    case "Yet to be Reviewed":
      return "bg-orange-500"
  }
}

export default function StatusPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[800px]">
        <CardHeader>
          <CardTitle>Drawing Status Overview</CardTitle>
          <CardDescription>Current status of all drawings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Drawing Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drawingStatuses.map((drawing) => (
                <TableRow key={drawing.name}>
                  <TableCell>{drawing.name}</TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      <span className={`w-3 h-3 rounded-full ${getStatusColor(drawing.status)} mr-2`}></span>
                      {drawing.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

