import React, { memo } from 'react';
import './LogList.css';
import { useLogs } from './useLogs';

const LogsList: React.FC = () => {
  const { logs, clearLogs } = useLogs();

  return (
    <div className="logs-container">
      <div className="logs-header">
        <h2 className="logs-title">Logs</h2>
        <button onClick={clearLogs} className="logs-clear-btn">
          Clear
        </button>
      </div>
      <ul className="logs-list">
        {logs.map((log) => (
          <li key={log.id} className="logs-item">
            <span className="logs-time">{log.timestamp.toLocaleTimeString()}</span>
            <span className="logs-message">{log.message}</span>
          </li>
        ))}
        {logs.length === 0 && <li className="logs-empty">Aucun log pour l’instant</li>}
      </ul>
    </div>
  );
};

export default memo(LogsList);
