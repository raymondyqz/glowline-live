import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart as PieChartComponent, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']

interface ChartCardProps {
  title: string;
  data: Array<{ name: string; value: number }>;
}

export function ChartCard({ title, data }: ChartCardProps) {
  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-purple-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pr-2">
        <ChartContainer config={{}} className="h-[220px] mt-4">
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
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-out"
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