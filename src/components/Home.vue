<template>
  <v-app class="app-light">
    <header class="nav-header" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <a href="#" class="nav-logo">
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
          <template v-if="!currentUser">
            <a @click="onLogin" class="nav-link nav-link-strong">Login</a>
            <a @click="onSignup" class="nav-link nav-cta">Sign Up</a>
          </template>
          <template v-else>
            <div class="user-pill" @click.stop="userMenuOpen = !userMenuOpen">
              <span class="user-avatar">{{ (currentUser.handle || currentUser.email || '?').charAt(0).toUpperCase() }}</span>
              <span class="user-handle">{{ currentUser.handle || currentUser.email }}</span>
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              <div v-if="userMenuOpen" class="user-menu">
                <div class="user-menu-email">{{ currentUser.email }}</div>
                <button @click="onLogout">Sign out</button>
              </div>
            </div>
          </template>
        </nav>
        <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <SkyHero @contact="dialog = true" />

    <section id="services" class="section">
      <div class="section-container">
        <div class="section-header">
          <span class="section-tag">What We Do</span>
          <h2 class="section-title">All-in on AWS</h2>
          <p class="section-subtitle">
            We focus on one cloud and we know it cold. Whether you're studying for your first cert or
            architecting your hundredth workload, WeatherLight Advisors is your guide.
          </p>
        </div>

        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
              </svg>
            </div>
            <h3>AWS Certification Training</h3>
            <p>Structured study plans, hands-on labs, and exam-ready coaching for every track — Cloud Practitioner through Solutions Architect Professional, Specialty exams included.</p>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path d="M9 22V12h6v10"/>
              </svg>
            </div>
            <h3>Cloud Infrastructure Setup</h3>
            <p>VPCs, IAM, multi-account organizations, CI/CD, observability, cost guardrails — production-grade AWS landing zones designed for the way your team actually ships.</p>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 008 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H2a2 2 0 110-4h.09A1.65 1.65 0 004.6 8a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V2a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H22a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/>
              </svg>
            </div>
            <h3>AI Tooling Readiness</h3>
            <p>Bedrock, SageMaker, Q Developer, Strands Agents — we get your engineers building with AWS-native AI tools and your data ready for the models you'll run on it.</p>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M22 12A10 10 0 1112 2"/>
                <path d="M22 12L12 12 12 2"/>
              </svg>
            </div>
            <h3>Migration & Architecture Review</h3>
            <p>Lift-and-shift, replatform, or redesign from scratch — we map your workload to the right AWS services, surface the trade-offs, and stay until it's running clean.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="certs" class="section section-cloud">
      <div class="section-container">
        <div class="training-content">
          <div class="training-text">
            <span class="section-tag">Certification Tracks</span>
            <h2 class="section-title">From Foundational to Specialty</h2>
            <p class="training-desc">
              Twelve AWS certifications cover everything from cloud basics to deep specialty work.
              We help your team pick the right path, prepare with focus, and walk in confident.
            </p>
            <ul class="training-features">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
                Cloud Practitioner · AI Practitioner
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
                Associate: SAA · DVA · SOA · Data Engineer · ML Engineer
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
                Professional: Solutions Architect · DevOps Engineer
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
                Specialty: Advanced Networking · Security · Machine Learning
              </li>
            </ul>
            <button class="btn-notify" @click="dialog = true">
              Plan Your Certification Path
            </button>
          </div>
          <div class="training-visual">
            <div class="terminal-window">
              <div class="terminal-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="terminal-title">aws-prep@weatherlight</span>
              </div>
              <div class="terminal-body">
                <p><span class="prompt">$</span> aws ec2 describe-vpcs --query 'Vpcs[].VpcId'</p>
                <p class="output">[</p>
                <p class="output">    "vpc-0a1b2c3d4e5f"</p>
                <p class="output">]</p>
                <p><span class="prompt">$</span> wlight study --exam SAA-C03</p>
                <p class="output">Loading 14-week study plan...</p>
                <p class="output">Module 1/12 · Design Resilient Architectures</p>
                <p class="output">Lab ready: multi-AZ VPC + ALB + RDS</p>
                <p><span class="prompt">$</span> <span class="cursor">_</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="section">
      <div class="section-container">
        <div class="about-content">
          <div class="about-text">
            <span class="section-tag">About Us</span>
            <h2 class="section-title">AWS, and only AWS</h2>
            <p>
              WeatherLight Advisors is a focused AWS consultancy. We don't dabble across clouds and we
              don't sell you tools you don't need — we help engineers and teams get certified, build
              real production infrastructure on AWS, and adopt the AI tooling AWS is shipping today.
            </p>
            <p>
              Whether you're a solo engineer going for your first SAA, a startup standing up your first
              landing zone, or an enterprise modernizing for AI workloads — we've been there and we'll
              get you there too.
            </p>
            <div class="about-cta">
              <button class="btn-primary" @click="dialog = true">
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-brand">
          <img :src="logoUrl" alt="WeatherLight Advisors" class="logo-img" />
          <span><span class="logo-weather">Weather</span><span class="logo-light">Light</span> Advisors</span>
        </div>
        <div class="footer-links">
          <a href="#services">Services</a>
          <a href="#certs">Certifications</a>
          <a href="#about">About</a>
          <a @click="dialog = true">Contact</a>
        </div>
        <p class="footer-copy">&copy; {{ new Date().getFullYear() }} WeatherLight Advisors. All rights reserved.</p>
      </div>
    </footer>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="modal-card">
        <v-card-title class="modal-title">Let's Talk AWS</v-card-title>
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
          <v-btn class="btn-send" variant="flat" :loading="sending" @click="sendContact">Send Message</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="successDialog" max-width="400px">
      <v-card class="modal-card">
        <v-card-title class="modal-title success-title">Message Sent</v-card-title>
        <v-card-text>
          Thanks for reaching out. Someone from WeatherLight Advisors will follow up within one business day.
        </v-card-text>
        <v-card-actions class="modal-actions">
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="successDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from "axios";
import SkyHero from "./SkyHero.vue";
import logo from "@/assets/logo.jpg";
import { config } from "@/config";
import { startLogin, startSignup, logout, getTokens, decodeIdToken, fetchMe } from "@/auth";

