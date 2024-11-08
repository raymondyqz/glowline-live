import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TodayActivityProps {
  bookings: number;
  calls: number;
  onPageChange: (page: string) => void;
}

export function TodayActivity({ bookings, calls, onPageChange }: TodayActivityProps) {
  return (
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
              {bookings}
            </Button>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Inbound Calls</p>
            <p className="text-4xl font-bold text-black">{calls}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}