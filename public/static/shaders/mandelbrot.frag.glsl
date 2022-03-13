#ifdef GL_ES
precision highp float;
#endif

varying vec2 vPos;
uniform vec2 position;
uniform float zoom;
uniform float aspect;
const int I = 500;

void main() {
  vec2 c = position + vPos * zoom;
  c.x = c.x * aspect;
  vec2 z = c;

  float n = 0.0;

  for(int i = I; i > 0; i--) {
    if(z.x * z.x + z.y * z.y > 4.0) {
      n = float(i) / float(I);
      break;
    }

    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
  }

  float r = 0.5 - cos(n * 17.0) / 2.0;
  float g = 0.5 - cos(n * 13.0) / 2.0;
  float b = 0.5 - cos(n * 23.0) / 2.0;

  gl_FragColor = vec4(r, g, b, 1.0);
}
