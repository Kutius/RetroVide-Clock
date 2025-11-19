export enum Theme {
  AMBER = 'AMBER',
  CYAN = 'CYAN',
  GREEN = 'GREEN',
  MAGENTA = 'MAGENTA'
}

export interface TimeState {
  hours: string;
  minutes: string;
  seconds: string;
  period: string; // AM/PM
  fullDate: string;
}

export interface TransmissionResponse {
  message: string;
  frequency: string;
  timestamp: string;
}
