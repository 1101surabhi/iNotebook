import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { AddNote } from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, updateNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const editNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const updateClickHandler = (e) => {
    refClose.current.click();
    updateNote(note.id, note.etitle, note.edescription, note.etag);
  };

  const textChangeHandler = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.etitle}
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={textChangeHandler}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value={note.edescription}
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={textChangeHandler}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={note.etag}
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={textChangeHandler}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
              disabled={note.etitle.length<5 || note.edescription.length<5}
                type="button"
                className="btn btn-primary"
                onClick={updateClickHandler}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container row my-3">
        <h2>Your Note</h2>
        <div className="container">
          {notes.length === 0 && "No notes to display."}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={editNote} />;
        })}
      </div>
    </>
  );
};

export default Notes;
