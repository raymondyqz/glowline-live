import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { Video } from "lucide-react";

const VideoDemo = () => {
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getVideoUrl = async () => {
      try {
        const { data, error } = await supabase
          .storage
          .from('videos')
          .createSignedUrl('video-demo.mp4', 3600); // 1 hour expiry

        if (error) {
          console.error('Error creating signed URL:', error);
          throw error;
        }

        if (!data?.signedUrl) {
          throw new Error('No signed URL generated');
        }

        setVideoUrl(data.signedUrl);
      } catch (error) {
        console.error('Error loading video:', error);
        toast({
          variant: "destructive",
          title: "Error loading video",
          description: "Please ensure video-demo.mp4 is accessible in the videos bucket.",
        });
      } finally {
        setLoading(false);
      }
    };

    getVideoUrl();
  }, [toast]);

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="video-demo">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
        <div className="absolute -left-48 bottom-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <Video className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-4">
            See Glowline in Action
          </h2>
          <p className="text-purple-700 mb-8">
            Watch how our intuitive interface makes managing your business communications effortless.
          </p>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl backdrop-blur-lg border-2 border-purple-100">
            {loading ? (
              <Skeleton className="w-full aspect-video rounded-lg" />
            ) : videoUrl ? (
              <video
                controls
                className="w-full rounded-lg"
                preload="auto"
                src={videoUrl}
                onError={(e) => {
                  console.error('Video playback error:', e);
                  toast({
                    variant: "destructive",
                    title: "Video playback error",
                    description: "There was an error playing the video file.",
                  });
                }}
              >
                Your browser does not support the video element.
              </video>
            ) : (
              <p className="text-red-500">Video file not found. Please ensure video-demo.mp4 is accessible in the videos bucket.</p>
            )}
            <p className="mt-6 text-sm text-purple-600">
              Experience the simplicity and efficiency of Glowline's dashboard interface.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;