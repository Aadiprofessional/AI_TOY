/// <reference types="react-scripts" />

declare module '*.gltf' {
  const src: string;
  export default src;
}

declare module '*.glb' {
  const src: string;
  export default src;
}

declare namespace JSX {
  interface IntrinsicElements {
    group: any;
    mesh: any;
    geometry: any;
    material: any;
    primitive: any;
    ambientLight: any;
    spotLight: any;
    pointLight: any;
    directionalLight: any;
  }
}
