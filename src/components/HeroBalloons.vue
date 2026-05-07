<template>
  <div class="hero-canvas-wrap" ref="wrap">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';

const PALETTES = [
  ['#1a3a6e', '#ffffff', '#5b9bd5', '#ffffff'],
  ['#5b9bd5', '#ffffff', '#1a3a6e', '#ffffff'],
  ['#ff9f6a', '#ffffff', '#1a3a6e', '#ffffff'],
  ['#9ec8ed', '#ffffff', '#5b9bd5', '#ffffff'],
];

function makeStripeTexture(stripes) {
  const cv = document.createElement('canvas');
  cv.width = 256; cv.height = 64;
  const ctx = cv.getContext('2d');
  const w = cv.width / stripes.length;
  stripes.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(i * w, 0, w, cv.height); });
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

function makeToonGradient() {
  const cv = document.createElement('canvas');
  cv.width = 4; cv.height = 1;
  const ctx = cv.getContext('2d');
  ['#7a8aa0', '#b5c7df', '#e2ecf6', '#ffffff'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(i, 0, 1, 1); });
  const tex = new THREE.CanvasTexture(cv);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  return tex;
}

function makeBalloon(palette, gradientMap) {
  const group = new THREE.Group();

  const stripeTex = makeStripeTexture(palette);
  const envelopeMat = new THREE.MeshToonMaterial({ map: stripeTex, gradientMap });
  const envelopeGeo = new THREE.SphereGeometry(1, 48, 48);
  const envelope = new THREE.Mesh(envelopeGeo, envelopeMat);
  envelope.scale.set(1, 1.22, 1);
  group.add(envelope);

  // Cartoon outline: inverted backface, slightly larger
  const outlineMat = new THREE.MeshBasicMaterial({ color: 0x1a3a6e, side: THREE.BackSide });
  const outline = new THREE.Mesh(envelopeGeo, outlineMat);
  outline.scale.set(1.04, 1.27, 1.04);
  group.add(outline);

  // Skirt at bottom of envelope
  const skirtGeo = new THREE.CylinderGeometry(0.55, 0.4, 0.18, 24, 1, true);
  const skirtMat = new THREE.MeshToonMaterial({ color: 0x1a3a6e, gradientMap });
  const skirt = new THREE.Mesh(skirtGeo, skirtMat);
  skirt.position.y = -1.32;
  group.add(skirt);

  // Basket
  const basketMat = new THREE.MeshToonMaterial({ color: 0x9c6b3f, gradientMap });
  const basket = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.34, 0.5), basketMat);
  basket.position.y = -1.95;
  group.add(basket);

  // Basket outline
  const basketOutline = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.34, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x4a3520, side: THREE.BackSide })
  );
  basketOutline.scale.set(1.06, 1.08, 1.06);
  basketOutline.position.copy(basket.position);
  group.add(basketOutline);

  // Ropes
  const ropeMat = new THREE.LineBasicMaterial({ color: 0x4a5e7e, linewidth: 2 });
  const corners = [[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]];
  corners.forEach(([x, z]) => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x * 1.6, -1.42, z * 1.6),
      new THREE.Vector3(x, -1.78, z),
    ]);
    group.add(new THREE.Line(geo, ropeMat));
  });

  return group;
}

export default {
  name: 'HeroBalloons',
  mounted() {
    this.init();
    window.addEventListener('resize', this.onResize);
    document.addEventListener('mousemove', this.onMouse);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('mousemove', this.onMouse);
    if (this.frameId) cancelAnimationFrame(this.frameId);
    if (this.renderer) this.renderer.dispose();
  },
  methods: {
    init() {
      const wrap = this.$refs.wrap;
      const canvas = this.$refs.canvas;
      const w = wrap.clientWidth, h = wrap.clientHeight;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      this.camera.position.set(0, 0, 12);

      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;

      // Lighting — soft sky-tinted ambient + warm sun
      this.scene.add(new THREE.AmbientLight(0xdbe9f7, 0.95));
      const sun = new THREE.DirectionalLight(0xfff4d6, 1.4);
      sun.position.set(5, 6, 4);
      this.scene.add(sun);
      const fill = new THREE.DirectionalLight(0x9ec8ed, 0.5);
      fill.position.set(-4, 2, 2);
      this.scene.add(fill);

      const gradient = makeToonGradient();

      this.balloons = [];
      // Three balloons at different depths and offsets
      const placements = [
        { x: -5.0, y:  0.5, z:  0.5, scale: 1.4, palette: 0, speed: 0.35 },
        { x:  5.5, y: -1.2, z: -2.0, scale: 1.0, palette: 1, speed: 0.45 },
        { x: -3.5, y: -2.8, z: -1.5, scale: 0.85, palette: 3, speed: 0.55 },
      ];
      placements.forEach((p, i) => {
        const b = makeBalloon(PALETTES[p.palette], gradient);
        b.position.set(p.x, p.y, p.z);
        b.scale.setScalar(p.scale);
        b.userData = { ...p, baseY: p.y, baseX: p.x, phase: i * 1.7 };
        this.scene.add(b);
        this.balloons.push(b);
      });

      this.mouse = new THREE.Vector2();
      this.targetMouse = new THREE.Vector2();
      this.start = performance.now();
      this.animate();
    },

    onMouse(e) {
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },

    onResize() {
      const wrap = this.$refs.wrap;
      if (!wrap) return;
      const w = wrap.clientWidth, h = wrap.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    },

    animate() {
      this.frameId = requestAnimationFrame(this.animate);
      const t = (performance.now() - this.start) / 1000;

      this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.04;
      this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.04;

      this.balloons.forEach((b) => {
        const u = b.userData;
        b.position.y = u.baseY + Math.sin(t * u.speed + u.phase) * 0.35;
        b.position.x = u.baseX + Math.cos(t * u.speed * 0.6 + u.phase) * 0.25;
        b.rotation.z = Math.sin(t * u.speed + u.phase) * 0.08;
        b.rotation.y = t * 0.05 + u.phase;
      });

      this.camera.position.x = this.mouse.x * 0.6;
      this.camera.position.y = this.mouse.y * 0.4;
      this.camera.lookAt(0, 0, 0);

      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped>
.hero-canvas-wrap {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
canvas { display: block; width: 100%; height: 100%; }
</style>
