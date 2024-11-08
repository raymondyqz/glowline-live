import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { RecentCallsTable } from './RecentCallsTable'

interface BookingDashboardProps {
  onBookingSelect: (booking: any) => void;
  onTranscriptOpen: (open: boolean) => void;
}

export function BookingDashboard({ onBookingSelect, onTranscriptOpen }: BookingDashboardProps) {
  const [recentCalls, setRecentCalls] = useState<any[]>([])
  const [todaysBookings, setTodaysBookings] = useState<any[]>([])
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
        setTodaysBookings(bookingsData)
      }
    }

    fetchData()
  }, [userId])

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg text-purple-800">Recent Calls & Today's Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <RecentCallsTable 
          recentCalls={recentCalls} 
          todaysBookings={todaysBookings}
        />
      </CardContent>
    </Card>
  )
}