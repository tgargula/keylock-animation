import {
  CylinderGeometry,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
} from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import { createSpring } from "./spring";

const createPinPart = ({
  pin: { height, radius, smoothEnd, color },
  position: { x, y, z },
}) => {
  const cylinderHeight = smoothEnd ? height - radius : height;
  const cylinder = new CylinderGeometry(
    radius,
    radius,
    cylinderHeight,
    20,
    10,
    false,
    0,
    2 * Math.PI
  );
  const translationY = smoothEnd
    ? cylinderHeight / 2 + radius
    : cylinderHeight / 2;
  cylinder.translate(0, translationY, 0);

  const sphere = new SphereGeometry(radius, 10, 10, 0, Math.PI);

  sphere.translate(0, 0, -radius);
  sphere.rotateX(Math.PI / 2);

  const geometries = [cylinder];
  if (smoothEnd) {
    geometries.push(sphere);
  }

  const geometry = mergeBufferGeometries(geometries);
  geometry.translate(radius, -height, radius);

  const material = new MeshPhongMaterial({ color });

  const mesh = new Mesh(geometry, material);

  mesh.translateX(x);
  mesh.translateY(y);
  mesh.translateZ(z);

  return mesh;
};

export const createPin = ({
  heights: { full, first, second },
  position: { x, y, z },
  radius,
}) => {
  let springHeight = full - first - second;

  const spring = createSpring({
    curve: {
      height: springHeight,
      segments: 10,
      radius,
    },
    position: { x, y, z },
  });
  const firstPin = createPinPart({
    pin: { height: first, smoothEnd: false, color: 0x00ffff, radius },
    position: { x, z, y: y - springHeight },
  });
  const secondPin = createPinPart({
    pin: { height: second, smoothEnd: true, color: 0x0000ff, radius },
    position: { x, z, y: y - springHeight - first },
  });

  const update = (offset) => {
    return createPin({
      heights: { full: full - offset, first, second },
      position: { x, y, z },
      radius,
    });
  };

  return {
    meshes: [spring, firstPin, secondPin],
    update,
  };
};

const createPins = (unlockHeights) =>
  unlockHeights
    .map((unlockHeight, idx) => ({
      heights: { full: 85, first: 35, second: 20 - unlockHeight },
      position: { x: 10 + idx * 18, y: 200, z: 30 },
      radius: 4,
    }))
    .map(createPin);

export default createPins;
