import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { subDays, format } from 'date-fns'
import { RecentCallsTable } from './RecentCallsTable'
import { BookingStatistics } from './BookingStatistics'
import { TodaysBookings } from './TodaysBookings'

interface BookingDashboardProps {
  onBookingSelect: (booking: any) => void;
  onTranscriptOpen: (open: boolean) => void;
}

export function BookingDashboard({ onBookingSelect, onTranscriptOpen }: BookingDashboardProps) {
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

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">Recent Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentCallsTable recentCalls={recentCalls} />
        </CardContent>
      </Card>
      <div className="space-y-4">
        <BookingStatistics pastWeekData={pastWeekData} />
        <TodaysBookings 
          bookings={bookings}
          onBookingSelect={onBookingSelect}
          onTranscriptOpen={onTranscriptOpen}
        />
      </div>
    </div>
  )
}