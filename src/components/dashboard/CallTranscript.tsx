import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CallTranscriptProps {
  booking: any;
  transcript: string;
}

export function CallTranscript({ booking, transcript }: CallTranscriptProps) {
  if (!booking) {
    return <div className="text-purple-700">No booking selected</div>
  }

  const keyDatapoints = [
    { label: 'Service Requested', value: booking.service },
    { label: 'Details', value: booking.details },
    { label: 'Booking Time', value: booking.time },
  ]

  const suggestions = [
    'Offer a loyalty discount on the next visit',
    'Recommend a complementary service',
    'Follow up with a satisfaction survey',
  ]

  return (
    <div className="space-y-4 text-center">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-purple-800">Sentiment Score</div>
        <div className="flex items-center">
          <span className={`text-sm font-medium mr-2 ${
            booking.sentiment >= 66 ? 'text-green-600' : 
            booking.sentiment >= 33 ? 'text-orange-500' : 'text-red-600'
          }`}>
            {booking.sentiment}%
          </span>
          <span className="text-2xl">
            {booking.sentiment >= 66 ? '😊' : booking.sentiment >= 33 ? '😐' : '🙁'}
          </span>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-md h-48 overflow-y-auto text-left">
        <pre className="whitespace-pre-wrap text-black text-sm">{transcript}</pre>
      </div>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">Key Datapoints</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-purple-700">
            {keyDatapoints.map((datapoint, index) => (
              <li key={index}><strong>{datapoint.label}:</strong> {datapoint.value}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">Suggestions & Follow-ups</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-purple-700">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}