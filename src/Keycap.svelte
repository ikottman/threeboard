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

  /**
   *
   *         (x2,t) _______ (x3,s)
   *               /|     | \
   *            l / | t   |  \ r
   *        (x,y)/__|_____|___\ (x4,y)
   *                   w
   */
   function getProfile(x: number, y:number, w: number, l: number, t: number, r: number, s: number) {
    // special thanks to Haley for the maths
    const x2 = Math.sqrt((l*l) - (t*t));
    const x3 = w - Math.sqrt((r*r) - (s*s));
    const x4 = x + w;
    // describe profile of the keycap
    let shape = new Shape();
    shape.moveTo(x, y);
    shape.lineTo(x2, t);
    shape.lineTo(x3, s);
    shape.lineTo(x4, y);
    shape.lineTo(x, y);

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

  // TODO: use real numbers
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