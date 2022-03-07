#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;
const float radius = 0.5;

void main() {
  vec2 coord = vTexCoord - 0.5;
  float dist = coord.x * coord.x + coord.y * coord.y;
  
  gl_FragColor = radius * radius > dist 
    ? vec4(1.0, 0.0, 0.0, 1.0) 
    : vec4(0.0, 1.0, 0.0, 1.0);
}