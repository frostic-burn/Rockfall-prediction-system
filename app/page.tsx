"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Bell, FileText } from "lucide-react"

export default function RockfallDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header / Top Banner */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Rockfall Prediction & Alert System</h1>
            <Badge variant="destructive" className="bg-red-600 text-white">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Current Site Risk: HIGH
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="text-sm">Active Alarms: 3</span>
            </div>

            <nav className="flex gap-2">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant={activeTab === "analysis" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("analysis")}
              >
                Analysis
              </Button>
              <Button
                variant={activeTab === "reports" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("reports")}
              >
                Reports
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {activeTab === "dashboard" && <DashboardView />}
      {activeTab === "analysis" && <AnalysisView />}
      {activeTab === "reports" && <ReportsView />}
    </div>
  )
}

function DashboardView() {
  const [layers, setLayers] = useState({
    radar: true,
    lidar: true,
    gnss: false,
    cameras: false,
    aiRiskHeatmap: true,
  })

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }))
  }

  const getMapView = () => {
    if (layers.aiRiskHeatmap && layers.radar && layers.lidar) {
      return "/mine-site-aerial-view-with-red-risk-heatmap-overla.jpg"
    } else if (layers.aiRiskHeatmap) {
      return "/mine-site-with-ai-risk-heatmap-showing-red-danger-.jpg"
    } else if (layers.radar && layers.lidar) {
      return "/mine-site-with-radar-and-lidar-data-overlay.jpg"
    } else if (layers.radar) {
      return "/mine-site-radar-view-with-topographical-data.jpg"
    } else if (layers.lidar) {
      return "/mine-site-lidar-point-cloud-visualization.jpg"
    } else if (layers.gnss) {
      return "/mine-site-with-gnss-monitoring-points-and-displace.jpg"
    } else if (layers.cameras) {
      return "/mine-site-camera-surveillance-view-with-multiple-c.jpg"
    } else {
      return "/basic-mine-site-aerial-view.jpg"
    }
  }

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Left Panel - Overview */}
      <div className="w-80 border-r border-border p-4 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Last 24h Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Rockfall detected - Zone A</span>
              <Badge variant="destructive" className="text-xs">
                Critical
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Displacement threshold exceeded</span>
              <Badge className="bg-amber-600 text-white text-xs">High</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Rainfall trigger activated</span>
              <Badge variant="secondary" className="text-xs">
                Medium
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Weather Triggers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge className="bg-amber-600 text-white">Rainfall &gt; 25mm/hr</Badge>
            <Badge variant="secondary">Temperature swing: 15°C</Badge>
            <Badge variant="outline">Wind: Normal</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Center - Map Workspace */}
      <div className="flex-1 flex flex-col">
        {/* Map Controls */}
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Layers:</span>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={layers.radar} onChange={() => toggleLayer("radar")} className="rounded" />
              Radar
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={layers.lidar} onChange={() => toggleLayer("lidar")} className="rounded" />
              LiDAR
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={layers.gnss} onChange={() => toggleLayer("gnss")} className="rounded" />
              GNSS
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={layers.cameras}
                onChange={() => toggleLayer("cameras")}
                className="rounded"
              />
              Cameras
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={layers.aiRiskHeatmap}
                onChange={() => toggleLayer("aiRiskHeatmap")}
                className="rounded"
              />
              AI Risk Heatmap
            </label>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 bg-muted flex items-center justify-center p-4">
          <img
            src={getMapView() || "/placeholder.svg"}
            alt="Mine site map with selected layers"
            className="max-w-full max-h-full object-contain rounded"
          />
        </div>

        {/* Timeline Panel */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-4 mb-4">
            <Button size="sm" variant="outline">
              Play
            </Button>
            <Button size="sm" variant="outline">
              Pause
            </Button>
            <div className="flex-1 bg-muted h-2 rounded-full">
              <div className="bg-primary h-2 rounded-full w-1/3"></div>
            </div>
            <span className="text-sm">12:00 - 18:00</span>
          </div>

          <div className="grid grid-cols-3 gap-4 h-24">
            <MiniChart title="Displacement" color="blue" />
            <MiniChart title="Rainfall" color="cyan" />
            <MiniChart title="Pore Pressure" color="orange" />
          </div>
        </div>
      </div>

      {/* Right Sidebar - Alert Center */}
      <div className="w-80 border-l border-border p-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-red-200 rounded p-3 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="destructive">Critical</Badge>
                <span className="text-xs text-muted-foreground">14:32</span>
              </div>
              <p className="text-sm font-medium">Rockfall Event Detected</p>
              <p className="text-xs text-muted-foreground mb-2">Zone A - Sector 3</p>
              <div className="bg-muted h-16 rounded mb-2 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Auto-verification image</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Acknowledge
                </Button>
                <Button size="sm" variant="outline">
                  SOP
                </Button>
              </div>
            </div>

            <div className="border border-amber-200 rounded p-3 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-amber-600 text-white">High</Badge>
                <span className="text-xs text-muted-foreground">13:45</span>
              </div>
              <p className="text-sm font-medium">Displacement Threshold</p>
              <p className="text-xs text-muted-foreground mb-2">Zone B - 15mm exceeded</p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Acknowledge
                </Button>
                <Button size="sm" variant="outline">
                  SOP
                </Button>
              </div>
            </div>

            <div className="border border-border rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">Medium</Badge>
                <span className="text-xs text-muted-foreground">12:20</span>
              </div>
              <p className="text-sm font-medium">Weather Alert</p>
              <p className="text-xs text-muted-foreground mb-2">Rainfall rate increasing</p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Acknowledge
                </Button>
                <Button size="sm" variant="outline">
                  SOP
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MiniChart({ title, color }: { title: string; color: string }) {
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    // Generate initial data
    const initialData = Array.from({ length: 20 }, () => Math.random() * 100)
    setData(initialData)

    // Update data every 2 seconds
    const interval = setInterval(() => {
      setData((prev) => [...prev.slice(1), Math.random() * 100])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - value
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="bg-card border rounded p-2">
      <div className="text-xs font-medium mb-1">{title}</div>
      <svg viewBox="0 0 100 60" className="w-full h-12">
        {/* Grid lines */}
        <defs>
          <pattern id={`grid-${color}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="60" fill={`url(#grid-${color})`} />

        {/* Data line */}
        <polyline
          fill="none"
          stroke={color === "blue" ? "#3b82f6" : color === "cyan" ? "#06b6d4" : "#f97316"}
          strokeWidth="1.5"
          points={points}
        />
      </svg>
    </div>
  )
}

function AnalysisView() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Analysis Workspace</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Displacement</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedChart title="Displacement (mm)" color="#3b82f6" range={[0, 30]} pattern="drift" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedChart title="Velocity (mm/h)" color="#10b981" range={[0, 10]} pattern="fluctuate" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inverse Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedChart title="Inverse Velocity (1/h)" color="#8b5cf6" range={[0, 0.5]} pattern="decline" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rainfall</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedChart title="Rainfall (mm/h)" color="#06b6d4" range={[0, 100]} pattern="bursts" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pore Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedChart title="Pore Pressure (kPa)" color="#f97316" range={[0, 500]} pattern="rising" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Probability</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedChart title="AI Probability (%)" color="#ef4444" range={[0, 100]} pattern="spike" />
          </CardContent>
        </Card>
      </div>

      {/* Model Transparency Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Model Transparency & QA</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Feature Contributions (SHAP)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm w-24">Rainfall</span>
                  <div className="flex-1 bg-muted h-6 rounded relative">
                    <div className="bg-blue-500 h-6 rounded" style={{ width: "70%" }}></div>
                    <span className="absolute right-2 top-0 text-xs leading-6 text-white">+0.35</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm w-24">Velocity Trend</span>
                  <div className="flex-1 bg-muted h-6 rounded relative">
                    <div className="bg-green-500 h-6 rounded" style={{ width: "56%" }}></div>
                    <span className="absolute right-2 top-0 text-xs leading-6 text-white">+0.28</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm w-24">Pore Pressure</span>
                  <div className="flex-1 bg-muted h-6 rounded relative">
                    <div className="bg-orange-500 h-6 rounded" style={{ width: "44%" }}></div>
                    <span className="absolute right-2 top-0 text-xs leading-6 text-white">+0.22</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm w-24">Temperature</span>
                  <div className="flex-1 bg-muted h-6 rounded relative">
                    <div className="bg-purple-500 h-6 rounded" style={{ width: "20%" }}></div>
                    <span className="absolute right-2 top-0 text-xs leading-6 text-white">+0.10</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm w-24">Other</span>
                  <div className="flex-1 bg-muted h-6 rounded relative">
                    <div className="bg-gray-500 h-6 rounded" style={{ width: "10%" }}></div>
                    <span className="absolute right-2 top-0 text-xs leading-6 text-white">+0.05</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Model Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Precision:</span>
                <span className="text-sm font-medium">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Recall:</span>
                <span className="text-sm font-medium">89.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Lead Time:</span>
                <span className="text-sm font-medium">4.2 hours avg</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function AnimatedChart({
  title,
  color,
  range,
  pattern,
}: {
  title: string
  color: string
  range: [number, number]
  pattern: "drift" | "fluctuate" | "decline" | "bursts" | "rising" | "spike"
}) {
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    // Generate initial realistic data based on pattern
    const generateData = () => {
      const points = 50
      const newData: number[] = []

      for (let i = 0; i < points; i++) {
        const progress = i / (points - 1)
        let value = 0

        switch (pattern) {
          case "drift": // Displacement: slow upward drift with spikes
            value = range[0] + (range[1] - range[0]) * (0.1 + progress * 0.6 + Math.random() * 0.3)
            if (Math.random() < 0.1) value += (range[1] - range[0]) * 0.2 // occasional spikes
            break
          case "fluctuate": // Velocity: fluctuating with periodic rises
            value = range[0] + (range[1] - range[0]) * (0.3 + 0.4 * Math.sin(progress * 8) + Math.random() * 0.3)
            break
          case "decline": // Inverse Velocity: declining trend
            value = range[0] + (range[1] - range[0]) * (0.8 - progress * 0.6 + Math.random() * 0.2)
            break
          case "bursts": // Rainfall: mostly low with sudden bursts
            value =
              Math.random() < 0.15
                ? range[0] + (range[1] - range[0]) * (0.6 + Math.random() * 0.4)
                : range[0] + (range[1] - range[0]) * Math.random() * 0.2
            break
          case "rising": // Pore Pressure: gently rising with jumps
            value = range[0] + (range[1] - range[0]) * (0.2 + progress * 0.5 + Math.random() * 0.3)
            if (Math.random() < 0.08) value += (range[1] - range[0]) * 0.15 // random jumps
            break
          case "spike": // AI Probability: sharp rise around mid-timeline
            if (progress > 0.4 && progress < 0.6) {
              value = range[0] + (range[1] - range[0]) * (0.8 + Math.random() * 0.2)
            } else {
              value = range[0] + (range[1] - range[0]) * (0.1 + Math.random() * 0.3)
            }
            break
        }

        newData.push(Math.max(range[0], Math.min(range[1], value)))
      }
      return newData
    }

    setData(generateData())

    // Update data every 3 seconds
    const interval = setInterval(() => {
      setData((prev) => {
        const newPoint = generateData().slice(-1)[0]
        return [...prev.slice(1), newPoint]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [range, pattern])

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - ((value - range[0]) / (range[1] - range[0])) * 100
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="h-48">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Grid background */}
        <defs>
          <pattern id={`grid-${pattern}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#grid-${pattern})`} />

        {/* Data line */}
        {data.length > 1 && <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />}
      </svg>

      {/* Current value display */}
      <div className="text-xs text-muted-foreground mt-1">
        Current: {data.length > 0 ? data[data.length - 1].toFixed(1) : "0.0"}{" "}
        {title.split("(")[1]?.replace(")", "") || ""}
      </div>
    </div>
  )
}

function ReportsView() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Reports & Logs</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Auto-Generated Shift Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Shift Period:</span> 06:00 - 18:00
              </div>
              <div>
                <span className="font-medium">Events:</span> 3 alerts, 1 critical
              </div>
              <div>
                <span className="font-medium">Risk State:</span> HIGH
              </div>
              <div>
                <span className="font-medium">Weather:</span> Heavy rainfall (32mm/hr peak)
              </div>
              <Button size="sm" className="mt-3">
                Download Full Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rockfall Event Registry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-4 gap-2 font-medium border-b pb-2">
                <span>Time</span>
                <span>Location</span>
                <span>Magnitude</span>
                <span>Weather</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>14:32</span>
                <span>Zone A-3</span>
                <span>Large</span>
                <span>Heavy rain</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>11:15</span>
                <span>Zone B-1</span>
                <span>Medium</span>
                <span>Moderate rain</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>08:42</span>
                <span>Zone A-2</span>
                <span>Small</span>
                <span>Light rain</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
