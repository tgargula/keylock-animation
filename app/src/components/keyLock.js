import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";

export const createOuterShape = () => {
  const shapes = [
    {
      size: { x: 100, y: 100, z: 20 },
      position: { x: 0, y: 0, z: 0 },
    },
    {
      size: { x: 100, y: 50, z: 10 },
      position: { x: 0, y: 50, z: 20 },
    },
    {
      size: { x: 100, y: 5, z: 40 },
      position: { x: 0, y: 100, z: 0 },
    },
    {
      size: { x: 10, y: 50, z: 10 },
      position: { x: 0, y: 50, z: 30 },
    },
    {
      size: { x: 10, y: 50, z: 10 },
      position: { x: 18, y: 50, z: 30 },
    },
    {
      size: { x: 10, y: 50, z: 10 },
      position: { x: 36, y: 50, z: 30 },
    },
    {
      size: { x: 10, y: 50, z: 10 },
      position: { x: 54, y: 50, z: 30 },
    },
    {
      size: { x: 10, y: 50, z: 10 },
      position: { x: 72, y: 50, z: 30 },
    },
    {
      size: { x: 10, y: 50, z: 10 },
      position: { x: 90, y: 50, z: 30 },
    },
  ];

  const geometries = shapes
    .map(({ size: { x, y, z }, position }) => ({
      size: { x, y, z },
      geometry: new BoxGeometry(x, y, z),
      position,
    }))
    .map(({ size, geometry, position: { x, y, z } }) => {
      geometry.translate(x + size.x / 2, y + size.y / 2, z + size.z / 2);
      return geometry;
    });

  const geometry = mergeBufferGeometries(geometries);
  geometry.translate(0, 100, 0);
  const material = new MeshPhongMaterial({ color: 0xcccccc });
  const mesh = new Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
};

export default createOuterShape;
