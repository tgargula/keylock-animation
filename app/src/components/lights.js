import { DirectionalLight } from "three";

const createLight = ({ intensity, position: { x, y, z } }) => {
  const light = new DirectionalLight(0xffffff, intensity || 0.5);
  light.position.set(x, y, z);
  light.castShadow = true;

  return light;
};

const createLights = () =>
  [
    { intensity: 0.7, position: { x: 100, y: 100, z: 100 } },
    { intensity: 0.5, position: { x: -100, y: 50, z: 100 } },
    { intensity: 0.5, position: { x: 0, y: 150, z: 50 } },
  ].map(createLight);

export default createLights;
