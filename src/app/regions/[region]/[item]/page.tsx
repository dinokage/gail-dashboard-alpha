import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { regions, Station } from "@/lib/regionData"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React from "react"

export default async function ItemsPage(
  props: { 
    params: Promise<{ region: string; item: "stations" | "junctions" }> 
  }
) {
  const params = await props.params;
  const { region, item } = params
  const regionData = regions[region]

  if (!regionData) {
    notFound()
  }

  const items = params.item === "stations" ? regionData.stations : regionData.pipelineJunctions

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-[1200px]">
        <CardHeader>
          <CardTitle>{params.region.replace("_", " ")}</CardTitle>
          <CardDescription>Select from available {params.item}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Major/Minor</TableHead>
                {item === "junctions" && <TableHead>Pipe Size</TableHead>}
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  
                    <TableCell>{(item as Station).isMajor ? "Major" : "Minor"}</TableCell>
                 
                  {params.item === "junctions" && 'pipeSize' in item ? (
                    <TableCell>{item.pipeSize}</TableCell>
                  ) :( <TableCell>{"N/A"}</TableCell>)}
                  <TableCell>
                    <Link href={`/regions/${params.region}/${params.item}/${item.code}/drawings`}>
                      <Button variant="outline">Select</Button>
                    </Link>
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
