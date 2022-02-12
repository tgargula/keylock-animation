import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const createControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 100, 0);
  controls.update();
  return controls;
}

export default createControls;