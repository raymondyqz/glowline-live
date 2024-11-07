"use client"

import { useState } from 'react'
import { Bell, Calendar as CalendarIcon, Home, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart as PieChartComponent, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useEffect } from "react"

const inputData = {
  appointmentTypes: [
    { name: 'F. Cut', value: 35 },
    { name: 'M. Cut', value: 25 },
    { name: 'Color', value: 20 },
    { name: 'Style', value: 15 },
    { name: 'Other', value: 5 },
  ],
  callLengths: [
    { name: '0-5m', value: 45 },
    { name: '5-10m', value: 30 },
    { name: '10-15m', value: 15 },
    { name: '15m+', value: 10 },
  ],
  callCategories: [
    { name: 'Booking (New)', value: 40 },
    { name: 'Booking (Existing)', value: 35 },
    { name: 'Complaint', value: 15 },
    { name: 'Info Request', value: 10 },
  ],
  bookings: [
    { id: 1, name: 'Alice Johnson', service: 'Haircut & Style', details: 'Full head highlights, blowdry, toner', time: '10:00 AM', date: '2024-10-20', sentiment: 85 },
    { id: 2, name: 'Bob Smith', service: 'Color Treatment', details: 'NA', time: '11:30 AM', date: '2024-10-20', sentiment: 60 },
    { id: 3, name: 'Raymond Zhao', service: 'Color Treatment', details: 'Full head highlights, blowdry, toner',time: '2:00 PM', date: '2024-10-20', sentiment: 72 },
    { id: 4, name: 'David Brown', service: 'Beard Trim', details: 'NA',time: '3:30 PM', date: '2024-10-20', sentiment: 75 },
    { id: 5, name: 'Eve Wilson', service: 'Full Makeover', details: 'NA', time: '10:00 AM', date: '2024-10-21', sentiment: 20 },
  ],
  recentCalls: [
    { id: 1, phone: '(555) 123-4567', reason: 'Booking', duration: '3m 45s', startTime: '2024-10-20 14:30', sentiment: 'Positive' },
    { id: 2, phone: '(555) 987-6543', reason: 'Inquiry', duration: '2m 15s', startTime: '2024-10-20 13:45', sentiment: 'Neutral' },
    { id: 3, phone: '(555) 246-8135', reason: 'Rescheduling', duration: '4m 30s', startTime: '2024-10-20 11:20', sentiment: 'Positive' },
    { id: 4, phone: '(555) 369-2580', reason: 'Complaint', duration: '6m 10s', startTime: '2024-10-20 10:05', sentiment: 'Negative' },
    { id: 5, phone: '(555) 159-7531', reason: 'Booking', duration: '3m 20s', startTime: '2024-10-20 09:30', sentiment: 'Positive' },
  ],
}

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']

const transcripts = {
  3: "Glow: Hi. This is Glow. I'm looking after Raymond's Hair Salon. How can I help you?\nRaymond: Hey. I'd like to book in for some highlights.\nGlow: Sure. No problem. Have you visited us before?\nRaymond: No. It's actually my first time.\nGlow: Okay. Great. Are you wanting a full or half head of highlights?\nRaymond: Full head, please.\nGlow: Perfect. So when are you available? And is there a particular hairstylist that you'd like to see?\nRaymond: No. I'm fine with whoever's free. Do you have any availability maybe sometime this Thursday or Friday?\nGlow: Sounds good. We have a slot at 10 AM on Thursday, the 24th, with our stylist, Sarah.\nRaymond: Actually, can we do the afternoon? That would be much better if that's okay.\nGlow: Sure. How's Thursday, the 24th at 2 PM? Our stylist, Caroline, is available at that time.\nRaymond: Yeah. That would be great.\nGlow: Amazing. Just to let you know, all our color appointments require a blow-dry, and you'll probably want a toner after those highlights. If this sounds okay, can I get your name to note in the booking, please?\nRaymond: Yeah. So it's Raymond Lawson Shaw.\nGlow: Great, Raymond. That's all booked in for you on Thursday, the 24th at 2 PM. Is there anything else I can help with?\nRaymond: That's all. Thanks.\nGlow: Great. We look forward to seeing you on Thursday.", 
  1: "AI: Good morning! Thank you for calling Glowline Salon. How may I assist you today?\nAlice: Hi, I'd like to book a haircut and style for today if possible.\nAI: I'd be happy to help you with that. We have an opening at 10:00 AM today. Would that work for you?\nAlice: Yes, that's perfect!\nAI: Great! I've booked you for a haircut and style at 10:00 AM today. Is there anything else I can help you with?\nAlice: No, that's all. Thank you!\nAI: You're welcome! We look forward to seeing you at 10:00 AM. Have a great day!",
  2: "AI: Good morning! Thank you for calling Glowline Salon. How may I assist you today?\nBob: Hello, I need to schedule a color treatment.\nAI: I'd be happy to help you with that. May I know your preferred date and time?\nBob: Is there anything available today?\nAI: Yes, we have an opening at 11:30 AM today for a color treatment. Would that work for you?\nBob: That sounds good. I'll take it.\nAI: Excellent! I've booked you for a color treatment at 11:30 AM today. Is there anything else you need?\nBob: No, that's all. Thanks.\nAI: You're welcome! We look forward to seeing you at 11:30 AM. Have a great day!",
}

