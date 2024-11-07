import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AccountDetails {
  subscription_status: string;
  subscription_type: string | null;
  subscription_expiry: string | null;
}

const Settings = () => {
  const navigate = useNavigate();
  const { session } = useSessionContext();
  const { toast } = useToast();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  const { data: accountDetails, isLoading } = useQuery({
    queryKey: ["accountDetails", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("account_details")
        .select("*")
        .eq("user_id", session?.user?.id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch account details",
          variant: "destructive",
        });
        throw error;
      }

      return data as AccountDetails;
    },
    enabled: !!session?.user?.id,
  });

  const userEmail = session?.user?.email;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-purple-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <h1 className="text-3xl font-bold text-purple-800 mb-8">Account Settings</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{userEmail}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Status</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate("/login");
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;