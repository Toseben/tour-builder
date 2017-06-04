#define PI 3.141592653589793

uniform sampler2D texture;
varying vec2 vUv;

float range(float vmin, float vmax, float value) {
  return (value - vmin) / (vmax - vmin);
}

void main() {

  // Deform Amount - CLICK ANIM OUTSIDE
  float deform = 0.5;

  // Scale Up - NEED TO ADD POSITION OFFSET
  vec2 scaledUV = vec2(vUv.x, vUv.y) * 2.0 - 1.0;
  scaledUV.x *= 2.0;
  vec2 ratio = vec2(scaledUV.x * 0.5, scaledUV.y);

  // Create UVs - MIX WITH RINGSIZE AND 1.0 BASED ON CLICK
  float anim = 0.1;
  float circle = anim - deform * dot(scaledUV, scaledUV);
  circle = sqrt(clamp(circle, 0.0, 1.0));
  vec2 sampleUV = ratio / circle;

  // Scale Down
  sampleUV = (sampleUV + 1.0) * 0.5;

  // Final Texture
  float alpha = range(0.0, 0.1, circle);
  vec3 tex = vec3(texture2D(texture, sampleUV, 0.0));
  gl_FragColor = vec4(tex, alpha);
}
