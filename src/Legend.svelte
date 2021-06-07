<script lang="ts">
  import {
    Mesh,
    MeshStandardMaterial,
    TextGeometry,
    FontLoader,
  } from "svelthree";
  import { toRadians } from './utils';
  import { onMount } from 'svelte';

  export let scene;
  export let legend; // text to render on top
  // position
  export let x;
  export let y;
  export let z;
  // keycap dimensions
  export let width;
  export let height;
  export let depth;
  const fontSize = 2.5;

  // load font
  const loader = new FontLoader();
  let text;
  onMount(async () => {
    loader.load( 'fonts/Roboto_Regular.json', (loadedFont) => {
      text = new TextGeometry(legend, {
        font: loadedFont,
        size: fontSize,
        height: 0.1,
      });
      text.rotateX(toRadians(-90));
      // text.rotateY(toRadians(90));
    });
  });
</script>

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