import { ReactNode, useState } from 'react';
import { LogsContext } from './LogContext';

export const LogsProvider = ({ children }: { children: ReactNode }) => {
  const [logs, setLogs] = useState<
    {
      id: string;
      message: string;
      timestamp: Date;
    }[]
  >([]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, { id: crypto.randomUUID(), message, timestamp: new Date() }]);
  };

  const clearLogs = () => setLogs([]);

  return (
    <LogsContext.Provider value={{ logs, addLog, clearLogs }}>{children}</LogsContext.Provider>
  );
};
