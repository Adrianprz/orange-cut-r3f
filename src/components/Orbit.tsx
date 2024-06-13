import { OrbitControls } from "@react-three/drei";
import { useData } from "../context/DataProvider";

const OrbitControlsWrapper = () => {
  const { orbitControlRef } = useData();

  return (
    <OrbitControls
      ref={orbitControlRef}
      target={[0, 0, 0]}
      makeDefault
      maxPolarAngle={1.45}
      enableZoom={false}
      enablePan={false}
    />
  );
};

export default OrbitControlsWrapper;
