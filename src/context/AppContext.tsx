"use client"

// import type { ReactNode } from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

type AppContextType = {
  region: string
  setRegion: (region: string) => void
  station: string
  setStation: (item: string) => void
  isStation: boolean
  setIsStation: (isStation: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [region, setRegion] = useState("")
  const [station, setStation] = useState("")
  const [isStation, setIsStation] = useState(true)

  return (
    <AppContext.Provider value={{ region, setRegion, station, setStation, isStation, setIsStation }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

