import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useSessionContext } from "@supabase/auth-helpers-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useSessionContext();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
      navigate("/login");
    }
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-purple-800">Glowline</span>
            </Link>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "text-purple-800"
                  : "text-gray-500 hover:text-purple-700"
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                isActive("/about")
                  ? "text-purple-800"
                  : "text-gray-500 hover:text-purple-700"
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              About
            </Link>
            {session ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="ml-4 border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => navigate("/login")}
                className="ml-4 bg-purple-600 hover:bg-purple-700"
              >
                Sign In
              </Button>
            )}
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-purple-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-white border-b border-purple-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "text-purple-800"
                  : "text-gray-500 hover:text-purple-700"
              } block px-3 py-2 text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                isActive("/about")
                  ? "text-purple-800"
                  : "text-gray-500 hover:text-purple-700"
              } block px-3 py-2 text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {session ? (
              <Button
                variant="outline"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full mt-2 border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="w-full mt-2 bg-purple-600 hover:bg-purple-700"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;