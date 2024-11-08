import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartContainer } from "@/components/ui/chart"
import { supabase } from "@/integrations/supabase/client"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { format, subDays } from 'date-fns'

interface BookingDashboardProps {
  onBookingSelect: (booking: any) => void;
  onTranscriptOpen: (open: boolean) => void;
}

export function BookingDashboard({ 
  onBookingSelect, 
  onTranscriptOpen 
}: BookingDashboardProps) {
  const [bookings, setBookings] = useState<any[]>([])
  const [recentCalls, setRecentCalls] = useState<any[]>([])
  const [pastWeekData, setPastWeekData] = useState<any[]>([])
  const { session } = useSessionContext()
  const userId = session?.user?.id

  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      // Fetch recent calls
      const { data: callsData } = await supabase
        .from('call_records')
        .select('*')
        .eq('user_id', userId)
        .order('start_time', { ascending: false })
        .limit(5)

      if (callsData) {
        setRecentCalls(callsData)
      }

      // Fetch today's bookings
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .gte('booking_time', today.toISOString())
        .lt('booking_time', new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString())
        .order('booking_time')

      if (bookingsData) {
        setBookings(bookingsData)
      }

      // Fetch past week data
      const pastWeekStats = []
      for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i)
        const startOfDay = new Date(date.setHours(0, 0, 0, 0))
        const endOfDay = new Date(date.setHours(23, 59, 59, 999))

        const { data: dayBookings } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', userId)
          .gte('booking_time', startOfDay.toISOString())
          .lt('booking_time', endOfDay.toISOString())

        if (dayBookings) {
          const callBookings = dayBookings.filter(b => b.is_call_booking).length
          const nonCallBookings = dayBookings.length - callBookings
          
          pastWeekStats.push({
            date: format(startOfDay, 'yyyy-MM-dd'),
            callBookings,
            nonCallBookings,
            totalBookings: dayBookings.length
          })
        }
      }
      setPastWeekData(pastWeekStats)
    }

    fetchData()
  }, [userId])

  const getSentimentEmoji = (sentiment: number) => {
    return sentiment >= 66 ? '😊' : sentiment >= 33 ? '😐' : '🙁'
  }

  const getSentimentColor = (sentiment: number) => {
    return sentiment >= 66 ? 'text-green-600' : sentiment >= 33 ? 'text-orange-500' : 'text-red-600'
  }

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
                  <TableCell className="text-center">
                    {format(new Date(call.start_time), 'HH:mm')}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`flex items-center justify-center ${getSentimentColor(call.sentiment)}`}>
                      {getSentimentEmoji(call.sentiment)}
                      <span className="ml-1">{call.sentiment}%</span>
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
                      tickFormatter={(value) => format(new Date(value), 'MM/dd')}
                      dy={10}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis dx={-10} tick={{ fontSize: 12 }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const total = Number(payload[0].value) + Number(payload[1].value)
                          return (
                            <div className="bg-white p-2 border border-gray-300 rounded shadow text-center">
                              <p className="text-sm text-purple-800">{`Date: ${format(new Date(label), 'MM/dd/yyyy')}`}</p>
                              <p className="text-sm text-blue-600">{`Call Bookings: ${payload[0].value}`}</p>
                              <p className="text-sm text-red-600">{`Non-Call Bookings: ${payload[1].value}`}</p>
                              <p className="text-sm text-green-600">{`Total Bookings: ${total}`}</p>
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
              {bookings.map(booking => (
                <li key={booking.id} className="flex justify-between items-center">
                  <div>
                    <span className="text-black">
                      {format(new Date(booking.booking_time), 'HH:mm')} - {booking.customer_name}
                    </span>
                    <span className="ml-2 text-sm text-black">({booking.service})</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-purple-100 text-black hover:bg-purple-200"
                    onClick={() => {
                      onBookingSelect(booking)
                      onTranscriptOpen(true)
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