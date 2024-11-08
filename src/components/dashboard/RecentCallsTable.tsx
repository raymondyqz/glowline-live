import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { CallTranscript } from "./CallTranscript"

interface RecentCallsTableProps {
  recentCalls: any[];
}

export function RecentCallsTable({ recentCalls }: RecentCallsTableProps) {
  const [selectedCall, setSelectedCall] = useState<any>(null)
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)

  const getSentimentEmoji = (sentiment: number) => {
    return sentiment >= 66 ? '😊' : sentiment >= 33 ? '😐' : '🙁'
  }

  const getSentimentColor = (sentiment: number) => {
    return sentiment >= 66 ? 'text-green-600' : sentiment >= 33 ? 'text-orange-500' : 'text-red-600'
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Phone</TableHead>
            <TableHead className="text-center">Reason</TableHead>
            <TableHead className="text-center">Duration</TableHead>
            <TableHead className="text-center">Start Time</TableHead>
            <TableHead className="text-center">Sentiment</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentCalls.map((call) => (
            <TableRow key={call.id}>
              <TableCell className="text-center">{call.phone}</TableCell>
              <TableCell className="text-center">{call.reason}</TableCell>
              <TableCell className="text-center">{call.duration}</TableCell>
              <TableCell className="text-center">
                {format(new Date(call.start_time), 'HH:mm')}
              </TableCell>
              <TableCell className="text-center">
                <span className={`flex items-center justify-center ${getSentimentColor(call.sentiment)}`}>
                  {getSentimentEmoji(call.sentiment)}
                  <span className="ml-1">{call.sentiment}%</span>
                </span>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-purple-100 text-black hover:bg-purple-200"
                  onClick={() => {
                    setSelectedCall(call)
                    setIsTranscriptOpen(true)
                  }}
                >
                  View Transcript
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isTranscriptOpen} onOpenChange={setIsTranscriptOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg text-purple-800">
              Call Transcript - {selectedCall?.phone}
            </DialogTitle>
          </DialogHeader>
          <CallTranscript 
            booking={{
              service: selectedCall?.reason,
              details: `Call Duration: ${selectedCall?.duration}`,
              time: selectedCall?.start_time,
              sentiment: selectedCall?.sentiment
            }} 
            transcript={selectedCall?.transcript} 
          />
        </DialogContent>
      </Dialog>
    </>
  )
}