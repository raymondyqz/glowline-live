import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

const AudioDemo = () => {
  const [loading, setLoading] = useState(true);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getAudioUrl = async () => {
      try {
        const { data, error } = await supabase
          .storage
          .from('audio')
          .createSignedUrl('demo-call.mp3', 3600); // URL valid for 1 hour

        if (error) {
          throw error;
        }

        if (data?.signedUrl) {
          setAudioUrl(data.signedUrl);
        }
      } catch (error) {
        console.error('Error loading audio:', error);
        toast({
          variant: "destructive",
          title: "Error loading audio",
          description: "Please try refreshing the page.",
        });
      } finally {
        setLoading(false);
      }
    };

    getAudioUrl();
  }, [toast]);

  return (
    <section className="py-20 bg-glowline-rose/5" id="demo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-glowline-navy mb-4">
            Hear Glowline in Action
          </h2>
          <p className="text-gray-600 mb-8">
            Listen to how our AI receptionist handles real-world scenarios with natural,
            professional conversations.
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            {audioUrl ? (
              <audio
                controls
                className="w-full"
                preload="auto"
                src={audioUrl}
                onLoadStart={() => setLoading(true)}
                onLoadedData={() => setLoading(false)}
              >
                Your browser does not support the audio element.
              </audio>
            ) : loading ? (
              <Skeleton className="w-full h-12" />
            ) : (
              <p className="text-red-500">Audio file not found</p>
            )}
            <p className="mt-4 text-sm text-gray-500">
              Experience how Glowline handles appointment scheduling, inquiries, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioDemo;