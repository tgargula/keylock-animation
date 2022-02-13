import { Clock } from 'three';
import getPinsOffsets from './calculations';

const CLOCK = new Clock();
let t = 0;

const animate = (
  renderer,
  scene,
  camera,
  stats,
  { key, pins, initialPins, innerShape },
  unlocks
) => {
  const delta = CLOCK.getDelta();
  t += delta / 2;

  renderer.render(scene, camera);
  stats.update();

  const keyPosition = key.position.x + 175;
  const keyRotation = key.rotation.x - Math.PI / 2;
  const newPins = initialPins.map(({ update }, idx) =>
    update(getPinsOffsets(keyPosition, unlocks)[idx], keyRotation)
  );

  innerShape.update(keyRotation);
  scene.remove(...pins.map(({ meshes }) => meshes).flat());
  scene.add(...newPins.map(({ meshes }) => meshes).flat());

  const addon = Math.cos(t) < 0 ? 200 * Math.cos(t) * Math.cos(t) : 0;
  const value = 100 * Math.sin(t) * Math.sin(t) + addon;

  const newKeyPosition = -175 + Math.min(value, 100);
  const newKeyRotation =
    Math.min(0, (((100 - value) / 100) * Math.PI) / 2) + Math.PI / 2;
  key.position.setX(newKeyPosition);
  key.rotation.set(newKeyRotation, 0, 0);

  requestAnimationFrame(() =>
    animate(
      renderer,
      scene,
      camera,
      stats,
      {
        key,
        initialPins,
        innerShape,
        pins: newPins,
      },
      unlocks
    )
  );
};

export default animate;
