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
  const { session } = useSessionContext()
  const userId = session?.user?.id

  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      const { data: callsData } = await supabase
        .from('call_records')
        .select('*, customer_name')
        .eq('user_id', userId)
        .order('start_time', { ascending: false })

      if (callsData) {
        setRecentCalls(callsData.map(call => ({
          ...call,
          customer_name: call.customer_name || 'Unknown Customer'
        })))
      }
    }

    fetchData()
  }, [userId])

  return (
    <div className="w-full">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">Recent Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentCallsTable recentCalls={recentCalls} />
        </CardContent>
      </Card>
    </div>
  )
}