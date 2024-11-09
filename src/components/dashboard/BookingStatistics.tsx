import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartContainer } from "@/components/ui/chart"
import { format } from 'date-fns'
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useSessionContext } from "@supabase/auth-helpers-react"

interface BookingStatisticsProps {
  pastWeekData: any[];
}

export function BookingStatistics({ pastWeekData }: BookingStatisticsProps) {
  const { session } = useSessionContext()
  const userId = session?.user?.id

  const { data: callStats } = useQuery({
    queryKey: ['callStats', userId],
    queryFn: async () => {
      const { count: totalCalls } = await supabase
        .from('call_log')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .is('is_booking', false)

      const { count: glowCalls } = await supabase
        .from('call_log')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('through_glow', true)
        .is('is_booking', false)

      return {
        totalCalls: totalCalls || 0,
        glowCalls: glowCalls || 0
      }
    },
    enabled: !!userId
  })

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg text-purple-800">Booking Statistics</CardTitle>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="text-center p-2 bg-blue-50 rounded">
            <p className="text-sm text-gray-600">Total Calls</p>
            <p className="text-xl font-bold text-blue-600">{callStats?.totalCalls || 0}</p>
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <p className="text-sm text-gray-600">Through Glow</p>
            <p className="text-xl font-bold text-green-600">{callStats?.glowCalls || 0}</p>
          </div>
        </div>
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
                          <p className="text-sm text-blue-600">{`Total Calls: ${payload[0].value}`}</p>
                          <p className="text-sm text-green-600">{`Through Glow: ${payload[1].value}`}</p>
                          <p className="text-sm text-gray-600">{`Total: ${total}`}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="totalCalls" stackId="a" fill="#36A2EB" name="Total Calls" />
                <Bar dataKey="throughGlow" stackId="a" fill="#4BC0C0" name="Through Glow" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-2 text-sm text-black flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <span className="w-4 h-4 bg-[#36A2EB] mr-2 rounded"></span>
              <span>Total Calls</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-[#4BC0C0] mr-2 rounded"></span>
              <span>Through Glow</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}