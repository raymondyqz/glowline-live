const AudioDemo = () => {
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
            <audio
              controls
              className="w-full"
              src="https://drive.google.com/file/d/1T9Unkm8BmCEW5jyx63ts4FEwgzmx7l18/view?usp=drive_link"
            >
              Your browser does not support the audio element.
            </audio>
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