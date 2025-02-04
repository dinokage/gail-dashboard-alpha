"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

// import { useAppContext } from "@/context/AppContext"


type Comment = {
  text: string
  timestamp: string
}

export default function PreviewPage() {
  const searchParams = useSearchParams()
  const drawingName = searchParams.get("drawing") || ""
  // const { station, isStation } = useAppContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [drawingUrl, setDrawingUrl] = useState<string>("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>("")
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")


  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, timestamp: new Date().toLocaleString() }])
      setNewComment("")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-8">
        <Card>
          <CardHeader>
            <CardTitle>{drawingName}</CardTitle>
            <CardDescription>Drawing Preview</CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : drawingUrl ? (
              <></>
            ) : (
              <div className="bg-gray-200 h-[600px] flex items-center justify-center">
                <p>Loading drawing...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="w-1/3 p-8">
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <p>{comment.text}</p>
                  <p className="text-sm text-gray-500 mt-1"  >{comment.timestamp}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <Button onClick={handleAddComment}>Add Comment</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

