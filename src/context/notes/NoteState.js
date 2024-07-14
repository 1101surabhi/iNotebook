import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NTlhMDE1MjMxNGEyYWVmOGZmYjVlIn0sImlhdCI6MTcyMDk3Nzg3N30.80tIxLgO6jNkOmxkxfjW-66p5BbGNY6EZLJ9H9hbxQs",
      },
    });
    
    const json = await response.json() ;
    console.log(json) ;
    setNotes(json) ;
  };

  // add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NTlhMDE1MjMxNGEyYWVmOGZmYjVlIn0sImlhdCI6MTcyMDk3Nzg3N30.80tIxLgO6jNkOmxkxfjW-66p5BbGNY6EZLJ9H9hbxQs",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = {
      _id: "6693cab4a1b23acd6370cf4cd",
      user: "66859a0152314a2aef8ffb5e",
      title: title,
      description: description,
      tag: tag,
      date: new Date(),
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // update a note
  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NTlhMDE1MjMxNGEyYWVmOGZmYjVlIn0sImlhdCI6MTcyMDk3Nzg3N30.80tIxLgO6jNkOmxkxfjW-66p5BbGNY6EZLJ9H9hbxQs",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, updateNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
