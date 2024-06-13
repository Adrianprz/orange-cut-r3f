import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";

const Floor = () => {
  const [roughness, normal] = useLoader(TextureLoader, [
    "/terrain-roughness.jpg",
    "/terrain-normal.jpg",
  ]);

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });
  }, [normal, roughness]);

  return (
    <mesh
      position={[0, -1.05, 0]}
      rotation-x={-Math.PI * 0.5}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        roughnessMap={roughness}
        dithering={true}
        color={"gray"}
        roughness={0.2}
        blur={[200, 200]}
        mixBlur={30}
        mixStrength={20}
        mixContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        reflectorOffset={0}
      />
    </mesh>
  );
};

export default Floor;
