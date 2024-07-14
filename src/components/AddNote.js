import React, {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";

export const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title: "", description:"", tag:"default"}) ;

  const clickHandler = (e) => {
    e.preventDefault() ;
    addNote(note.title, note.description, note.tag)
  } ;
  const textChangeHandler = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  } ;

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={textChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={textChangeHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={clickHandler}>
        <i className="fa-solid fa-plus" style={{marginRight:"7px"}}></i>
          Add Note
        </button>
      </form>
    </div>
  );
};
