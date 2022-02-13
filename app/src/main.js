import animate from './utils/animate';
import createCamera from './components/camera';
import createControls from './components/controls';
import createGround from './components/ground';
import createLights from './components/lights';
import createRenderer from './components/renderer';
import createScene from './components/scene';
import onWindowResize from './utils/onWindowResize';
import onKeyDown from './utils/onKeyDown';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { createInnerShape, createOuterShape } from './components/objects/lock';
import createPins from './components/objects/pin';
import createKey from './components/objects/key';

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
  // let pins = createPins(unlocks);
  const key = createKey(unlocks);
  const stats = new Stats();

  const sceneElements = [
    ...lights,
    ground.mesh,
    outerBox,
    innerShape.mesh,
    key,
    ...initialPins.map(({ meshes }) => meshes).flat(),
  ];

  root.appendChild(renderer.domElement);
  root.appendChild(stats.dom);
  sceneElements.forEach((element) => scene.add(element));
  renderer.render(scene, camera);

  window.addEventListener('resize', () => onWindowResize(camera, renderer));
  window.addEventListener('keydown', (e) => onKeyDown(e, camera, renderer));
  animate(renderer, scene, camera, stats, {
    pins: initialPins,
    key,
    initialPins,
    innerShape,
  }, unlocks);
};

export default main;
