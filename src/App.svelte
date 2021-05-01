<script>
  import {
    Canvas,
    Scene,
    PerspectiveCamera,
    DirectionalLight,
    AmbientLight,
    WebGLRenderer,
    OrbitControls
  } from "svelthree";
  import Keycap from "./Keycap.svelte";
  import Floor from "./Floor.svelte";
  // assumes threejs dimensions are in millimeters
  let cameraWidth = 0;
  let cameraHeight = -20;
  let cameraDepth = 100;

</script>

<Canvas let:sti w={500} h={500}>
  <Scene {sti} let:scene id="scene1" props={{ background: 0xedf2f7 }}>
    <PerspectiveCamera {scene} id="cam1" pos={[cameraWidth, cameraHeight, cameraDepth]} lookAt={[0, 0, 0]} />
    <AmbientLight {scene} intensity={1.25} />
    <DirectionalLight {scene} pos={[60, 60, 60]} />
    <OrbitControls {scene} autoRotate enableDamping />
    <Keycap scene={scene} />
    <Floor scene={scene} />
  </Scene>

  <WebGLRenderer
    {sti}
    sceneId="scene1"
    camId="cam1"
    config={{ antialias: true, alpha: true }} />
</Canvas>
