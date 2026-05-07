<template>
  <div class="page-root">
    <header class="nav-header" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <a href="#top" class="nav-logo">
          <img :src="logoUrl" alt="WeatherLight Advisors" class="logo-img" />
          <span class="logo-text">
            <span class="logo-weather">Weather</span><span class="logo-light">Light</span>
            <span class="logo-sub">ADVISORS</span>
          </span>
        </a>
        <nav class="nav-links">
          <a href="#services" class="nav-link">Services</a>
          <a href="#certs" class="nav-link">Certifications</a>
          <a href="#about" class="nav-link">About</a>
          <a @click="dialog = true" class="nav-link">Contact</a>
          <span class="nav-divider"></span>
          <template v-if="!currentUser">
            <a @click="onLogin" class="nav-link nav-link-strong">Login</a>
            <a @click="onSignup" class="nav-cta">Sign Up</a>
          </template>
          <template v-else>
            <div class="user-pill" @click.stop="userMenuOpen = !userMenuOpen">
              <span class="user-avatar">{{ (currentUser.handle || currentUser.email || '?').charAt(0).toUpperCase() }}</span>
              <span class="user-handle">{{ currentUser.handle || currentUser.email }}</span>
              <div v-if="userMenuOpen" class="user-menu">
                <div class="user-menu-email">{{ currentUser.email }}</div>
                <button @click="onLogout">Sign out</button>
              </div>
            </div>
          </template>
        </nav>
      </div>
    </header>

    <section id="top" class="hero">
      <HeroBalloons class="hero-balloons" />

      <svg class="cloud cloud-1" viewBox="0 0 200 80" aria-hidden="true">
        <path d="M40 60 Q15 60 15 45 Q15 28 38 28 Q44 12 64 12 Q86 12 90 30 Q112 26 116 46 Q120 60 100 60 Z"/>
      </svg>
      <svg class="cloud cloud-2" viewBox="0 0 200 80" aria-hidden="true">
        <path d="M40 60 Q15 60 15 45 Q15 28 38 28 Q44 12 64 12 Q86 12 90 30 Q112 26 116 46 Q120 60 100 60 Z"/>
      </svg>
      <svg class="cloud cloud-3" viewBox="0 0 200 80" aria-hidden="true">
        <path d="M40 60 Q15 60 15 45 Q15 28 38 28 Q44 12 64 12 Q86 12 90 30 Q112 26 116 46 Q120 60 100 60 Z"/>
      </svg>

      <div class="hero-inner">
        <WeatherLogo with-text class="hero-logo-svg" />
        <h1 class="hero-title">AWS, done right.</h1>
        <p class="hero-sub">
          Certification training, cloud infrastructure setup, and AI-tooling readiness — for engineers
          and teams who want to ship on AWS with confidence.
        </p>
        <div class="hero-cta">
          <button class="btn-primary" @click="onSignup">Sign Up</button>
          <button class="btn-secondary" @click="dialog = true">Talk to us</button>
        </div>
      </div>

      <svg class="hero-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,120 360,40 720,60 C1080,80 1200,120 1440,80 L1440,120 L0,120 Z" fill="#ffffff"/>
      </svg>
    </section>

    <section id="services" class="content-section">
      <div class="container">
        <div class="eyebrow">Services</div>
        <h2 class="section-title">What we help with</h2>
        <div class="service-grid">
          <div class="service-card">
            <h3>Certification Training</h3>
            <p>Structured study plans and exam coaching for every AWS track — from Cloud Practitioner to Solutions Architect Professional and Specialty exams.</p>
          </div>
          <div class="service-card">
            <h3>Cloud Infrastructure</h3>
            <p>Production-ready AWS landing zones: VPCs, IAM, multi-account organizations, CI/CD, observability, and cost guardrails designed for how your team ships.</p>
          </div>
          <div class="service-card">
            <h3>AI Tooling Readiness</h3>
            <p>Bedrock, SageMaker, Q Developer, Strands Agents — we get your team building with the AWS-native AI stack and your data ready for what runs on it.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="certs" class="content-section content-section-tint">
      <div class="container">
        <div class="eyebrow">Certifications</div>
        <h2 class="section-title">Every AWS exam, covered</h2>
        <p class="section-lede">
          We help your team pick the right certification path, prepare with focus, and walk into the exam confident.
        </p>
        <div class="cert-grid">
          <div class="cert-tier">
            <div class="cert-tier-name">Foundational</div>
            <ul>
              <li>Cloud Practitioner</li>
              <li>AI Practitioner</li>
            </ul>
          </div>
          <div class="cert-tier">
            <div class="cert-tier-name">Associate</div>
            <ul>
              <li>Solutions Architect</li>
              <li>Developer</li>
              <li>SysOps Administrator</li>
              <li>Data Engineer</li>
              <li>ML Engineer</li>
            </ul>
          </div>
          <div class="cert-tier">
            <div class="cert-tier-name">Professional</div>
            <ul>
              <li>Solutions Architect Pro</li>
              <li>DevOps Engineer Pro</li>
            </ul>
          </div>
          <div class="cert-tier">
            <div class="cert-tier-name">Specialty</div>
            <ul>
              <li>Advanced Networking</li>
              <li>Security</li>
              <li>Machine Learning</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="content-section">
      <div class="container container-narrow">
        <div class="eyebrow">About</div>
        <h2 class="section-title">AWS, and only AWS.</h2>
        <p class="about-p">
          WeatherLight Advisors is a focused AWS consultancy. We don't dabble across clouds and we don't
          sell tools you don't need. We help engineers and teams get certified, build real production
          infrastructure on AWS, and adopt the AI tooling AWS is shipping today.
        </p>
        <p class="about-p">
          Whether you're a solo engineer going for your first SAA, a startup standing up your first
          landing zone, or an enterprise modernizing for AI workloads — we've been there, and we'll get
          you there too.
        </p>
        <button class="btn-primary" @click="dialog = true">Start a conversation</button>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer-row">
        <div class="footer-brand">
          <img :src="logoUrl" alt="" class="logo-img" />
          <span><span class="logo-weather">Weather</span><span class="logo-light">Light</span> Advisors</span>
        </div>
        <div class="footer-links">
          <a href="#services">Services</a>
          <a href="#certs">Certifications</a>
          <a href="#about">About</a>
          <a @click="dialog = true">Contact</a>
        </div>
        <p class="footer-copy">&copy; {{ new Date().getFullYear() }} WeatherLight Advisors</p>
      </div>
    </footer>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="modal-card">
        <v-card-title class="modal-title">Get in touch</v-card-title>
        <v-card-text class="modal-body">
          <p class="modal-intro">Tell us where you are and where you want to go. We'll get back to you within one business day.</p>
          <v-text-field
            label="Email"
            v-model="email"
            variant="outlined"
            density="comfortable"
            :error-messages="emailErrors"
            class="mb-3"
          ></v-text-field>
          <v-textarea
            label="How can we help?"
            v-model="message"
            variant="outlined"
            rows="4"
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="modal-actions">
          <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn class="btn-send" variant="flat" :loading="sending" @click="sendContact">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="successDialog" max-width="400px">
      <v-card class="modal-card">
        <v-card-title class="modal-title">Message sent</v-card-title>
        <v-card-text>Thanks for reaching out — we'll follow up within one business day.</v-card-text>
        <v-card-actions class="modal-actions">
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="successDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import logo from "@/assets/logo.jpg";
import HeroBalloons from "./HeroBalloons.vue";
import WeatherLogo from "./WeatherLogo.vue";
import { config } from "@/config";
import { startLogin, startSignup, logout, getTokens, decodeIdToken, fetchMe } from "@/auth";

