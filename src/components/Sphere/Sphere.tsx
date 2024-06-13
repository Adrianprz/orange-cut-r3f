import { BackSide, DoubleSide, Plane, TextureLoader } from "three";
import { useData } from "../../context/DataProvider";
import { useEffect, useMemo } from "react";

const Sphere = () => {
  const { constant, modelRef } = useData();

  const sphereSettings: [
    number,
    number,
    number,
    number?,
    number?,
    number?,
    number?
  ] = useMemo(() => [1, 80, 80], []);

  const clippingPlane = useMemo(() => {
    const plane = new Plane();
    plane.normal.set(0, -1, 0);
    return plane;
  }, []);

  useEffect(() => {
    clippingPlane.constant = constant;
  }, [clippingPlane, constant]);

  const texture1 = useMemo(() => new TextureLoader().load("/out-min.webp"), []);
  const texture = useMemo(
    () => new TextureLoader().load("/inside-min.webp"),
    []
  );

  const circleRadius = useMemo(() => Math.sqrt(1 - constant * constant), [
    constant,
  ]);

  return (
    <>
      <mesh castShadow receiveShadow ref={modelRef}>
        <sphereGeometry attach="geometry" args={sphereSettings} />
        <meshStandardMaterial
          attach="material"
          map={texture1}
          roughness={1}
          metalness={0.1}
          side={DoubleSide}
          clippingPlanes={[clippingPlane]}
          clipShadows
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, constant - 0.001, 0]}>
        <circleGeometry attach="geometry" args={[circleRadius, 80]} />
        <meshStandardMaterial
          attach="material"
          color={"white"}
          map={texture}
          roughness={1}
          metalness={0.1}
          clippingPlanes={[clippingPlane]}
          side={BackSide}
        />
      </mesh>
    </>
  );
};

export default Sphere;
