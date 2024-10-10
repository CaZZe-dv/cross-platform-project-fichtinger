import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {LoggingProvider} from "./services/LoggingService";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <LoggingProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </LoggingProvider>
);