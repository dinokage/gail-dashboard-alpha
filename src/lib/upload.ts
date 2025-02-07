export async function uploadDrawing(drawingName: string, file: File): Promise<{ success: boolean }> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("drawingName", drawingName)

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      return { success: true }
    } else {
      return { success: false }
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    return { success: false }
  }
}
