import { useEffect, useMemo, useState } from "react";
import jsMusic from "../../assets/christmas.mp3";
import styled from "styled-components";

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
    <StPlayerWrapper>     
        <StButtonWrapper>
            <button type="button" onClick={handlePlay}>{!play?("▶️"):("⏸")}</button>
            <button type="button" onClick={handleOnload}>⏹</button>
            <button type="button" onClick={handleOnBackward}>⏮</button>
            <button type="button" onClick={handleOnForward}>⏭</button>
        </StButtonWrapper> 

        <StProgress
            type="range"
            min="0"
            max="1000"
            value={progress}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                handleProgress(e);
            }}
          />
        
        <StTimeWrapper>
            <p>{currentTime}</p>
            <p>{duration}</p>
        </StTimeWrapper>        
        
    </StPlayerWrapper>
    );
}

const StPlayerWrapper=styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const StButtonWrapper=styled.div`
    display: flex;

    margin: 10rem 0 1rem 0;

    & > button{
        width: 2rem;
        height: 2rem;

        margin: 0.3rem;

        border: 0.1rem solid skyblue;
        border-radius: 10rem;

        background-color: aliceblue;
    }
`

const StTimeWrapper=styled.div`
    display: flex;
    justify-content: space-between;

    width: 20rem;
`

const StProgress=styled.input`
    -webkit-appearance: none;
    width:20rem;
    background: aliceblue;
    overflow: hidden;

    &:focus {
        outline: none;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 0.001rem;
        height: 1rem;
                
        background: skyblue;
        box-shadow: -100vw 0 0 100vw skyblue;
    }

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 100%;
        cursor: pointer;
        /* border-radius: 5px; */
        border: 2px solid aliceblue;
    }
`