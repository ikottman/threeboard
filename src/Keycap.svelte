<script lang="ts">
  import {
    ExtrudeGeometry,
    Shape,
    Mesh,
    MeshStandardMaterial,
  } from "svelthree";
  import Legend from './Legend.svelte';

  export let scene;
  // dimensions
  export let unit; // keycap base unit in mm.
  export let ratio = 1; // ratio compared to the unit. a letter is 1u
  export let margin;
  export let legend; // text to render on top
  let width, height, depth;
  width = height = depth = (unit * ratio - margin);

  // position
  export let x;
  export let y;
  export let z;

  function getProfile(x: number, y:number, w: number, l: number, t: number, r: number, s: number) {
    // special thanks to Haley for the maths
    const x1 = 2.35;
    const x3 = 18;
    const x2 = x3 - x1;
    const y1  = 11;
    const y2  = y1;
    const y3 = y;

    // describe profile of the front of the keycap (the face looking at the spacebar)
    let shape = new Shape();
    shape.moveTo(x, y); // bottom left
    shape.lineTo(x1, y1); // top left
    shape.quadraticCurveTo(x3 / 2, y2 / 1.2, x2, y2); // top right
    shape.lineTo(x3, y3); // bottom right
    shape.lineTo(x, y); // bottom left

    return shape;
  }

  function make3d(profile: Shape, depth) {
    const extrudeSettings = {
      steps: 2,
      depth: depth,
      bevelEnabled: false,
    };
    return new ExtrudeGeometry(profile, extrudeSettings);
  }

  $: profile = getProfile(x, y, width, 11, 10, 8, 7);
  $: geometry = make3d(profile, depth);
  let material = new MeshStandardMaterial();
</script>

<Mesh
  {scene}
  geometry={geometry}
  material={material}
  mat={{ roughness: 0.5, metalness: 0.5, color: 0xff3e00 }}
  pos={[x, y, z]}
  scale={[1, 1, 1]}
  castShadow
/>

<Legend legend={legend} x={x} y={y} z={z} width={width} height={height} depth={depth} scene={scene} />