import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import useMousePosition from './MousePosition';
import killer from '../img/killer.png';
import church from '../img/church.png';
import cross from '../img/holy_cross.svg';



function Underground() {

  const { x, y } = useMousePosition();

  const [clicked, setClicked] = useState(false);
  const onClicked = () => {
    setClicked(!clicked);
  };


  const lightOff = `radial-gradient(circle at ${x / window.innerWidth * 100}% ${y / window.innerHeight * 100}%, transparent 160px,
    rgba(0, 0, 0, 0.99) 200px)`;

  const neonOn = keyframes`
    0%    { opacity: 1;   }
    3%    { opacity: 0.4; }
    6%    { opacity: 1;   }
    7%    { opacity: 0.4; }
    8%    { opacity: 1;   }
    9%    { opacity: 0.4; }
    10%   { opacity: 1;   }
    100%  { opacity: 1;   }
  `;
  const neonOff = keyframes`
    0%    { opacity: 0;   }
    50%    { opacity: 0,3;   }
    100%  { opacity: 0,1;   }
  `;

  const Underground = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-image: url(${church});
  `
  const Spot = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-image: ${({ active }) => (active ? '' : lightOff)};
  `
  const Switch = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: ${({ active }) => (active ? "red" : "black")};
  right: 10vw;
  top: 50vh;
  cursor: pointer;
  padding: 20px;
  `
  const Killer = styled.img`
  position: absolute;
  left: 10vw;
  bottom: 0px;
  opacity: ${({ active }) => (active ? '1' : '0')};
  `
  const Cross = styled.img`
  position: absolute;
  left: 36vw;
  top: 1vh;
  animation: ${({ active }) => (active ? css`${neonOn} 2s infinite forwards` : css`${neonOff} 20s`)};
  filter: drop-shadow(5px 5px 8px #59ffff);
  `


  

  return (
    <Underground active={clicked}>
      <Killer src={killer} active={clicked} alt="made by upklyak - fr.freepik.com"/>
      <Cross src={cross} active={clicked}/>
      <Spot active={clicked}/>
      <Switch active={clicked} onClick={onClicked}/>
    </Underground>
  )
}

export default Underground;