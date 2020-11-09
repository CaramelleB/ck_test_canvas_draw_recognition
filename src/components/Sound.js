import React, {useState} from 'react';
import useSound from 'use-sound';
import space from '../sounds/1.mp3';
import styled from 'styled-components';
import volumeOff from '../img/volume_off.svg';
import volumeOn from '../img/volume_on.svg';

const SoundButton = styled.img`
  position: fixed;
  top: 8vh;
  left: 5vw;
`

const Sound = ({music}) => {

  const [play, { stop }] = useSound(
    space,
    {
      volume: 0.4, 
      loop: true,
      sprite: {
        1: [0, 4000],
        2: [4000, 8000],
        3: [8000, 1200],
      }
    }
  );

  const [isPlaying, setPlay] = useState(false);

  return isPlaying ? (
    <SoundButton
    src={volumeOn}
    onClick={() => {
      setPlay(false)
      stop();
    }}
  />
  ) : (   
    <SoundButton
    src={volumeOff}
      onClick={() => {
        setPlay(true);
        play({ id: music });
      }}
    />
  );
};



export default Sound;
