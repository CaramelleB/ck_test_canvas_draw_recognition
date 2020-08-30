import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import killer from '../img/killer.png';
import church from '../img/church.png';
import cross from '../img/holy_cross.svg';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = e => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};


function Spotlight() {

  const { x, y } = useMousePosition();

  const [clicked, setClicked] = useState(false);
  const onClicked = () => {
    setClicked(!clicked);
  };


  const lightOff = `radial-gradient(circle at ${x / window.innerWidth * 100}% ${y / window.innerHeight * 100}%, transparent 160px,
    rgba(0, 0, 0, 0.99) 200px)`;


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
  height: 40px;
  width: 40px;
  background-color: ${({ active }) => (active ? "red" : "black")};
  right: 10vw;
  top: 50vh;
  cursor: pointer;
  `
  const Killer = styled.img`
  position: absolute;
  bottom: 0px;
  `
  const Cross = styled.img`
  position: absolute;
  left: 10vw;
  top: 1vh;
  filter: ${({ active }) => (active ? "drop-shadow(0px 25px 2px rgba(189,21,189,.4))" : '')};
  `

  

  return <Underground active={clicked}><Cross src={cross} active={clicked}/><Killer src={killer} alt="made by upklyak - fr.freepik.com"/><Spot active={clicked}/><Switch active={clicked} onClick={onClicked}/></Underground>
}

export default Spotlight;