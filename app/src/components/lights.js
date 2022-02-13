import { DirectionalLight, SpotLight } from "three";

const createLight = ({ Light, intensity, position: { x, y, z } }) => {
  const light = new Light(0xffffff, intensity || 0.5);
  light.position.set(x, y, z);
  light.castShadow = true;

  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  light.shadow.camera.near = 500;
  light.shadow.camera.far = 4000;
  light.shadow.camera.fov = 30;

  return light;
};

const createLights = () =>
  [
    {
      Light: DirectionalLight,
      intensity: 0.7,
      position: { x: 100, y: 100, z: 100 },
    },
    {
      Light: DirectionalLight,
      intensity: 0.5,
      position: { x: -100, y: 50, z: 100 },
    },
    {
      Light: SpotLight,
      intensity: 0.5,
      position: { x: 0, y: 300, z: 50 },
    },
  ].map(createLight);

export default createLights;
