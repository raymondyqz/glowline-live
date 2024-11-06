import { useState, useRef } from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";

const AudioDemo = () => {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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
            <audio
              ref={audioRef}
              className="hidden"
              preload="auto"
              src="https://drive.google.com/uc?export=download&id=1Qo3yt-TBNfRw4zcpYoUbZTJ_yA4jRX4q"
              onLoadStart={() => setLoading(true)}
              onLoadedData={() => setLoading(false)}
              onEnded={() => setIsPlaying(false)}
            >
              Your browser does not support the audio element.
            </audio>
            
            {loading ? (
              <Skeleton className="w-full h-12" />
            ) : (
              <Button 
                onClick={togglePlay}
                className="w-full h-12 flex items-center justify-center gap-2 text-lg"
                variant="outline"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                {isPlaying ? "Pause Demo" : "Play Demo"}
              </Button>
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