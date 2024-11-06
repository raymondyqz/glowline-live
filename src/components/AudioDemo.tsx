import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Skeleton } from "./ui/skeleton";

const supabase = createClient(
  "https://kuyjsfpzfysiwczrzefx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1eWpzZnB6ZnlzaXdjenJ6ZWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MjIwNjgsImV4cCI6MjA0NjQ5ODA2OH0.XQp1Kuw4NxCDeSp3p_LeZHNrZvxw3RBHB3O4HFMGBLQ"
);

const AudioDemo = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('audio')
          .getPublicUrl('demo.mp3');
        
        if (error) {
          console.error('Error fetching audio:', error);
          return;
        }

        if (data) {
          setAudioUrl(data.publicUrl);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudioUrl();
  }, []);

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
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {loading ? (
              <Skeleton className="w-full h-12" />
            ) : audioUrl ? (
              <audio
                controls
                className="w-full"
                src={audioUrl}
              >
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p className="text-red-500">Failed to load audio demo</p>
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