import { useState, useEffect } from 'react';
import { TimeState } from '../types';

export const useTime = (is24Hour: boolean = false) => {
  const [time, setTime] = useState<TimeState>({
    hours: '00',
    minutes: '00',
    seconds: '00',
    period: 'AM',
    fullDate: '',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();
      
      let period = h >= 12 ? 'PM' : 'AM';

      if (!is24Hour) {
        h = h % 12;
        h = h ? h : 12; // the hour '0' should be '12'
      } else {
        period = ''; // No AM/PM in 24h usually, or handled differently
      }

      const pad = (num: number) => num.toString().padStart(2, '0');

      const dateOptions: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      };

      setTime({
        hours: pad(h),
        minutes: pad(m),
        seconds: pad(s),
        period,
        fullDate: now.toLocaleDateString('en-US', dateOptions).toUpperCase(),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [is24Hour]);

  return time;
};