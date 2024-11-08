import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart as PieChartComponent, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { inputData, COLORS } from '@/lib/dashboardData'

interface DashboardOverviewProps {
  onPageChange: (page: string) => void;
}

export function DashboardOverview({ onPageChange }: DashboardOverviewProps) {
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
                4
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 mb-1">Inbound Calls</p>
              <p className="text-4xl font-bold text-black">12</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <ChartCard
        title="Appointment Types"
        data={inputData.appointmentTypes}
      />
      <ChartCard
        title="Call Lengths"
        data={inputData.callLengths}
      />
      <ChartCard
        title="Call Categories"
        data={inputData.callCategories}
      />
    </div>
  )
}

interface ChartCardProps {
  title: string;
  data: Array<{ name: string; value: number }>;
}

function ChartCard({ title, data }: ChartCardProps) {
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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