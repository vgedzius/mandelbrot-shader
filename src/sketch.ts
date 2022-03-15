import p5, { Shader } from "p5";
import "styles/main.css";

const offsetStep = 0.005;
const zoomStep = 1.5;

const defaultWidth = 600;
const defaultHeight = 400;

function sketch(p: p5) {
  let shader: Shader;
  let zoom = 1.5;
  let fs = false;

  let center = [-0.5, 0];
  let lastPosition = p.createVector(0, 0, 0);
  let dragging = false;
  let dragX = 0;
  let dragY = 0;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  p.preload = () => {
    shader = p.loadShader(
      "shaders/mandelbrot.vert.glsl",
      "shaders/mandelbrot.frag.glsl"
    );
  };

  p.setup = () => {
    p.createCanvas(defaultWidth, defaultHeight, p.WEBGL);
    p.shader(shader);
  };

  p.draw = () => {
    shader.setUniform("zoom", zoom);
    shader.setUniform("center", center);
    shader.setUniform("aspect", p.width / p.height);

    var w = p.width;
    var h = p.height;
    shader.setUniform("pixelSize", [1.0 / w, 1.0 / h]);

    p.shader(shader);
    p.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  };

  p.mouseWheel = (event: WheelEvent) => {
    if (event.deltaY > 0) {
      zoom *= zoomStep;
    } else {
      zoom /= zoomStep;
    }

    zoom = p.constrain(zoom, 0, 1.5);

    return false;
  };

  p.mousePressed = (event: MouseEvent) => {
    dragging = true;

    dragOffsetX = event.x - dragX;
    dragOffsetY = event.y - dragY;
  };

  p.mouseReleased = (event: MouseEvent) => {
    dragging = false;
  };

  p.mouseDragged = (event: DragEvent) => {
    if (dragging) {
      dragX = event.x - dragOffsetX;
      dragY = event.y - dragOffsetY;

      const newPosition = p.createVector(dragX, dragY, 0);
      const delta = lastPosition.sub(newPosition);

      center = [
        center[0] + delta.x * offsetStep * zoom,
        center[1] - delta.y * offsetStep * zoom,
      ];

      lastPosition = newPosition;
    }

    return false;
  };

  p.keyReleased = () => {
    if (p.key === "f") {
      fs = p.fullscreen();
      p.fullscreen(!fs);
    }
  };

  p.windowResized = () => {
    if (!fs) {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    } else {
      p.resizeCanvas(defaultWidth, defaultHeight);
    }
  };
}

export default sketch;
