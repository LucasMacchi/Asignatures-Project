import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import { GlobalContext } from './Context/Contexts';
//import components
import Header from './Components/Header/Header';
import Days from './Components/Days/Days';
import AsignaturesState from './Context/Asignatures/AsignaturesState';
import ToDoList from './Components/TodoList/ToDoList';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

function App() {

  const global = useContext(GlobalContext)
  

  return (
      <div className="bigDiv" >
        <div className="App">
          <Header/>
          <AsignaturesState>
            {global?.type === 'week' && <Days/>}
            {global?.type === 'check' && <ToDoList/>}
            <div id='addBtn'>
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </div>
          </AsignaturesState>
        </div>
      </div>


  );
}

export default App;
