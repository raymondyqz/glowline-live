import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { format } from "date-fns"
import { useState } from "react"
import { CallTranscript } from "./CallTranscript"

interface RecentCallsTableProps {
  recentCalls: any[];
  todaysBookings: any[];
}

export function RecentCallsTable({ recentCalls, todaysBookings }: RecentCallsTableProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)

  const getSentimentEmoji = (sentiment: number) => {
    return sentiment >= 66 ? '😊' : sentiment >= 33 ? '😐' : '🙁'
  }

  const getSentimentColor = (sentiment: number) => {
    return sentiment >= 66 ? 'text-green-600' : sentiment >= 33 ? 'text-orange-500' : 'text-red-600'
  }

  const handleRowClick = (item: any) => {
    setSelectedItem(item)
    setIsTranscriptOpen(true)
  }

  // Combine and sort calls and bookings
  const combinedItems = [
    ...recentCalls.map(call => ({
      ...call,
      type: 'call',
      displayTime: format(new Date(call.start_time), 'HH:mm'),
      displayName: call.phone
    })),
    ...todaysBookings.map(booking => ({
      ...booking,
      type: 'booking',
      displayTime: format(new Date(booking.booking_time), 'HH:mm'),
      displayName: booking.customer_name
    }))
  ].sort((a, b) => {
    const timeA = a.type === 'call' ? new Date(a.start_time) : new Date(a.booking_time)
    const timeB = b.type === 'call' ? new Date(b.start_time) : new Date(b.booking_time)
    return timeB.getTime() - timeA.getTime()
  })

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Time</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Name/Phone</TableHead>
            <TableHead className="text-center">Details</TableHead>
            <TableHead className="text-center">Sentiment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {combinedItems.map((item) => (
            <TableRow 
              key={item.id}
              onClick={() => handleRowClick(item)}
              className="cursor-pointer hover:bg-purple-50"
            >
              <TableCell className="text-center">{item.displayTime}</TableCell>
              <TableCell className="text-center">
                {item.type === 'call' ? 'Call' : 'Booking'}
              </TableCell>
              <TableCell className="text-center">{item.displayName}</TableCell>
              <TableCell className="text-center">
                {item.type === 'call' ? item.reason : item.service}
              </TableCell>
              <TableCell className="text-center">
                {item.sentiment && (
                  <span className={`flex items-center justify-center ${getSentimentColor(item.sentiment)}`}>
                    {getSentimentEmoji(item.sentiment)}
                    <span className="ml-1">{item.sentiment}%</span>
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isTranscriptOpen} onOpenChange={setIsTranscriptOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg text-purple-800">
              {selectedItem?.type === 'call' ? 'Call Transcript' : 'Booking Details'} - {selectedItem?.displayName}
            </DialogTitle>
          </DialogHeader>
          <CallTranscript 
            booking={{
              service: selectedItem?.type === 'call' ? selectedItem?.reason : selectedItem?.service,
              details: selectedItem?.type === 'call' ? `Call Duration: ${selectedItem?.duration}` : selectedItem?.details,
              time: selectedItem?.type === 'call' ? selectedItem?.start_time : selectedItem?.booking_time,
              sentiment: selectedItem?.sentiment
            }} 
            transcript={selectedItem?.transcript} 
          />
        </DialogContent>
      </Dialog>
    </>
  )
}