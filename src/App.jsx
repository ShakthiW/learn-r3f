/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef, useState } from "react";
import {
  MeshWobbleMaterial,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { DirectionalLightHelper } from "three";

// creating a compo[nent for the 3d object (box)
const Cube = ({ position, size, color }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
      ref.current.position.z = Math.sin(state.clock.getElapsedTime()) * 2;
    }
  });

  return (
    // everything in the mesh is the object
    <mesh ref={ref} position={position}>
      {/* by giving position to mesh can change position of everything inside it (the 3d object/s) */}
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// creating a component for the 3d object (sphere)
const Sphere = ({ position, size, color }) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);

  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    if (ref.current) {
      const speed = isHovered ? 1 : 0.2;

      // ref.current.rotation.x += delta;
      ref.current.rotation.y += delta * speed;
      // ref.current.position.z = Math.sin(state.clock.getElapsedTime()) * 2;
    }
  });

  return (
    // to contain the event only to the mesh we use stopPropagation
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial
        color={isHovered ? "hotpink" : "lightblue"}
        wireframe
      />
    </mesh>
  );
};

// creating a component for the 3d object (Taurus)
const Taurus = ({ position, size, color }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
      ref.current.position.z = Math.sin(state.clock.getElapsedTime()) * 2;
    }
  });

  return (
    <mesh position={position} ref={ref}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// creating a component for the 3d object (TaurusKnot)
const TaurusKnot = ({ position, args, color }) => {
  const ref = useRef();

  // useFrame((state, delta) => {
  //   if (ref.current) {
  //     ref.current.rotation.x += delta;
  //     ref.current.rotation.y += delta;
  //     ref.current.position.z = Math.sin(state.clock.getElapsedTime()) * 2;
  //   }
  // });

  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={args} />
      {/* <meshStandardMaterial color={color} /> */}
      <MeshWobbleMaterial factor={5} speed={2} />
    </mesh>
  );
};

const Scene = () => {
  const directionalLightRef = useRef();

  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white");

  return (
    <>
      {/* lighting should be outside of the geometries */}
      <directionalLight
        position={[0, 0, 2]}
        ref={directionalLightRef}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Light in parellel rays  */}
      <ambientLight intensity={0.5} /> {/* Light in all directions */}
      {/* cant be used for casting shadows */}
      {/* group is used to group all 3d objects together. this allows us to move all of them together */}
      {/* <group position={[0, -1, 0]}> 

    <Cube position={[1, 0, 0]} args={[1, 1, 1]} color={"hotpink"} />
    <Cube position={[-1, 0, 0]} args={[1, 1, 1]} color={"orange"} />

    <Cube position={[-1, 2, 0]} args={[1, 1, 1]} color={"green"} />
    <Cube position={[1, 2, 0]} args={[1, 1, 1]} color={"purple"} />

    </group> */}
      {/* <Cube position={[0, 0, 0]} args={[1, 1, 1]} color={"hotpink"} /> */}
      {/* <Sphere position={[0, 0, 0]} args={[1, 30, 30]} color={"hotpink"} /> */}
      {/* <Taurus position={[4, 0, 0]} args={[0.8, 0.1, 30, 30]} color={"blue"} /> */}
      <TaurusKnot
        position={[0, 0, 0]}
        args={[1, 0.1, 1000, 50]}
        color={"green"}
      />
      <OrbitControls enableZoom={false} />
    </>
  );
};

const App = () => {
  return (
    <Canvas shadowMap>
      <Scene />
    </Canvas>
  );
};

export default App;
