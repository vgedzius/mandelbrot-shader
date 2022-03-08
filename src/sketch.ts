import p5, { Shader, Element } from "p5";

let shader: Shader;
let label: Element;

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
    shader.setUniform("r", 1.5);
    shader.setUniform("p", [-0.74364388703, 0]);

    p.shader(shader);
    p.rect(0, 0, p.width, p.height);
  };
}

export default sketch;
