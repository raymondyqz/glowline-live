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
        // First, list files in the audio bucket to get the actual filename
        const { data: files, error: listError } = await supabase
          .storage
          .from('audio')
          .list();

        if (listError) {
          console.error('Error listing files:', listError);
          throw listError;
        }

        if (!files || files.length === 0) {
          throw new Error('No audio files found in the bucket');
        }

        // Get the first audio file from the bucket
        const audioFile = files[0];
        console.log('Found audio file:', audioFile.name);

        // Create a signed URL for the file
        const { data: urlData, error: urlError } = await supabase
          .storage
          .from('audio')
          .createSignedUrl(audioFile.name, 3600);

        if (urlError) {
          console.error('Error creating signed URL:', urlError);
          throw urlError;
        }

        if (!urlData?.signedUrl) {
          throw new Error('No signed URL generated');
        }

        console.log('Generated signed URL:', urlData.signedUrl);
        setAudioUrl(urlData.signedUrl);
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
    <section className="py-20 bg-purple-100/50" id="demo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-4">
            Hear Glowline in Action
          </h2>
          <p className="text-purple-600 mb-8">
            Listen to how our AI receptionist handles real-world scenarios with natural,
            professional conversations.
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            {loading ? (
              <Skeleton className="w-full h-12" />
            ) : audioUrl ? (
              <audio
                controls
                className="w-full"
                preload="auto"
                src={audioUrl}
                onError={(e) => {
                  console.error('Audio playback error:', e);
                  toast({
                    variant: "destructive",
                    title: "Audio playback error",
                    description: "There was an error playing the audio file.",
                  });
                }}
              >
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p className="text-red-500">Audio file not found</p>
            )}
            <p className="mt-4 text-sm text-purple-500">
              Experience how Glowline handles appointment scheduling, inquiries, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioDemo;