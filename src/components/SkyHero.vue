<template>
  <div class="hero" ref="container">
    <canvas ref="canvas"></canvas>
    <div class="hero-content">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        AWS Certification · Cloud Infrastructure · AI Readiness
      </div>
      <h1 class="hero-title">
        <span class="title-line">Clear skies for your</span>
        <span class="title-highlight">{{ currentWord }}</span>
      </h1>
      <p class="hero-desc">
        WeatherLight Advisors trains your team for AWS certifications, designs the cloud infrastructure
        that gets you there, and prepares you to ship with modern AI tooling on AWS.
      </p>
      <div class="hero-cta">
        <button class="btn-primary" @click="$emit('contact')">
          Get Started
          <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        <button class="btn-ghost" @click="scrollTo('services')">
          Explore Services
        </button>
      </div>
    </div>
    <div class="scroll-indicator" @click="scrollTo('services')">
      <span>Scroll</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'SkyHero',
  emits: ['contact'],
  data() {
    return {
      currentWord: 'AWS Certifications',
      words: [
        'AWS Certifications',
        'Cloud Migration',
        'AI Tooling',
        'Production Workloads',
        'Solutions Architects',
      ],
      wordIndex: 0,
    };
  },
  mounted() {
    this.initThree();
    this.cycleWords();
    window.addEventListener('resize', this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.renderer) this.renderer.dispose();
    if (this.wordInterval) clearInterval(this.wordInterval);
  },
  methods: {
    initThree() {
      const canvas = this.$refs.canvas;
      const container = this.$refs.container;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      this.camera.position.z = 50;

      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      this.createCloudMesh();
      this.createDriftingParticles();

      this.mouse = new THREE.Vector2();
      this.targetMouse = new THREE.Vector2();
      window.addEventListener('mousemove', this.onMouseMove);

      this.animate();
    },

    createCloudMesh() {
      const geometry = new THREE.IcosahedronGeometry(22, 5);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color(0x5b9bd5) },
          uColor2: { value: new THREE.Color(0x9ec8ed) },
          uColor3: { value: new THREE.Color(0x1a3a6e) },
        },
        vertexShader: `
          varying vec3 vPosition;
          uniform float uTime;

          void main() {
            vPosition = position;

            vec3 pos = position;
            float n = sin(pos.x * 0.4 + uTime * 0.7) * cos(pos.y * 0.4 + uTime * 0.5) * 1.6;
            n += sin(pos.z * 0.3 + uTime * 0.4) * 1.0;
            pos += normal * n;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          uniform float uTime;
          varying vec3 vPosition;

          void main() {
            float t = sin(vPosition.x * 0.08 + uTime * 0.4) * 0.5 + 0.5;
            float t2 = cos(vPosition.y * 0.08 + uTime * 0.3) * 0.5 + 0.5;

            vec3 color = mix(uColor2, uColor1, t);
            color = mix(color, uColor3, t2 * 0.35);

            gl_FragColor = vec4(color, 0.18);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      });

      this.cloudMesh = new THREE.Mesh(geometry, material);
      this.cloudMesh.position.set(28, 8, -12);
      this.scene.add(this.cloudMesh);
    },

    createDriftingParticles() {
      const count = 220;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 110;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 65;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        sizes[i] = Math.random() * 2.4 + 0.6;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(0x5b9bd5) },
        },
        vertexShader: `
          attribute float size;
          uniform float uTime;
          varying float vAlpha;

          void main() {
            vec3 pos = position;
            pos.y += sin(uTime * 0.6 + position.x * 0.1) * 1.6;
            pos.x += cos(uTime * 0.4 + position.y * 0.1) * 1.2;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (320.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;

            vAlpha = 0.35 + sin(uTime * 0.8 + position.x) * 0.25;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vAlpha;

          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
      });

      this.particles = new THREE.Points(geometry, material);
      this.scene.add(this.particles);
    },

    onMouseMove(event) {
      this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },

    onResize() {
      const container = this.$refs.container;
      if (!container) return;
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    },

    animate() {
      this.animationId = requestAnimationFrame(this.animate);
      const time = Date.now() * 0.001;

      this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.02;
      this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.02;

      if (this.cloudMesh) {
        this.cloudMesh.material.uniforms.uTime.value = time;
        this.cloudMesh.rotation.y = time * 0.08 + this.mouse.x * 0.25;
        this.cloudMesh.rotation.x = this.mouse.y * 0.18;
      }

      if (this.particles) {
        this.particles.material.uniforms.uTime.value = time;
        this.particles.rotation.y = time * 0.015;
      }

      this.renderer.render(this.scene, this.camera);
    },

    cycleWords() {
      this.wordInterval = setInterval(() => {
        this.wordIndex = (this.wordIndex + 1) % this.words.length;
        this.currentWord = this.words[this.wordIndex];
      }, 3000);
    },

    scrollTo(id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 720px;
  background:
    radial-gradient(ellipse at 25% 15%, rgba(91, 155, 213, 0.18) 0%, transparent 55%),
    radial-gradient(ellipse at 75% 85%, rgba(26, 58, 110, 0.10) 0%, transparent 55%),
    linear-gradient(180deg, #f7fbff 0%, #e6f0fa 100%);
  overflow: hidden;
}

canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 2rem;
  padding-left: 5%;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 1.1rem;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(26, 58, 110, 0.18);
  border-radius: 100px;
  color: #1a3a6e;
  font-size: 0.85rem;
  font-weight: 500;
  width: fit-content;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(26, 58, 110, 0.08);
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #5b9bd5;
  box-shadow: 0 0 0 4px rgba(91, 155, 213, 0.25);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 4px rgba(91, 155, 213, 0.25); }
  50% { box-shadow: 0 0 0 8px rgba(91, 155, 213, 0.10); }
}

.hero-title {
  font-size: clamp(2.75rem, 6.5vw, 4.75rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.title-line {
  display: block;
  color: #1a3a6e;
}

.title-highlight {
  display: block;
  background: linear-gradient(135deg, #1a3a6e 0%, #5b9bd5 60%, #9ec8ed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 1.2rem;
  line-height: 1.7;
  color: #4a5e7e;
  max-width: 580px;
  margin-bottom: 2.5rem;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.85rem;
  background: linear-gradient(135deg, #1a3a6e 0%, #2c5aa0 100%);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(26, 58, 110, 0.25);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(26, 58, 110, 0.35);
}

.btn-arrow { width: 18px; height: 18px; transition: transform 0.2s; }
.btn-primary:hover .btn-arrow { transform: translateX(4px); }

.btn-ghost {
  padding: 1rem 1.85rem;
  background: transparent;
  color: #1a3a6e;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid rgba(26, 58, 110, 0.25);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  border-color: #5b9bd5;
  background: rgba(91, 155, 213, 0.08);
  color: #1a3a6e;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #6b7c93;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: color 0.2s;
}

.scroll-indicator:hover { color: #1a3a6e; }

.scroll-indicator svg {
  width: 20px;
  height: 20px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

@media (max-width: 768px) {
  .hero-content { padding: 1.5rem; text-align: center; align-items: center; }
  .hero-desc { text-align: center; }
  .hero-cta { justify-content: center; }
}
</style>
