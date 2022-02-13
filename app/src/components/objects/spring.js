import {
  Curve,
  Mesh,
  MeshBasicMaterial,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";

class SpringCurve extends Curve {
  constructor(size, radius, segments) {
    super();
    this.size = size;
    this.radius = radius;
    this.segments = segments;
  }

  getPoint(t, optionalTarget = new Vector3()) {
    const tx = this.radius * Math.sin(2 * Math.PI * this.segments * t);
    const ty = t * this.size;
    const tz = this.radius * Math.cos(2 * Math.PI * this.segments * t);

    return optionalTarget.set(tx, ty, tz);
  }
}

export const createSpring = ({
  curve: { height, radius, segments },
  position: { x, y, z },
}) => {
  const tubeRadius = 0.5;
  const innerRadius = radius - tubeRadius;
  const path = new SpringCurve(height, innerRadius, segments);
  const spring = new TubeGeometry(
    path,
    250,
    tubeRadius,
    10,
    false
  );

  const springStart = new TorusGeometry(
    innerRadius,
    tubeRadius,
    10,
    10,
    2 * Math.PI
  );
  springStart.rotateX(Math.PI / 2);
  const springEnd = new TorusGeometry(
    innerRadius,
    tubeRadius,
    10,
    10,
    2 * Math.PI
  );
  springEnd.rotateX(Math.PI / 2);
  springEnd.translate(0, height, 0);

  const geometry = mergeBufferGeometries([springStart, spring, springEnd]);
  geometry.translate(x + radius, y - height, z + radius);

  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const mesh = new Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
};

const createSprings = () =>
  [
    {
      curve: { height: 30, radius: 4, segments: 10 },
      position: { x: 10, y: 200, z: 30 },
    },
    {
      curve: { height: 45, radius: 4, segments: 10 },
      position: { x: 28, y: 200, z: 30 },
    },
    {
      curve: { height: 35, radius: 4, segments: 10 },
      position: { x: 46, y: 200, z: 30 },
    },
    {
      curve: { height: 20, radius: 4, segments: 10 },
      position: { x: 64, y: 200, z: 30 },
    },
    {
      curve: { height: 40, radius: 4, segments: 10 },
      position: { x: 82, y: 200, z: 30 },
    },
  ].map(createSpring);

export default createSprings;
