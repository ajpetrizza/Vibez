import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Box, Sphere, Icosahedron, plane, MeshDistortMaterial, MeshWobbleMaterial, Stars } from '@react-three/drei';
import SimplexNoise from 'simplex-noise';
import Audio from './Audio.jsx';

//AUDIO -----
var src;
var player;
var noise = new SimplexNoise();

//SHAPES ------
//Main spinning sphere for our stage
function StageSphere(props) {
  const mesh = useRef();
  var wiggle = props.lowerAvg >= 246 && props.lowerAvg <= 255 ? 0.15 : 0;

  useFrame(() => {
    if (props.isPlaying && props.lowerAvg !== 0) {
      mesh.current.rotation.y += 0.0025;

    } else {
      mesh.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh
      ref={mesh}>
      <sphereGeometry args={[42, 32, 16]} />
      <MeshDistortMaterial distort={wiggle} speed={20} color='#843ac1' wireframe />
      {/* <meshLambertMaterial color='#843ac1' wireframe /> */}
    </mesh>
  );
}

// Center stage sphere
var scale = 0.5;
function MainSphere(props) {
  const mesh = useRef();

  var factor = 0.0;
  if (props.overAllAvg > 140) {
    factor = 0.5
  } else if (props.overAllAvg < 140 && props.overAllAvg > 90) {
    factor = 0.3
  } else if (props.overAllAvg < 90 && props.overAllAvg > 0) {
    factor = 0.1
  } else {
    factor = 0;
  }

  useFrame(() => {
    if (props.isPlaying && props.overAllAvg !== 0) {
      if (scale <= 1) {
        scale += 0.025;
      }
    } else {
      if (scale >= 0.5) {
        scale -= 0.025;
      }
    }
    mesh.current.rotation.y -= 0.0065;
    mesh.current.rotation.x += 0.003;
  });

  return (
    <mesh
      ref={mesh}
      scale={scale}
    >
      <sphereGeometry args={[13, 48, 32]} />
      <MeshDistortMaterial distort={factor} speed={5} color='#c13abb' wireframe />
      {/* <MeshWobbleMaterial color='#c13abb' factor={0.5} speed={5} wireframe /> */}
      {/* <meshLambertMaterial color='#c13abb' wireframe /> */}
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
    if (props.isPlaying && props.overAllAvg !== 0) {
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
    if (props.isPlaying && props.overAllAvg !== 0) {
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
    if (props.isPlaying && props.overAllAvg !== 0) {
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
  var factor = 0.0;
  if (props.overAllAvg > 0) {
    factor = 0.2;
  } else {
    factor = 0.0;
  }
  useFrame(() => {
    if (props.isPlaying && props.overAllAvg !== 0) {
      mesh.current.rotation.z += 0.0025;
    } else {
      mesh.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[0, -20, 0]}
      rotation={[4.7, 0, 0]}>
      <planeBufferGeometry args={[100, 75, 12, 12]} />
      <MeshDistortMaterial distort={factor} speed={20} color='#403ac1' wireframe />
      {/* <meshLambertMaterial color='#403ac1' wireframe /> */}

    </mesh>
  );
}

// Planes for the floor and ceiling
function PlaneCeil(props) {
  const mesh = useRef();
  var factor = 0.0;

  if (props.overAllAvg > 0) {
    factor = 0.3;
  } else if (props.overAllAvg === 0) {
    factor = 0.0;
  }
  useFrame(() => {
    //console.log('mesh', mesh);
    if (props.isPlaying && props.overAllAvg !== 0) {
      mesh.current.rotation.z -= 0.0025;
      // modulation time
      // var upperHalfArray = props.audioData.slice((props.audioData.length / 2) - 1, props.audioData.length - 1);
      // var upperAvg = avg(upperHalfArray);
      // var upperAvgFr = upperAvg / upperHalfArray.length;
      // makeRumbleGround(mesh.current, modulate(upperAvgFr, 0, 1, 0.5, 4));
    } else {
      mesh.current.rotation.z -= 0.001;
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 20, 0]}
      rotation={[-4.7, 0, 0]}>
      <planeBufferGeometry args={[100, 75, 25, 25]} />
      {/* <MeshDistortMaterial distort={0.3} speed={30} color='#403ac1' wireframe /> */}
      <MeshWobbleMaterial factor={factor} speed={3} color='#403ac1' wireframe />

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
        intensity={1}
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
function Starsphere(props) {
  return (
    <Stars
      radius={65}
      count={props.isPlaying ? 1000 : 500}
      saturation={0.5}
      fade
    />
  );
}

// APP /// SCENE ------
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { audioData: new Uint8Array(0), isPlaying: false, upperAvg: 0, lowerAvg: 0, lowerMax: 0, overAllAvg: 0 };
    this.tick = this.tick.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  //helper
  onFileChange(event) {
    var file = event.target.files[0];
    src = document.getElementById('src').setAttribute('src', URL.createObjectURL(file));
    ///
    // player = document.getElementById('audio');
    // this.audioContext = new (window.AudioContext ||
    //   window.webkitAudioContext)();
    // this.source = this.audioContext.createMediaElementSource(player);
    // this.analyser = this.audioContext.createAnalyser();
    // this.source.connect(this.analyser);
    // this.analyser.maxDecibels = -30;
    // this.analyser.fftSize = 1024;
    // this.analyser.connect(this.audioContext.destination);
    // this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    ///
    player.load();
    player.play();
    this.setState({
      isPlaying: true
    });
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentDidMount() {
    player = document.getElementById('audio');
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.source = this.audioContext.createMediaElementSource(player);
    this.analyser = this.audioContext.createAnalyser();
    this.source.connect(this.analyser);
    this.analyser.maxDecibels = -60;
    this.analyser.fftSize = 1024;
    this.analyser.connect(this.audioContext.destination);
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.rafId = requestAnimationFrame(this.tick);
    //   this.source.connect(this.analyser);

  }

  //ANIMATION AUDIO UPDATE ON EACH PATCH OF DATA
  tick() {
    this.analyser.getByteFrequencyData(this.dataArray);
    var lowerHalfArray = this.dataArray.slice(0, (this.dataArray.length / 2) - 1);
    var upperHalfArray = this.dataArray.slice((this.dataArray.length / 2) - 1, this.dataArray.length - 1);

    var overallAvg = avg(this.dataArray);
    var lowerMax = max(lowerHalfArray);
    var lowerAvg = avg(lowerHalfArray);
    var upperMax = max(upperHalfArray);
    var upperAvg = avg(upperHalfArray);
    this.setState({
      upperAvg: upperAvg,
      lowerAvg: lowerAvg,
      lowerMax: lowerMax,
      overAllAvg: overallAvg
    });

    // var lowerMaxFr = lowerMax / lowerHalfArray.length;
    var lowerAvgFr = lowerAvg / lowerHalfArray.length;
    // var upperMaxFr = upperMax / upperHalfArray.length;
    // var upperAvgFr = upperAvg / upperHalfArray.length;

    // console.log(upperAvg);

    if (this.state.isPlaying) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  render() {
    return (
      <div className='entire-scene'>
        <Audio onFileChange={this.onFileChange} />
        <Canvas camera={{ position: [0, 2, 35], fov: 90 }}>
          <OrbitControls />
          <StageSphere isPlaying={this.state.isPlaying} lowerAvg={this.state.lowerAvg} />
          <MainSphere isPlaying={this.state.isPlaying} overAllAvg={this.state.overAllAvg} />
          <BassSquareOne isPlaying={this.state.isPlaying} overAllAvg={this.state.overAllAvg} />
          <BassSquareTwo isPlaying={this.state.isPlaying} overAllAvg={this.state.overAllAvg} />
          <BassSquareThree isPlaying={this.state.isPlaying} overAllAvg={this.state.overAllAvg} />
          <PlaneGround isPlaying={this.state.isPlaying} overAllAvg={this.state.overAllAvg} />
          <PlaneCeil isPlaying={this.state.isPlaying} overAllAvg={this.state.overAllAvg} />
          <FillLight />
          <ambientLight intensity={this.state.isPlaying ? 0.8 : 0.2} color='#f3f3f3' />
          <Starsphere isPlaying={this.state.isPlaying} />
        </Canvas>
      </div>
    );
  }
}

/// MATHY Helpers
//some helper functions here
function fractionate(val, minVal, maxVal) {
  return (val - minVal) / (maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
  var fr = fractionate(val, minVal, maxVal);
  var delta = outMax - outMin;
  return outMin + (fr * delta);
}

function avg(arr) {
  var total = arr.reduce(function (sum, b) { return sum + b; });
  return (total / arr.length);
}

function max(arr) {
  return arr.reduce(function (a, b) { return Math.max(a, b); });
}

// //MODULATION HELPERS
// function makeRumbleGround(mesh, distortionFr) {
//   mesh.position.forEach(function (vertex, i) {
//     var amp = 2;
//     var time = Date.now();
//     var distance = (noise.noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) * distortionFr * amp;
//     vertex.z = distance;
//   });
//   mesh.geometry.verticesNeedUpdate = true;
//   mesh.geometry.normalsNeedUpdate = true;
//   mesh.geometry.computeVertexNormals();
//   mesh.geometry.computeFaceNormals();
// }

export default App;