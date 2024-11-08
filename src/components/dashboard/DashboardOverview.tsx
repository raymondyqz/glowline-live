import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { BookingStatistics } from './BookingStatistics'
import { ChartCard } from './ChartCard'

interface DashboardOverviewProps {
  onPageChange: (page: string) => void;
}

export function DashboardOverview({ onPageChange }: DashboardOverviewProps) {
  const [appointmentTypes, setAppointmentTypes] = useState<any[]>([])
  const [callLengths, setCallLengths] = useState<any[]>([])
  const [callCategories, setCallCategories] = useState<any[]>([])
  const [pastWeekData, setPastWeekData] = useState<any[]>([])
  const { session } = useSessionContext()
  const userId = session?.user?.id

  useEffect(() => {
    if (!userId) return

    const fetchDashboardData = async () => {
      // Fetch and process appointment types
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('service')
        .eq('user_id', userId)

      if (bookingsData) {
        const serviceCount = bookingsData.reduce((acc: any, curr) => {
          acc[curr.service] = (acc[curr.service] || 0) + 1
          return acc
        }, {})

        setAppointmentTypes(
          Object.entries(serviceCount).map(([name, value]) => ({
            name,
            value
          }))
        )
      }

      // Fetch and process call lengths
      const { data: callsData } = await supabase
        .from('call_records')
        .select('duration')
        .eq('user_id', userId)

      if (callsData) {
        const durationRanges = {
          '0-5m': 0,
          '5-10m': 0,
          '10-15m': 0,
          '15m+': 0
        }

        callsData.forEach(call => {
          const minutes = parseInt(call.duration.split('m')[0])
          if (minutes <= 5) durationRanges['0-5m']++
          else if (minutes <= 10) durationRanges['5-10m']++
          else if (minutes <= 15) durationRanges['10-15m']++
          else durationRanges['15m+']++
        })

        setCallLengths(
          Object.entries(durationRanges).map(([name, value]) => ({
            name,
            value
          }))
        )
      }

      // Fetch and process call categories
      const { data: callCategories } = await supabase
        .from('call_records')
        .select('reason')
        .eq('user_id', userId)

      if (callCategories) {
        const reasonCount = callCategories.reduce((acc: any, curr) => {
          acc[curr.reason] = (acc[curr.reason] || 0) + 1
          return acc
        }, {})

        setCallCategories(
          Object.entries(reasonCount).map(([name, value]) => ({
            name,
            value
          }))
        )
      }
    }

    fetchDashboardData()
  }, [userId])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <BookingStatistics />
      <ChartCard
        title="Appointment Types"
        data={appointmentTypes}
      />
      <ChartCard
        title="Call Lengths"
        data={callLengths}
      />
      <ChartCard
        title="Call Categories"
        data={callCategories}
      />
    </div>
  )
}