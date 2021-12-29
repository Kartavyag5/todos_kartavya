import React, {useEffect ,useRef, useState } from "react";
import edit from './icons/edit.svg';
import trash from './icons/delete.svg';

function usePrevious(value){
  const ref= useRef();
  useEffect(()=> {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {

    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.name);
    const editFieldRef = useRef();
    const editButtonRef = useRef();
    const wasEditing = usePrevious(isEditing);
    const [isHidden, setHidden] = useState(true);

    function handleHidden(e){
      setHidden(!isHidden);
      
  }

    function handleChange(e){
      setNewName(e.target.value);
    }

    function handleSubmit(e){
      e.preventDefault();
      props.editTask(props.id, newName);
      setNewName('');
      setEditing(false);
    }

    const editingTemplate = (
      <form className="stack-small" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
            New name for {props.name}
          </label>
          <input 
            id={props.id} 
            className="todo-text" 
            type="text"
            value={newName}
            onChange={handleChange} 
            ref = {editFieldRef}
            />
        </div>
        <div className="btn-group">
          <button 
            type="button" 
            className="btn btn-danger todo-cancel"
            onClick={() => setEditing(false)}
            ref = {editButtonRef}

          >
            Cancel
            <span className="visually-hidden">renaming {props.name}</span>
          </button>
          <button type="submit" className="btn btn__primary todo-edit">
            Save
            <span className="visually-hidden">new name for {props.name}</span>
          </button>
        </div>
      </form>
    );
    const viewTemplate = (
      <div className="btn-group">
        <div className="c-cb">
            <input
              type="checkbox"
              className='btn-check'
              id={props.id}
              defaultChecked={props.completed}
              onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <label className="todo-label" htmlFor={props.id}>
              {props.name}
            </label>
          </div>
          
          <div className="dropdown-container" tabindex="-1">
            <div type='button' className="three-dots btn" onClick={handleHidden} ></div>
                <button className='btn btn-warning m-2' hidden={isHidden} onClick={() => setEditing(true)}><div><img src={edit} alt='edit'></img>Edit<span className="visually-hidden">{props.name}</span></div></button>
               
                <button className='btn btn-danger' hidden={isHidden} onClick={() => props.deleteTask(props.id, props.name)}><div><img src={trash} alt='delete'></img>Delete<span className="visually-hidden">{props.name}</span></div></button>
                
              
            </div>
          {/* <div className="btn-group">
            <button 
              type="button" 
              className="btn btn-warning"
              onClick={() => setEditing(true)}>
              Edit <span className="visually-hidden">{props.name}</span>
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => props.deleteTask(props.id)}
            >
              Delete <span className="visually-hidden">{props.name}</span>
            </button>
          </div> */}
      </div>
    );

    useEffect(() => {
      if (!wasEditing && isEditing){
        editFieldRef.current.focus();
      }
      // if (wasEditing && !isEditing){
      //   editButtonRef.current.focus();
      // }

    }, [wasEditing, isEditing]);
    
    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
} 