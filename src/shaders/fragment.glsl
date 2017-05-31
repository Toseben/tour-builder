uniform sampler2D texture;
uniform int active;
uniform int hover;

varying vec3 fNormal;
varying vec3 fPosition;
varying vec2 vUv;

const vec3 color_A = vec3(0.172, 0.243, 0.313);
const vec3 color_B = vec3(0.9, 0.5, 0.133);

void main() {
  vec4 texture = texture2D(texture, vUv, 0.0);
  vec3 normal = normalize( fNormal );
  vec3 eye = normalize( -fPosition.xyz );

  float rim = 0.0;

  if (active == 0) {
    rim = smoothstep( 0.0, 1.0, 1.0 - dot( normal, eye ) );
  };

  vec3 color = color_A;
  if (hover == 1) {
    color = color_B;
  };

  vec3 col = mix(texture.rgb, color, rim);
  gl_FragColor = vec4(col, 1.0);
}
