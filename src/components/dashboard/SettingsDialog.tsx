import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface SettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ isOpen, onOpenChange }: SettingsDialogProps) {
  const { session } = useSessionContext()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: accountDetails, isLoading: isLoadingAccount } = useQuery({
    queryKey: ['accountDetails', session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('account_details')
        .select('*')
        .eq('user_id', session?.user?.id)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!session?.user?.id,
  })

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      })
      navigate("/login")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-800">Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Account and Subscription Status - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-purple-800">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{session?.user?.email}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-purple-800">Subscription Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoadingAccount ? (
                  <p>Loading subscription details...</p>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Current Status</p>
                      <p className="font-medium capitalize">{accountDetails?.subscription_status}</p>
                    </div>
                    {accountDetails?.subscription_type && (
                      <div>
                        <p className="text-sm text-gray-500">Subscription Type</p>
                        <p className="font-medium capitalize">{accountDetails.subscription_type}</p>
                      </div>
                    )}
                    {accountDetails?.subscription_expiry && (
                      <div>
                        <p className="text-sm text-gray-500">Expires On</p>
                        <p className="font-medium">
                          {new Date(accountDetails.subscription_expiry).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* System Settings */}
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-purple-800">System Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="text-black">Dark Mode</Label>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="text-black">Enable Notifications</Label>
                <Switch id="notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-refresh" className="text-black">Auto-refresh Dashboard</Label>
                <Switch id="auto-refresh" />
              </div>
            </CardContent>
          </Card>

          {/* AI Settings */}
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-purple-800">AI Agent Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="ai-suggestions" className="text-black">AI Suggestions</Label>
                <Switch id="ai-suggestions" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sentiment-analysis" className="text-black">Sentiment Analysis</Label>
                <Switch id="sentiment-analysis" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-scheduling" className="text-black">Auto Scheduling</Label>
                <Switch id="auto-scheduling" />
              </div>
            </CardContent>
          </Card>

          <Separator className="my-4" />

          {/* Logout Button */}
          <div className="flex justify-end">
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full sm:w-auto"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}