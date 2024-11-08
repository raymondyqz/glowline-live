import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart as PieChartComponent, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { startOfDay, endOfDay } from 'date-fns'

interface DashboardOverviewProps {
  onPageChange: (page: string) => void;
}

export function DashboardOverview({ onPageChange }: DashboardOverviewProps) {
  const [todayStats, setTodayStats] = useState({ bookings: 0, calls: 0 })
  const [appointmentTypes, setAppointmentTypes] = useState<any[]>([])
  const [callLengths, setCallLengths] = useState<any[]>([])
  const [callCategories, setCallCategories] = useState<any[]>([])
  const { session } = useSessionContext()
  const userId = session?.user?.id
  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']

  useEffect(() => {
    if (!userId) return

    const fetchDashboardData = async () => {
      const today = startOfDay(new Date())
      const todayEnd = endOfDay(new Date())

      // Fetch today's bookings count
      const { count: bookingsCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('booking_time', today.toISOString())
        .lt('booking_time', todayEnd.toISOString())

      // Fetch today's calls count
      const { count: callsCount } = await supabase
        .from('call_records')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('start_time', today.toISOString())
        .lt('start_time', todayEnd.toISOString())

      setTodayStats({
        bookings: bookingsCount || 0,
        calls: callsCount || 0
      })

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
                onClick={() => onPageChange('bookings')}
              >
                {todayStats.bookings}
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 mb-1">Inbound Calls</p>
              <p className="text-4xl font-bold text-black">{todayStats.calls}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <ChartCard
        title="Appointment Types"
        data={appointmentTypes}
        colors={COLORS}
      />
      <ChartCard
        title="Call Lengths"
        data={callLengths}
        colors={COLORS}
      />
      <ChartCard
        title="Call Categories"
        data={callCategories}
        colors={COLORS}
      />
    </div>
  )
}

interface ChartCardProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  colors: string[];
}

function ChartCard({ title, data, colors }: ChartCardProps) {
  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-purple-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pr-2">
        <ChartContainer config={{}} className="h-[180px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChartComponent>
              <Pie
                data={data}
                cx="40%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Legend 
                layout="vertical" 
                align="right" 
                verticalAlign="middle" 
                wrapperStyle={{ right: 10, lineHeight: '24px', width: '45%' }} 
              />
              <ChartTooltip content={<ChartTooltipContent indicator="line" nameKey="name" valueKey="value" />} />
            </PieChartComponent>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}