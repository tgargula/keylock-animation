import {
  BoxGeometry,
  DoubleSide,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Shape,
  ShapeGeometry,
  Vector2,
} from 'three';
import { CylinderGeometry } from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';

const createKey = (unlockHeights) => {
  const head = new CylinderGeometry(50, 50, 8, 60, 2, false, 0, 2 * Math.PI);
  const keyLength = 150;
  const backbone = new BoxGeometry(keyLength, 20, 2);
  backbone.translate(100, 0, 0);
  backbone.rotateX(Math.PI / 2);

  const leg1 = createRightTriangularPrism({
    width: 5,
    depth: 3,
    height: keyLength,
  });
  leg1.rotateY(Math.PI / 2);
  leg1.translate(25, 1, 10);

  const leg2 = createRightTriangularPrism({
    width: 5,
    depth: 3,
    height: keyLength,
  });
  leg2.rotateY(-Math.PI / 2);
  leg2.rotateX(Math.PI);
  leg2.translate(keyLength + 25, -1, 10);

  const hip1 = createRightTriangularPrism({
    width: 5,
    depth: 3,
    height: keyLength,
  });
  hip1.rotateY(-Math.PI / 2);
  hip1.translate(keyLength + 25, 1, 0);

  const hip2 = createRightTriangularPrism({
    width: 5,
    depth: 3,
    height: keyLength,
  });
  hip2.rotateY(Math.PI / 2);
  hip2.rotateX(Math.PI);
  hip2.translate(25, -1, 0);

  const belly = new BoxGeometry(keyLength, 8, 5);
  belly.translate(keyLength / 2 + 25, 0, -2.5);

  const arm1 = createRightTriangularPrism({
    width: 5,
    depth: 3,
    height: keyLength,
  });
  arm1.rotateY(Math.PI / 2);
  arm1.translate(25, 1, -5);

  const arm2 = createRightTriangularPrism({
    width: 5,
    depth: 3,
    height: keyLength,
  });
  arm2.rotateY(-Math.PI / 2);
  arm2.rotateX(Math.PI);
  arm2.translate(keyLength + 25, -1, -5);

  const neck = new BoxGeometry(50, 2, 15);
  neck.translate(50, 0, -17.5);

  const fingers = unlockHeights.map((unlockHeight, idx) => {
    const finger = new BoxGeometry(8, 2, unlockHeight);
    finger.translate(89 + 18 * idx, 0, -10 - unlockHeight / 2);
    return finger;
  });

  const geometry = mergeBufferGeometries([
    head,
    backbone,
    leg1,
    leg2,
    hip1,
    hip2,
    belly,
    arm1,
    arm2,
    neck,
    ...fingers,
  ]);
  const material = new MeshLambertMaterial({
    color: 'orange',
    side: DoubleSide,
  });
  const mesh = new Mesh(geometry, material);

  geometry.translate(0, 0, 5);

  mesh.translateX(-175);
  mesh.translateY(120 + 5);
  mesh.translateZ(34);
  mesh.rotateX(Math.PI / 2);

  return mesh;
};

const createTriangle = ({ width, depth }) => {
  const points = [
    new Vector2(0, 0),
    new Vector2(width, 0),
    new Vector2(0, depth),
  ];
  const triangle = new Shape(points);
  return new ShapeGeometry(triangle);
};

const createRightTriangularPrism = ({ width, depth, height }) => {
  const base1 = createTriangle({ width, depth });
  base1.translate(0, 0, 0);
  const base2 = createTriangle({ width, depth });
  base2.translate(0, 0, height);
  const side1 = new ShapeGeometry(
    new Shape([
      new Vector2(0, 0),
      new Vector2(0, height),
      new Vector2(width, height),
      new Vector2(width, 0),
    ])
  );
  side1.rotateX(Math.PI / 2);

  const side2 = new ShapeGeometry(
    new Shape([
      new Vector2(0, 0),
      new Vector2(0, height),
      new Vector2(depth, height),
      new Vector2(depth, 0),
    ])
  );
  side2.rotateX(Math.PI / 2);
  side2.rotateZ(Math.PI / 2);

  const side3 = new ShapeGeometry(
    new Shape([
      new Vector2(0, 0),
      new Vector2(0, Math.sqrt(Math.pow(width, 2) + Math.pow(depth, 2))),
      new Vector2(height, Math.sqrt(Math.pow(width, 2) + Math.pow(depth, 2))),
      new Vector2(height, 0),
    ])
  );
  side3.rotateY(-Math.PI / 2);
  side3.rotateZ(-Math.PI / 2 - Math.atan(depth / width));
  side3.translate(0, depth, 0);

  const geometry = mergeBufferGeometries([base1, base2, side1, side2, side3]);
  return geometry;
};

export default createKey;
