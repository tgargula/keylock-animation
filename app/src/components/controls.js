import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const createControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 100, -25);
  controls.update();
  return controls;
};

export default createControls;
