// import {useContext} from "react";
// import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";
import Addnote from "./Addnote";
function Home() {

  // const context = useContext(noteContext);
  // const {notes, setNotes} = context;
  
  return (
    <div>
    {/* This div diplays the form  */}
    <Addnote />
    {/* This div will show all the notes  */}
    <Notes />
    
    </div>
  );
}

export default Home;
