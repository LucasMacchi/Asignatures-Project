import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import { GlobalContext } from './Context/Contexts';
//import components
import Header from './Components/Header/Header';
import Days from './Components/Days/Days';
import AsignaturesState from './Context/Asignatures/AsignaturesState';
import ToDoList from './Components/TodoList/ToDoList';
function App() {

  const global = useContext(GlobalContext)
  

  return (
      <div className="bigDiv" >
        <div className="App">
          <Header/>
          <AsignaturesState>
            {global?.type === 'week' && <Days/>}
            {global?.type === 'check' && <ToDoList/>}
          </AsignaturesState>
        </div>
      </div>


  );
}

export default App;
