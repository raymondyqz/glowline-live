import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartContainer } from "@/components/ui/chart"
import { format } from 'date-fns'

interface BookingStatisticsProps {
  pastWeekData: any[];
}

export function BookingStatistics({ pastWeekData }: BookingStatisticsProps) {
  // Get today's data (last item in the array)
  const todayData = pastWeekData[pastWeekData.length - 1]
  const totalCallsToday = todayData ? todayData.callBookings + todayData.nonCallBookings : 0
  const glowCallsToday = todayData ? todayData.callBookings : 0

  return (
    <Card className="bg-white/50 backdrop-blur-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-purple-800">Call Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-full">
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="bg-white/80 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Total Calls Today</p>
              <p className="text-2xl font-semibold text-purple-800">{totalCallsToday}</p>
            </div>
            <div className="bg-white/80 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Calls through Glow Today</p>
              <p className="text-2xl font-semibold text-blue-600">{glowCallsToday}</p>
            </div>
          </div>
          <ChartContainer config={{}} className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pastWeekData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => format(new Date(value), 'MM/dd')}
                  dy={10}
                  tick={{ fontSize: 11 }}
                />
                <YAxis dx={-10} tick={{ fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-gray-300 rounded shadow text-center">
                          <p className="text-xs text-purple-800">{`Date: ${format(new Date(label), 'MM/dd/yyyy')}`}</p>
                          <p className="text-xs text-gray-600">{`Customer: ${payload[0].payload.customer_name || ''}`}</p>
                          <p className="text-xs text-blue-600">{`Calls through Glow: ${payload[0].value}`}</p>
                          <p className="text-xs text-red-600">{`Other Calls: ${payload[1].value}`}</p>
                          <p className="text-xs text-green-600">{`Total: ${Number(payload[0].value) + Number(payload[1].value)}`}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="callBookings" stackId="a" fill="#36A2EB" name="Calls through Glow" />
                <Bar dataKey="nonCallBookings" stackId="a" fill="#FF6384" name="Other Calls" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-1 text-xs text-black flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-[#36A2EB] mr-1 rounded"></span>
              <span>Calls through Glow</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-[#FF6384] mr-1 rounded"></span>
              <span>Other Calls</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}