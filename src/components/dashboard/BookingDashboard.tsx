import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { RecentCallsTable } from './RecentCallsTable'
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router-dom'

interface BookingDashboardProps {
  onBookingSelect: (booking: any) => void;
  onTranscriptOpen: (open: boolean) => void;
}

export function BookingDashboard({ onBookingSelect, onTranscriptOpen }: BookingDashboardProps) {
  const [recentCalls, setRecentCalls] = useState<any[]>([])
  const { session, isLoading } = useSessionContext()
  const { toast } = useToast()
  const navigate = useNavigate()
  const userId = session?.user?.id

  useEffect(() => {
    // Check if user is not authenticated and not loading
    if (!isLoading && !session) {
      toast({
        title: "Authentication required",
        description: "Please log in to view the dashboard",
        variant: "destructive",
      })
      navigate('/login')
      return
    }

    if (!userId) return

    const fetchData = async () => {
      try {
        const { data: callsData, error } = await supabase
          .from('call_records')
          .select('*, customer_name')
          .eq('user_id', userId)
          .order('start_time', { ascending: false })

        if (error) throw error

        if (callsData) {
          setRecentCalls(callsData.map(call => ({
            ...call,
            customer_name: call.customer_name || 'Unknown Customer'
          })))
        }
      } catch (error: any) {
        toast({
          title: "Error fetching data",
          description: error.message,
          variant: "destructive",
        })
      }
    }

    fetchData()
  }, [userId, session, isLoading, navigate, toast])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">Recent Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentCallsTable recentCalls={recentCalls} />
        </CardContent>
      </Card>
    </div>
  )
}