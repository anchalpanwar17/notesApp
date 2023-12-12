import { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

function About() {
    const a = useContext(noteContext)
    useEffect(() => {
        a.update(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <div className="About">
            <h3>This is About {a.state.name} and he is in {a.state.class} </h3>
        </div>
    )
}

export default About;