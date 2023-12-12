import noteContext from "./noteContext";
import { useState } from 'react';

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "6576d631236656fd71ddee24",
          "title": "My Title",
          "description": "This is first note",
          "tag": "personal",
          "date": "2023-12-11T09:28:17.785Z",
          "__v": 0
        },
        {
          "_id": "6576dc0acbdf0da5635db299",
          "title": "My Title 2",
          "description": "This is second note",
          "tag": "personal",
          "date": "2023-12-11T09:53:14.554Z",
          "__v": 0
        },
        {
            "_id": "6576dc0acbdf0da5635db298",
            "title": "My Title three",
            "description": "This is third note",
            "tag": "personal",
            "date": "2023-12-11T09:53:14.554Z",
            "__v": 0
        },
        {
            "_id": "6576dc0acbdf0da5635db295",
            "title": "My Title four",
            "description": "This is forth note",
            "tag": "personal",
            "date": "2023-12-11T09:53:14.554Z",
            "__v": 0
        },
        {
            "_id": "6576dc0acbdf0da5635db292",
            "title": "My Title five",
            "description": "This is fifth note",
            "tag": "personal",
            "date": "2023-12-11T09:53:14.554Z",
            "__v": 0
        },
        {
            "_id": "6576dc0acbdf0da5635db198",
            "title": "My Title six",
            "description": "This is sixth note",
            "tag": "personal",
            "date": "2023-12-11T09:53:14.554Z",
            "__v": 0
        }
    
    ]
    const [notes, setNotes] = useState(notesInitial)
    return(
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;