export default {
  components: { HeroBalloons, WeatherLogo },
  data() {
    return {
      logoUrl: logo,
      dialog: false,
      successDialog: false,
      isScrolled: false,
      email: "",
      message: "",
      emailErrors: [],
      sending: false,
      currentUser: null,
      userMenuOpen: false,
    };
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScroll);
    document.addEventListener('click', this.handleOutsideClick);
    await this.loadCurrentUser();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    handleScroll() { this.isScrolled = window.scrollY > 8; },
    handleOutsideClick(e) { if (!e.target.closest('.user-pill')) this.userMenuOpen = false; },
    async loadCurrentUser() {
      const tokens = getTokens();
      if (!tokens) return;
      const claims = decodeIdToken(tokens.id_token);
      this.currentUser = { handle: claims?.name || claims?.email || "user", email: claims?.email };
      try {
        const me = await fetchMe();
        if (me?.user) this.currentUser = me.user;
      } catch (err) { console.warn("fetchMe failed", err); }
    },
    onLogin() { startLogin(); },
    onSignup() { startSignup(); },
    onLogout() { logout(); },
    validateEmail() {
      this.emailErrors = [];
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) this.emailErrors.push("Email is required.");
      else if (!re.test(this.email)) this.emailErrors.push("Please enter a valid email.");
    },
    async sendContact() {
      this.validateEmail();
      if (this.emailErrors.length > 0 || !this.message) return;
      this.sending = true;
      try {
        await axios.post(`${config.apiBase}/contact`,
          { email: this.email, message: this.message },
          { headers: { "Content-Type": "application/json" } });
        this.dialog = false;
        this.successDialog = true;
        this.email = "";
        this.message = "";
      } catch (err) {
        console.error(err);
        this.emailErrors.push("Could not send right now. Please try again.");
      } finally { this.sending = false; }
    },
  },
};
</script>

