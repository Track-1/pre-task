import { useState } from "react";


export default function Player() {
    const [start, setStart] = useState<boolean>(false)

    const handleStartButtonClick=()=>{
        setStart((prev)=>!prev)
        console.log(start)
    }

    return(<>      
        <button type="button" onClick={()=>handleStartButtonClick()}>{!start?("▶️"):("⏸")}</button>
        <button type="button">⏹</button>
        <button type="button">⏮</button>
        <button type="button">⏭</button>
    </>
    );
}