export default function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)
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
          variant={activePage === 'settings' ? "secondary" : "ghost"}
          size="icon"
          className="mt-auto"
          onClick={() => setActivePage('settings')}
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

        {activePage === 'dashboard' && <Dashboard setActivePage={setActivePage} />}
        {activePage === 'bookings' && (
          <BookingDashboard
            bookings={inputData.bookings}
            recentCalls={inputData.recentCalls}
            setSelectedBooking={setSelectedBooking}
            setIsTranscriptOpen={setIsTranscriptOpen}
          />
        )}
        {activePage === 'settings' && <SettingsPage />}
      </main>

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

function Dashboard({ setActivePage }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">Today's Activity</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[150px]">
          <div className="flex space-x-12">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 mb-1">Bookings</p>
              <Button
                variant="ghost"
                className="text-4xl font-bold text-black p-0 hover:bg-transparent"
                onClick={() => setActivePage('bookings')}
              >
                4
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 mb-1">Inbound Calls</p>
              <p className="text-4xl font-bold text-black">12</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">Appointment Types</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pr-2">
          <ChartContainer config={{}} className="h-[180px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChartComponent>
                <Pie
                  data={inputData.appointmentTypes}
                  cx="40%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={false}
                >
                  {inputData.appointmentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ right: 10, lineHeight: '24px', width: '45%' }} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" nameKey="name" valueKey="value" />} />
              </PieChartComponent>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">Call Lengths</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pr-2">
          <ChartContainer config={{}} className="h-[180px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChartComponent>
                <Pie
                  data={inputData.callLengths}
                  cx="40%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={false}
                >
                  {inputData.callLengths.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ right: 10, lineHeight: '24px', width: '45%' }} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" nameKey="name" valueKey="value" />} />
              </PieChartComponent>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">Call Categories</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pr-2">
          <ChartContainer config={{}} className="h-[180px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChartComponent>
                <Pie
                  data={inputData.callCategories}
                  cx="40%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={false}
                >
                  {inputData.callCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ right: 10, lineHeight: '24px', width: '45%' }} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" nameKey="name" valueKey="value" />} />
              </PieChartComponent>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function BookingDashboard({ bookings, recentCalls, setSelectedBooking, setIsTranscriptOpen }) {
  const [selectedDate, setSelectedDate] = useState(new Date('2024-10-20'))

  const getSentimentEmoji = (sentiment) => {
    if (typeof sentiment === 'string') {
      return sentiment === 'Positive' ? '😊' : sentiment === 'Neutral' ? '😐' : '🙁'
    }
    return sentiment >= 66 ? '😊' : sentiment >= 33 ? '😐' : '🙁'
  }

  const getSentimentColor = (sentiment) => {
    if (typeof sentiment === 'string') {
      return sentiment === 'Positive' ? 'text-green-600' : sentiment === 'Neutral' ? 'text-orange-500' : 'text-red-600'
    }
    return sentiment >= 66 ? 'text-green-600' : sentiment >= 33 ? 'text-orange-500' : 'text-red-600'
  }

  // Generate  mock data for the past 7 days
  const pastWeekData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(selectedDate)
    date.setDate(date.getDate() - i)
    const totalBookings = Math.floor(Math.random() * 30) + 10
    const callBookingsPercentage = Math.random() * 0.3 + 0.6 // 60-90%
    const callBookings = Math.round(totalBookings * callBookingsPercentage)
    const nonCallBookings = totalBookings - callBookings
    return {
      date: date.toISOString().split('T')[0],
      totalBookings,
      callBookings,
      nonCallBookings,
    }
  }).reverse()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">Recent Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Phone</TableHead>
                <TableHead className="text-center">Reason</TableHead>
                <TableHead className="text-center">Duration</TableHead>
                <TableHead className="text-center">Start Time</TableHead>
                <TableHead className="text-center">Sentiment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell className="text-center">{call.phone}</TableCell>
                  <TableCell className="text-center">{call.reason}</TableCell>
                  <TableCell className="text-center">{call.duration}</TableCell>
                  <TableCell className="text-center">{new Date(call.startTime).toLocaleTimeString()}</TableCell>
                  <TableCell className="text-center">
                    <span className={`flex items-center justify-center ${getSentimentColor(call.sentiment)}`}>
                      {getSentimentEmoji(call.sentiment)}
                      <span className="ml-1">{call.sentiment}</span>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-purple-800">Booking Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <ChartContainer config={{}} className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pastWeekData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                      }}
                      dy={10}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis dx={-10} tick={{ fontSize: 12 }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border border-gray-300 rounded shadow text-center">
                              <p className="text-sm text-purple-800">{`Date: ${label}`}</p>
                              <p className="text-sm text-blue-600">{`Call Bookings: ${payload[0].value}`}</p>
                              <p className="text-sm text-red-600">{`Non-Call Bookings: ${payload[1].value}`}</p>
                              <p className="text-sm text-green-600">{`Total Bookings: ${payload[0].value + payload[1].value}`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="callBookings" stackId="a" fill="#36A2EB" name="Call Bookings" />
                    <Bar dataKey="nonCallBookings" stackId="a" fill="#FF6384" name="Non-Call Bookings" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-2 text-sm text-black flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-[#36A2EB] mr-2 rounded"></span>
                  <span>Call Bookings</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-[#FF6384] mr-2 rounded"></span>
                  <span>Non-Call Bookings</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-purple-800">Today's Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {bookings.filter(booking => new Date(booking.date).toDateString() === selectedDate.toDateString()).map(booking => (
                <li key={booking.id} className="flex justify-between items-center">
                  <div>
                    <span className="text-black">{booking.time} - {booking.name}</span>
                    <span className="ml-2 text-sm text-black">({booking.service})</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-purple-100 text-black hover:bg-purple-200"
                    onClick={() => {
                      setSelectedBooking(booking)
                      setIsTranscriptOpen(true)
                    }}
                  >
                    View Details
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CallTranscript({ booking, transcript }) {
  if (!booking) {
    return <div className="text-purple-700">No booking selected</div>
  }

  const getSentimentWord = (sentiment) => {
    if (sentiment >= 66) return 'Positive';
    if (sentiment >= 33) return 'Neutral';
    return 'Negative';
  }

  // Extract key datapoints (this would be more sophisticated in a real application)
  const keyDatapoints = [
    { label: 'Service Requested', value: booking.service },
    { label: 'Details', value: booking.details },
    { label: 'Booking Time', value: booking.time },
  ]

  // Generate suggestions (this would be more sophisticated in a real application)
  const suggestions = [
    'Offer a loyalty discount on the next visit',
    'Recommend a complementary service',
    'Follow up with a satisfaction survey',
  ]

  return (
    <div className="space-y-4 text-center">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-purple-800">Sentiment Score</div>
        <div className="flex items-center">
          <span className={`text-sm font-medium mr-2 ${
            booking.sentiment >= 66 ? 'text-green-600' : 
            booking.sentiment >= 33 ? 'text-orange-500' : 'text-red-600'
          }`}>
            {booking.sentiment}%
          </span>
          <span className="text-2xl">
            {booking.sentiment >= 66 ? '😊' : booking.sentiment >= 33 ? '😐' : '🙁'}
          </span>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-md h-48 overflow-y-auto text-left">
        <pre className="whitespace-pre-wrap text-black text-sm">{transcript}</pre>
      </div>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">Key Datapoints</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-purple-700">
            {keyDatapoints.map((datapoint, index) => (
              <li key={index}><strong>{datapoint.label}:</strong> {datapoint.value}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">Suggestions & Follow-ups</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-purple-700">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-800 mb-6">Settings</h2>
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
      <Card className="bg-white/50 backdrop-blur-sm mt-6">
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
  )
}
