<script lang="ts">
  import Sphere from './Sphere.svelte';
  import {
    ExtrudeGeometry,
    Shape,
    Mesh,
    MeshStandardMaterial,
    TextGeometry,
    FontLoader,
  } from "svelthree";
  import { toRadians } from './utils';
  import { onMount } from 'svelte';

  export let scene;
  // dimensions
  export let unit; // keycap base unit in mm.
  export let ratio = 1; // ratio compared to the unit. a letter is 1u
  export let margin;
  export let degrees; // angle of the right slope in the side profile
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

  // load font
  const loader = new FontLoader();
  let text;
  const fontSize = 4;
  onMount(async () => {
    loader.load( 'fonts/Roboto_Regular.json', (loadedFont) => {
      text = new TextGeometry(legend, {
        font: loadedFont,
        size: 4,
        height: 0.1,
      });
      text.rotateX(toRadians(-90));
      text.rotateY(toRadians(90));
    });
  });
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

{#if text}
  <Mesh
    {scene}
    geometry={text}
    material={new MeshStandardMaterial()}
    mat={{ color: 0x000000 }}
    pos={[x + (width / 2) - fontSize, y + height + 0.005, z + depth / 2]}
    scale={[1, 1, 1]}
  />
{/if}