import NoteContext from "./noteContext";

const NoteState = (props) => {
    const state = {
        "name" : "Lol" ,
        "class" : "7a"
    }
    return (
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState ;