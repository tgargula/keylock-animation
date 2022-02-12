import animate from "./utils/animate";
import createCamera from "./components/camera";
import createControls from "./components/controls";
import createGround from "./components/ground";
import createLights from "./components/lights";
import createRenderer from "./components/renderer";
import createScene from "./components/scene";
import onWindowResize from "./utils/onWindowResize";
import onKeyDown from "./utils/onKeyDown";
import Stats from "../../node_modules/three/examples/jsm/libs/stats.module.js";
import createBox, { createInnerLayer, createOuterLayer, createOuterShape } from "./components/keyLock";

const main = (root) => {
  const scene = createScene();
  const camera = createCamera();
  const lights = createLights();
  const ground = createGround();
  const renderer = createRenderer();
  const controls = createControls(camera, renderer);
  const outerBox = createOuterShape();
  const stats = new Stats();

  root.appendChild(renderer.domElement);
  root.appendChild(stats.dom);
  const sceneElements = [...lights, ground.mesh, ground.grid];
  sceneElements.forEach((element) => scene.add(element));
  scene.add(outerBox);
  console.log(outerBox);
  renderer.render(scene, camera);

  window.addEventListener("resize", () => onWindowResize(camera, renderer));
  window.addEventListener("keydown", (e) => onKeyDown(e, camera, renderer));
  animate(renderer, scene, camera, stats);
};

export default main;
