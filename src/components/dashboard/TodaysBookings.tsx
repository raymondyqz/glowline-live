import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { CallTranscript } from "./CallTranscript"

interface TodaysBookingsProps {
  bookings: any[];
  onBookingSelect: (booking: any) => void;
  onTranscriptOpen: (open: boolean) => void;
}

export function TodaysBookings({ bookings, onBookingSelect, onTranscriptOpen }: TodaysBookingsProps) {
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)

  const handleBookingClick = (booking: any) => {
    setSelectedBooking(booking)
    setIsTranscriptOpen(true)
  }

  return (
    <>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">Today's Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {bookings.map(booking => (
              <li 
                key={booking.id} 
                className="flex justify-between items-center p-2 hover:bg-purple-50 cursor-pointer rounded"
                onClick={() => handleBookingClick(booking)}
              >
                <div>
                  <span className="text-black">
                    {format(new Date(booking.booking_time), 'HH:mm')} - {booking.customer_name}
                  </span>
                  <span className="ml-2 text-sm text-black">({booking.service})</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Dialog open={isTranscriptOpen} onOpenChange={setIsTranscriptOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg text-purple-800">
              Booking Details - {selectedBooking?.customer_name}
            </DialogTitle>
          </DialogHeader>
          <CallTranscript 
            booking={selectedBooking} 
            transcript={selectedBooking?.transcript} 
          />
        </DialogContent>
      </Dialog>
    </>
  )
}