"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import Input
import { Label } from "@/components/ui/label"; // Import Label
import { ArrowLeft, PlusCircle } from "lucide-react"; // For back button icon and add icon

import { UploadCloud } from "lucide-react"; // Icon for upload

interface Drawing { // Added Drawing interface
  id: string;
  originalName: string;
  fileName: string; // MinIO filename
  size: number;
  createdAt: string; // Or Date
}

interface Station {
  id: string;
  name: string;
  drawings?: Drawing[]; // Optional: include drawings here if API provides them
}

interface Region {
  id: string;
  name: string;
}

interface RegionDetailData {
  region: Region;
  stations: Station[];
}

export default function RegionDetailPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const params = useParams();
  const regionId = params.regionId as string;

  const [regionData, setRegionData] = useState<RegionDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for creating a new station
  const [newStationName, setNewStationName] = useState("");
  const [showCreateStationForm, setShowCreateStationForm] = useState(false);
  const [isCreatingStation, setIsCreatingStation] = useState(false);
  const [createStationError, setCreateStationError] = useState<string | null>(null);
  const [createStationSuccess, setCreateStationSuccess] = useState<string | null>(null);

  // State for drawing upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedStationIdForUpload, setSelectedStationIdForUpload] = useState<string | null>(null);
  const [isUploadingDrawing, setIsUploadingDrawing] = useState(false);
  const [uploadDrawingError, setUploadDrawingError] = useState<string | null>(null);
  const [uploadDrawingSuccess, setUploadDrawingSuccess] = useState<string | null>(null);

  // State for viewing/downloading drawing
  const [viewingDrawingId, setViewingDrawingId] = useState<string | null>(null);
  const [viewDrawingError, setViewDrawingError] = useState<string | null>(null);


  const fetchRegionDetails = async () => {
    if (!regionId) return;
    setLoading(true);
    setError(null); 
    // Reset drawing upload states when refetching
    setUploadDrawingError(null);
    setUploadDrawingSuccess(null);
    setSelectedFile(null);
    // Keep selectedStationIdForUpload as is, or reset if desired
    try {
      const response = await fetch(`/api/regions/${regionId}/stations`); // This API needs to be updated to return drawings too
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch region details: ${response.status}`);
      }
      const data: RegionDetailData = await response.json();
      setRegionData(data);
    } catch (err: any) {
      console.error(`Error fetching details for region ${regionId}:`, err);
      setError(err.message || "An unexpected error occurred while fetching region details.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/");
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    if (sessionStatus === "authenticated" && regionId) {
      fetchRegionDetails();
    }
  }, [sessionStatus, regionId]);

  const handleCreateStation = async (event: FormEvent) => {
    event.preventDefault();
    if (!newStationName.trim()) {
      setCreateStationError("Station name cannot be empty.");
      return;
    }
    setIsCreatingStation(true);
    setCreateStationError(null);
    setCreateStationSuccess(null);

    try {
      const response = await fetch(`/api/regions/${regionId}/stations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newStationName.trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create station.");
      }
      setCreateStationSuccess(`Station "${data.name}" created successfully!`);
      setNewStationName("");
      setShowCreateStationForm(false); 
      await fetchRegionDetails(); 
    } catch (err: any) {
      console.error("Error creating station:", err);
      setCreateStationError(err.message || "An unexpected error occurred while creating the station.");
    } finally {
      setIsCreatingStation(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setUploadDrawingError(null); // Clear previous error on new file selection
      setUploadDrawingSuccess(null);
    } else {
      setSelectedFile(null);
    }
  };

  const handleDrawingUpload = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile || !selectedStationIdForUpload) {
      setUploadDrawingError("Please select a file and ensure a station is targeted.");
      return;
    }

    setIsUploadingDrawing(true);
    setUploadDrawingError(null);
    setUploadDrawingSuccess(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("stationId", selectedStationIdForUpload);
    // formData.append("originalName", selectedFile.name); // Backend uses file.name

    try {
      const response = await fetch("/api/drawings/upload", {
        method: "POST",
        body: formData,
        // Headers are not explicitly set for FormData; browser sets Content-Type to multipart/form-data
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to upload drawing.");
      }
      setUploadDrawingSuccess(`Drawing "${data.drawing.originalName}" uploaded successfully!`);
      setSelectedFile(null); // Clear file input
      // setSelectedStationIdForUpload(null); // Keep station selected or clear, based on desired UX
      await fetchRegionDetails(); // Refresh data to show new drawing
    } catch (err: any) {
      console.error("Error uploading drawing:", err);
      setUploadDrawingError(err.message || "An unexpected error occurred during upload.");
    } finally {
      setIsUploadingDrawing(false);
    }
  };

  const handleViewDrawing = async (drawingId: string) => {
    setViewingDrawingId(drawingId);
    setViewDrawingError(null);
    try {
      const response = await fetch(`/api/drawings/${drawingId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get drawing URL.");
      }
      const data = await response.json();
      if (data.presignedUrl) {
        window.open(data.presignedUrl, "_blank"); // Open in new tab
      } else {
        throw new Error("Presigned URL not found in response.");
      }
    } catch (err: any) {
      console.error("Error fetching drawing URL:", err);
      setViewDrawingError(err.message);
       // Display this error near the specific drawing or as a general notification
       alert(`Error viewing drawing: ${err.message}`); 
    } finally {
      setViewingDrawingId(null);
    }
  };


  if (sessionStatus === "loading" || (loading && !regionData) ) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (sessionStatus === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  if (error && !regionData) { 
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-xl text-red-600 mb-4">Error</h2>
        <p className="mb-4">{error}</p>
        <Button onClick={() => router.push("/regions")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Regions
        </Button>
      </div>
    );
  }

  if (!regionData || !regionData.region) { 
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-xl text-gray-700 mb-4">Region Not Found</h2>
        <p className="mb-4">The requested region could not be found or an error occurred.</p>
        <Button onClick={() => router.push("/regions")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Regions
        </Button>
      </div>
    );
  }
  
  if (error && regionData) {
     console.warn("Error fetching region details, but proceeding with cached/existing data:", error);
  }

  const { region, stations } = regionData;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Button variant="outline" size="sm" onClick={() => router.push("/regions")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Regions List
        </Button>
      </div>

      {/* Section for Creating New Station (existing) */}
      <Card className="w-full max-w-lg mx-auto mb-8 shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Add Station to {region.name}</CardTitle>
            <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowCreateStationForm(!showCreateStationForm);
                    setCreateStationError(null);
                    setCreateStationSuccess(null);
                    setNewStationName("");
                  }}
                  title={showCreateStationForm ? "Cancel" : "Add New Station"}
                >
                  <PlusCircle className={`h-6 w-6 text-blue-600 hover:text-blue-800 transition-transform duration-200 ${showCreateStationForm ? "rotate-45" : ""}`} />
            </Button>
          </div>
        </CardHeader>
        {showCreateStationForm && (
          <CardContent>
            <form onSubmit={handleCreateStation} className="space-y-4">
              <div>
                <Label htmlFor="newStationName" className="font-medium">New Station Name</Label>
                <Input
                  id="newStationName"
                  type="text"
                  value={newStationName}
                  onChange={(e) => setNewStationName(e.target.value)}
                  placeholder="Enter station name"
                  disabled={isCreatingStation}
                  required
                  className="mt-1"
                />
              </div>
              {createStationError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-300">{createStationError}</p>}
              {createStationSuccess && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md border border-green-300">{createStationSuccess}</p>}
              <Button type="submit" disabled={isCreatingStation || !newStationName.trim()} className="w-full sm:w-auto">
                {isCreatingStation ? "Creating..." : "Create Station"}
              </Button>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Section for Displaying Region Details and Existing Stations */}
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="bg-slate-100 rounded-t-lg border-b">
          <CardTitle className="text-3xl text-gray-800">{region.name}</CardTitle>
          <CardDescription className="text-gray-600 pt-1">
            Details for {region.name}. Logged in as: {session?.user?.name || session?.user?.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Stations in this Region:</h3>
          {loading && !stations.length && regionData ? ( 
             <p className="text-gray-500">Loading stations...</p>
          ) : stations.length > 0 ? (
            <ul className="space-y-6">
              {stations.map((station) => (
                <li key={station.id} className="p-4 border rounded-md shadow-sm bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-gray-700">{station.name}</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedStationIdForUpload(selectedStationIdForUpload === station.id ? null : station.id);
                        setSelectedFile(null);
                        setUploadDrawingError(null);
                        setUploadDrawingSuccess(null);
                      }}
                    >
                      <UploadCloud className="mr-2 h-4 w-4" /> 
                      {selectedStationIdForUpload === station.id ? "Cancel Upload" : "Upload Drawing"}
                    </Button>
                  </div>

                  {selectedStationIdForUpload === station.id && (
                    <form onSubmit={handleDrawingUpload} className="mt-4 space-y-4 p-4 border-t bg-slate-50 rounded-b-md">
                       <div>
                        <Label htmlFor={`file-upload-${station.id}`} className="font-medium">Select Drawing File</Label>
                        <Input
                          id={`file-upload-${station.id}`}
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.dwg,.dxf"
                          className="mt-1"
                          required
                        />
                        {selectedFile && <p className="text-xs text-gray-500 mt-1">Selected: {selectedFile.name}</p>}
                      </div>
                      {uploadDrawingError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-300">{uploadDrawingError}</p>}
                      {uploadDrawingSuccess && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md border border-green-300">{uploadDrawingSuccess}</p>}
                      <Button type="submit" disabled={isUploadingDrawing || !selectedFile} className="w-full sm:w-auto">
                        {isUploadingDrawing ? "Uploading..." : "Upload to this Station"}
                      </Button>
                    </form>
                  )}
                  
                  <div className="mt-4 pt-3 pl-4 border-l-2 border-slate-200">
                     <h5 className="text-sm font-semibold text-gray-600 mb-2">Uploaded Drawings:</h5>
                     {station.drawings && station.drawings.length > 0 ? (
                        <ul className="space-y-2">
                           {station.drawings.map(d => (
                            <li key={d.id} className="flex justify-between items-center text-xs">
                              <span>{d.originalName} ({(d.size / 1024).toFixed(2)} KB)</span>
                              <Button 
                                variant="link" 
                                size="xs" 
                                onClick={() => handleViewDrawing(d.id)}
                                disabled={viewingDrawingId === d.id}
                                className="h-auto p-0 text-blue-600 hover:text-blue-800"
                              >
                                {viewingDrawingId === d.id ? "Loading..." : "View"}
                              </Button>
                            </li>
                           ))}
                        </ul>
                     ) : (
                        <p className="text-xs text-gray-400 italic">No drawings uploaded yet for this station.</p>
                     )}
                     {/* Display error for this specific station's drawing view attempt if any */}
                     {viewDrawingError && selectedStationIdForUpload === station.id && ( // This logic might need refinement if viewDrawingError is global
                        <p className="text-xs text-red-500 mt-1">{viewDrawingError}</p>
                     )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No stations currently found for this region. Add one using the form above.</p>
          )}
        </CardContent>
         {stations.length > 0 && (
            <CardFooter className="text-sm text-gray-500 bg-slate-100 rounded-b-lg py-3 border-t">
                Total stations: {stations.length}
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
