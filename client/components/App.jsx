import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Box, Sphere, Icosahedron, plane } from '@react-three/drei';
import Audio from './Audio.jsx';

//AUDIO -----


//SHAPES ------
// function Box() {
//   return (
//     <mesh>
//       <boxBufferGeometry attach='geometry' />
//       <meshPhongMaterial attach='material' color='hotpink' />
//     </mesh>
//   );
// }

//Main spinning sphere for our stage
function StageSphere(props) {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh
      ref={mesh}>
      <sphereGeometry args={[24, 32, 16]} />
      <meshLambertMaterial color='#843ac1' wireframe />
    </mesh>
  );
}

// Center stage sphere
function MainSphere(props) {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.003;
  });

  return (
    <mesh
      ref={mesh}>
      <sphereGeometry args={[4, 32, 16]} />
      <meshLambertMaterial color='#843ac1' wireframe />
    </mesh>
  );
}

// APP SCENE ------
const App = () => {
  return (
    <div className='entire-scene'>
      <Audio />
      <Canvas camera={{ position: [0, 2, 10], fov: 90 }}>
        {/* <Sphere >
          <meshLambertMaterial attach='material' color='#f3f3f3' wireframe />
        </Sphere> */}
        <OrbitControls />
        <StageSphere />
        <MainSphere />
        <ambientLight intensity={0.5} color='#f3f3f3' />
      </Canvas>
    </div>
  );
}

export default App;