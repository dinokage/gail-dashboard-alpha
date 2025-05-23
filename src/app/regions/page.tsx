"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, FormEvent } from "react"; // Import useState and FormEvent
import { Input } from "@/components/ui/input"; // Import Input component
import { Label } from "@/components/ui/label"; // Import Label component

// Define a type for the region data
interface Region {
  id: string;
  name: string;
}

export default function RegionSelectionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [regions, setRegions] = useState<Region[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for creating a new region
  const [newRegionName, setNewRegionName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreatingRegion, setIsCreatingRegion] = useState(false);
  const [createRegionError, setCreateRegionError] = useState<string | null>(null);
  const [createRegionSuccess, setCreateRegionSuccess] = useState<string | null>(null);

  const fetchRegions = async () => {
    setPageLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/regions");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch regions: ${response.status}`);
      }
      const data: Region[] = await response.json();
      setRegions(data);
    } catch (err: any) {
      console.error("Error fetching regions:", err);
      setError(err.message || "An unexpected error occurred while fetching regions.");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetchRegions();
    }
  }, [status, router]);

  const handleCreateRegion = async (event: FormEvent) => {
    event.preventDefault();
    if (!newRegionName.trim()) {
      setCreateRegionError("Region name cannot be empty.");
      return;
    }
    setIsCreatingRegion(true);
    setCreateRegionError(null);
    setCreateRegionSuccess(null);

    try {
      const response = await fetch("/api/regions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newRegionName.trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create region.");
      }
      setCreateRegionSuccess(`Region "${data.name}" created successfully!`);
      setNewRegionName(""); // Clear input
      setShowCreateForm(false); // Optionally hide form
      await fetchRegions(); // Refresh the list of regions
    } catch (err: any) {
      console.error("Error creating region:", err);
      setCreateRegionError(err.message || "An unexpected error occurred while creating the region.");
    } finally {
      setIsCreatingRegion(false);
    }
  };

  // Combined loading state for session and page data
  if (status === "loading" || (status === "authenticated" && pageLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  if (status === "authenticated" && !pageLoading) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen overflow-y-auto bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          {/* Section for Creating New Region */}
          <Card className="w-full max-w-xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Manage Regions</CardTitle>
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  setShowCreateForm(!showCreateForm);
                  setCreateRegionError(null);
                  setCreateRegionSuccess(null);
                  setNewRegionName("");
                }}
                className="mt-2"
              >
                {showCreateForm ? "Cancel" : "Add New Region"}
              </Button>
            </CardHeader>
            {showCreateForm && (
              <CardContent>
                <form onSubmit={handleCreateRegion} className="space-y-4">
                  <div>
                    <Label htmlFor="newRegionName">New Region Name</Label>
                    <Input
                      id="newRegionName"
                      type="text"
                      value={newRegionName}
                      onChange={(e) => setNewRegionName(e.target.value)}
                      placeholder="Enter region name"
                      disabled={isCreatingRegion}
                      required
                    />
                  </div>
                  {createRegionError && (
                    <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md">
                      {createRegionError}
                    </p>
                  )}
                  {createRegionSuccess && (
                    <p className="text-sm text-green-600 bg-green-100 p-2 rounded-md">
                      {createRegionSuccess}
                    </p>
                  )}
                  <Button type="submit" disabled={isCreatingRegion || !newRegionName.trim()} className="w-full sm:w-auto">
                    {isCreatingRegion ? "Creating..." : "Create Region"}
                  </Button>
                </form>
              </CardContent>
            )}
          </Card>

          {/* Section for Displaying Existing Regions */}
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Select a Region</CardTitle>
              <CardDescription>
                Welcome, {session.user?.name || session.user?.email || "User"}! Choose a region.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 text-center text-red-700 bg-red-100 rounded-md">
                  <p>Error fetching regions: {error}</p>
                </div>
              )}
              {regions.length === 0 && !error && (
                <div className="text-center text-gray-500 py-4">
                  <p>No regions found. Click "Add New Region" above to create one.</p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {regions.map((region) => (
                  <Link key={region.id} href={`/regions/${region.id}`} passHref>
                    <Button variant="outline" className="w-full h-24 text-lg p-2 flex items-center justify-center text-center">
                      {region.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
            {regions.length > 0 && (
                <CardFooter className="text-sm text-gray-500">
                    Select a region to view its details.
                </CardFooter>
            )}
          </Card>
        </div>
        <div className="flex justify-center mt-8 mb-8 w-full px-4">
          <Image
            src="/pipeline-network.png"
            alt="Pipeline Network"
            className="w-full max-w-3xl h-auto rounded-lg shadow-md" /* Adjusted size and added styling */
            width={800} height={450} // Adjusted aspect ratio
          />
        </div>
      </div>
    );
  }

  // Fallback for any other unexpected status, though ideally handled above.
  return null;
}