export default {
  components: { SkyHero },
  data() {
    return {
      logoUrl: logo,
      dialog: false,
      successDialog: false,
      mobileMenuOpen: false,
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
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    handleOutsideClick(e) {
      if (!e.target.closest('.user-pill')) this.userMenuOpen = false;
    },
    async loadCurrentUser() {
      const tokens = getTokens();
      if (!tokens) return;
      const claims = decodeIdToken(tokens.id_token);
      this.currentUser = { handle: claims?.name || claims?.email || "user", email: claims?.email };
      try {
        const me = await fetchMe();
        if (me?.user) this.currentUser = me.user;
      } catch (err) {
        console.warn("fetchMe failed", err);
      }
    },
    onLoginGoogle() { startLogin({ provider: "Google" }); },
    onLogin() { startLogin(); },
    onSignup() { startSignup(); },
    onLogout() { logout(); },
    validateEmail() {
      this.emailErrors = [];
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailErrors.push("Email is required.");
      } else if (!emailPattern.test(this.email)) {
        this.emailErrors.push("Please enter a valid email.");
      }
    },
    async sendContact() {
      this.validateEmail();
      if (this.emailErrors.length > 0 || !this.message) return;

      this.sending = true;
      try {
        await axios.post(
          `${config.apiBase}/contact`,
          { email: this.email, message: this.message },
          { headers: { "Content-Type": "application/json" } }
        );
        this.dialog = false;
        this.successDialog = true;
        this.email = "";
        this.message = "";
      } catch (error) {
        console.error("Error sending contact:", error);
        this.emailErrors.push("Could not send right now. Please try again or email us directly.");
      } finally {
        this.sending = false;
      }
    },
  },
};
</script>

<style>
.app-light { background: #f7fbff !important; min-height: 100vh; }
</style>

<style scoped>
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
}

