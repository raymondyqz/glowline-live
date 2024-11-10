import { ChartCard } from "./ChartCard"
import { BookingStatistics } from "./BookingStatistics"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { subDays, format } from 'date-fns'

interface DashboardOverviewProps {
  onPageChange: (page: string) => void;
}

export function DashboardOverview({ onPageChange }: DashboardOverviewProps) {
  const [pastWeekData, setPastWeekData] = useState<any[]>([])
  const { session } = useSessionContext()
  const userId = session?.user?.id

  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
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

  const serviceData = [
    { name: "Hair Care", value: 35 },
    { name: "Skin Care", value: 25 },
    { name: "Veterinary", value: 20 },
    { name: "Other", value: 20 },
  ]

  const timeData = [
    { name: "Morning", value: 30 },
    { name: "Afternoon", value: 40 },
    { name: "Evening", value: 30 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-2">
        <BookingStatistics pastWeekData={pastWeekData} />
      </div>
      <ChartCard title="Services" data={serviceData} />
      <ChartCard title="Peak Hours" data={timeData} />
      <div className="md:col-span-1">
        <Button
          className="w-full"
          onClick={() => onPageChange('bookings')}
        >
          View All Bookings
        </Button>
      </div>
    </div>
  )
}
