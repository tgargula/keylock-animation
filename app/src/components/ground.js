import { Mesh, PlaneBufferGeometry, MeshPhongMaterial } from 'three';

const createGround = () => {
  const mesh = new Mesh(
    new PlaneBufferGeometry(3000, 3000),
    new MeshPhongMaterial({ color: 0x999999, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;

  return mesh;
};

export default createGround;
