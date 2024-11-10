import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { Volume2, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MediaDemo = () => {
  const [loadingAudio, setLoadingAudio] = useState(true);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getAudioUrl = async () => {
      try {
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

        const audioFile = files[0];
        console.log('Found audio file:', audioFile.name);

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
        setLoadingAudio(false);
      }
    };

    const getVideoUrl = async () => {
      try {
        const { data } = supabase
          .storage
          .from('videos')
          .getPublicUrl('video-demo.mp4');

        if (!data?.publicUrl) {
          throw new Error('No public URL generated');
        }

        console.log('Video URL:', data.publicUrl);
        setVideoUrl(data.publicUrl);
      } catch (error) {
        console.error('Error loading video:', error);
        toast({
          variant: "destructive",
          title: "Error loading video",
          description: "Please ensure video-demo.mp4 is accessible in the videos bucket.",
        });
      } finally {
        setLoadingVideo(false);
      }
    };

    getAudioUrl();
    getVideoUrl();
  }, [toast]);

  return (
    <section className="py-20 bg-purple-50/50 relative overflow-hidden" id="demo">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
        <div className="absolute -left-48 bottom-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-4">
            Experience Glowline
          </h2>
          <p className="text-purple-700 mb-8">
            See and hear how our AI receptionist handles real-world scenarios with natural,
            professional conversations.
          </p>
          
          <Tabs defaultValue="audio" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="audio" className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Audio Demo
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Video Demo
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="audio">
              <div className="bg-white p-8 rounded-2xl shadow-xl backdrop-blur-lg border-2 border-purple-100">
                {loadingAudio ? (
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
                <p className="mt-6 text-sm text-purple-600">
                  Experience how Glowline handles appointment scheduling, inquiries, and more.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="video">
              <div className="bg-white p-8 rounded-2xl shadow-xl backdrop-blur-lg border-2 border-purple-100">
                {loadingVideo ? (
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
                  <p className="text-red-500">Video file not found</p>
                )}
                <p className="mt-6 text-sm text-purple-600">
                  Experience the simplicity and efficiency of Glowline's dashboard interface.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default MediaDemo;