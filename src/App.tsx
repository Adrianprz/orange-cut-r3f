import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { Environment } from "@react-three/drei";

import { DataProvider, useData } from "./context/DataProvider";
import Content from "./components/Content";
import OrbitControlsWrapper from "./components/Orbit";
import Lights from "./components/Lights";
import Experience from "./components/Experience";
import Floor from "./components/Floor";

export default function App() {
  return (
    <DataProvider>
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        onCreated={(state) => (state.gl.localClippingEnabled = true)}
      >
        <color attach="background" args={["white"]} />
        <Suspense fallback={null}>
          <Experience />
          <Floor />
        </Suspense>
        <Content />
        <Lights />
        <Environment preset="night" />
        <OrbitControlsWrapper />
      </Canvas>
    </DataProvider>
  );
}
