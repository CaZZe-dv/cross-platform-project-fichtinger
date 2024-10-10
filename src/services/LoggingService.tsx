// src/services/LoggingService.tsx
import { createContext, useState, useContext, ReactNode } from 'react';

interface LoggingContextProps {
    logs: string[];
    addLog: (log: string) => void;
    clearLogs: () => void;
}

const LoggingContext = createContext<LoggingContextProps | undefined>(undefined);

export const LoggingProvider = ({ children }: { children: ReactNode }) => {
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (log: string) => {
        setLogs(prevLogs => [...prevLogs, log]);
    };

    const clearLogs = () => {
        setLogs([]); // Reset the logs array
    };

    return (
        <LoggingContext.Provider value={{ logs, addLog, clearLogs }}>
            {children}
        </LoggingContext.Provider>
    );
};

export const useLogs = () => {
    const context = useContext(LoggingContext);
    if (!context) {
        throw new Error('useLogs must be used within a LoggingProvider');
    }
    return context;
};
