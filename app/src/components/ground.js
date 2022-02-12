import {
  Mesh,
  PlaneBufferGeometry,
  MeshPhongMaterial,
  GridHelper,
} from "three";

const createGround = () => {
  const mesh = new Mesh(
    new PlaneBufferGeometry(3000, 3000),
    new MeshPhongMaterial({ color: 0x999999, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;

  const grid = new GridHelper(3000, 20, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;

  return { mesh, grid };
};

export default createGround;
