import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { format } from "date-fns"
import { useState } from "react"
import { CallTranscript } from "./CallTranscript"
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination"

interface RecentCallsTableProps {
  recentCalls: any[];
}

export function RecentCallsTable({ recentCalls }: RecentCallsTableProps) {
  const [selectedCall, setSelectedCall] = useState<any>(null)
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const getSentimentEmoji = (sentiment: number) => {
    return sentiment >= 66 ? '😊' : sentiment >= 33 ? '😐' : '🙁'
  }

  const getSentimentColor = (sentiment: number) => {
    return sentiment >= 66 ? 'text-green-600' : sentiment >= 33 ? 'text-orange-500' : 'text-red-600'
  }

  const handleRowClick = (call: any) => {
    setSelectedCall(call)
    setIsTranscriptOpen(true)
  }

  // Calculate pagination
  const totalPages = Math.ceil(recentCalls.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCalls = recentCalls.slice(startIndex, endIndex)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pages.push(i)
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        pages.push('...')
      }
    }
    return pages
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Phone</TableHead>
            <TableHead className="text-center">Reason</TableHead>
            <TableHead className="text-center">Duration</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Time</TableHead>
            <TableHead className="text-center">Sentiment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCalls.map((call) => (
            <TableRow 
              key={call.id}
              onClick={() => handleRowClick(call)}
              className="cursor-pointer hover:bg-purple-50"
            >
              <TableCell className="text-center">{call.phone}</TableCell>
              <TableCell className="text-center">{call.reason}</TableCell>
              <TableCell className="text-center">{call.duration}</TableCell>
              <TableCell className="text-center">
                {format(new Date(call.start_time), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell className="text-center">
                {format(new Date(call.start_time), 'HH:mm')}
              </TableCell>
              <TableCell className="text-center">
                <span className={`flex items-center justify-center ${getSentimentColor(call.sentiment)}`}>
                  {getSentimentEmoji(call.sentiment)}
                  <span className="ml-1">{call.sentiment}%</span>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === '...' ? (
                    <span className="px-4 py-2">...</span>
                  ) : (
                    <PaginationLink
                      onClick={() => setCurrentPage(Number(page))}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <Dialog open={isTranscriptOpen} onOpenChange={setIsTranscriptOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg text-purple-800">
              Call Transcript - {selectedCall?.phone}
            </DialogTitle>
          </DialogHeader>
          <CallTranscript 
            booking={{
              service: selectedCall?.service,
              details: selectedCall?.details,
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