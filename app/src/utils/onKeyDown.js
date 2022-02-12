const SPEED = 2;

const onKeyDown = (e, camera) => {
  console.log(e.key);
  switch (e.key) {
    case "w":
      camera.position.x -= SPEED * Math.sin(camera.rotation.y);
      camera.position.z -= SPEED * Math.cos(camera.rotation.y);
      break;
    case "s":
      camera.position.x += SPEED * Math.sin(camera.rotation.y);
      camera.position.z += SPEED * Math.cos(camera.rotation.y);
      break;
    case "a":
      camera.position.x -= SPEED * Math.cos(camera.rotation.y);
      camera.position.z += SPEED * Math.sin(camera.rotation.y);
      break;
    case "d":
      camera.position.x += SPEED * Math.cos(camera.rotation.y);
      camera.position.z -= SPEED * Math.sin(camera.rotation.y);
      break;
    case "e":
      camera.rotation.x += SPEED * 0.01;
      break;
    case "q":
      camera.rotation.z -= SPEED * 0.01;
      break;
    case " ":
      camera.position.y += SPEED;
      break;
    case "Control":
      camera.position.y -= SPEED;
      break;
    default:
      break;
  }
  camera.updateProjectionMatrix();
};

export default onKeyDown;
