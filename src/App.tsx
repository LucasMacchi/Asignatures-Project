import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import { GlobalContext, UserContext } from './Context/Contexts';
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
import Register from './Components/Register/Register';
import Alert from '@mui/material/Alert';
import UserData from './Components/Header/userData';


function App() {

  const global = useContext(GlobalContext)
  const user_state = useContext(UserContext)

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

  const addTaskDisplay = () => {
    if(user_state?.isLogged) {
      return(
        <div id='addBtn'>
          <Fab color="primary" aria-label="add" onClick={handleAdd}>
            <AddIcon />
          </Fab>
        </div>
      )
    }
  }


  return (
      <div className="bigDiv" >
        <div className="App">
          <Header/>
          <AsignaturesState>
            {global?.type === 'week' && <Days/>}
            {global?.type === 'check' && <ToDoList/>}
            {addTaskDisplay()}
            <div id='alert'>
              {global?.alert && displayAlert()}
            </div>
            {global?.changeDialogAddTask && <AddTask/>}
            {global?.changeDialogLogin && <Login/>}
            {global?.changeDialogRegister && <Register/>}
          </AsignaturesState>
        </div>
      </div>


  );
}

export default App;