<style>
.page-root { background: #ffffff; min-height: 100vh; color: #1a3a6e; }
</style>

<style scoped>
.nav-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  transition: border-color 0.2s, box-shadow 0.2s;
  border-bottom: 1px solid transparent;
}

.nav-header.scrolled {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid #e5edf5;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  color: #1a3a6e;
}

.logo-img {
  width: 38px;
  height: 38px;
  object-fit: contain;
  background: transparent;
}

.logo-text { display: flex; flex-direction: column; line-height: 1; }
.logo-weather { color: #1a3a6e; font-weight: 700; font-size: 1rem; letter-spacing: -0.01em; }
.logo-light { color: #5b9bd5; font-weight: 700; font-size: 1rem; letter-spacing: -0.01em; }
.logo-sub { color: #6b7c93; font-size: 0.6rem; letter-spacing: 0.22em; margin-top: 2px; }

.nav-links { display: flex; gap: 1.5rem; align-items: center; }

.nav-link {
  color: #4a5e7e;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.15s;
}
.nav-link:hover { color: #1a3a6e; }
.nav-link-strong { color: #1a3a6e; font-weight: 600; }

.nav-divider {
  width: 1px;
  height: 22px;
  background: #e5edf5;
}

.nav-cta {
  padding: 0.55rem 1.15rem;
  background: #1a3a6e;
  border-radius: 6px;
  color: #ffffff !important;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;
}
.nav-cta:hover { background: #2c5aa0; color: #ffffff !important; }

.user-pill {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem 0.35rem 0.4rem;
  border: 1px solid #e5edf5;
  border-radius: 100px;
  cursor: pointer;
}
.user-pill:hover { border-color: #cfdcec; }
.user-avatar {
  width: 26px; height: 26px;
  border-radius: 50%;
  background: #1a3a6e;
  color: #fff;
  font-weight: 600;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-handle {
  color: #1a3a6e;
  font-size: 0.85rem;
  font-weight: 500;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 220px;
  background: #ffffff;
  border: 1px solid #e5edf5;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(26, 58, 110, 0.08);
  padding: 0.5rem;
  z-index: 200;
}
.user-menu-email {
  color: #6b7c93;
  font-size: 0.8rem;
  padding: 0.4rem 0.5rem;
  border-bottom: 1px solid #f0f4f9;
  margin-bottom: 0.25rem;
  word-break: break-all;
}
.user-menu button {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  color: #1a3a6e;
  border-radius: 4px;
  cursor: pointer;
}
.user-menu button:hover { background: #f5f8fc; }

.hero {
  position: relative;
  padding: 10rem 2rem 8rem;
  background: linear-gradient(180deg, #f0f7fd 0%, #d9eaf8 50%, #c4dcf0 100%);
  overflow: hidden;
}

.cloud {
  position: absolute;
  fill: #ffffff;
  filter: drop-shadow(0 4px 16px rgba(26, 58, 110, 0.06));
  pointer-events: none;
  animation: drift linear infinite;
}

.cloud-1 { top: 12%;  left: -8%;  width: 220px;  opacity: 0.92; animation-duration: 80s; }
.cloud-2 { top: 7%;   right: -4%; width: 170px;  opacity: 0.88; animation-duration: 95s; animation-direction: reverse; }
.cloud-3 { top: 78%;  left: 4%;   width: 150px;  opacity: 0.85; animation-duration: 110s; }

.hero-balloons {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hero-logo-svg {
  width: 280px;
  max-width: 75%;
  height: auto;
  margin: 0 auto 1.5rem;
  filter: drop-shadow(0 6px 24px rgba(26, 58, 110, 0.12));
}

@keyframes drift {
  from { transform: translateX(0); }
  to   { transform: translateX(40px); }
}

.hero-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 80px;
  display: block;
}

.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}


.hero-title {
  font-size: clamp(2.5rem, 5.5vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #1a3a6e;
  margin-bottom: 1.25rem;
  line-height: 1.05;
}

.hero-sub {
  font-size: 1.2rem;
  line-height: 1.65;
  color: #4a5e7e;
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

.hero-cta {
  display: flex;
  gap: 0.85rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 0.85rem 1.8rem;
  background: #1a3a6e;
  color: #ffffff;
  font-size: 0.98rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-primary:hover { background: #2c5aa0; }

.btn-secondary {
  padding: 0.85rem 1.8rem;
  background: #ffffff;
  color: #1a3a6e;
  font-size: 0.98rem;
  font-weight: 600;
  border: 1px solid #cfdcec;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.btn-secondary:hover {
  border-color: #5b9bd5;
  background: #f7fbff;
}

.content-section {
  padding: 6rem 2rem;
  background: #ffffff;
}

.content-section-tint {
  background: #f7fbff;
  border-top: 1px solid #eef3f9;
  border-bottom: 1px solid #eef3f9;
}

.container { max-width: 1100px; margin: 0 auto; }
.container-narrow { max-width: 720px; }

.eyebrow {
  color: #5b9bd5;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.75rem;
}

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.4rem);
  font-weight: 700;
  color: #1a3a6e;
  margin-bottom: 1rem;
  letter-spacing: -0.015em;
}

.section-lede {
  font-size: 1.05rem;
  color: #4a5e7e;
  line-height: 1.65;
  max-width: 640px;
  margin-bottom: 3rem;
}

.service-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.service-card {
  padding: 1.75rem;
  background: #ffffff;
  border: 1px solid #e5edf5;
  border-radius: 8px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.service-card:hover {
  border-color: #5b9bd5;
  box-shadow: 0 4px 16px rgba(26, 58, 110, 0.06);
}
.service-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a3a6e;
  margin-bottom: 0.6rem;
}
.service-card p {
  font-size: 0.95rem;
  color: #4a5e7e;
  line-height: 1.6;
}

.cert-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.cert-tier {
  background: #ffffff;
  border: 1px solid #e5edf5;
  border-radius: 8px;
  padding: 1.5rem;
}

.cert-tier-name {
  color: #5b9bd5;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.85rem;
}

.cert-tier ul {
  list-style: none;
  padding: 0;
}

.cert-tier li {
  font-size: 0.92rem;
  color: #1a3a6e;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f5f8fc;
}
.cert-tier li:last-child { border-bottom: none; }

.about-p {
  font-size: 1.05rem;
  color: #4a5e7e;
  line-height: 1.75;
  margin-bottom: 1.25rem;
}

.about-p + .about-p { margin-bottom: 2rem; }

.site-footer {
  padding: 2.5rem 2rem;
  border-top: 1px solid #eef3f9;
  background: #ffffff;
}

.footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: #1a3a6e;
  font-weight: 600;
}
.footer-brand .logo-img { width: 32px; height: 32px; }

.footer-links { display: flex; gap: 1.5rem; }
.footer-links a {
  color: #4a5e7e;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
}
.footer-links a:hover { color: #1a3a6e; }

.footer-copy { color: #6b7c93; font-size: 0.85rem; margin: 0; }

.modal-card {
  background: #ffffff !important;
  border-radius: 10px !important;
  border: 1px solid #e5edf5;
}
.modal-title {
  color: #1a3a6e !important;
  font-weight: 700;
  padding: 1.5rem !important;
  border-bottom: 1px solid #f0f4f9;
}
.modal-body { padding: 1.5rem !important; }
.modal-intro { color: #4a5e7e; margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.6; }
.modal-actions { padding: 1rem 1.5rem !important; border-top: 1px solid #f0f4f9; }
.btn-send { background: #1a3a6e !important; color: #fff !important; }

@media (max-width: 900px) {
  .service-grid { grid-template-columns: 1fr; }
  .cert-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .nav-link, .nav-divider { display: none; }
  .nav-cta, .user-pill { display: flex; }
  .nav-link-strong { display: inline; }
  .hero { padding: 8rem 1.5rem 4rem; }
  .content-section { padding: 4rem 1.5rem; }
  .footer-row { flex-direction: column; text-align: center; }
}
</style>
