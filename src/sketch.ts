import p5, { Shader } from "p5";

let shader: Shader;

let zoom = 1.5;
let offset = [-0.74364388703, 0.13182590421];
let step = 1.5;

function sketch(p: p5) {
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
    //const r = 1.5 * p.exp(-6.5 * (1 + p.sin(p.millis() / 2000)));
    shader.setUniform("r", zoom);
    shader.setUniform("p", offset);

    p.shader(shader);
    p.rect(0, 0, p.width, p.height);
  };

  p.mouseWheel = (event: WheelEvent) => {
    if (event.deltaY > 0) {
      zoom *= step;
    } else {
      zoom /= step;
    }

    zoom = p.constrain(zoom, 0, 1.5);
  };
}

export default sketch;
