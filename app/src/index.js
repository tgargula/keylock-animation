import "../assets/styles/main.css";
import main from "./main";

(() => {
  const root = document.createElement("div");
  document.body.appendChild(root);

  main(root);
})();
