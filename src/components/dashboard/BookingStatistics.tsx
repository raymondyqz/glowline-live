import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartContainer } from "@/components/ui/chart"
import { format } from 'date-fns'

interface BookingStatisticsProps {
  pastWeekData: any[];
}

export function BookingStatistics({ pastWeekData }: BookingStatisticsProps) {
  return (
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
  )
}