import React, { useRef } from 'react';
import '../styles/App.css';

import Building from './Building';


function App() {

  let parallax = useRef(null);

  return (
    <div className="App">
      <Building />
    </div>
  );
}

export default App;