.nav-header.scrolled {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(26, 58, 110, 0.08);
  box-shadow: 0 2px 20px rgba(26, 58, 110, 0.05);
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
  width: 44px;
  height: 44px;
  object-fit: contain;
  border-radius: 6px;
  background: #ffffff;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-weather { color: #1a3a6e; font-weight: 700; font-size: 1.05rem; letter-spacing: -0.01em; }
.logo-light { color: #5b9bd5; font-weight: 700; font-size: 1.05rem; letter-spacing: -0.01em; }
.logo-sub {
  color: #6b7c93;
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  margin-top: 2px;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #4a5e7e;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;
}

.nav-link:hover { color: #1a3a6e; }

.nav-link-strong { color: #1a3a6e; font-weight: 600; }
.nav-link-strong:hover { color: #2c5aa0; }

.nav-cta {
  padding: 0.6rem 1.25rem;
  background: linear-gradient(135deg, #1a3a6e 0%, #2c5aa0 100%);
  border-radius: 6px;
  color: #ffffff !important;
  box-shadow: 0 2px 12px rgba(26, 58, 110, 0.2);
}

.nav-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(26, 58, 110, 0.3);
  color: #ffffff !important;
}

.user-pill {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem 0.4rem 0.4rem;
  background: rgba(91, 155, 213, 0.1);
  border: 1px solid rgba(91, 155, 213, 0.3);
  border-radius: 100px;
  cursor: pointer;
  transition: background 0.2s;
}

.user-pill:hover { background: rgba(91, 155, 213, 0.18); }

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a3a6e 0%, #5b9bd5 100%);
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-handle {
  color: #1a3a6e;
  font-size: 0.88rem;
  font-weight: 500;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chev {
  width: 14px;
  height: 14px;
  color: #4a5e7e;
}

.user-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 220px;
  background: #ffffff;
  border: 1px solid rgba(26, 58, 110, 0.1);
  border-radius: 10px;
  box-shadow: 0 12px 32px rgba(26, 58, 110, 0.15);
  padding: 0.75rem;
  z-index: 200;
}

.user-menu-email {
  color: #6b7c93;
  font-size: 0.82rem;
  padding: 0.4rem 0.5rem;
  border-bottom: 1px solid rgba(26, 58, 110, 0.06);
  margin-bottom: 0.4rem;
  word-break: break-all;
}

.user-menu button {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 0.55rem 0.5rem;
  font-size: 0.9rem;
  color: #1a3a6e;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.user-menu button:hover {
  background: rgba(91, 155, 213, 0.1);
}

.mobile-menu-btn { display: none; }

.section {
  padding: 8rem 2rem;
  background: #f7fbff;
}

.section-cloud {
  background:
    radial-gradient(ellipse at 80% 20%, rgba(91, 155, 213, 0.12) 0%, transparent 60%),
    linear-gradient(180deg, #eef5fc 0%, #f7fbff 100%);
}

.section-container {
  max-width: 1100px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-tag {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: rgba(91, 155, 213, 0.12);
  border: 1px solid rgba(91, 155, 213, 0.3);
  border-radius: 100px;
  color: #2c5aa0;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.85rem);
  font-weight: 700;
  color: #1a3a6e;
  margin-bottom: 1rem;
  letter-spacing: -0.015em;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #4a5e7e;
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.7;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.service-card {
  padding: 2rem;
  background: #ffffff;
  border: 1px solid rgba(26, 58, 110, 0.08);
  border-radius: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(26, 58, 110, 0.04);
}

.service-card:hover {
  border-color: rgba(91, 155, 213, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(26, 58, 110, 0.12);
}

.service-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
  color: #5b9bd5;
}

.service-icon svg { width: 100%; height: 100%; }

.service-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a3a6e;
  margin-bottom: 0.75rem;
}

.service-card p {
  font-size: 0.95rem;
  color: #4a5e7e;
  line-height: 1.65;
}

.training-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.training-text { max-width: 480px; }

.training-desc {
  font-size: 1.1rem;
  color: #4a5e7e;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.training-features {
  list-style: none;
  margin-bottom: 2rem;
}

.training-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #1a3a6e;
  font-weight: 500;
  margin-bottom: 0.85rem;
}

.training-features svg {
  width: 18px;
  height: 18px;
  color: #5b9bd5;
  flex-shrink: 0;
}

.btn-notify {
  padding: 0.875rem 1.75rem;
  background: transparent;
  border: 1px solid #5b9bd5;
  color: #1a3a6e;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-notify:hover {
  background: rgba(91, 155, 213, 0.1);
  border-color: #1a3a6e;
}

.terminal-window {
  background: #0e1a2e;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #1a3a6e;
  box-shadow: 0 24px 60px rgba(26, 58, 110, 0.25);
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #122448;
  border-bottom: 1px solid #1a3a6e;
}

.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27ca40; }

.terminal-title {
  margin-left: auto;
  font-size: 0.75rem;
  color: #9ec8ed;
}

.terminal-body {
  padding: 1.5rem;
  font-family: 'SF Mono', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.65;
}

.terminal-body p { margin-bottom: 0.25rem; }
.prompt { color: #5b9bd5; }
.output { color: #9ec8ed; opacity: 0.9; }
.cursor { color: #5b9bd5; animation: blink 1s step-end infinite; }

@keyframes blink {
  50% { opacity: 0; }
}

.about-content { max-width: 720px; }

.about-text p {
  font-size: 1.1rem;
  color: #4a5e7e;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.about-cta { margin-top: 2rem; }

.btn-primary {
  padding: 1rem 2rem;
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

.site-footer {
  padding: 3rem 2rem;
  background: #ffffff;
  border-top: 1px solid rgba(26, 58, 110, 0.08);
}

.footer-container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: #1a3a6e;
  font-weight: 600;
}

.footer-brand .logo-img { width: 36px; height: 36px; }

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-links a {
  color: #4a5e7e;
  text-decoration: none;
  font-size: 0.92rem;
  cursor: pointer;
  transition: color 0.2s;
}

.footer-links a:hover { color: #1a3a6e; }

.footer-copy {
  color: #6b7c93;
  font-size: 0.85rem;
}

.modal-card {
  background: #ffffff !important;
  border-radius: 14px !important;
  border: 1px solid rgba(26, 58, 110, 0.1);
}

.modal-title {
  color: #1a3a6e !important;
  font-weight: 700;
  padding: 1.5rem !important;
  border-bottom: 1px solid rgba(26, 58, 110, 0.08);
}

.success-title { color: #2c5aa0 !important; }

.modal-body { padding: 1.5rem !important; }

.modal-intro {
  color: #4a5e7e;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.modal-actions {
  padding: 1rem 1.5rem !important;
  border-top: 1px solid rgba(26, 58, 110, 0.08);
}

.btn-send {
  background: linear-gradient(135deg, #1a3a6e 0%, #2c5aa0 100%) !important;
  color: #ffffff !important;
}

@media (max-width: 900px) {
  .training-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .training-visual { order: -1; }
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .mobile-menu-btn { display: block; }
  .section { padding: 5rem 1.5rem; }
  .logo-sub { display: none; }
}
</style>
