import p5, { Shader } from "p5";

const offsetStep = 0.005;
const zoomStep = 1.5;

function sketch(p: p5) {
  let shader: Shader;
  let zoom = 1.5;

  let position = [-0.7, 0];
  let lastPosition = p.createVector(0, 0, 0);
  let dragging = false;
  let dragX = 0.0;
  let dragY = 0.0;
  let dragOffsetX = 0.0;
  let dragOffsetY = 0.0;

  p.preload = () => {
    shader = p.loadShader(
      "shaders/mandelbrot.vert.glsl",
      "shaders/mandelbrot.frag.glsl"
    );
  };

  p.setup = () => {
    p.createCanvas(500, 500, p.WEBGL);
    p.shader(shader);
  };

  p.draw = () => {
    shader.setUniform("zoom", zoom);
    shader.setUniform("position", position);

    p.shader(shader);
    p.rect(0, 0, p.width, p.height);
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

      position = [
        position[0] + delta.x * offsetStep * zoom,
        position[1] - delta.y * offsetStep * zoom,
      ];

      lastPosition = newPosition;
    }

    return false;
  };
}

export default sketch;
