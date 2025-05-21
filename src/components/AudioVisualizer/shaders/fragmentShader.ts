export const fragmentShader = `
  uniform float u_red;
  uniform float u_green;
  uniform float u_blue;
  
  void main() {
      gl_FragColor = vec4(vec3(u_red, u_green, u_blue), 1.0);
  }
`;
