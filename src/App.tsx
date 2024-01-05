import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import { GlobalContext } from './Context/Contexts';
//import components
import Header from './Components/Header/Header';
import Days from './Components/Days/Days';
import AsignaturesState from './Context/Asignatures/AsignaturesState';
import UserState from './Context/User/UserState';
import ToDoList from './Components/TodoList/ToDoList';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import AddTask from './Components/AddTask/AddTask';
import Login from './Components/Login/Login';
import Alert from '@mui/material/Alert';


function App() {

  const global = useContext(GlobalContext)

  const handleAdd = () => {
    global?.changeDialogAddTask(true)
  }

  useEffect(() => {

  },[global?.alert])

  const displayAlert = () => {
    setTimeout(() => {
      global?.changeAlert({status: false, text: "", type: "success"})
    }, 4000);
    return(<Alert variant="filled" severity={global?.alertType}>{global?.alertText}</Alert>)
  }


  return (
      <div className="bigDiv" >
        <div className="App">
          <Header/>
          <UserState>
          <AsignaturesState>
            {global?.type === 'week' && <Days/>}
            {global?.type === 'check' && <ToDoList/>}
            <div id='addBtn'>
              <Fab color="primary" aria-label="add" onClick={handleAdd}>
                <AddIcon />
              </Fab>
            </div>
            <div id='alert'>
              {global?.alert && displayAlert()}
            </div>
            {global?.changeDialogAddTask && <AddTask/>}
            {global?.changeDialogLogin && <Login/>}
          </AsignaturesState>
          </UserState>
        </div>
      </div>


  );
}

export default App;
