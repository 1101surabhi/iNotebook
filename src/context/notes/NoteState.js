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
    const json = await response.json() ;
    console.log(json) ;
    setNotes(notes.concat(json));
    
  };

  // delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE" ,
        headers : {
            "Content-Type" : "application/json" ,
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NTlhMDE1MjMxNGEyYWVmOGZmYjVlIn0sImlhdCI6MTcyMDYzNDcwNH0.9MDfeywYeeTJBvyTROrSEMHgbFSvRgGCPH_DJIAdCDM"
        }
    })
    // eslint-disable-next-line
    const json = response.json() ;

    console.log("Deleting the note with id : " + id) ;
    const newNotes = notes.filter((note) => note._id !== id) ;
    setNotes(newNotes) ;
  };

  // update a note
  const updateNote = async (id, title, description, tag) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NTlhMDE1MjMxNGEyYWVmOGZmYjVlIn0sImlhdCI6MTcyMDk3Nzg3N30.80tIxLgO6jNkOmxkxfjW-66p5BbGNY6EZLJ9H9hbxQs",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let newNotes = JSON.parse(JSON.stringify(notes)) ;
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break ;
      }
    }
    setNotes(newNotes) ;
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
