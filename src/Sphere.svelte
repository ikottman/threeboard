<script lang="ts">
  import {
    SphereGeometry,
    Mesh,
    MeshStandardMaterial,
  } from "svelthree";

  export let scene;
  // position
  export let x;
  export let y;
  export let z;
  export let color;
  export let radius = 1;

  const geometry = new SphereGeometry(radius)
  let material = new MeshStandardMaterial();
</script>

<Mesh
  {scene}
  geometry={geometry}
  material={material}
  mat={{ roughness: 0.5, metalness: 0.5, color: color }}
  pos={[x, y, z]}
  castShadow
/>