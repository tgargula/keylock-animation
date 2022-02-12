import { Scene, Color, Fog } from "three";

const createScene = () => {
  const scene = new Scene();
  scene.background = new Color(0xa0a0a0);
  scene.fog = new Fog(0xa0a0a0, 500, 1500);

  return scene;
}

export default createScene;
