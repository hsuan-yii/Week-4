
import React, { useState, useEffect, useCallback } from 'react';
import { EmotionType, ObjectShape } from './types';
import Face from './components/Face';
import { getObjectThought } from './services/geminiService';

const App: React.FC = () => {
  const [shape, setShape] = useState<ObjectShape>(ObjectShape.CIRCLE);
  const [emotion, setEmotion] = useState<EmotionType>(EmotionType.HAPPY);
  const [intensity, setIntensity] = useState<number>(50);
  const [thought, setThought] = useState<string>("Hello! Click me to see what I'm thinking.");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isJiggling, setIsJiggling] = useState<boolean>(false);

  const updateThought = useCallback(async () => {
    setIsThinking(true);
    const newThought = await getObjectThought(shape, emotion, intensity);
    setThought(newThought);
    setIsThinking(false);
  }, [shape, emotion, intensity]);

  useEffect(() => {
    // Debounced thought update would be better, but for this demo 
    // we update on manual trigger or slightly delayed effect to feel responsive
    const timer = setTimeout(() => {
       // updateThought(); // Uncomment to auto-update, but we'll use a manual click/trigger to save tokens
    }, 1000);
    return () => clearTimeout(timer);
  }, [shape, emotion, intensity]);

  const handleObjectClick = () => {
    setIsJiggling(true);
    updateThought();
    setTimeout(() => setIsJiggling(false), 500);
  };

  const getShapeClasses = () => {
    const base = "transition-all duration-700 ease-in-out cursor-pointer flex items-center justify-center shadow-2xl relative ";
    const animation = isJiggling ? "animate-ping " : "animate-float ";
    
    let shapeStyles = "";
    switch (shape) {
      case ObjectShape.CIRCLE:
        shapeStyles = "rounded-full w-64 h-64 bg-yellow-100 border-4 border-yellow-200";
        break;
      case ObjectShape.SQUARE:
        shapeStyles = "rounded-3xl w-64 h-64 bg-blue-100 border-4 border-blue-200";
        break;
      case ObjectShape.TRIANGLE:
        shapeStyles = "w-64 h-64 bg-green-100 border-4 border-green-200";
        // Triangles are harder with plain CSS for 'Face' containment, let's use a soft polygon
        shapeStyles = "w-64 h-64 bg-green-100 border-4 border-green-200 rounded-[20%_80%_20%_80%/80%_20%_80%_20%]";
        break;
      case ObjectShape.CAPSULE:
        shapeStyles = "rounded-full w-48 h-72 bg-purple-100 border-4 border-purple-200";
        break;
    }

    return base + animation + shapeStyles;
  };

  const getBackgroundStyles = () => {
    switch (emotion) {
      case EmotionType.HAPPY: return "bg-yellow-50";
      case EmotionType.SAD: return "bg-blue-50";
      case EmotionType.ANGRY: return "bg-red-50";
      case EmotionType.SURPRISED: return "bg-orange-50";
      case EmotionType.SHY: return "bg-pink-50";
      case EmotionType.SLEEPY: return "bg-indigo-50";
      default: return "bg-slate-50";
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${getBackgroundStyles()} flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-8`}>
      
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl space-y-8 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">EmotiObject</h1>
          <p className="text-sm text-slate-500 italic">Week 4: Emotional Response</p>
        </div>

        {/* Shape Selection */}
        <section>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Base Shape</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(ObjectShape).map(s => (
              <button 
                key={s}
                onClick={() => setShape(s)}
                className={`py-2 px-3 rounded-xl text-sm transition-all ${shape === s ? 'bg-slate-800 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* Emotion Selection */}
        <section>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Active Emotion</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.values(EmotionType).map(e => (
              <button 
                key={e}
                onClick={() => setEmotion(e)}
                className={`py-2 px-1 rounded-xl text-xs transition-all ${emotion === e ? 'bg-slate-800 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {e}
              </button>
            ))}
          </div>
        </section>

        {/* Intensity Slider */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Intensity</label>
            <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-full">{intensity}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={intensity} 
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
          />
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-slate-400">Subtle</span>
            <span className="text-[10px] text-slate-400">Extreme</span>
          </div>
        </section>

        <button 
          onClick={handleObjectClick}
          disabled={isThinking}
          className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold shadow-lg hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
        >
          {isThinking ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            "Poke for Thoughts"
          )}
        </button>
      </div>

      {/* Main Interaction Area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-12 max-w-2xl">
        
        {/* Thought Bubble */}
        <div className={`relative transition-all duration-500 transform ${isThinking ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
          <div className="bg-white p-6 rounded-[2.5rem] shadow-lg max-w-sm text-center relative border-b-4 border-slate-100">
            <p className="text-lg font-playful text-slate-700 leading-relaxed">
              "{thought}"
            </p>
            {/* Bubble Tail */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rotate-45 border-b-4 border-r-4 border-slate-50" />
          </div>
        </div>

        {/* The Object */}
        <div 
          onClick={handleObjectClick}
          className={getShapeClasses()}
        >
          <div className="w-full h-full p-4">
            <Face emotion={emotion} intensity={intensity} />
          </div>
          
          {/* Intensity Aura */}
          <div 
            className="absolute inset-0 rounded-full blur-2xl -z-10 transition-all duration-1000"
            style={{ 
              opacity: intensity / 200, 
              backgroundColor: 'currentColor',
              transform: `scale(${1 + (intensity/200)})` 
            }}
          />
        </div>

        <div className="text-center">
          <p className="text-slate-400 text-sm max-w-md">
            Notice how the <strong>{shape}</strong> feels more alive as you change its <strong>{emotion}</strong> state.
            Emotional design isn't built on logic, but on the visceral <strong>feeling</strong> of connection.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="fixed bottom-4 right-4 md:right-8 text-xs text-slate-400 font-mono">
        GEMINI POWERED • RESPONSIVE OBJECT DESIGN
      </footer>
    </div>
  );
};

export default App;
