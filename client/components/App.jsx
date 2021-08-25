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
    mesh.current.rotation.y += 0.0025;
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
    mesh.current.rotation.y -= 0.0065;
    mesh.current.rotation.x += 0.003;
  });

  return (
    <mesh
      ref={mesh}>
      <sphereGeometry args={[13, 48, 32]} />
      <meshLambertMaterial color='#c13abb' wireframe />
    </mesh>
  );
}
// SQUARESSSSSS
var squareThreeGoingDown = true;
var squareThreeGoingBack = true;
var squareThreeGoingLeft = true;
function BassSquareThree(props) {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y -= 0.01;
    mesh.current.rotation.x += 0.03;
    if (squareThreeGoingDown) {
      mesh.current.position.y -= 0.1;
      if (mesh.current.position.y <= -20) {
        squareThreeGoingDown = false;
      }
    } else {
      mesh.current.position.y += 0.1;
      if (mesh.current.position.y >= 20) {
        squareThreeGoingDown = true;
      }
    }
    // LEFT RIGHT
    if (squareThreeGoingLeft) {
      mesh.current.position.x -= 0.0725;
      if (mesh.current.position.x <= -45) {
        squareThreeGoingLeft = false;
      }
    } else {
      mesh.current.position.x += 0.0725;
      if (mesh.current.position.x >= 45) {
        squareThreeGoingLeft = true;
      }
    }
    //BACK AND FORTH
    if (squareThreeGoingBack) {
      mesh.current.position.z -= 0.2;
      if (mesh.current.position.z <= -35) {
        squareThreeGoingBack = false;
      }
    } else {
      mesh.current.position.z += 0.2;
      if (mesh.current.position.z >= 20) {
        squareThreeGoingBack = true;
      }
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[10, 20, 10]}>
      <icosahedronGeometry args={[5.00]} />
      <meshLambertMaterial color='#3abbc1' wireframe />

    </mesh>
  );
}

// Second square
var squareTwoGoingDown = true;
var squareTwoGoingLeft = false;
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
    // LEFT RIGHT
    if (squareTwoGoingLeft) {
      mesh.current.position.x -= 0.075;
      if (mesh.current.position.x <= 10) {
        squareTwoGoingLeft = false;
      }
    } else {
      mesh.current.position.x += 0.075;
      if (mesh.current.position.x >= 55) {
        squareTwoGoingLeft = true;
      }
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[30, 20, -3]}>
      <boxBufferGeometry args={[4, 4, 4]} radius={0.05} smoothness={4} />
      <meshLambertMaterial color='#e9f23e' wireframe />

    </mesh>
  );
}

// First square
var squareOneGoingDown = true;
var squareOneGoingLeft = true;
function BassSquareOne(props) {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y -= 0.01;
    mesh.current.rotation.x += 0.03;
    if (squareOneGoingDown) {
      mesh.current.position.y -= 0.175;
      if (mesh.current.position.y <= -25) {
        squareOneGoingDown = false;
      }
    } else {
      mesh.current.position.y += 0.175;
      if (mesh.current.position.y >= 20) {
        squareOneGoingDown = true;
      }
    }
    // LEFT RIGHT
    if (squareOneGoingLeft) {
      mesh.current.position.x -= 0.1;
      if (mesh.current.position.x <= -55) {
        squareOneGoingLeft = false;
      }
    } else {
      mesh.current.position.x += 0.1;
      if (mesh.current.position.x >= -10) {
        squareOneGoingLeft = true;
      }
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[-30, 20, -3]}>
      <boxBufferGeometry args={[4, 4, 4]} radius={0.05} smoothness={4} />
      <meshLambertMaterial color='#f25f3e' wireframe />
    </mesh>
  );
}

// Planes for the floor and ceiling
function PlaneGround(props) {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.z += 0.0025;
  });

  return (
    <mesh
      ref={mesh}
      position={[0, -20, 0]}
      rotation={[4.7, 0, 0]}>
      <planeBufferGeometry args={[100, 75, 12, 12]} />
      <meshLambertMaterial color='#403ac1' wireframe />

    </mesh>
  );
}

// Planes for the floor and ceiling
function PlaneCeil(props) {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.z -= 0.0025;
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 20, 0]}
      rotation={[-4.7, 0, 0]}>
      <planeBufferGeometry args={[100, 75, 25, 25]} />
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
        <BassSquareThree />
        <PlaneGround />
        <PlaneCeil />
        {/* <FillLight /> */}
        <ambientLight intensity={0.8} color='#f3f3f3' />
      </Canvas>
    </div>
  );
}

export default App;