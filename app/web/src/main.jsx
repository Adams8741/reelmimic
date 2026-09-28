import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import { startI18n } from './i18n.js';
createRoot(document.getElementById('root')).render(<App />);
startI18n();
