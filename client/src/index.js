import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import App from './App'; // Adjust the path if necessary
import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider
import { ClerkProvider } from '@clerk/clerk-react'; // Added ClerkProvider import

const container = document.getElementById('root');
const root = createRoot(container); // Create root
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey="pk_test_ZW1lcmdpbmctcGlnZW9uLTg4LmNsZXJrLmFjY291bnRzLmRldiQ"> {/* Use your publishable key here */}
      <ThemeProvider> {/* Wrap App with ThemeProvider */}
        <App />
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
