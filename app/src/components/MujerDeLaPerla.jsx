import React from 'react'
import './MujerDeLaPerla.css'
import manu from "../manu.png"


function MujerDeLaPerla() {
    return (
<svg viewBox="0 0 100 100">
	<filter id="blur">
   <feMorphology in="SourceGraphic" operator="dilate" radius="0.3">
   </feMorphology>    
  </filter>
	 <filter id="turbulence">
   <feComponentTransfer>
          <feFuncR type="discrete" tableValues="0 0.5 0 1"/>
          <feFuncG type="discrete" tableValues="0 0.5 0 1"/>
          <feFuncB type="discrete" tableValues="0 0.5 0 1"/>
          <feFuncA type="discrete" tableValues="0 0.5 0 1"/>
      </feComponentTransfer>
 </filter>
	<filter id="convolve">
      <feComponentTransfer>
          <feFuncR type="table" tableValues="0 0.5 0 1" />
          <feFuncG type="table" tableValues="0 0.5 0 1" />
          <feFuncB type="table" tableValues="0 0.5 0 1" />
          <feFuncA type="table" tableValues="0 0.5 0 1" />
      </feComponentTransfer>
   </filter>
	<mask id="mask1">
    <line x1="0" y1="0%" x2="100" y2="200" stroke="white" stroke-width="15">
        <animate attributeName="x1" values="7.5%;92.5%;7.5%" dur="20s" begin="-2s" repeatCount="indefinite" />
        <animate attributeName="x2" values="7.5%;92.5%;7.5%" dur="20s" begin="-2s" repeatCount="indefinite" />
    </line>
  </mask>
	<mask id="mask2">
    <line x1="0" y1="0" x2="200" y2="100" stroke="white" stroke-width="15">
        <animate attributeName="y1" values="7.5%;92.5%;7.5%" dur="20s" begin="-4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="7.5%;92.5%;7.5%" dur="20s" begin="-4s" repeatCount="indefinite" />
    </line>
  </mask>
	<mask id="mask3">
    <line x1="0" y1="0" x2="200" y2="100" stroke="white" stroke-width="15">
        <animate attributeName="y1" values="7.5%;92.5%;7.5%" dur="20s" begin="-6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="7.5%;92.5%;7.5%" dur="20s" begin="-6s" repeatCount="indefinite" />
    </line>
  </mask>
	<mask id="mask4">
    <line x1="0" y1="0" x2="100" y2="200" stroke="white" stroke-width="15">
        <animate attributeName="x1" values="7.5%;92.5%;7.5%" dur="20s" begin="-8s" repeatCount="indefinite" /> 
        <animate attributeName="x2" values="7.5%;92.5%;7.5%" dur="20s" begin="-8s" repeatCount="indefinite" />
    </line>
  </mask>	
	<image width="100" href={manu} />
	
 <image width="100" filter="url(#turbulence)"  mask="url(#mask2)" href={manu} /> 
	<image width="100" filter="url(#blur)"  mask="url(#mask1)" href={manu} />
	<image width="100" filter="invert(100%)"  mask="url(#mask4)" href={manu} />
	<image width="100" filter="url(#convolve)"  mask="url(#mask3)" href={manu} />  

</svg>
 
    );
  }
  
  export default MujerDeLaPerla