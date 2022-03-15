precision highp float;

varying vec2 coord;

uniform vec2 center;
uniform float zoom;
uniform float aspect;
uniform vec2 pixelSize;

const int I = 500;
const int AntiAlias = 1;

	// Color parameters
float R = 0.0;
float G = 0.43;
float B = 1.;

vec2 complexMul(vec2 a, vec2 b) {
  return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

vec3 colorSinglePrecision(vec2 p) {
  vec2 c = p * zoom + center;
  c.x = c.x * aspect;
  vec2 z = vec2(0.0, 0.0);

  int j = I;
  for(int i = 0; i <= I; i++) {
    if(length(z) > 1000.0) {
      break;
    }
    z = complexMul(z, z) + c;
    j = i;
  }
  float dotZZ = dot(z, z);

  if(j < I) {
			// The color scheme here is based on one
			// from the Mandelbrot in Inigo Quilez's Shader Toy:
    float co = float(j) + 1.0 - log2(.5 * log2(dotZZ));
    co = sqrt(max(0., co) / 256.0);
    return vec3(.5 + .5 * cos(6.2831 * co + R), .5 + .5 * cos(6.2831 * co + G), .5 + .5 * cos(6.2831 * co + B));
  } else {
			// Inside 
    return vec3(0.05, 0.01, 0.02);
  }
}

void main() {
  vec3 v = vec3(0.0, 0.0, 0.0);
  float d = 1.0 / float(AntiAlias);
  vec2 ard = vec2(pixelSize.x, pixelSize.y) * d;

  for(int x = 0; x < AntiAlias; x++) {
    for(int y = 0; y < AntiAlias; y++) {
      v += colorSinglePrecision(coord + vec2(x, y) * ard);
    }
  }
  gl_FragColor = vec4(pow(v / float(AntiAlias * AntiAlias), vec3(1. / 2.2)), 1.0);
}