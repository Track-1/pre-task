import { useEffect, useMemo, useState } from "react";
import jsMusic from "../../assets/christmas.mp3";

export default function Player() {
    const audio = useMemo(()=>new Audio(jsMusic),[jsMusic])

    const [play, setPlay] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<string>('0:0');

    const duration=parseInt(String(audio.duration/60))+":"+parseInt(String(audio.duration%60));

    useEffect(() => {
        audio.addEventListener('timeupdate', () => {
          setCurrentTime(parseInt(String(audio.currentTime/60))+":"+parseInt(String(audio.currentTime%60)))
          setProgress((audio.currentTime / audio.duration) * 1000);
        });

    }, [audio,play]);

    const handlePlay=()=>{
        setPlay((play)=>!play)
        if (play) {
            audio.pause()
        } else {
            audio.play()
        }
    }

    const handleOnload=()=>{
        audio.pause()
        audio.currentTime=0
        setPlay(false)
    }

    const handleOnForward = () => {
          audio.currentTime += 10;
      };
    
    const handleOnBackward = () => {
        audio.currentTime -= 10;
    };

    const handleProgress = (e:React.ChangeEvent<HTMLInputElement>) => {
        const progress = e.target.value;
        audio.currentTime = (parseInt(progress) / 1000) * audio.duration;
        setProgress(parseInt(progress));
    };

    if(audio.currentTime===audio.duration){
        handleOnload();
    }

    
    return(
    <>      
        <button type="button" onClick={handlePlay}>{!play?("▶️"):("⏸")}</button>
        <button type="button" onClick={handleOnload}>⏹</button>
        <button type="button" onClick={handleOnBackward}>⏮</button>
        <button type="button" onClick={handleOnForward}>⏭</button>

        <input
            type="range"
            min="0"
            max="1000"
            value={progress}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                handleProgress(e);
            }}
          />
        
        <section>
            <p>{currentTime}</p>
            <p>{duration}</p>
        </section>        
        
    </>
    );
}
