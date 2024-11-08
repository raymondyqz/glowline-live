import { useState } from 'react'
import { Bell, Calendar as CalendarIcon, Home, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useEffect } from "react"
import { DashboardOverview } from './DashboardOverview'
import { BookingDashboard } from './BookingDashboard'
import { CallTranscript } from './CallTranscript'
import { inputData, transcripts } from '@/lib/dashboardData'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function DashboardLayout() {
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { session } = useSessionContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!session) {
      navigate("/login")
    }
  }, [session, navigate])

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Sidebar */}
      <aside className="w-16 bg-white shadow-md flex flex-col items-center py-4">
        <div className="mb-8 text-2xl font-bold text-purple-600">G</div>
        <Button
          variant={activePage === 'dashboard' ? "secondary" : "ghost"}
          size="icon"
          className="mb-4"
          onClick={() => setActivePage('dashboard')}
        >
          <Home className="h-5 w-5 text-gray-600" />
        </Button>
        <Button
          variant={activePage === 'bookings' ? "secondary" : "ghost"}
          size="icon"
          className="mb-4"
          onClick={() => setActivePage('bookings')}
        >
          <CalendarIcon className="h-5 w-5 text-gray-600" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="mt-auto"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Settings className="h-5 w-5 text-gray-600" />
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto text-center">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-800">glowline</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {activePage === 'dashboard' && <DashboardOverview onPageChange={setActivePage} />}
        {activePage === 'bookings' && (
          <BookingDashboard
            bookings={inputData.bookings}
            recentCalls={inputData.recentCalls}
            onBookingSelect={setSelectedBooking}
            onTranscriptOpen={setIsTranscriptOpen}
          />
        )}
      </main>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-800">Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-purple-800">System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="text-black">Dark Mode</Label>
                  <Switch id="dark-mode" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="text-black">Enable Notifications</Label>
                  <Switch id="notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-refresh" className="text-black">Auto-refresh Dashboard</Label>
                  <Switch id="auto-refresh" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-purple-800">AI Agent Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-suggestions" className="text-black">AI Suggestions</Label>
                  <Switch id="ai-suggestions" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sentiment-analysis" className="text-black">Sentiment Analysis</Label>
                  <Switch id="sentiment-analysis" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-scheduling" className="text-black">Auto Scheduling</Label>
                  <Switch id="auto-scheduling" />
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transcript Dialog */}
      <Dialog open={isTranscriptOpen} onOpenChange={setIsTranscriptOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg text-purple-800">Call Transcript - {selectedBooking?.name}</DialogTitle>
          </DialogHeader>
          <CallTranscript booking={selectedBooking} transcript={transcripts[selectedBooking?.id]} />
        </DialogContent>
      </Dialog>
    </div>
  )
}