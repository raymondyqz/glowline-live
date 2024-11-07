import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        toast({
          title: "Success",
          description: "Successfully logged in",
        });
        navigate("/");
      }
      if (event === 'SIGNED_OUT') {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl backdrop-blur-lg border-2 border-purple-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-purple-800">Welcome to glowline</h2>
          <p className="mt-2 text-sm text-purple-600">Sign in to your account</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#9333ea',
                  brandAccent: '#7e22ce',
                }
              }
            }
          }}
          theme="light"
          providers={[]}
          redirectTo={window.location.origin}
        />
      </div>
    </div>
  );
};

export default Login;