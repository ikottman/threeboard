<script>
  import {
    BoxBufferGeometry,
    Mesh,
    MeshStandardMaterial,
  } from "svelthree";
  export let scene;
  // assumes threejs dimensions are in millimeters
  let unit = 19.05; // keycap base unit. A letter keycap is 1u
  let ratio = 1; // different unit ratios, such as a tab key being 1.25u
  let margin = 0.525;
  let width = unit - margin;
  let height = width;
  let depth = 5; // arbitrary for now
  let position = [0, 0, depth / 2.0 + 0.05] // fudge it so we don't flicker

  let cubeGeometry = new BoxBufferGeometry(width, height, depth);
  let cubeMaterial = new MeshStandardMaterial();
</script>

<Mesh
  {scene}
  geometry={cubeGeometry}
  material={cubeMaterial}
  mat={{ roughness: 0.5, metalness: 0.5, color: 0xff3e00 }}
  pos={position}
  rot={[0, 0, 0]}
  scale={[ratio, 1, 1]}
  castShadow
/>