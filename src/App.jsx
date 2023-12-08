/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import "./App.css";

// creating a compo[nent for the 3d object (box)
const Cube = ({position, size, color}) => {
  return (
    // everything in the mesh is the object
    <mesh position={position}> {/* by giving position to mesh can change position of everything inside it (the 3d object/s) */}
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const App = () => {
  return (
    <>
      <Canvas>
        {/* lighting should be outside of the geometries */}
        <directionalLight position={[0, 0, 2]} /> {/* Light in parellel rays  */}
        <ambientLight intensity={0.5} /> {/* Light in all directions */} {/* cant be used for casting shadows */}

        <group position={[0, -1, 0]}> {/* group is used to group all 3d objects together. this allows us to move all of them together */}

        <Cube position={[1, 0, 0]} args={[1, 1, 1]} color={"hotpink"} />
        <Cube position={[-1, 0, 0]} args={[1, 1, 1]} color={"orange"} />

        <Cube position={[-1, 2, 0]} args={[1, 1, 1]} color={"green"} />
        <Cube position={[1, 2, 0]} args={[1, 1, 1]} color={"purple"} />

        </group>

      </Canvas>
    </>
  );
};

export default App;
