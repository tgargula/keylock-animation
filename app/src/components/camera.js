import { PerspectiveCamera } from 'three';

const createCamera = () => {
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 1;
  const far = 2000;

  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(100, 200, 300);

  return camera;
};

export default createCamera;
