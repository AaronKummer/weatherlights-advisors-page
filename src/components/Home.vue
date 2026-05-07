<template>
  <div class="page-root">
    <header class="nav-header" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <a href="#top" class="nav-logo">
          <WeatherLogo class="nav-logo-mark" />
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
          <button class="theme-toggle" @click="toggleTheme" :aria-label="'Toggle theme'" title="Toggle light/dark">
            <svg viewBox="0 0 24 24" class="icon-sun" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
            <svg viewBox="0 0 24 24" class="icon-moon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
          <span class="nav-divider"></span>
          <template v-if="!currentUser">
            <a @click="openLogin" class="nav-link nav-link-strong">Login</a>
            <a @click="openSignup" class="nav-cta">Sign Up</a>
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

    <!-- Marketing sections — hidden once logged in -->
    <template v-if="!currentUser">
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
          <button class="btn-primary" @click="openSignup">Sign Up</button>
          <button class="btn-secondary" @click="dialog = true">Talk to us</button>
        </div>
      </div>

      <svg class="hero-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,120 360,40 720,60 C1080,80 1200,120 1440,80 L1440,120 L0,120 Z" fill="#ffffff"/>
      </svg>
    </section>

    <section v-if="currentUser" id="members" class="content-section members-section">
      <div class="container">
        <div class="eyebrow">Members</div>
        <h2 class="section-title">Welcome aboard, {{ currentUser.handle || currentUser.email }}.</h2>
        <p class="section-lede">
          Your training range is open: practice exams for every AWS certification, hands-on AWS lessons,
          spaced-repetition flashcards, and a 25-level hacking wargame.
        </p>

        <div class="member-grid">
          <a :href="toolUrl('/lessons/index.html')" class="member-card">
            <div class="member-card-tag">Interactive</div>
            <div class="member-card-title">AWS Lessons</div>
            <p>38 services across compute, storage, database, networking, security, and serverless. Drag-and-drop architecture builder with inline quizzes.</p>
            <div class="member-card-cta">Start Learning <span aria-hidden>→</span></div>
          </a>
          <a :href="toolUrl('/flashcards/index.html')" class="member-card">
            <div class="member-card-tag">Spaced Repetition</div>
            <div class="member-card-title">Flashcards</div>
            <p>180 cards across AWS services and Linux commands. SM-2 spaced-repetition algorithm — review what you're forgetting before you forget it.</p>
            <div class="member-card-cta">Open Deck <span aria-hidden>→</span></div>
          </a>
          <a :href="toolUrl('/wargame/index.html')" class="member-card">
            <div class="member-card-tag">CTF Range</div>
            <div class="member-card-title">Wargame</div>
            <p>25 hands-on terminal challenges in 5 chapters — Linux basics, text processing, recon, crypto, lateral movement. XP, ranks, achievements.</p>
            <div class="member-card-cta">Launch Range <span aria-hidden>→</span></div>
          </a>
          <a href="#certs-picker" class="member-card">
            <div class="member-card-tag">Practice Exams</div>
            <div class="member-card-title">Certification Quizzes</div>
            <p>700+ questions across 7 AWS certs — Cloud Practitioner, SAA, DOP, Security, Networking, Data Engineer, SAP. Timed mode + per-domain breakdown.</p>
            <div class="member-card-cta">Pick a Cert <span aria-hidden>↓</span></div>
          </a>
        </div>

        <div id="certs-picker" class="cert-picker">
          <h3 class="cert-picker-title">Choose your certification</h3>
          <div class="cert-picker-grid">
            <a v-for="b in quizBanks" :key="b.code" :href="toolUrl('/quiz/index.html', { bank: b.code })" class="cert-pill">
              <div class="cert-pill-code">{{ b.code.toUpperCase() }}</div>
              <div class="cert-pill-name">{{ b.name }}</div>
              <div class="cert-pill-meta">{{ b.questions }} questions</div>
            </a>
          </div>
        </div>
      </div>
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
    </template>

    <!-- ════════ MEMBER PORTAL ════════ -->
    <template v-if="currentUser">
      <section class="portal-hero">
        <div class="container portal-hero-inner">
          <div>
            <div class="eyebrow">Member Portal</div>
            <h1 class="portal-title">Good {{ greeting }}, {{ currentUser.handle || currentUser.email }}.</h1>
            <p class="portal-sub">{{ portalSub }}</p>
          </div>
          <div class="portal-stats">
            <div class="stat-card">
              <div class="stat-num">{{ stats.questionsAnswered }}</div>
              <div class="stat-label">Questions answered</div>
            </div>
            <div class="stat-card">
              <div class="stat-num">{{ stats.wargameLevel }}</div>
              <div class="stat-label">Wargame level</div>
            </div>
            <div class="stat-card">
              <div class="stat-num">{{ stats.flashcardsReviewed }}</div>
              <div class="stat-label">Flashcards reviewed</div>
            </div>
            <div class="stat-card">
              <div class="stat-num">{{ stats.lessonsViewed }}</div>
              <div class="stat-label">Lessons viewed</div>
            </div>
          </div>
        </div>
      </section>

      <section id="practice" class="content-section portal-section">
        <div class="container">
          <div class="eyebrow">Practice Exams</div>
          <h2 class="section-title">Every AWS certification</h2>
          <p class="section-lede">700+ questions across 7 tracks. Pick a cert and start drilling.</p>
          <div class="cert-picker-grid">
            <a v-for="b in quizBanks" :key="b.code" @click.prevent="openTool('/quiz/index.html', b.name, { bank: b.code })" href="#" class="cert-pill">
              <div class="cert-pill-code">{{ b.code.toUpperCase() }}</div>
              <div class="cert-pill-name">{{ b.name }}</div>
              <div class="cert-pill-meta">{{ b.questions }} questions</div>
            </a>
          </div>
        </div>
      </section>

      <section id="hands-on" class="content-section portal-section content-section-tint">
        <div class="container">
          <div class="eyebrow">Hands-On Training</div>
          <h2 class="section-title">Learn by doing</h2>
          <div class="member-grid">
            <a @click.prevent="openTool('/wargame/index.html', 'WeatherLight Wargame')" href="#" class="member-card">
              <div class="member-card-tag">CTF Range</div>
              <div class="member-card-title">Wargame</div>
              <p>25-level terminal hacking game. Linux fundamentals, recon, crypto, lateral movement. XP, ranks, achievements.</p>
              <div class="member-card-cta">Launch Range <span aria-hidden>→</span></div>
            </a>
            <a @click.prevent="openTool('/lessons/index.html', 'AWS Lessons')" href="#" class="member-card">
              <div class="member-card-tag">Interactive</div>
              <div class="member-card-title">AWS Lessons</div>
              <p>38 services across 6 categories with a drag-and-drop architecture builder and inline quizzes.</p>
              <div class="member-card-cta">Start Learning <span aria-hidden>→</span></div>
            </a>
          </div>
        </div>
      </section>

      <section id="memorize" class="content-section portal-section">
        <div class="container">
          <div class="eyebrow">Memorize</div>
          <h2 class="section-title">Spaced repetition</h2>
          <a @click.prevent="openTool('/flashcards/index.html', 'Flashcards')" href="#" class="member-card member-card-wide">
            <div class="member-card-tag">SM-2 Algorithm</div>
            <div class="member-card-title">Flashcards</div>
            <p>180 cards across AWS services and Linux commands. Review what you're forgetting before you forget it.</p>
            <div class="member-card-cta">Open Deck <span aria-hidden>→</span></div>
          </a>
        </div>
      </section>

      <section id="dashboard" class="content-section portal-section content-section-tint">
        <div class="container">
          <div class="eyebrow">Dashboard</div>
          <h2 class="section-title">Your progress</h2>
          <div class="dashboard-grid">
            <div class="dashboard-card">
              <div class="dashboard-card-title">Quiz progress by cert</div>
              <div class="dashboard-bars">
                <div v-for="d in stats.quizDomains" :key="d.code" class="dashboard-bar-row">
                  <span class="dashboard-bar-label">{{ d.code.toUpperCase() }}</span>
                  <div class="dashboard-bar-track">
                    <div class="dashboard-bar-fill" :style="{ width: d.pct + '%' }"></div>
                  </div>
                  <span class="dashboard-bar-val">{{ d.pct }}%</span>
                </div>
              </div>
            </div>
            <div class="dashboard-card">
              <div class="dashboard-card-title">Recent activity</div>
              <ul class="activity-list">
                <li v-for="(a, i) in stats.activity" :key="i">
                  <span class="activity-tool">{{ a.tool }}</span>
                  <span class="activity-detail">{{ a.detail }}</span>
                </li>
                <li v-if="stats.activity.length === 0" class="activity-empty">
                  Nothing yet. Open a tool above to get started.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section v-if="isAdmin" id="ops" class="content-section portal-section ops-section">
        <div class="container">
          <div class="eyebrow ops-eyebrow">Admin · Ops Tools</div>
          <h2 class="section-title">Business analytics</h2>
          <p class="section-lede">Real-time metrics from the WeatherLight backend.</p>
          <div class="ops-grid">
            <div class="ops-card">
              <div class="ops-card-title">Contact submissions</div>
              <div class="ops-num">{{ ops.contacts }}</div>
              <div class="ops-meta">all time</div>
            </div>
            <div class="ops-card">
              <div class="ops-card-title">Registered users</div>
              <div class="ops-num">{{ ops.users }}</div>
              <div class="ops-meta">all time</div>
            </div>
            <div class="ops-card">
              <div class="ops-card-title">Cognito pool</div>
              <div class="ops-num small">us-east-1_tPZ876WGD</div>
              <div class="ops-meta">user pool</div>
            </div>
            <div class="ops-card">
              <div class="ops-card-title">Last contact</div>
              <div class="ops-num small">{{ ops.lastContact || '—' }}</div>
              <div class="ops-meta">most recent submission</div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <footer class="site-footer">
      <div class="container footer-row">
        <div class="footer-brand">
          <WeatherLogo class="nav-logo-mark" />
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

    <!-- ───────── Embedded tool modal ───────── -->
    <div v-if="embedOpen" class="embed-overlay" @click.self="closeTool" @keydown.esc="closeTool">
      <div class="embed-window">
        <div class="embed-bar">
          <div class="embed-traffic">
            <span class="embed-dot embed-dot-r"></span>
            <span class="embed-dot embed-dot-y"></span>
            <span class="embed-dot embed-dot-g"></span>
          </div>
          <div class="embed-title">{{ embedTitle }}</div>
          <button class="embed-close" @click="closeTool" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <iframe :src="embedSrc" class="embed-frame" :title="embedTitle"></iframe>
      </div>
    </div>

    <!-- ───────── Login ───────── -->
    <v-dialog v-model="loginOpen" max-width="440px" persistent>
      <v-card class="modal-card auth-card">
        <v-card-title class="modal-title">Welcome back</v-card-title>
        <v-card-text class="modal-body">
          <form @submit.prevent="submitLogin" class="auth-form">
            <label class="auth-label">Email or username</label>
            <input class="auth-input" type="text" autocapitalize="off" autocorrect="off" autocomplete="username" v-model.trim="loginForm.email" autofocus />
            <label class="auth-label">Password</label>
            <input class="auth-input" type="password" autocomplete="current-password" v-model="loginForm.password" />
            <p v-if="authError" class="auth-error">{{ authError }}</p>
            <button class="auth-submit" type="submit" :disabled="authBusy">
              {{ authBusy ? "Signing in…" : "Sign in" }}
            </button>
            <div class="auth-switch">
              <a @click="openForgot">Forgot password?</a>
              <span>·</span>
              <a @click="openSignup">Create an account</a>
            </div>
          </form>
        </v-card-text>
        <v-card-actions class="modal-actions">
          <v-btn variant="text" @click="closeAllAuth">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ───────── Sign Up ───────── -->
    <v-dialog v-model="signupOpen" max-width="440px" persistent>
      <v-card class="modal-card auth-card">
        <v-card-title class="modal-title">Create your account</v-card-title>
        <v-card-text class="modal-body">
          <form @submit.prevent="submitSignup" class="auth-form">
            <label class="auth-label">Email</label>
            <input class="auth-input" type="email" autocomplete="email" v-model.trim="signupForm.email" autofocus />
            <label class="auth-label">Password</label>
            <input class="auth-input" type="password" autocomplete="new-password" v-model="signupForm.password" />
            <label class="auth-label">Confirm password</label>
            <input class="auth-input" type="password" autocomplete="new-password" v-model="signupForm.confirm" />
            <p class="auth-hint">8+ characters with at least one letter and one number.</p>
            <p v-if="authError" class="auth-error">{{ authError }}</p>
            <button class="auth-submit" type="submit" :disabled="authBusy">
              {{ authBusy ? "Creating…" : "Create account" }}
            </button>
            <div class="auth-switch">
              Already have an account? <a @click="openLogin">Sign in</a>
            </div>
          </form>
        </v-card-text>
        <v-card-actions class="modal-actions">
          <v-btn variant="text" @click="closeAllAuth">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ───────── Verify email code ───────── -->
    <v-dialog v-model="verifyOpen" max-width="440px" persistent>
      <v-card class="modal-card auth-card">
        <v-card-title class="modal-title">Verify your email</v-card-title>
        <v-card-text class="modal-body">
          <p class="auth-hint">We sent a 6-digit code to <strong>{{ verifyForm.email }}</strong>. Enter it below to activate your account.</p>
          <form @submit.prevent="submitVerify" class="auth-form">
            <label class="auth-label">Verification code</label>
            <input class="auth-input auth-code" type="text" inputmode="numeric" maxlength="6" autocomplete="one-time-code" v-model.trim="verifyForm.code" autofocus />
            <p v-if="authError" class="auth-error">{{ authError }}</p>
            <button class="auth-submit" type="submit" :disabled="authBusy">
              {{ authBusy ? "Verifying…" : "Verify" }}
            </button>
            <div class="auth-switch">
              Didn't get it? <a @click="resendVerifyCode">Resend code</a>
            </div>
          </form>
        </v-card-text>
        <v-card-actions class="modal-actions">
          <v-btn variant="text" @click="closeAllAuth">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ───────── Forgot password (request) ───────── -->
    <v-dialog v-model="forgotOpen" max-width="440px" persistent>
      <v-card class="modal-card auth-card">
        <v-card-title class="modal-title">Reset password</v-card-title>
        <v-card-text class="modal-body">
          <p class="auth-hint">Enter your email and we'll send you a code to reset your password.</p>
          <form @submit.prevent="submitForgot" class="auth-form">
            <label class="auth-label">Email or username</label>
            <input class="auth-input" type="text" autocapitalize="off" autocorrect="off" autocomplete="username" v-model.trim="forgotForm.email" autofocus />
            <p v-if="authError" class="auth-error">{{ authError }}</p>
            <button class="auth-submit" type="submit" :disabled="authBusy">
              {{ authBusy ? "Sending…" : "Send reset code" }}
            </button>
            <div class="auth-switch">
              <a @click="openLogin">Back to sign in</a>
            </div>
          </form>
        </v-card-text>
        <v-card-actions class="modal-actions">
          <v-btn variant="text" @click="closeAllAuth">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ───────── Forgot password (confirm + new password) ───────── -->
    <v-dialog v-model="forgotResetOpen" max-width="440px" persistent>
      <v-card class="modal-card auth-card">
        <v-card-title class="modal-title">Set a new password</v-card-title>
        <v-card-text class="modal-body">
          <p class="auth-hint">We sent a code to <strong>{{ forgotResetForm.email }}</strong>. Enter the code and choose a new password.</p>
          <form @submit.prevent="submitForgotReset" class="auth-form">
            <label class="auth-label">Code</label>
            <input class="auth-input auth-code" type="text" inputmode="numeric" maxlength="6" v-model.trim="forgotResetForm.code" autofocus />
            <label class="auth-label">New password</label>
            <input class="auth-input" type="password" autocomplete="new-password" v-model="forgotResetForm.password" />
            <label class="auth-label">Confirm new password</label>
            <input class="auth-input" type="password" autocomplete="new-password" v-model="forgotResetForm.confirm" />
            <p v-if="authError" class="auth-error">{{ authError }}</p>
            <button class="auth-submit" type="submit" :disabled="authBusy">
              {{ authBusy ? "Resetting…" : "Reset and sign in" }}
            </button>
          </form>
        </v-card-text>
        <v-card-actions class="modal-actions">
          <v-btn variant="text" @click="closeAllAuth">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import HeroBalloons from "./HeroBalloons.vue";
