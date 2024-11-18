import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainWindow from './components/MainWindow';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainWindow/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;