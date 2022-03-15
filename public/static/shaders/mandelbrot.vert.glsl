precision highp float;

attribute vec3 aPosition;
varying vec2 coord;

void main(void) {
  coord = aPosition.xy;

  gl_Position = vec4(aPosition, 1.0);
}