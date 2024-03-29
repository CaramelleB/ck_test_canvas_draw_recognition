import React, { useRef } from 'react';
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons';
import styled from 'styled-components';
import city1 from "../img/city1.png";
import city2 from "../img/city2.png";
import city3 from "../img/city3.png";
import city4 from "../img/city4.png";
import drone1 from "../img/drone1.png";
import build from "../img/build.svg";
import logo from '../img/ck_logo_white.png';
import Underground from './Underground';
import Canvas from './Canvas';
import Sound from './Sound';



// Little helpers ...
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

const Drone = styled.img`
position: absolute;
z-index: 99999;
width: 25%;
height: 25%;
text-align: center;
transform: translate(2,1);
`

function ParallaxPage() {

  let parallax = useRef(null);

  const sound= '1';

  return (
    <div className="Building">
      <Parallax 
      ref={ref => (parallax = ref)} 
      pages={6} 
      style={{ backgroundColor: '#020d36' }}
      >
        <ParallaxLayer 
        offset={0} 
        speed={0} 
        factor={2} 
        style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} 
        >
          <ParallaxLayer
            offset={1}
            speed={0}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
          >
            <img src={city4} />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1} 
            speed={0.1} 
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} 
          >
            <img src={city3} />
          </ParallaxLayer>
          <ParallaxLayer 
            offset={0.3} 
            speed={-0.8}
            sound='1'
          >
            <img src={logo} />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1}
            speed={0.3} 
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
          >
            <img src={city2} />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
            speed={0.5}
            >
              <img src={city1} />
            </ParallaxLayer>
          <ParallaxLayer 
            offset={1.95} 
            speed={0.5} 
            style={{ backgroundColor: '#25003c'}}
          />
          <ParallaxLayer
            offset={2.1}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'left' }}
            speed={0.5}
            sound='2'
          >
            <img src={build} />
        
          </ParallaxLayer>
          {/* <ParallaxLayer 
            offset={1.6} 
            speed={-0.3} 
            style={{ pointerEvents: 'none' }}
          >
            <Drone src={drone1}/>
          </ParallaxLayer> */}
          <ParallaxLayer 
            offset={1.6} 
            speed={-0.3} 
            style={{ pointerEvents: 'none' }}
          >
          
          </ParallaxLayer>
          <ParallaxLayer 
            offset={4} 
            speed={0} 
          >
            <Canvas/>
          </ParallaxLayer>
          <ParallaxLayer
            offset={5}
            speed={0}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
          >
            <Underground />
          </ParallaxLayer> 
        </ParallaxLayer> 
      </Parallax>
      <Sound music={sound}/>
    </div>
  );


}

export default ParallaxPage;
