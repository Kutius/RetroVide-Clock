import React, { useState } from 'react';
import { Settings, Maximize2, Minimize2, ToggleLeft, ToggleRight } from 'lucide-react';
import { useTime } from './hooks/useTime';
import ClockDigit from './components/ClockDigit';
import AITransmission from './components/AITransmission';
import { Theme } from './types';

const App: React.FC = () => {
  const [is24Hour, setIs24Hour] = useState(false);
  const [theme, setTheme] = useState<Theme>(Theme.AMBER);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { hours, minutes, seconds, period, fullDate } = useTime(is24Hour);

  // Styles based on Theme
  const getThemeStyles = (t: Theme) => {
    switch (t) {
      case Theme.CYAN:
        return {
          fill: 'fill-cyan-400',
          glow: 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]',
          text: 'text-cyan-400',
          bg: 'bg-cyan-900/20',
          border: 'border-cyan-500/50',
          shadow: 'shadow-[0_0_30px_rgba(34,211,238,0.15)]'
        };
      case Theme.GREEN:
        return {
          fill: 'fill-emerald-500',
          glow: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]',
          text: 'text-emerald-500',
          bg: 'bg-emerald-900/20',
          border: 'border-emerald-500/50',
          shadow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]'
        };
      case Theme.MAGENTA:
        return {
          fill: 'fill-fuchsia-500',
          glow: 'drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]',
          text: 'text-fuchsia-500',
          bg: 'bg-fuchsia-900/20',
          border: 'border-fuchsia-500/50',
          shadow: 'shadow-[0_0_30px_rgba(217,70,239,0.15)]'
        };
      case Theme.AMBER:
      default:
        return {
          fill: 'fill-amber-500',
          glow: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]',
          text: 'text-amber-500',
          bg: 'bg-amber-900/20',
          border: 'border-amber-500/50',
          shadow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]'
        };
    }
  };

  const styles = getThemeStyles(theme);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-900 flex flex-col items-center justify-center relative scanlines selection:bg-white/20">
      
      {/* Background Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(20,20,20,0)_0%,rgba(0,0,0,1)_100%)] z-10"></div>
      
      {/* Controls - Top Right */}
      <div className="absolute top-4 right-4 z-30 flex gap-3 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
        <button 
          onClick={() => setIs24Hour(!is24Hour)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          title="Toggle 12/24H"
        >
          {is24Hour ? '24H' : '12H'}
        </button>
        
        <button 
          onClick={toggleFullScreen}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          title="Toggle Fullscreen"
        >
          {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
        
        <div className="h-auto w-px bg-gray-700 mx-1"></div>

        {/* Theme Selectors */}
        <div className="flex items-center gap-2 px-2">
          {[Theme.AMBER, Theme.CYAN, Theme.GREEN, Theme.MAGENTA].map((t) => {
             let bgClass = 'bg-amber-500';
             if (t === Theme.CYAN) bgClass = 'bg-cyan-400';
             if (t === Theme.GREEN) bgClass = 'bg-emerald-500';
             if (t === Theme.MAGENTA) bgClass = 'bg-fuchsia-500';

             return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-4 h-4 rounded-full ${bgClass} ${theme === t ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'} transition-all`}
                title={t}
              />
             );
          })}
        </div>
      </div>

      {/* Main Clock Container */}
      <div className={`z-20 flex flex-col items-center p-8 sm:p-12 rounded-3xl ${styles.bg} ${styles.border} border backdrop-blur-sm ${styles.shadow} transition-all duration-500`}>
        
        {/* Date Display */}
        <div className={`font-[VT323] text-xl sm:text-2xl mb-6 tracking-[0.2em] uppercase opacity-80 ${styles.text} drop-shadow-md`}>
          {fullDate}
        </div>

        {/* Digits Row */}
        <div className="flex items-end justify-center">
           {/* Hours */}
           <div className="flex">
             <ClockDigit value={hours[0]} colorClass={styles.fill} glowClass={styles.glow} />
             <ClockDigit value={hours[1]} colorClass={styles.fill} glowClass={styles.glow} />
           </div>

           {/* Separator */}
           <div className="mx-1 sm:mx-4 mb-4 sm:mb-8">
             <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${styles.bg} ${styles.text} ${styles.glow} bg-current mb-4 sm:mb-6 animate-pulse`}></div>
             <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${styles.bg} ${styles.text} ${styles.glow} bg-current animate-pulse`}></div>
           </div>

           {/* Minutes */}
           <div className="flex">
             <ClockDigit value={minutes[0]} colorClass={styles.fill} glowClass={styles.glow} />
             <ClockDigit value={minutes[1]} colorClass={styles.fill} glowClass={styles.glow} />
           </div>

           {/* Seconds (Small or Separator) */}
           <div className="mx-1 sm:mx-4 mb-4 sm:mb-8 hidden md:block">
             <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${styles.bg} ${styles.text} ${styles.glow} bg-current mb-4 sm:mb-6 animate-pulse`}></div>
             <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${styles.bg} ${styles.text} ${styles.glow} bg-current animate-pulse`}></div>
           </div>

           {/* Seconds Display (Hidden on very small screens to save space, or smaller) */}
           <div className="hidden md:flex scale-75 origin-bottom">
             <ClockDigit value={seconds[0]} colorClass={styles.fill} glowClass={styles.glow} />
             <ClockDigit value={seconds[1]} colorClass={styles.fill} glowClass={styles.glow} />
           </div>
        </div>

        {/* AM/PM Indicator */}
        {!is24Hour && (
           <div className={`absolute top-8 left-8 font-[Share_Tech_Mono] text-xl ${styles.text} ${styles.glow}`}>
             {period}
           </div>
        )}

        {/* VFD Grid Overlay (Decorative) */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* AI Transmission Section */}
      <AITransmission 
        currentTime={`${hours}:${minutes} ${period}`} 
        theme={theme} 
        accentColor={styles.fill} 
      />

      {/* Footer / Branding */}
      <div className="absolute bottom-4 text-gray-600 font-[Share_Tech_Mono] text-xs z-20 tracking-widest">
        RETRO-CHRONOS SYSTEM v2.5 // ONLINE
      </div>

    </div>
  );
};

export default App;