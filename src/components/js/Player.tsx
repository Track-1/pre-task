import { useState } from "react";
import jsMusic from "../../assets/christmas.mp3";

export default function Player() {
    const [play, setPlay] = useState<boolean>(false)

    const audio = new Audio(jsMusic)
    
    const handlePlayButtonClick=()=>{
        setPlay((prev)=>!prev)
        console.log(play)
        audio.play()
    }



    return(
    <>      
        <button type="button" onClick={()=>handlePlayButtonClick()}>{!play?("▶️"):("⏸")}</button>
        <button type="button">⏹</button>
        <button type="button">⏮</button>
        <button type="button">⏭</button>

        <audio src="../../assets/jsMusic.mp3"></audio>
        
        
    </>
    );
}
