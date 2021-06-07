<script>
  import {
    Canvas,
    Scene,
    PerspectiveCamera,
    DirectionalLight,
    AmbientLight,
    WebGLRenderer,
    OrbitControls,
    AxesHelper,
    GridHelper
  } from "svelthree";
  import Keycap from "./Keycap.svelte";
  // assumes threejs dimensions are in millimeters
  let cameraWidth = 0;
  let cameraHeight = -20;
  let cameraDepth = 100;
  let autoRotate = false;

  // in millimeters
  let unit = 19.05;
  let margin = 0; // standard is 0.525
  let degrees = 80;

  const debug = true;
</script>

<input type=number bind:value={unit} min=5 max=30>
<!-- <input type=number bind:value={margin} min=0 max=1 step=0.005> -->
<input type=number bind:value={degrees} min=45 max=90>
<br/>
<Canvas let:sti w={500} h={500}>
  <Scene {sti} let:scene id="scene1" props={{ background: 0xedf2f7 }}>
    {#if debug}
      <!--  X red. Y green. Z blue.  -->
      {scene.add(new AxesHelper(100))}
      {scene.add(new GridHelper(100, 100))}
    {/if}
    <PerspectiveCamera {scene} id="cam1" pos={[cameraWidth, cameraHeight, cameraDepth]} lookAt={[0, 0, 0]} />
    <AmbientLight {scene} intensity={1.25} />
    <DirectionalLight {scene} pos={[60, 60, 60]} />
    <OrbitControls {scene} {autoRotate} enableDamping />
    <Keycap {scene} {unit} {margin} {degrees} x={0} y={0} z={0} legend={'ESC'} />
  </Scene>

  <WebGLRenderer
    {sti}
    sceneId="scene1"
    camId="cam1"
    config={{ antialias: true, alpha: true }} />
</Canvas>