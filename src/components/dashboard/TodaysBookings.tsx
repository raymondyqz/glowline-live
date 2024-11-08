import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'

interface TodaysBookingsProps {
  bookings: any[];
  onBookingSelect: (booking: any) => void;
  onTranscriptOpen: (open: boolean) => void;
}

export function TodaysBookings({ bookings, onBookingSelect, onTranscriptOpen }: TodaysBookingsProps) {
  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg text-purple-800">Today's Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {bookings.map(booking => (
            <li key={booking.id} className="flex justify-between items-center">
              <div>
                <span className="text-black">
                  {format(new Date(booking.booking_time), 'HH:mm')} - {booking.customer_name}
                </span>
                <span className="ml-2 text-sm text-black">({booking.service})</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-purple-100 text-black hover:bg-purple-200"
                onClick={() => {
                  onBookingSelect(booking)
                  onTranscriptOpen(true)
                }}
              >
                View Details
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}