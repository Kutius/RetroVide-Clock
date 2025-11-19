import React, { useState } from 'react';
import { Radio, RefreshCcw, Wifi } from 'lucide-react';
import { fetchRetroTransmission } from '../services/geminiService';
import { TransmissionResponse, Theme } from '../types';

interface AITransmissionProps {
  currentTime: string;
  theme: Theme;
  accentColor: string;
}

const AITransmission: React.FC<AITransmissionProps> = ({ currentTime, theme, accentColor }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TransmissionResponse | null>(null);

  const handleReceiveSignal = async () => {
    setLoading(true);
    const result = await fetchRetroTransmission(currentTime);
    setData(result);
    setLoading(false);
  };

  return (
    <div className={`mt-8 p-4 border-2 ${accentColor.replace('fill-', 'border-')} rounded-lg bg-black/50 backdrop-blur-sm w-full max-w-2xl relative overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.7)]`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
        <div className="flex items-center gap-2">
          <Radio className={`w-5 h-5 ${accentColor.replace('fill-', 'text-')} animate-pulse`} />
          <h3 className="text-lg font-[VT323] tracking-widest uppercase text-gray-300">
            Frequency Tuner
          </h3>
        </div>
        <button
          onClick={handleReceiveSignal}
          disabled={loading}
          className={`flex items-center gap-2 px-3 py-1 text-xs font-bold font-[Share_Tech_Mono] uppercase tracking-wider border ${accentColor.replace('fill-', 'border-')} ${accentColor.replace('fill-', 'text-')} hover:bg-white/10 transition-colors disabled:opacity-50`}
        >
          {loading ? <RefreshCcw className="w-3 h-3 animate-spin" /> : <Wifi className="w-3 h-3" />}
          {loading ? 'Scanning...' : 'Tune In'}
        </button>
      </div>

      {/* Display Area */}
      <div className="min-h-[100px] font-[VT323] text-xl leading-tight">
        {!data && !loading && (
          <div className="text-gray-500 text-center py-6 opacity-50">
            AWAITING INPUT... PRESS "TUNE IN" TO SCAN MULTIVERSE FREQUENCIES.
          </div>
        )}
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-6 space-y-2">
            <div className={`w-full h-1 ${accentColor.replace('fill-', 'bg-')} animate-pulse opacity-50`}></div>
            <div className={`w-3/4 h-1 ${accentColor.replace('fill-', 'bg-')} animate-pulse opacity-30`}></div>
            <div className={`w-1/2 h-1 ${accentColor.replace('fill-', 'bg-')} animate-pulse opacity-20`}></div>
            <span className="text-xs font-[Share_Tech_Mono] text-gray-400 mt-2">TRIANGULATING SIGNAL SOURCE...</span>
          </div>
        )}

        {data && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex justify-between text-xs font-[Share_Tech_Mono] text-gray-500 mb-2">
               <span>FREQ: {data.frequency}</span>
               <span>TS: {data.timestamp}</span>
            </div>
            <p className={`text-2xl ${accentColor.replace('fill-', 'text-')} drop-shadow-md`}>
              "{data.message}"
            </p>
          </div>
        )}
      </div>
      
      {/* Decorative Corner markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gray-500"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-gray-500"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-gray-500"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gray-500"></div>
    </div>
  );
};

export default AITransmission;