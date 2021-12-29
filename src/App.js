import React, { useState} from 'react';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import { nanoid } from "nanoid";
import logo from './components/icons/logo.png';

const FILTER_MAP  = {
  All: () => true,
  Active: task => !task.completed,
  completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function addTask(name){
    const newTask = {id:"todo"+nanoid(), name: name, completed:false};
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map(task=>{
      if (id=== task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function editTask(id, newName){
    const editedTaskList = tasks.map(task => {
      if (id === task.id){
        return {...task, name:newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }



  function deleteTask(id,name){
    if(window.confirm("really want to delete task '"+name+"' ?")){
      const remainingTasks=tasks.filter(task => id!== task.id);
      setTasks(remainingTasks); 
    }
    else{

    }
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
  <Todo 
    id={task.id} 
    name={task.name} 
    completed={task.completed} 
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    editTask={editTask}
    deleteTask={deleteTask}
  />
  ));

  
  const tasksNoun = taskList.length !== 1 ? 'tasks': 'task';
  const headingText = `${taskList.length} ${tasksNoun}`;
  
  
  
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name===filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1 className='fw-bolder font-monospace'><img src={logo} alt='logo' width="50" height="50"></img>Todo Matic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        // role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;

