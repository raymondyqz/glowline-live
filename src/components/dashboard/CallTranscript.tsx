import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

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

  const formatTranscript = (transcript: string) => {
    if (!transcript) return null;
    
    return transcript.split('\n').map((line, index) => {
      const isAgent = line.startsWith('Agent:');
      return (
        <div
          key={index}
          className={`p-2 mb-2 rounded-lg ${
            isAgent 
              ? 'bg-purple-100 ml-8' 
              : 'bg-gray-100 mr-8'
          }`}
        >
          <span className="font-semibold text-purple-800">
            {line.split(':')[0]}:
          </span>
          <span className="text-gray-700">
            {line.split(':')[1]}
          </span>
        </div>
      );
    });
  };

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
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <div className="pr-4">
          {formatTranscript(transcript)}
        </div>
      </ScrollArea>
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