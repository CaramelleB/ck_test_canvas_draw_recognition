import React, { useRef } from 'react';
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons';
import city1 from "../img/city1.png";
import city2 from "../img/city2.png";
import city3 from "../img/city3.png";
import city4 from "../img/city4.png";
import build from "../img/build.svg";
import logo from '../img/ck_logo_white.png'



// Little helpers ...
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
const Pink = ({ children }) => <span style={{ color: '#FF6AC1' }}>{children}</span>
const Yellow = ({ children }) => <span style={{ color: '#EFF59B' }}>{children}</span>
const Lightblue = ({ children }) => <span style={{ color: '#9AEDFE' }}>{children}</span>
const Green = ({ children }) => <span style={{ color: '#57EE89' }}>{children}</span>
const Blue = ({ children }) => <span style={{ color: '#57C7FF' }}>{children}</span>
const Gray = ({ children }) => <span style={{ color: '#909090' }}>{children}</span>


function Building() {

  let parallax = useRef(null);

  return (
    <div className="Building">
      <Parallax ref={ref => (parallax = ref)} pages={3} style={{ backgroundColor: '#020d36' }}>

       
      <ParallaxLayer offset={0} speed={0} factor={1} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />


   

       <ParallaxLayer
         offset={0}
         speed={0}
         style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
         <img src={city4} />
       </ParallaxLayer>



        
       <ParallaxLayer
         offset={0} speed={0.1} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} ><img src={city3} /></ParallaxLayer>
      
      <ParallaxLayer offset={0.1} speed={-0.8}>
          <img src={logo} />
        </ParallaxLayer>
      
      
       <ParallaxLayer
         offset={0}
         speed={0.3} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}><img src={city2} /></ParallaxLayer>


       <ParallaxLayer
         offset={0}
         style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
         speed={0.5}><img src={city1} /></ParallaxLayer>

<ParallaxLayer offset={0.999} speed={0.5} style={{ backgroundColor: '#25003c' }}/>
<ParallaxLayer
         offset={1.1}
         style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'left' }}
         speed={0.5}><img src={build} /></ParallaxLayer>

<ParallaxLayer offset={1.3} horizontal={true} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
        </ParallaxLayer>




       <ParallaxLayer
         offset={1}
         speed={0.1}
         onClick={() => parallax.scrollTo(2)}
         style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <img src={url('bash')} style={{ width: '40%' }} />
       </ParallaxLayer>

       <ParallaxLayer
         offset={2}
         speed={-0}
         style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
         onClick={() => parallax.scrollTo(0)}>
         <img src={url('clients-main')} style={{ width: '40%' }} />
       </ParallaxLayer>
     </Parallax>
    </div>
  );
}

export default Building;
