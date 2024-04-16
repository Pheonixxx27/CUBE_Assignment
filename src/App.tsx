import React from 'react';
import logo from './logo.svg'; // Importing logo image
import './App.css'; // Importing CSS styles
import CustomerPortal from './components/CustomerPortal'; // Importing CustomerPortal component

function App() {
  return (
    <div className="App"> {/* Main container with 'App' class */}
      <CustomerPortal/> {/* Rendering CustomerPortal component */}
    </div>
  );
}

export default App; // Exporting App component
