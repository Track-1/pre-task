import styled from "styled-components";
import ditto from "../assets/ditto.mp3";
import { useState, useMemo, useRef, useLayoutEffect } from "react";

export default function JyPlayer() {
  const audio = useMemo(() => new Audio(ditto), [ditto]);

  const playBar = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [controlInterval, setControlInterval] = useState<NodeJS.Timer>();

  useLayoutEffect(() => {
    playBar.current && setBarWidth(playBar.current.offsetWidth);
  });

  function playAudio() {
    audio.play();
    setControlInterval(
      setInterval(() => {
        goProgress();
      }, 1000)
    );
  }

  function pauseAudio() {
    audio.pause();
    clearInterval(controlInterval);
  }

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
  }

  function goProgress() {
    const currentDuration = (audio.currentTime / audio.duration) * 100;

    setProgress(currentDuration);
  }

  function controlAudio(e: React.MouseEvent<HTMLDivElement>) {
    const barPercent = Math.round((e.nativeEvent.offsetX / barWidth) * 100);
    const currentStop = (audio.duration * barPercent) / 100;

    audio.currentTime = currentStop;
  }

  return (
    <Container>
      <ButtonContainer>
        <PlayBtn onClick={playAudio}>play</PlayBtn>
        <PauseBtn onClick={pauseAudio}>pause</PauseBtn>
        <StopBtn onClick={stopAudio}>stop</StopBtn>
      </ButtonContainer>
      <PlayerWrapper onClick={controlAudio} ref={playBar}>
        <Playbar progress={progress} />
      </PlayerWrapper>
    </Container>
  );
}

const Container = styled.section`
  height: 15rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 10rem;

  background-color: blueviolet;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayBtn = styled.div`
  height: 5rem;
  width: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 1rem;

  background-color: white;
`;

const PauseBtn = styled.div`
  height: 5rem;
  width: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 1rem;

  background-color: white;
`;

const StopBtn = styled.div`
  height: 5rem;
  width: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 1rem;

  background-color: white;
`;

const Playbar = styled.div<{ progress: number }>`
  height: 1rem;
  width: ${(props) => props.progress}%;

  background-color: white;
`;

const PlayerWrapper = styled.div`
  height: 1rem;
  width: 20rem;

  margin-top: 2rem;

  background-color: burlywood;
`;
