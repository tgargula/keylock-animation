import {
  Curve,
  Mesh,
  MeshPhongMaterial,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';

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

const createSpring = ({
  curve: { height, radius, segments },
  position: { x, y, z },
}) => {
  const tubeRadius = 0.5;
  const innerRadius = radius - tubeRadius;
  const path = new SpringCurve(height, innerRadius, segments);
  const spring = new TubeGeometry(path, 250, tubeRadius, 10, false);

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

  const material = new MeshPhongMaterial({ color: 'silver' });
  const mesh = new Mesh(geometry, material);

  return mesh;
};

export default createSpring;
