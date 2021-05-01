<script>
  import {
    DoubleSide,
    PlaneBufferGeometry,
    Mesh,
    MeshStandardMaterial,
    MathUtils
  } from "svelthree";
  export let scene;
  let floorGeometry = new PlaneBufferGeometry(100, 100, 1);
  let floorMaterial = new MeshStandardMaterial();
</script>

<Mesh
  {scene}
  geometry={floorGeometry}
  material={floorMaterial}
  mat={{ roughness: 0.5, metalness: 0.5, side: DoubleSide, color: 0xB0C4DE }}
  pos={[0, -0.501, 0]}
  rot={[0, 0, MathUtils.degToRad(-90)]}
  scale={[1, 1, 1]}
  receiveShadow
/>