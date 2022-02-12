import { Clock } from "three";

const CLOCK = new Clock();

const animate = (renderer, scene, camera, stats, objects = []) => {
  requestAnimationFrame(() => animate(renderer, scene, camera, stats, objects));
  renderer.render(scene, camera);
  
  stats.update();

  const delta = CLOCK.getDelta();
  objects.forEach((object) => object.update(delta));
};

export default animate;