import WeatherLogo from "./WeatherLogo.vue";
import { config } from "@/config";
import { loginWithPassword, logout, getTokens, decodeIdToken, fetchMe } from "@/auth";
import * as cognito from "@/cognito";
import { describeError } from "@/cognito";

export default {
  components: { HeroBalloons, WeatherLogo },
  data() {
    return {
      dialog: false,
      successDialog: false,
      isScrolled: false,
      email: "",
      message: "",
      emailErrors: [],
      sending: false,
      currentUser: null,
      userMenuOpen: false,

      // Manual theme override: null = follow detection, 'light' | 'dark'
      themeOverride: null,
      // Embedded-tool modal (quiz / wargame / lessons / flashcards iframe)
      embedOpen: false,
      embedSrc: "",
      embedTitle: "",
      // Member portal stats (computed from localStorage in computeStats)
      stats: {
        questionsAnswered: 0,
        wargameLevel: 0,
        flashcardsReviewed: 0,
        lessonsViewed: 0,
        quizDomains: [],
        activity: [],
      },
      ops: { contacts: "—", users: "—", lastContact: "" },

      // Quiz banks shown in the cert picker
      quizBanks: [
        { code: "clf-c02", name: "Cloud Practitioner",            questions: 100 },
        { code: "saa-c03", name: "Solutions Architect Associate", questions: 200 },
        { code: "dea-c01", name: "Data Engineer Associate",       questions: 60  },
        { code: "dop-c02", name: "DevOps Engineer Pro",           questions: 120 },
        { code: "sap-c02", name: "Solutions Architect Pro",       questions: 80  },
        { code: "ans-c01", name: "Advanced Networking",           questions: 60  },
        { code: "scs-c02", name: "Security Specialty",            questions: 80  },
      ],

      // Auth modals
      loginOpen: false,
      signupOpen: false,
      verifyOpen: false,
      forgotOpen: false,
      forgotResetOpen: false,

      // Auth forms
      authBusy: false,
      authError: "",
      loginForm: { email: "", password: "" },
      signupForm: { email: "", password: "", confirm: "" },
      verifyForm: { email: "", code: "" },
      forgotForm: { email: "" },
      forgotResetForm: { email: "", code: "", password: "", confirm: "" },
      pendingPassword: "",  // remembered between signup → verify so we can auto-login
    };
  },
  computed: {
    isAdmin() {
      const e = (this.currentUser?.email || "").toLowerCase();
      const h = (this.currentUser?.handle || "").toLowerCase();
      return e.startsWith("admin@") || h.startsWith("admin");
    },
    greeting() {
      const h = new Date().getHours();
      if (h < 12) return "morning";
      if (h < 18) return "afternoon";
      return "evening";
    },
    portalSub() {
      if (this.stats.questionsAnswered === 0)
        return "Welcome to the training range. Pick a tool below to get started.";
      return `Keep it going — ${this.stats.questionsAnswered} questions in, ${this.stats.wargameLevel} wargame ${this.stats.wargameLevel === 1 ? "level" : "levels"} cleared.`;
    },
  },
  watch: {
    currentUser: { handler() { this.computeStats(); this.loadOps(); }, immediate: false },
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScroll);
    document.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleEsc);
    this.applyStoredThemeOverride();
    await this.loadCurrentUser();
    this.computeStats();
    if (this.currentUser) this.loadOps();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleEsc);
  },
  methods: {
    handleScroll() { this.isScrolled = window.scrollY > 8; },
    handleOutsideClick(e) { if (!e.target.closest('.user-pill')) this.userMenuOpen = false; },
    handleEsc(e) { if (e.key === "Escape" && this.embedOpen) this.closeTool(); },
    // Allow short usernames like "admin" — auto-append @weatherlightadvisors.com.
    // If the input already looks like an email (has @), pass through unchanged.
    normalizeIdentifier(raw) {
      const v = (raw || "").trim();
      if (!v) return "";
      if (v.includes("@")) return v.toLowerCase();
      return `${v.toLowerCase()}@weatherlightadvisors.com`;
    },
    toolUrl(path, extra = {}) {
      const params = new URLSearchParams({ theme: "weatherlight", brand: "WeatherLight Advisors", ...extra });
      return `${path}?${params.toString()}`;
    },
    openTool(path, title, extra = {}) {
      this.embedSrc = this.toolUrl(path, extra);
      this.embedTitle = title;
      this.embedOpen = true;
      document.body.style.overflow = "hidden";
    },
    closeTool() {
      this.embedOpen = false;
      this.embedSrc = "";
      document.body.style.overflow = "";
      // Refresh portal stats since the user may have made progress in the iframe.
      this.computeStats();
    },

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

    // Modal openers
    openLogin() {
      this.closeAllAuth();
      this.authError = "";
      this.loginOpen = true;
    },
    openSignup() {
      this.closeAllAuth();
      this.authError = "";
      this.signupOpen = true;
    },
    openForgot() {
      this.closeAllAuth();
      this.authError = "";
      this.forgotForm.email = this.loginForm.email;
      this.forgotOpen = true;
    },
    closeAllAuth() {
      this.loginOpen = false;
      this.signupOpen = false;
      this.verifyOpen = false;
      this.forgotOpen = false;
      this.forgotResetOpen = false;
      this.authError = "";
    },

    // Submissions
    async submitLogin() {
      this.authError = "";
      const email = this.normalizeIdentifier(this.loginForm.email);
      const { password } = this.loginForm;
      if (!email || !password) { this.authError = "Username and password are required."; return; }
      this.authBusy = true;
      try {
        await loginWithPassword(email, password);
        await this.loadCurrentUser();
        this.closeAllAuth();
        this.loginForm = { email: "", password: "" };
      } catch (err) {
        if (err.code && err.code.includes("UserNotConfirmedException")) {
          // Pivot into verify flow
          this.verifyForm.email = email;
          this.pendingPassword = password;
          this.closeAllAuth();
          this.verifyOpen = true;
          this.authError = "Your email isn't verified yet. Enter the code we sent.";
          try { await cognito.resendCode({ email }); } catch (_) {}
        } else {
          this.authError = describeError(err);
        }
      } finally {
        this.authBusy = false;
      }
    },
    async submitSignup() {
      this.authError = "";
      const { email, password, confirm } = this.signupForm;
      if (!email || !password) { this.authError = "Email and password are required."; return; }
      if (password.length < 8) { this.authError = "Password must be at least 8 characters."; return; }
      if (password !== confirm) { this.authError = "Passwords don't match."; return; }
      this.authBusy = true;
      try {
        await cognito.signUp({ email, password });
        this.verifyForm.email = email;
        this.pendingPassword = password;
        this.closeAllAuth();
        this.verifyOpen = true;
        this.signupForm = { email: "", password: "", confirm: "" };
      } catch (err) {
        this.authError = describeError(err);
      } finally {
        this.authBusy = false;
      }
    },
    async submitVerify() {
      this.authError = "";
      const { email, code } = this.verifyForm;
      if (!code) { this.authError = "Enter the 6-digit code from your email."; return; }
      this.authBusy = true;
      try {
        await cognito.confirmSignUp({ email, code });
        // Auto-login with remembered password
        if (this.pendingPassword) {
          await loginWithPassword(email, this.pendingPassword);
          await this.loadCurrentUser();
          this.pendingPassword = "";
        }
        this.closeAllAuth();
        this.verifyForm = { email: "", code: "" };
      } catch (err) {
        this.authError = describeError(err);
      } finally {
        this.authBusy = false;
      }
    },
    async resendVerifyCode() {
      this.authError = "";
      this.authBusy = true;
      try {
        await cognito.resendCode({ email: this.verifyForm.email });
        this.authError = "New code sent. Check your email.";
      } catch (err) {
        this.authError = describeError(err);
      } finally {
        this.authBusy = false;
      }
    },
    async submitForgot() {
      this.authError = "";
      const email = this.normalizeIdentifier(this.forgotForm.email);
      if (!email) { this.authError = "Username is required."; return; }
      this.authBusy = true;
      try {
        await cognito.forgotPassword({ email });
        this.forgotResetForm.email = email;
        this.closeAllAuth();
        this.forgotResetOpen = true;
      } catch (err) {
        this.authError = describeError(err);
      } finally {
        this.authBusy = false;
      }
    },
    async submitForgotReset() {
      this.authError = "";
      const { email, code, password, confirm } = this.forgotResetForm;
      if (!code || !password) { this.authError = "Code and new password are required."; return; }
      if (password.length < 8) { this.authError = "Password must be at least 8 characters."; return; }
      if (password !== confirm) { this.authError = "Passwords don't match."; return; }
      this.authBusy = true;
      try {
        await cognito.confirmForgotPassword({ email, code, password });
        await loginWithPassword(email, password);
        await this.loadCurrentUser();
        this.closeAllAuth();
        this.forgotResetForm = { email: "", code: "", password: "", confirm: "" };
      } catch (err) {
        this.authError = describeError(err);
      } finally {
        this.authBusy = false;
      }
    },

    onLogout() { logout(); },

    // ─────────── Theme toggle ───────────
    applyStoredThemeOverride() {
      const v = localStorage.getItem("wl-theme");
      if (v === "dark" || v === "light") {
        this.themeOverride = v;
        this.applyThemeClass();
      }
    },
    applyThemeClass() {
      const html = document.documentElement;
      if (this.themeOverride === "dark") html.classList.add("dark-fallback");
      else if (this.themeOverride === "light") html.classList.remove("dark-fallback");
    },
    toggleTheme() {
      const isDark = document.documentElement.classList.contains("dark-fallback");
      this.themeOverride = isDark ? "light" : "dark";
      localStorage.setItem("wl-theme", this.themeOverride);
      this.applyThemeClass();
    },

    // ─────────── Portal stats ───────────
    computeStats() {
      let answered = 0;
      const quizDomains = [];
      this.quizBanks.forEach((b) => {
        try {
          const raw = localStorage.getItem("vv-quiz-" + b.code);
          if (!raw) { quizDomains.push({ code: b.code, pct: 0 }); return; }
          const s = JSON.parse(raw);
          const a = Object.keys(s.answers || s.history || {}).length || 0;
          answered += a;
          quizDomains.push({ code: b.code, pct: Math.min(100, Math.round((a / b.questions) * 100)) });
        } catch { quizDomains.push({ code: b.code, pct: 0 }); }
      });

      let wgLevel = 0;
      try {
        const wg = JSON.parse(localStorage.getItem("wg-state") || "{}");
        wgLevel = wg.level || 0;
      } catch {}

      let flashcardsReviewed = 0;
      try {
        const fc = JSON.parse(localStorage.getItem("vv-flashcards-state") || "{}");
        flashcardsReviewed = fc.reviewed || (Array.isArray(fc.cards) ? fc.cards.filter((c) => c.reps > 0).length : 0);
      } catch {}

      let lessonsViewed = 0;
      try {
        const ls = JSON.parse(localStorage.getItem("vv-lessons-progress") || "{}");
        lessonsViewed = Object.keys(ls).length;
      } catch {}

      const activity = [];
      if (wgLevel > 0) activity.push({ tool: "Wargame", detail: `Cleared level ${wgLevel}` });
      const topQuiz = quizDomains.slice().sort((a, b) => b.pct - a.pct)[0];
      if (topQuiz && topQuiz.pct > 0) activity.push({ tool: "Quiz", detail: `${topQuiz.code.toUpperCase()} — ${topQuiz.pct}% answered` });
      if (flashcardsReviewed > 0) activity.push({ tool: "Flashcards", detail: `${flashcardsReviewed} cards in rotation` });

      this.stats = { questionsAnswered: answered, wargameLevel: wgLevel, flashcardsReviewed, lessonsViewed, quizDomains, activity };
    },

    async loadOps() {
      if (!this.isAdmin) return;
      try {
        const tokens = getTokens();
        if (!tokens) return;
        const res = await fetch(`${config.apiBase}/admin/stats`, {
          headers: { Authorization: `Bearer ${tokens.id_token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        this.ops = {
          contacts: data.contacts ?? "—",
          users: data.users ?? "—",
          lastContact: data.lastContact || "",
        };
      } catch (err) { console.warn("loadOps failed", err); }
    },
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

.nav-logo-mark {
  width: 42px;
  height: auto;
  flex-shrink: 0;
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

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #e5edf5;
  background: transparent;
  color: #4a5e7e;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
  padding: 0;
}
.theme-toggle:hover { border-color: #5b9bd5; color: #1a3a6e; background: #f7fbff; }
.theme-toggle .icon-sun,
.theme-toggle .icon-moon { width: 16px; height: 16px; }
.theme-toggle .icon-sun { display: block; }
.theme-toggle .icon-moon { display: none; }

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

.members-section {
  background: linear-gradient(180deg, #ffffff 0%, #f0f7fd 100%);
  border-bottom: 1px solid #eef3f9;
}

.member-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.cert-picker {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid #e0eaf5;
}
.cert-picker-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a3a6e;
  letter-spacing: -0.01em;
  margin-bottom: 1.5rem;
}
.cert-picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.85rem;
}
.cert-pill {
  display: block;
  padding: 1rem 1.15rem;
  background: #ffffff;
  border: 1px solid #d8e6f3;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.cert-pill:hover {
  transform: translateY(-2px);
  border-color: #5b9bd5;
  box-shadow: 0 8px 20px rgba(26, 58, 110, 0.08);
}
.cert-pill-code {
  font-family: 'SF Mono', 'Consolas', monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #2c5aa0;
  margin-bottom: 0.35rem;
}
.cert-pill-name {
  font-size: 0.98rem;
  font-weight: 600;
  color: #1a3a6e;
  margin-bottom: 0.2rem;
}
.cert-pill-meta {
  font-size: 0.82rem;
  color: #6b7c93;
}

/* ───────── Member portal ───────── */
.portal-hero {
  padding: 8rem 2rem 3rem;
  background: linear-gradient(180deg, #ffffff 0%, #f0f7fd 100%);
  border-bottom: 1px solid #e0eaf5;
}
.portal-hero-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: center;
}
.portal-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: #1a3a6e;
  letter-spacing: -0.02em;
  margin-bottom: 0.6rem;
  line-height: 1.15;
}
.portal-sub {
  font-size: 1.05rem;
  color: #4a5e7e;
  line-height: 1.6;
  max-width: 520px;
}
.portal-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
}
.stat-card {
  padding: 1.1rem 1.25rem;
  background: #ffffff;
  border: 1px solid #e0eaf5;
  border-radius: 10px;
  min-width: 130px;
}
.stat-num {
  font-size: 1.65rem;
  font-weight: 700;
  color: #1a3a6e;
  line-height: 1;
  margin-bottom: 0.35rem;
}
.stat-label {
  font-size: 0.78rem;
  color: #6b7c93;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}
.portal-section { padding: 4rem 2rem; }
.member-card-wide { max-width: 100%; }

.dashboard-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.5rem;
}
.dashboard-card {
  background: #ffffff;
  border: 1px solid #e0eaf5;
  border-radius: 12px;
  padding: 1.75rem;
}
.dashboard-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a3a6e;
  margin-bottom: 1.25rem;
  letter-spacing: -0.01em;
}
.dashboard-bars { display: flex; flex-direction: column; gap: 0.6rem; }
.dashboard-bar-row {
  display: grid;
  grid-template-columns: 70px 1fr 50px;
  align-items: center;
  gap: 0.85rem;
}
.dashboard-bar-label {
  font-family: 'SF Mono', 'Consolas', monospace;
  font-size: 0.78rem;
  font-weight: 700;
  color: #2c5aa0;
  letter-spacing: 0.05em;
}
.dashboard-bar-track {
  height: 8px;
  background: #eef3f9;
  border-radius: 100px;
  overflow: hidden;
}
.dashboard-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #5b9bd5 0%, #1a3a6e 100%);
  border-radius: 100px;
  transition: width 0.4s ease;
}
.dashboard-bar-val {
  text-align: right;
  font-size: 0.82rem;
  color: #4a5e7e;
  font-weight: 600;
}

.activity-list { list-style: none; padding: 0; }
.activity-list li {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.7rem 0;
  border-bottom: 1px solid #f0f4f9;
}
.activity-list li:last-child { border-bottom: none; }
.activity-tool {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  color: #2c5aa0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(91, 155, 213, 0.12);
  border-radius: 100px;
  padding: 0.25rem 0.6rem;
  min-width: 88px;
  text-align: center;
}
.activity-detail { color: #4a5e7e; font-size: 0.92rem; }
.activity-empty { color: #6b7c93; font-style: italic; padding: 0.7rem 0; }

.ops-section {
  background: linear-gradient(180deg, #fff7ed 0%, #fff 100%);
  border-top: 2px solid #ffe1bf;
}
.ops-eyebrow { color: #c2570a !important; }
.ops-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}
.ops-card {
  background: #ffffff;
  border: 1px solid #ffe1bf;
  border-radius: 12px;
  padding: 1.5rem;
}
.ops-card-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: #c2570a;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.85rem;
}
.ops-num {
  font-size: 2rem;
  font-weight: 700;
  color: #1a3a6e;
  line-height: 1;
  margin-bottom: 0.5rem;
}
.ops-num.small {
  font-size: 0.9rem;
  font-family: 'SF Mono', 'Consolas', monospace;
  word-break: break-all;
}
.ops-meta {
  font-size: 0.78rem;
  color: #6b7c93;
}

@media (max-width: 800px) {
  .portal-hero-inner { grid-template-columns: 1fr; gap: 2rem; }
  .dashboard-grid { grid-template-columns: 1fr; }
}

.member-card {
  display: block;
  padding: 2rem;
  background: #ffffff;
  border: 1px solid #d8e6f3;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.18s ease, border-color 0.18s, box-shadow 0.18s;
}
.member-card:hover {
  transform: translateY(-3px);
  border-color: #5b9bd5;
  box-shadow: 0 12px 32px rgba(26, 58, 110, 0.10);
}
.member-card-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  color: #2c5aa0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  background: rgba(91, 155, 213, 0.12);
  border-radius: 100px;
  padding: 0.3rem 0.7rem;
  margin-bottom: 1rem;
}
.member-card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a3a6e;
  margin-bottom: 0.6rem;
  letter-spacing: -0.01em;
}
.member-card p {
  color: #4a5e7e;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}
.member-card-cta {
  color: #1a3a6e;
  font-weight: 600;
  font-size: 0.92rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.member-card-cta span { transition: transform 0.18s; }
.member-card:hover .member-card-cta span { transform: translateX(4px); }

@media (max-width: 700px) {
  .member-grid { grid-template-columns: 1fr; }
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
.footer-brand .nav-logo-mark { width: 32px; }

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

/* ───────── Embedded tool modal ───────── */
.embed-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 20, 40, 0.55);
  backdrop-filter: blur(8px);
  padding: 2.5vh 2.5vw;
  animation: fadeIn 0.18s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.embed-window {
  width: 100%;
  max-width: 1280px;
  height: 95vh;
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 32px 80px rgba(10, 20, 40, 0.45);
  border: 1px solid rgba(26, 58, 110, 0.1);
}

.embed-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1rem;
  background: linear-gradient(180deg, #f7fbff 0%, #eef5fc 100%);
  border-bottom: 1px solid #e0eaf5;
}

.embed-traffic { display: flex; gap: 0.4rem; }
.embed-dot { width: 12px; height: 12px; border-radius: 50%; }
.embed-dot-r { background: #ff5f57; }
.embed-dot-y { background: #ffbd2e; }
.embed-dot-g { background: #28c840; }

.embed-title {
  flex: 1;
  text-align: center;
  font-size: 0.88rem;
  font-weight: 600;
  color: #1a3a6e;
  letter-spacing: -0.005em;
}

.embed-close {
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  color: #4a5e7e;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
}
.embed-close:hover { background: rgba(26, 58, 110, 0.08); color: #1a3a6e; }
.embed-close svg { width: 18px; height: 18px; }

.embed-frame {
  flex: 1;
  width: 100%;
  border: 0;
  background: #ffffff;
}

@media (max-width: 700px) {
  .embed-overlay { padding: 0; }
  .embed-window { height: 100vh; max-width: 100vw; border-radius: 0; }
}

/* ───────── Auth modals ───────── */
.auth-card { border-radius: 12px !important; }
.auth-form { display: flex; flex-direction: column; }
.auth-label {
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  color: #4a5e7e;
  margin-bottom: 0.4rem;
  margin-top: 0.85rem;
  letter-spacing: 0.01em;
}
.auth-label:first-child { margin-top: 0; }
.auth-input {
  width: 100%;
  padding: 0.7rem 0.85rem;
  border: 1px solid #d8e2ee;
  border-radius: 8px;
  font-size: 0.96rem;
  color: #1a3a6e;
  background: #ffffff;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  font-family: inherit;
}
.auth-input:focus {
  border-color: #5b9bd5;
  box-shadow: 0 0 0 3px rgba(91, 155, 213, 0.18);
}
.auth-code {
  font-family: 'SF Mono', 'Consolas', monospace;
  font-size: 1.25rem;
  letter-spacing: 0.5em;
  text-align: center;
  padding-left: 0.75rem;
}
.auth-hint {
  color: #6b7c93;
  font-size: 0.85rem;
  line-height: 1.55;
  margin-bottom: 1rem;
}
.auth-error {
  margin-top: 0.85rem;
  padding: 0.6rem 0.85rem;
  background: #fef0f0;
  border: 1px solid #f5c6c6;
  color: #b3261e;
  font-size: 0.88rem;
  border-radius: 6px;
}
.auth-submit {
  margin-top: 1.25rem;
  padding: 0.8rem 1rem;
  background: linear-gradient(135deg, #1a3a6e 0%, #2c5aa0 100%);
  color: #ffffff;
  font-size: 0.98rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
}
.auth-submit:hover:not(:disabled) { transform: translateY(-1px); }
.auth-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.auth-switch {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.88rem;
  color: #6b7c93;
}
.auth-switch a {
  color: #2c5aa0;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}
.auth-switch a:hover { text-decoration: underline; }
.auth-switch span { margin: 0 0.5rem; color: #cfdcec; }

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
