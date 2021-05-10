<script lang="ts">
  import {
    ExtrudeGeometry,
    Shape,
    Mesh,
    MeshStandardMaterial,
    TextGeometry,
    FontLoader,
  } from "svelthree";
  import { tan } from './utils';
  import { onMount } from 'svelte';

  export let scene;
  export let unit; // keycap base unit. A letter keycap is 1u
  export let margin;
  export let degrees; // angle of the right slope in the side profile
  let width, height, depth;
  width = height = depth = (unit - margin);

  // position
  let x = 0;
  let y = 0;
  let z = depth / 2.0 + 0.05 // fudge it so we don't flicker

  /**
   *         topWidth
   *         _____
   *        |      \
   * height |       \
   *   (0,0)|________\  <-- degrees
   *          width
   */
  function getProfile(height: number, width: number, degrees:number) {
    // special thanks to Haley for the maths
    let topWidth = width * (1 - (1 / tan(degrees)));
    // describe profile of the keycap
    let shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, height);
    shape.lineTo(topWidth, height);
    shape.lineTo(width, 0);
    shape.lineTo(0, 0);

    return shape;
  }

  function make3d(profile: Shape, depth) {
    // make 3D
    const extrudeSettings = {
      steps: 2,
      depth: depth,
      bevelEnabled: false,
    };
    return new ExtrudeGeometry(profile, extrudeSettings);
  }

  $: profile = getProfile(height, width, degrees);
  $: geometry = make3d(profile, depth);
  let material = new MeshStandardMaterial();

  // load font
  const loader = new FontLoader();
  let text;
  const fontSize = 4;
  onMount(async () => {
    loader.load( 'fonts/Roboto_Regular.json', (loadedFont) => {
      text = new TextGeometry('', {
        font: loadedFont,
        size: 4,
        height: 0.1,
      });
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
    pos={[x - fontSize / 2, y - fontSize / 2, depth]}
    scale={[1, 1, 1]}
  />
{/if}