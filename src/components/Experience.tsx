import { Text, Text3D } from "@react-three/drei";
import fonts from "../utils/fonts";
import Sphere from "./Sphere/Sphere";
import SphereSlice from "./Sphere/SphereSlice";
import { useData } from "../context/DataProvider";

const Experience = () => {
  const { debugEnable } = useData();

  return (
    <>
      <Sphere />
      {debugEnable && <SphereSlice />}
      <Text
        scale={[0.15, 0.15, 0.15]}
        rotation={[-1.6, 0, 0]}
        position={[-0.5, -1.04, 2.3]}
        color={"#303030"}
        font={fonts["Roboto"]}
        anchorX="center"
        anchorY="middle"
        castShadow
        receiveShadow
      >
        DRAG TO SLICE!
        <meshStandardMaterial color={"#303030"} />
      </Text>
      <Text3D
        position={[-5, -1, -5]}
        letterSpacing={-0.3}
        size={2}
        bevelEnabled
        bevelSize={0.05}
        font="/Inter_Bold.json"
        castShadow
        receiveShadow
      >
        ORANGE
        <meshStandardMaterial color="orange" />
      </Text3D>
    </>
  );
};

export default Experience;
