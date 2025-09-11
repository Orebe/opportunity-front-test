import { createContext } from 'react';

interface LogsContextValue {
  logs: {
    id: string;
    message: string;
    timestamp: Date;
  }[];
  addLog: (message: string) => void;
  clearLogs: () => void;
}

export const LogsContext = createContext<LogsContextValue | undefined>(undefined);
