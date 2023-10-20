import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import { GlobalContext } from './Context/Contexts';
//import components
import Header from './Components/Header/Header';
import Days from './Days/Days';
function App() {

  const global = useContext(GlobalContext)

  return (
      <div className="bigDiv" >
        <div className="App">
          <Header/>
          {global?.type === 'week' && <Days/>}
        </div>
      </div>


  );
}

export default App;
