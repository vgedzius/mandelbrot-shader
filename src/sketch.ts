import p5, { Shader } from "p5";

let theShader: Shader;

function sketch(p: p5) {
  p.preload = () => {
    theShader = p.loadShader("shaders/basic.vert", "shaders/basic.frag");
  };

  p.setup = () => {
    p.createCanvas(700, 410, p.WEBGL);
    p.shader(theShader);
  };

  p.draw = () => {
    theShader.setUniform("u_resolution", [p.width, p.height]);
    p.shader(theShader);
    p.rect(0, 0, p.width, p.height);
  };
}

export default sketch;
