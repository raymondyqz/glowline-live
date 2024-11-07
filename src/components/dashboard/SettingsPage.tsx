import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-800 mb-6">Settings</h2>
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
      <Card className="bg-white/50 backdrop-blur-sm mt-6">
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
    </div>
  )
}