import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6693caa5ab23acd6370cf4c9",
      user: "66859a0152314a2aef8ffb5e",
      title: "ABCD new",
      description: "I am abcd new",
      tag: "personal",
      date: "2024-07-14T12:55:01.369Z",
      __v: 0,
    },
    {
      _id: "6693caacab23acd6370cf4cb",
      user: "66859a0152314a2aef8ffb5e",
      title: "ABCD",
      description: "I am abcd",
      tag: "personal",
      date: "2024-07-14T12:55:08.211Z",
      __v: 0,
    },
    {
      _id: "6693cab4ab23acd6370cf4cd",
      user: "66859a0152314a2aef8ffb5e",
      title: "ABCD updated",
      description: "I am abcd updated",
      tag: "personal",
      date: "2024-07-14T12:55:16.791Z",
      __v: 0,
    },
    {
      _id: "6693caa5ab23acd6370cf4c9",
      user: "66859a0152314a2aef8ffb5e",
      title: "ABCD new",
      description: "I am abcd new",
      tag: "personal",
      date: "2024-07-14T12:55:01.369Z",
      __v: 0,
    },
    {
      _id: "6693caacab23acd6370cf4cb",
      user: "66859a0152314a2aef8ffb5e",
      title: "ABCD",
      description: "I am abcd",
      tag: "personal",
      date: "2024-07-14T12:55:08.211Z",
      __v: 0,
    },
    {
      _id: "6693cab4ab23acd6370cf4cd",
      user: "66859a0152314a2aef8ffb5e",
      title: "ABCD updated",
      description: "I am abcd updated",
      tag: "personal",
      date: "2024-07-14T12:55:16.791Z",
      __v: 0,
    },
    {
      _id: "6693caa5ab23acd6370cf4c9",
      user: "66859a0152314a2aef8ffb5e",
      title: "ABCD new",
      description: "I am abcd new",
      tag: "personal",
      date: "2024-07-14T12:55:01.369Z",
      __v: 0,
    },
    {
      _id: "6693caacab23acd6370cf4cb",
      user: "66859a0152314a2aef8ffb5e",
      title: "ABCD",
      description: "I am abcd",
      tag: "personal",
      date: "2024-07-14T12:55:08.211Z",
      __v: 0,
    },
    {
      _id: "6693cab4ab23acd6370cf4cd",
      user: "66859a0152314a2aef8ffb5e",
      title: "ABCD updated",
      description: "I am abcd updated",
      tag: "personal",
      date: "2024-07-14T12:55:16.791Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial)

  return (
    <NoteContext.Provider value={{notes, setNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
