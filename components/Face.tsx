
import React from 'react';
import { EmotionType } from '../types';

interface FaceProps {
  emotion: EmotionType;
  intensity: number;
}

const Face: React.FC<FaceProps> = ({ emotion, intensity }) => {
  const normalizedIntensity = intensity / 100;
  
  const getEyes = () => {
    switch (emotion) {
      case EmotionType.HAPPY:
        return (
          <>
            <circle cx="35" cy="45" r={3 + (2 * normalizedIntensity)} fill="#334155" className="eye-blink" />
            <circle cx="65" cy="45" r={3 + (2 * normalizedIntensity)} fill="#334155" className="eye-blink" />
          </>
        );
      case EmotionType.SAD:
        return (
          <>
            <path d={`M30,${45 + (5 * normalizedIntensity)} Q35,45 40,${45 + (5 * normalizedIntensity)}`} fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            <path d={`M60,${45 + (5 * normalizedIntensity)} Q65,45 70,${45 + (5 * normalizedIntensity)}`} fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case EmotionType.ANGRY:
        return (
          <>
            <g transform={`translate(35, 45) rotate(${-20 * normalizedIntensity})`}>
              <line x1="-8" y1="0" x2="8" y2="0" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
            </g>
            <g transform={`translate(65, 45) rotate(${20 * normalizedIntensity})`}>
              <line x1="-8" y1="0" x2="8" y2="0" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
            </g>
          </>
        );
      case EmotionType.SURPRISED:
        const r = 3 + (8 * normalizedIntensity);
        return (
          <>
            <circle cx="35" cy="45" r={r} fill="#334155" />
            <circle cx="65" cy="45" r={r} fill="#334155" />
          </>
        );
      case EmotionType.SLEEPY:
        return (
          <>
            <path d="M30,45 Q35,50 40,45" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            <path d="M60,45 Q65,50 70,45" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case EmotionType.SHY:
        return (
          <>
             <circle cx="35" cy="45" r="3" fill="#334155" className="eye-blink" />
             <circle cx="65" cy="45" r="3" fill="#334155" className="eye-blink" />
             <circle cx="25" cy="55" r={5 * normalizedIntensity} fill="#fca5a5" opacity="0.6" />
             <circle cx="75" cy="55" r={5 * normalizedIntensity} fill="#fca5a5" opacity="0.6" />
          </>
        );
      default:
        return (
          <>
            <circle cx="35" cy="45" r="4" fill="#334155" className="eye-blink" />
            <circle cx="65" cy="45" r="4" fill="#334155" className="eye-blink" />
          </>
        );
    }
  };

  const getMouth = () => {
    const bend = 15 * normalizedIntensity;
    switch (emotion) {
      case EmotionType.HAPPY:
        return <path d={`M35,65 Q50,${65 + bend} 65,65`} fill="none" stroke="#334155" strokeWidth="4" strokeLinecap="round" />;
      case EmotionType.SAD:
        return <path d={`M35,70 Q50,${70 - bend} 65,70`} fill="none" stroke="#334155" strokeWidth="4" strokeLinecap="round" />;
      case EmotionType.ANGRY:
        return <line x1="40" y1="70" x2="60" y2="70" stroke="#334155" strokeWidth="4" strokeLinecap="round" />;
      case EmotionType.SURPRISED:
        return <circle cx="50" cy="70" r={3 + (7 * normalizedIntensity)} fill="#334155" />;
      case EmotionType.SLEEPY:
        return <path d="M45,70 Q50,72 55,70" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" opacity="0.6" />;
      case EmotionType.SHY:
        return <path d="M40,65 Q50,65 60,65" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />;
      default:
        return <line x1="40" y1="70" x2="60" y2="70" stroke="#334155" strokeWidth="3" strokeLinecap="round" />;
    }
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {getEyes()}
      {getMouth()}
    </svg>
  );
};

export default Face;
