import p5, { Shader, Element } from "p5";

const offsetStep = 0.005;
const zoomStep = 1.1;

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
  let maxIterations = 500;

  const maxIterationsInput = p.select("#maxIterations");
  const zoomInput = p.select("#zoom");
  const centerInput = p.select("#center");

  maxIterationsInput.value(maxIterations);
  zoomInput.value(1 / zoom);
  centerInput.value(`${center[0]}, ${center[1]}`);

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
    const { width, height } = p;

    shader.setUniform("maxIterations", maxIterations);
    shader.setUniform("zoom", zoom);
    shader.setUniform("center", center);
    shader.setUniform("aspect", width / height);
    shader.setUniform("pixelSize", [1.0 / width, 1.0 / height]);

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
    zoomInput.value(1 / zoom);

    return false;
  };

  p.mousePressed = () => {
    const { mouseX, mouseY } = p;

    if (mouseX < 0 || mouseX > p.width || mouseY < 0 || mouseY > p.height) {
      return;
    }

    dragging = true;

    dragOffsetX = mouseX - dragX;
    dragOffsetY = mouseY - dragY;
  };

  p.mouseReleased = () => {
    dragging = false;
  };

  p.mouseDragged = () => {
    if (dragging) {
      dragX = p.mouseX - dragOffsetX;
      dragY = p.mouseY - dragOffsetY;

      const newPosition = p.createVector(dragX, dragY, 0);
      const delta = lastPosition.sub(newPosition);

      center = [
        center[0] + delta.x * offsetStep * zoom,
        center[1] - delta.y * offsetStep * zoom,
      ];

      centerInput.value(`${center[0]}, ${center[1]}`);

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
