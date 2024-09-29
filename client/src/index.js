import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import App from './App'; // Adjust the path if necessary
import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider

const container = document.getElementById('root');
const root = createRoot(container); // Create root
root.render(
  <React.StrictMode>
    <ThemeProvider> {/* Wrap App with ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
