import animate from "./utils/animate";
import createCamera from "./components/camera";
import createControls from "./components/controls";
import createGround from "./components/ground";
import createLights from "./components/lights";
import createRenderer from "./components/renderer";
import createScene from "./components/scene";
import onWindowResize from "./utils/onWindowResize";
import onKeyDown from "./utils/onKeyDown";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { createInnerShape, createOuterShape } from "./components/objects/lock";
import createPins, { createPin } from "./components/objects/pin";
import createKey from "./components/objects/key";

const calculatePinOffset = (keyPosition, unlocks, idx) => {
  if (keyPosition <= 10 + idx * 18) return 0;
  if (keyPosition <= 20 + idx * 18) return 15;
  if (keyPosition <= 36 + idx * 18) return 15 + unlocks[4];
  if (keyPosition <= 38 + idx * 18) return 15;
  if (keyPosition <= 54 + idx * 18) return 15 + unlocks[3];
  if (keyPosition <= 56 + idx * 18) return 15;
  if (keyPosition <= 72 + idx * 18) return 15 + unlocks[2];
  if (keyPosition <= 74 + idx * 18) return 15;
  if (keyPosition <= 90 + idx * 18) return 15 + unlocks[1];
  if (keyPosition <= 92 + idx * 18) return 15;
  if (keyPosition <= 108 + idx * 18) return 15 + unlocks[0];
  return 0;
};

const getPinsOffsets = (keyPosition, unlocks) =>
  new Array(5).fill(0).map((_, idx) => calculatePinOffset(keyPosition, unlocks, idx));

const main = (root) => {
  const scene = createScene();
  const camera = createCamera();
  const lights = createLights();
  const ground = createGround();
  const renderer = createRenderer();
  const controls = createControls(camera, renderer);
  const outerBox = createOuterShape();
  const innerShape = createInnerShape();
  const unlocks = [7, 3, 0.2, 10, 2];
  const initialPins = createPins(unlocks);
  let pins = createPins(unlocks);
  const key = createKey(unlocks);
  const stats = new Stats();

  const sceneElements = [
    ...lights,
    ground.mesh,
    ground.grid,
    outerBox,
    innerShape,
    key,
    // ...pins.map(({ meshes }) => meshes).flat(),
  ];

  // pins[0] = pins[0].update(15 + 3);
  scene.add(...pins.map(({ meshes }) => meshes).flat());

  root.appendChild(renderer.domElement);
  root.appendChild(stats.dom);
  sceneElements.forEach((element) => scene.add(element));
  renderer.render(scene, camera);

  console.log(getPinsOffsets(key.position.x + 175, unlocks));

  let t = 0;
  setInterval(() => {
    const oldPins = pins;

    pins = initialPins.map(({ update }, idx) =>
      update(getPinsOffsets(key.position.x + 175, unlocks)[idx])
    );
    // const oldPin = pins[0];
    // pins[0] = initialPins[0].update(
    //   getPinsOffsets(key.position.x + 175, unlocks)[0]
    // );

    scene.remove(...oldPins.map(({ meshes }) => meshes).flat());
    scene.add(...pins.map(({ meshes }) => meshes).flat());
    // t += 0.1;
  }, 100);

  setInterval(() => {
    key.position.setX(-175 + 100 * Math.sin(t) * Math.sin(t));
    t += 0.01;
  }, 100);

  window.addEventListener("resize", () => onWindowResize(camera, renderer));
  window.addEventListener("keydown", (e) => onKeyDown(e, camera, renderer));
  animate(renderer, scene, camera, stats);
};

export default main;
