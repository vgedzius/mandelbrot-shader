import p5, { Shader, Vector } from "p5";

const offsetStep = 0.005;
const zoomStep = 1.5;

function sketch(p: p5) {
  let shader: Shader;
  let zoom = 1.5;
  let offset = [-0.7, 0];
  let lastPosition = p.createVector(0, 0, 0);
  let dragLocked = false;

  let bx = 0.0;
  let by = 0.0;

  let xOffset = 0.0;
  let yOffset = 0.0;

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
    shader.setUniform("r", zoom);
    shader.setUniform("p", offset);

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
    dragLocked = true;

    xOffset = event.x - bx;
    yOffset = event.y - by;
  };

  p.mouseReleased = (event: MouseEvent) => {
    dragLocked = false;
  };

  p.mouseDragged = (event: DragEvent) => {
    if (dragLocked) {
      bx = event.x - xOffset;
      by = event.y - yOffset;

      const position = p.createVector(bx, by, 0);
      const delta = lastPosition.sub(position);

      offset = [
        offset[0] + delta.x * offsetStep * zoom,
        offset[1] - delta.y * offsetStep * zoom,
      ];

      lastPosition = position;
    }

    return false;
  };
}

export default sketch;
