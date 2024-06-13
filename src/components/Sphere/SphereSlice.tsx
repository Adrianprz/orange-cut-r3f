import { useEffect, useMemo, useRef } from "react";
import { useData } from "../../context/DataProvider";
import {
  BufferAttribute,
  DynamicDrawUsage,
  Line3,
  Plane,
  SphereGeometry,
  Vector3,
  BufferGeometry,
  LineSegments,
} from "three";
import { MeshBVH } from "three-mesh-bvh";

const SphereSlice = () => {
  const { constant } = useData();
  const lineSegRef = useRef<LineSegments>(null);
  const geomRef = useRef<BufferGeometry>(null);

  const defaultPlane = new Plane();
  defaultPlane.normal.set(0, -1, 0);

  const tempVector = new Vector3();
  const tempLine = new Line3();

  const defaultArray = new Float32Array(9999);

  const bvhMesh = useMemo(() => {
    const geometry = new SphereGeometry(1, 80, 80);
    return new MeshBVH(geometry, { maxLeafTris: 5 });
  }, []);

  useEffect(() => {
    if (bvhMesh && geomRef.current && lineSegRef.current) {
      const geo = geomRef.current;

      if (!geo.hasAttribute("position")) {
        const linePosAttr = new BufferAttribute(defaultArray, 3, false);
        linePosAttr.setUsage(DynamicDrawUsage);
        geo.setAttribute("position", linePosAttr);
      }

      let index = 0;
      const posAttr = geo.attributes.position;

      defaultPlane.constant = constant;

      bvhMesh.shapecast({
        intersectsBounds: (box) => defaultPlane.intersectsBox(box),
        intersectsTriangle: (tri) => {
          let count = 0;
          tempLine.start.copy(tri.a);
          tempLine.end.copy(tri.b);
          if (defaultPlane.intersectLine(tempLine, tempVector)) {
            posAttr.setXYZ(index, tempVector.x, tempVector.y, tempVector.z);
            index++;
            count++;
          }
          tempLine.start.copy(tri.b);
          tempLine.end.copy(tri.c);
          if (defaultPlane.intersectLine(tempLine, tempVector)) {
            posAttr.setXYZ(index, tempVector.x, tempVector.y, tempVector.z);
            count++;
            index++;
          }
          tempLine.start.copy(tri.c);
          tempLine.end.copy(tri.a);
          if (defaultPlane.intersectLine(tempLine, tempVector)) {
            posAttr.setXYZ(index, tempVector.x, tempVector.y, tempVector.z);
            count++;
            index++;
          }
          if (count !== 2) {
            index -= count;
          }
        },
      });

      geo.setDrawRange(0, index);
      posAttr.needsUpdate = true;
    }
  }, [constant, bvhMesh]);

  return (
    <lineSegments
      ref={lineSegRef}
      frustumCulled={false}
      matrixAutoUpdate={false}
      renderOrder={3}
    >
      <bufferGeometry ref={geomRef} attach="geometry" />
      <lineBasicMaterial
        attach="material"
        color="red"
        linewidth={30}
        linecap="round"
        linejoin="round"
        polygonOffset
        polygonOffsetFactor={-1.0}
        polygonOffsetUnits={4.0}
        depthTest={false}
      />
    </lineSegments>
  );
};

export default SphereSlice;
