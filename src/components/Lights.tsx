const Lights = () => {
  return (
    <>
      <fog attach="fog" args={["#fff", 0, 25]} />
      <spotLight
        color={[255, 255, 255]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.2}
        position={[0, 15, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <hemisphereLight intensity={2} />
    </>
  );
};

export default Lights;
