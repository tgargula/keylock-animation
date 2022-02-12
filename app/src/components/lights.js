import { HemisphereLight, DirectionalLight } from "three";

const createHemisphereLight = () => {
  const light = new HemisphereLight(0xffffff, 0xff4444);
  light.position.set(0, 200, 0);

  // return light;
};

const createDirectionalLight = () => {
  const light = new DirectionalLight(0xffffff);
  light.position.set(0, 200, 100);
  light.castShadow = true;
  light.shadow.camera.top = 500;
  light.shadow.camera.bottom = -500;
  light.shadow.camera.left = -500;
  light.shadow.camera.right = 500;
  return light;
};

const createLights = () => [createHemisphereLight(), createDirectionalLight()];

export default createLights;
