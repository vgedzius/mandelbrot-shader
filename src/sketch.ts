import p5, { Shader } from "p5";

let shader: Shader;

function sketch(p: p5) {
  p.preload = () => {
    shader = p.loadShader("shaders/basic.vert.glsl", "shaders/basic.frag.glsl");
  };

  p.setup = () => {
    p.createCanvas(500, 500, p.WEBGL);
    p.shader(shader);
  };

  p.draw = () => {
    shader.setUniform("u_resolution", [p.width, p.height]);

    p.shader(shader);
    //p.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    p.rect(0, 0, p.width, p.height);
  };
}

export default sketch;
