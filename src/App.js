import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainWindow from './components/MainWindow';
import WebWindow from './components/Web';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainWindow/>}/>
          <Route path="/Web/" element={<WebWindow/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;