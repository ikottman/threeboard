<script>
  import {
    BoxBufferGeometry,
    Mesh,
    MeshStandardMaterial,
    TextGeometry,
    FontLoader,
  } from "svelthree";
  import { onMount } from 'svelte';

  export let scene;
  // assumes threejs dimensions are in millimeters
  let unit = 19.05; // keycap base unit. A letter keycap is 1u
  let ratio = 1; // different unit ratios, such as a tab key being 1.25u
  let margin = 0.525;
  let width = unit - margin;
  let height = width;
  let depth = 5; // arbitrary for now
  let x = 0;
  let y = 0;
  let z = depth / 2.0 + 0.05 // fudge it so we don't flicker

  let cubeGeometry = new BoxBufferGeometry(width, height, depth);
  let cubeMaterial = new MeshStandardMaterial();

  // load font
  const loader = new FontLoader();
  let text;
  const fontSize = 4;
  onMount(async () => {
    loader.load( 'fonts/Roboto_Regular.json', (loadedFont) => {
      text = new TextGeometry('A', {
        font: loadedFont,
        size: 4,
        height: 0.1,
      });
    });
  });
</script>

<Mesh
  {scene}
  geometry={cubeGeometry}
  material={cubeMaterial}
  mat={{ roughness: 0.5, metalness: 0.5, color: 0xff3e00 }}
  pos={[x, y, z]}
  scale={[ratio, 1, 1]}
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