import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Box, Sphere, Icosahedron, plane } from '@react-three/drei';
import Audio from './Audio.jsx';

//AUDIO -----


//SHAPES ------
//Main spinning sphere for our stage
function StageSphere(props) {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh
      ref={mesh}>
      <sphereGeometry args={[42, 32, 16]} />
      <meshLambertMaterial color='#843ac1' wireframe />
    </mesh>
  );
}

// Center stage sphere
function MainSphere(props) {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y -= 0.01;
    mesh.current.rotation.x += 0.005;
  });

  return (
    <mesh
      ref={mesh}>
      <sphereGeometry args={[13, 32, 16]} />
      <meshLambertMaterial color='#c13abb' wireframe />
    </mesh>
  );
}

// Square bass hits
var squareTwoGoingDown = false;
function BassSquareTwo(props) {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y -= 0.01;
    mesh.current.rotation.x += 0.03;
    if (squareTwoGoingDown) {
      mesh.current.position.y -= 0.25;
      if (mesh.current.position.y <= -25) {
        squareTwoGoingDown = false;
      }
    } else {
      mesh.current.position.y += 0.25;
      if (mesh.current.position.y >= 20) {
        squareTwoGoingDown = true;
      }
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[30, 20, -3]}>
      <boxBufferGeometry args={[4, 4, 4]} radius={0.05} smoothness={4} />
      <meshLambertMaterial color='#3ac184' wireframe />

    </mesh>
  );
}

// Square bass hits
var squareOneGoingDown = true;
function BassSquareOne(props) {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y -= 0.01;
    mesh.current.rotation.x += 0.03;
    if (squareOneGoingDown) {
      mesh.current.position.y -= 0.25;
      if (mesh.current.position.y <= -25) {
        squareOneGoingDown = false;
      }
    } else {
      mesh.current.position.y += 0.25;
      if (mesh.current.position.y >= 20) {
        squareOneGoingDown = true;
      }
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[-30, 20, -3]}>
      <boxBufferGeometry args={[4, 4, 4]} radius={0.05} smoothness={4} />
      <meshLambertMaterial color='#3ac184' wireframe />
    </mesh>
  );
}

// Planes for the floor and ceiling
function PlaneGround(props) {
  const mesh = useRef();
  useFrame(() => {

  });

  return (
    <mesh
      ref={mesh}
      position={[0, -20, 0]}
      rotation={[4.7, 0, 0]}>
      <planeBufferGeometry args={[100, 50, 25, 25]} />
      <meshLambertMaterial color='#403ac1' wireframe />

    </mesh>
  );
}

// Planes for the floor and ceiling
function PlaneCeil(props) {
  const mesh = useRef();
  useFrame(() => {

  });

  return (
    <mesh
      ref={mesh}
      position={[0, 20, 0]}
      rotation={[-4.7, 0, 0]}>
      <planeBufferGeometry args={[100, 50, 25, 25]} />
      <meshLambertMaterial color='#403ac1' wireframe />

    </mesh>
  );
}
// LIGHTS ----
function FillLight(props) {
  return (
    <mesh>
      <spotLight
        // width={20}
        // height={20}
        color='#f3f3f3'
        intensity={3}
        position={[-50, 30, 40]}
        lookAt={[30, -40, -50]}
        penumbra={1}
        castShadow
      />
    </mesh>

  );
}

// function RectLight(props) {
//   return (
//     <mesh>
//       <rectAreaLight
//         width={40}
//         height={40}
//         color='#f3f3f3'
//         intensity={6}
//         position={[0, 0, -100]}
//         lookAt={[0, 0, 300]}

//       />
//     </mesh>

//   );
// }

// APP SCENE ------
const App = () => {
  return (
    <div className='entire-scene'>
      <Audio />
      <Canvas camera={{ position: [0, 2, 30], fov: 90 }}>
        <OrbitControls />
        <StageSphere />
        <MainSphere />
        <BassSquareOne />
        <BassSquareTwo />
        <PlaneGround />
        <PlaneCeil />
        <FillLight />
        <ambientLight intensity={0.5} color='#f3f3f3' />
      </Canvas>
    </div>
  );
}

export default App;