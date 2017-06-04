uniform sampler2D texture;
uniform int active;
uniform int hover;
uniform float offset;

varying vec3 fNormal;
varying vec3 fPosition;
varying vec2 vUv;

const vec3 color_A = vec3(0.345, 0.588, 0.0);
const vec3 color_B = vec3(0.905, 0.298, 0.235);

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

void main() {

  vec2 modUv = vUv;
  if (active == 0) {
    modUv = vec2((vUv.x - 0.5) * 2.0 + 0.5, (vUv.y - 0.5) * 1.5 + 0.5);
  };

  vec4 texture = texture2D(texture, modUv, 0.0);
  vec3 normal = normalize( fNormal );
  vec3 eye = normalize( -fPosition.xyz );

  float rim = 0.0;

  if (active == 0) {
    rim = smoothstep( 0.0, 1.0, 1.0 - dot( normal, eye ) );
    rim = pow(rim, 1.5);
  };

  vec3 color = color_A;
  if (hover == 1) {
    color = color_B;
  };

  float stripe = sin(vUv.y * 300.0 + offset);
  stripe = map(stripe, -1.0, 1.0, 0.0, 1.0);
  float alpha = max(clamp(stripe, 0.0, 1.0), (1.0 - (rim * 0.5)));
  stripe *= rim;

  vec3 col = mix(texture.rgb, color, clamp(stripe, 0.0, 1.0));

  gl_FragColor = vec4(vec3(col), alpha);
}
