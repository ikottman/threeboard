<script lang="ts">
  import { CSG } from 'three-csg-ts';
  import * as THREE from 'three';
  import {
    ExtrudeGeometry,
    Shape,
    MeshStandardMaterial,
  } from "svelthree";
  import Legend from './Legend.svelte';
  import { toRadians } from './utils';

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

  export let scene;
  // dimensions
  export let unit; // keycap base unit in mm.
  export let ratio = 1; // ratio compared to the unit. a letter is 1u
  export let margin;
  export let legend; // text to render on top
  export let id = 'DEFAULT_ID';
  export let x;
  export let y;
  export let z;

  $: dim = {
    width: unit * ratio - margin,
    height: unit * ratio - margin,
    depth: unit * ratio - margin
  };

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
    let shape = new THREE.Shape();
    shape.moveTo(x, y);
    shape.lineTo(x2, t);
    shape.lineTo(x3, s);
    shape.lineTo(x4, y);
    shape.lineTo(x, y);
    return shape;
  }

  function getBase(profile, depth): THREE.Mesh {
    getProfile()
    const extrudeSettings = {
      steps: 2,
      depth: depth,
      bevelEnabled: false,
    };
    const geometry = new THREE.ExtrudeGeometry(profile, extrudeSettings);
    return new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
  }

  function getKeycap(base: THREE.Mesh, cutout: THREE.Mesh): THREE.Mesh {
    const result = CSG.subtract(base, cutout);
    result.name = id; // so we can find this in the scene when rerendering
    return result;
  }

  function getCutout(dim: Dimensions): THREE.Mesh {
    // equal to the full depth of the base with a tiny offset to account for the sides
    const radius = dim.depth / 2 + 0.001;
    const length = dim.width;
    const geometry = new THREE.CylinderGeometry( radius, radius, length, 32 );
    geometry.rotateZ(toRadians(-90));
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial( { color: 0xfffff }));
    // center it in the base, but only go in a little bit from the top
    mesh.position.set(dim.width/2, dim.height * 4/5, dim.depth/2);
    mesh.updateMatrix();
    return mesh;
  }

  // TODO: create method for generating the base
  $: profile = getProfile(x, y, dim.width, 11, 10, 8, 7);
  $: base = getBase(profile, dim.depth);
  $: cutout = getCutout(dim);
  $: keycap = getKeycap(base, cutout);
  // rerender
  $: scene.remove(scene.getObjectByName(keycap.name));
  $: scene.add(keycap);

</script>

<!--
<Mesh
  {scene}
  geometry={geometry}
  material={material}
  mat={{ roughness: 0.5, metalness: 0.5, color: 0xff3e00 }}
  pos={[x, y, z]}
  scale={[1, 1, 1]}
  castShadow
/>

<Legend legend={legend} x={x} y={y} z={z} width={width} height={height} depth={depth} scene={scene} /> -->