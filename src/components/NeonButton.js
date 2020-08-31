import React from 'react';
import styled, { keyframes, css } from 'styled-components';


const NeonButton = ({ action, text }) => {

  const Button = styled.a`
  cursor: pointer;
            position: absolute;
            display: inline-block;
            padding: 15px 30px;
            color: #f321e9;
            text-transform: uppercase;
            letter-spacing: 4px;
            text-decoration: none;
            font-size: 24px;
            overflow: hidden;
            transition: 0.2s;
            width: 180px;
  `

  const Tube = styled.span`
  position: absolute;
            display: block;
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg,transparent,#f321e9);
  `

  

  return (
    <Button onClick={action}>
      <Tube/>
      <Tube/>
      <Tube/>
      <Tube/>
      {text}
    </Button>
  )
}

export default NeonButton;
