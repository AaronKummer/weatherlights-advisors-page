<template>
  <div class="page-root">
    <header class="nav-header" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <a href="#top" class="nav-logo">
          <WeatherLogo class="nav-logo-mark" />
          <span class="logo-wordmark">
            <span class="logo-weather">Weather</span><span class="logo-light">Light</span><span class="logo-advisors"> Advisors</span>
          </span>
        </a>
        <nav class="nav-links">
          <template v-if="!currentUser">
            <a href="#services" class="nav-link">Services</a>
            <a href="#certs" class="nav-link">Certifications</a>
            <a href="#about" class="nav-link">About</a>
            <a @click="dialog = true" class="nav-link">Contact</a>
          </template>
          <div v-if="currentUser && isAdmin && !impersonatedAs" class="nav-view-chips">
            <button v-for="v in viewOptions" :key="v.id"
                    :class="['nav-chip', { active: viewAs === v.id }]"
                    @click="setViewAs(v.id)">
              {{ v.shortLabel || v.label }}
            </button>
          </div>
          <button class="theme-toggle" @click="toggleTheme" :aria-label="'Toggle theme'" title="Toggle light/dark">
            <svg viewBox="0 0 24 24" class="icon-sun" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
            <svg viewBox="0 0 24 24" class="icon-moon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
          <span v-if="!currentUser" class="nav-divider"></span>
          <template v-if="!currentUser">
            <a @click="openLogin" class="nav-link nav-link-strong">Login</a>
            <a @click="openSignup" class="nav-cta">Sign Up</a>
          </template>
          <template v-else>
            <div class="user-pill" @click.stop="userMenuOpen = !userMenuOpen">
              <span class="user-avatar">{{ (displayHandle || '?').charAt(0).toUpperCase() }}</span>
              <span class="user-handle">{{ displayHandle }}</span>
              <div v-if="userMenuOpen" class="user-menu">
                <div class="user-menu-email">{{ currentUser.email }}</div>
                <button v-if="isAdmin" class="user-menu-shortcut" @click="goToUsers">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="user-menu-icon">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Manage users
                </button>
                <div v-if="isAdmin" class="user-menu-section">
                  <div class="user-menu-label">View as</div>
                  <button v-for="v in viewOptions" :key="v.id"
                          :class="['view-pick', { active: viewAs === v.id }]"
                          @click="setViewAs(v.id)">
                    {{ v.label }}
                  </button>
                </div>
                <button @click="onLogout" class="user-menu-signout">Sign out</button>
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
        <h2 class="section-title">Welcome aboard, {{ displayHandle }}.</h2>
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
      <div v-if="impersonatedAs" class="impersonation-banner">
        <span class="impersonation-dot"></span>
        <span>Impersonating <strong>{{ impersonatedAs.email }}</strong> · viewing as <strong>{{ viewAs }}</strong></span>
        <button @click="stopImpersonation" class="impersonation-stop">Stop</button>
      </div>
      <nav class="portal-tabs" :class="{ scrolled: isScrolled, hasBanner: impersonatedAs }">
        <div class="container portal-tabs-inner">
          <button v-for="t in tabs" :key="t.id"
                  v-show="!t.adminOnly || isAdmin"
                  :class="['portal-tab', { active: activeTab === t.id }]"
                  @click="goToTab(t.id)">
            {{ t.label }}
          </button>
        </div>
      </nav>

      <!-- When a tool is open, it takes over the portal-page area inline.
           Nav + tabs stay visible above; the iframe lives in a window
           contained within the page. -->
      <!-- ===== Internal (admin) view ===== -->
      <template v-if="viewAs === 'internal'">
      <section v-if="embedOpen" class="portal-page embed-page">
        <div class="embed-window">
          <div class="embed-bar">
            <button class="embed-back" @click="closeTool" aria-label="Back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Back</span>
            </button>
            <div class="embed-title">{{ embedTitle }}</div>
            <button class="embed-close" @click="closeTool" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <iframe :src="embedSrc" class="embed-frame" :title="embedTitle"></iframe>
        </div>
      </section>

      <section v-show="!embedOpen && activeTab === 'overview'" class="portal-page">
        <div class="container">
          <h1 class="portal-title">Good {{ greeting }}, {{ displayHandle }}.</h1>
          <p class="portal-sub">Here's where the business stands today.</p>
          <div class="kpi-grid">
            <div v-for="k in kpis" :key="k.label" class="kpi-card">
              <div class="kpi-label">{{ k.label }}</div>
              <div class="kpi-num">{{ k.value }}</div>
              <div class="kpi-sub">{{ k.sub }}</div>
            </div>
          </div>
          <div class="overview-feed">
            <div class="finance-card-title">Recent activity</div>
            <ul class="feed-list">
              <li v-for="(f, i) in feed.slice(0, 4)" :key="i" class="feed-item">
                <span class="feed-tag">{{ f.tag }}</span>
                <span class="feed-text">{{ f.text }}</span>
                <span class="feed-when">{{ f.when }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section v-show="!embedOpen && activeTab === 'clients'" id="clientele" class="portal-page">
        <div class="container">
          <div class="eyebrow">Clientele</div>
          <h2 class="section-title">Active engagements</h2>
          <p class="section-lede">{{ clients.filter(c => c.status === 'active').length }} active, {{ clients.filter(c => c.status === 'onboarding').length }} onboarding, {{ clients.filter(c => c.status === 'paused').length }} paused.</p>
          <div class="clients-grid">
            <div v-for="c in clients" :key="c.name" class="client-card">
              <div class="client-row">
                <span class="client-name">{{ c.name }}</span>
                <span class="client-status" :class="'status-' + c.status">{{ c.status }}</span>
              </div>
              <p class="client-focus">{{ c.focus }}</p>
            </div>
          </div>
        </div>
      </section>

      <section v-show="!embedOpen && activeTab === 'financials'" id="revenue" class="portal-page">
        <div class="container">
          <div class="eyebrow">Financials</div>
          <h2 class="section-title">Revenue &amp; AWS spend</h2>
          <div class="finance-grid">
            <div class="finance-card">
              <div class="finance-card-title">Monthly revenue · last 6 months</div>
              <div class="bar-chart">
                <div v-for="m in revenue6mo" :key="m.month" class="bar-col">
                  <div class="bar-stack" :style="{ height: (m.v * 1.1) + '%' }">
                    <span class="bar-val">${{ m.v }}k</span>
                  </div>
                  <div class="bar-x">{{ m.month }}</div>
                </div>
              </div>
            </div>
            <div class="finance-card">
              <div class="finance-card-title">Managed AWS spend by service</div>
              <div class="dashboard-bars">
                <div v-for="s in awsBreakdown" :key="s.svc" class="dashboard-bar-row">
                  <span class="dashboard-bar-label">{{ s.svc }}</span>
                  <div class="dashboard-bar-track">
                    <div class="dashboard-bar-fill" :style="{ width: s.pct + '%' }"></div>
                  </div>
                  <span class="dashboard-bar-val">{{ s.pct }}%</span>
                </div>
              </div>
              <div class="finance-card-foot">$312k/month total · 14 AWS accounts under management</div>
            </div>
          </div>
        </div>
      </section>

      <section v-show="!embedOpen && activeTab === 'training'" id="training" class="portal-page">
        <div class="container">
          <a @click.prevent="openTool('/training-ground/index.html', 'AWS Training Ground')" href="#" class="tg-hero-card">
            <div class="tg-hero-content">
              <div class="tg-hero-tag">Featured · Interactive</div>
              <div class="tg-hero-title">AWS Training Ground</div>
              <p class="tg-hero-desc">
                Drag AWS services onto a canvas. Wire them together. Watch data flow through your
                architecture in real time. Four scenarios to start: static site, serverless API,
                three-tier web app, event-driven pipeline.
              </p>
              <div class="tg-hero-cta">Launch the Ground <span aria-hidden>→</span></div>
            </div>
            <svg class="tg-hero-preview" viewBox="0 0 320 180" aria-hidden="true">
              <defs>
                <linearGradient id="tgGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#5b9bd5" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#1a3a6e" stop-opacity="0.15"/>
                </linearGradient>
              </defs>
              <!-- background grid -->
              <pattern id="tgGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(91,155,213,0.15)" stroke-width="0.5"/>
              </pattern>
              <rect width="320" height="180" fill="url(#tgGrid)"/>

              <!-- animated connection lines -->
              <path d="M 60 40 C 110 40 130 90 180 90" fill="none" stroke="#5b9bd5" stroke-width="2" stroke-dasharray="5 6">
                <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1.2s" repeatCount="indefinite"/>
              </path>
              <path d="M 180 90 C 230 90 220 140 270 140" fill="none" stroke="#5b9bd5" stroke-width="2" stroke-dasharray="5 6">
                <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1.2s" repeatCount="indefinite"/>
              </path>

              <!-- nodes -->
              <g transform="translate(20 22)">
                <rect width="80" height="36" rx="6" fill="#ffffff" stroke="#d8e6f3"/>
                <rect x="6" y="8" width="22" height="20" rx="4" fill="#bf2b2b"/>
                <text x="17" y="22" font-family="Inter, sans-serif" font-size="8" font-weight="800" fill="#fff" text-anchor="middle">API</text>
                <text x="36" y="24" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="#1a3a6e">API GW</text>
              </g>
              <g transform="translate(140 72)">
                <rect width="80" height="36" rx="6" fill="#ffffff" stroke="#d8e6f3"/>
                <rect x="6" y="8" width="22" height="20" rx="4" fill="#fa7e14"/>
                <text x="17" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">λ</text>
                <text x="36" y="24" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="#1a3a6e">Lambda</text>
              </g>
              <g transform="translate(230 122)">
                <rect width="80" height="36" rx="6" fill="#ffffff" stroke="#d8e6f3"/>
                <rect x="6" y="8" width="22" height="20" rx="4" fill="#3148c6"/>
                <text x="17" y="22" font-family="Inter, sans-serif" font-size="8" font-weight="800" fill="#fff" text-anchor="middle">DDB</text>
                <text x="36" y="24" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="#1a3a6e">DynamoDB</text>
              </g>

              <!-- traveling particles -->
              <circle r="3" fill="#5b9bd5">
                <animateMotion dur="2.4s" repeatCount="indefinite"
                  path="M 60 40 C 110 40 130 90 180 90 C 230 90 220 140 270 140"/>
              </circle>
            </svg>
          </a>

          <h3 class="finance-card-title training-h3">Practice Exams</h3>
          <div class="cert-picker-grid">
            <a v-for="b in quizBanks" :key="b.code" @click.prevent="openTool('/quiz/index.html', b.name, { bank: b.code })" href="#" class="cert-pill">
              <div class="cert-pill-code">{{ b.code.toUpperCase() }}</div>
              <div class="cert-pill-name">{{ b.name }}</div>
              <div class="cert-pill-meta">{{ b.questions }} questions</div>
            </a>
          </div>

          <h3 class="finance-card-title training-h3">More Tools</h3>
          <div class="training-tools-grid">
            <a @click.prevent="openTool('/wargame/index.html', 'WeatherLight Wargame')" href="#" class="member-card">
              <div class="member-card-tag">CTF Range</div>
              <div class="member-card-title">Wargame</div>
              <p>25-level terminal hacking game. Linux, recon, crypto, lateral movement.</p>
              <div class="member-card-cta">Launch <span aria-hidden>→</span></div>
            </a>
            <a @click.prevent="openTool('/lessons/index.html', 'AWS Lessons')" href="#" class="member-card">
              <div class="member-card-tag">Reference</div>
              <div class="member-card-title">AWS Lessons</div>
              <p>38 services across 6 categories with inline notes and quizzes.</p>
              <div class="member-card-cta">Browse <span aria-hidden>→</span></div>
            </a>
            <a @click.prevent="openTool('/flashcards/index.html', 'Flashcards')" href="#" class="member-card">
              <div class="member-card-tag">SM-2</div>
              <div class="member-card-title">Flashcards</div>
              <p>180 cards across AWS services and Linux. Spaced repetition.</p>
              <div class="member-card-cta">Open <span aria-hidden>→</span></div>
            </a>
          </div>
        </div>
      </section>

      <section v-show="!embedOpen && activeTab === 'ops' && isAdmin" id="ops" class="portal-page ops-section">
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

      <section v-show="!embedOpen && activeTab === 'users' && isAdmin" id="users" class="portal-page">
        <div class="container">
          <div class="users-panel-head" style="margin-bottom: 2rem;">
            <div>
              <h2 class="section-title" style="margin-bottom: 0.5rem;">User management</h2>
              <p class="section-lede" style="margin: 0;">Create, edit, or remove members. Assign them to a role group.</p>
            </div>
            <div class="users-panel-actions">
              <button class="btn-secondary btn-sm" @click="loadUsers" :disabled="userListLoading">
                {{ userListLoading ? "Loading…" : "Refresh" }}
              </button>
              <button class="btn-primary btn-sm" @click="openCreateUser">+ New user</button>
            </div>
          </div>
          <p v-if="userListError" class="auth-error" style="margin-bottom: 1rem;">{{ userListError }}</p>
          <p v-if="!userList.length && !userListLoading" class="users-empty">
            No users loaded yet — click <em>Refresh</em>.
          </p>
          <table v-if="userList.length" class="users-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Display name</th>
                <th>Role</th>
                <th>Status</th>
                <th class="users-table-actions"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in userList" :key="u.username">
                <td>{{ u.email }}</td>
                <td>{{ u.displayName || '—' }}</td>
                <td>
                  <span class="role-pill" :class="'role-' + (u.role || '').toLowerCase()">{{ u.role || '—' }}</span>
                </td>
                <td><span class="status-text" :class="{ disabled: !u.enabled }">{{ u.enabled ? u.status : 'DISABLED' }}</span></td>
                <td class="users-table-actions">
                  <button class="btn-link" @click="viewAsUser(u)">View as</button>
                  <button class="btn-link" @click="openEditUser(u)">Edit</button>
                  <button class="btn-link btn-danger" @click="deleteUser(u)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      </template>

      <!-- ===== Client view (admin can preview as a customer would see it) ===== -->
      <template v-if="viewAs === 'client'">
        <section v-show="activeTab === 'overview'" class="portal-page">
          <div class="container">
            <div class="view-banner">You are viewing the site as a <strong>client</strong>.</div>
            <h1 class="portal-title">Welcome back, Helix Robotics.</h1>
            <p class="portal-sub">Your engagement is on track. Here's where things stand.</p>
            <div class="kpi-grid">
              <div class="kpi-card"><div class="kpi-label">Engagement</div><div class="kpi-num">Active</div><div class="kpi-sub">Cert track · Q2 2026</div></div>
              <div class="kpi-card"><div class="kpi-label">Engineers enrolled</div><div class="kpi-num">12</div><div class="kpi-sub">SAA-C03 cohort</div></div>
              <div class="kpi-card"><div class="kpi-label">Avg practice score</div><div class="kpi-num">81%</div><div class="kpi-sub">+6% over last 30d</div></div>
              <div class="kpi-card"><div class="kpi-label">Next milestone</div><div class="kpi-num small">May 28</div><div class="kpi-sub">Mock exam — full team</div></div>
            </div>
            <div class="overview-feed">
              <div class="finance-card-title">Recent activity</div>
              <ul class="feed-list">
                <li class="feed-item"><span class="feed-tag">Cohort Update</span><span class="feed-text">3 engineers passed SAA-C03 (avg 87%)</span><span class="feed-when">2h ago</span></li>
                <li class="feed-item"><span class="feed-tag">Module Released</span><span class="feed-text">VPC Architecture · Module 7 now available</span><span class="feed-when">yesterday</span></li>
                <li class="feed-item"><span class="feed-tag">Office Hours</span><span class="feed-text">Next session: Thursday 1pm PT — Aaron K.</span><span class="feed-when">2d ago</span></li>
              </ul>
            </div>
          </div>
        </section>
        <section v-show="activeTab === 'training'" class="portal-page">
          <div class="container">
            <h2 class="section-title">Your training</h2>
            <p class="section-lede">Practice exams + hands-on labs assigned to your team.</p>
            <h3 class="finance-card-title training-h3">Practice Exams</h3>
            <div class="cert-picker-grid">
              <a v-for="b in quizBanks" :key="b.code" @click.prevent="openTool('/quiz/index.html', b.name, { bank: b.code })" href="#" class="cert-pill">
                <div class="cert-pill-code">{{ b.code.toUpperCase() }}</div>
                <div class="cert-pill-name">{{ b.name }}</div>
                <div class="cert-pill-meta">{{ b.questions }} questions</div>
              </a>
            </div>
          </div>
        </section>
        <section v-show="activeTab === 'deliverables'" class="portal-page">
          <div class="container">
            <h2 class="section-title">Deliverables</h2>
            <p class="section-lede">Artifacts shipped to your team.</p>
            <ul class="feed-list">
              <li class="feed-item"><span class="feed-tag">Architecture Doc</span><span class="feed-text">VPC + multi-account landing zone (v2)</span><span class="feed-when">Apr 12</span></li>
              <li class="feed-item"><span class="feed-tag">Runbook</span><span class="feed-text">Incident response: IAM credential leak</span><span class="feed-when">Apr 03</span></li>
              <li class="feed-item"><span class="feed-tag">Cohort Report</span><span class="feed-text">Q1 cert progress · 12 engineers</span><span class="feed-when">Mar 31</span></li>
              <li class="feed-item"><span class="feed-tag">Cost Review</span><span class="feed-text">RI rightsizing — projected $14k/mo savings</span><span class="feed-when">Mar 18</span></li>
            </ul>
          </div>
        </section>
        <section v-show="activeTab === 'contact'" class="portal-page">
          <div class="container container-narrow">
            <h2 class="section-title">Get in touch</h2>
            <p class="section-lede">Your engagement lead is <strong>Aaron Kummer</strong>. Drop a note and we'll respond within one business day.</p>
            <button class="btn-primary" @click="dialog = true">Send a message</button>
          </div>
        </section>
      </template>

      <!-- ===== AWS Partner Rep view ===== -->
      <template v-if="viewAs === 'rep'">
        <section v-show="activeTab === 'overview'" class="portal-page">
          <div class="container">
            <div class="view-banner">You are viewing the site as an <strong>AWS Partner Rep</strong>.</div>
            <h1 class="portal-title">Pipeline status, WeatherLight Advisors.</h1>
            <p class="portal-sub">Opportunities your team has sent us — sourced via ACE.</p>
            <div class="kpi-grid">
              <div class="kpi-card"><div class="kpi-label">Open opportunities</div><div class="kpi-num">7</div><div class="kpi-sub">3 in active discovery</div></div>
              <div class="kpi-card"><div class="kpi-label">Closed-won (YTD)</div><div class="kpi-num">5</div><div class="kpi-sub">$840k AWS-influenced</div></div>
              <div class="kpi-card"><div class="kpi-label">Avg time to first call</div><div class="kpi-num">1.4d</div><div class="kpi-sub">target: ≤ 2 days</div></div>
              <div class="kpi-card"><div class="kpi-label">CSAT (post-engagement)</div><div class="kpi-num">4.8/5</div><div class="kpi-sub">12 responses</div></div>
            </div>
            <div class="overview-feed">
              <div class="finance-card-title">Recent ACE updates</div>
              <ul class="feed-list">
                <li class="feed-item"><span class="feed-tag">Northwind Logistics</span><span class="feed-text">Discovery call scheduled · Migration assessment</span><span class="feed-when">today</span></li>
                <li class="feed-item"><span class="feed-tag">Coastal Credit Union</span><span class="feed-text">SOW signed · Landing zone PoC</span><span class="feed-when">yesterday</span></li>
                <li class="feed-item"><span class="feed-tag">Verdant Energy</span><span class="feed-text">Closed-won · $32k · RI optimization</span><span class="feed-when">2d ago</span></li>
              </ul>
            </div>
          </div>
        </section>
        <section v-show="activeTab === 'engagements'" class="portal-page">
          <div class="container">
            <h2 class="section-title">Active engagements</h2>
            <p class="section-lede">Customers your team referred who are currently working with us.</p>
            <div class="clients-grid">
              <div v-for="c in clients.filter(c => c.status !== 'paused')" :key="c.name" class="client-card">
                <div class="client-row"><span class="client-name">{{ c.name }}</span><span class="client-status" :class="'status-' + c.status">{{ c.status }}</span></div>
                <p class="client-focus">{{ c.focus }}</p>
              </div>
            </div>
          </div>
        </section>
        <section v-show="activeTab === 'reports'" class="portal-page">
          <div class="container">
            <h2 class="section-title">Reports</h2>
            <p class="section-lede">ACE-formatted outcome summaries you can paste into your partner notes.</p>
            <ul class="feed-list">
              <li class="feed-item"><span class="feed-tag">Q1 Outcomes</span><span class="feed-text">5 closed-won · $840k AWS-influenced revenue</span><span class="feed-when">Apr 02</span></li>
              <li class="feed-item"><span class="feed-tag">Cert Throughput</span><span class="feed-text">38 engineers certified across 4 customers</span><span class="feed-when">Mar 28</span></li>
              <li class="feed-item"><span class="feed-tag">Migration Velocity</span><span class="feed-text">Avg 6.2 wks · landing zone → first prod workload</span><span class="feed-when">Mar 15</span></li>
            </ul>
          </div>
        </section>
        <section v-show="activeTab === 'resources'" class="portal-page">
          <div class="container container-narrow">
            <h2 class="section-title">Resources</h2>
            <p class="section-lede">Materials to help you sell WeatherLight engagements.</p>
            <ul class="feed-list">
              <li class="feed-item"><span class="feed-tag">One-pager</span><span class="feed-text">WeatherLight Advisors — service overview (PDF)</span><span class="feed-when">v3</span></li>
              <li class="feed-item"><span class="feed-tag">Case Study</span><span class="feed-text">Verdant Energy: $14k/mo saved via RI review</span><span class="feed-when">Apr</span></li>
              <li class="feed-item"><span class="feed-tag">Pitch Deck</span><span class="feed-text">AWS-only consultancy positioning · 12 slides</span><span class="feed-when">v2</span></li>
            </ul>
          </div>
        </section>
      </template>
    </template>

    <footer v-if="!currentUser" class="site-footer">
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


    <!-- ───────── User create / edit modal ───────── -->
    <v-dialog v-model="userModalOpen" max-width="480px" persistent>
      <v-card class="modal-card auth-card">
        <v-card-title class="modal-title">{{ userModalMode === 'create' ? 'New user' : 'Edit user' }}</v-card-title>
        <v-card-text class="modal-body">
          <form @submit.prevent="submitUser" class="auth-form">
            <label class="auth-label">Email</label>
            <input class="auth-input" type="email" v-model.trim="userForm.email" :disabled="userModalMode === 'edit'" />
            <label class="auth-label">Display name</label>
            <input class="auth-input" type="text" v-model.trim="userForm.displayName" placeholder="Optional" />
            <label class="auth-label">{{ userModalMode === 'create' ? 'Password' : 'New password (leave blank to keep)' }}</label>
            <input class="auth-input" type="password" v-model="userForm.password" autocomplete="new-password" />
            <label class="auth-label">Role</label>
            <select class="auth-input" v-model="userForm.role">
              <option value="Admins">Admins (internal staff)</option>
              <option value="Clients">Clients (customers)</option>
              <option value="Reps">Reps (AWS partner reps)</option>
            </select>
            <p v-if="userFormError" class="auth-error">{{ userFormError }}</p>
            <button class="auth-submit" type="submit" :disabled="userBusy">
              {{ userBusy ? "Saving…" : (userModalMode === 'create' ? 'Create user' : 'Save changes') }}
            </button>
          </form>
        </v-card-text>
        <v-card-actions class="modal-actions">
          <v-btn variant="text" @click="userModalOpen = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      // Active portal tab (post-login navigation)
      activeTab: "overview",
      // "View as" — admin can preview the site as a client or an AWS rep.
      // Internal is the real admin experience; the others are stubs for now.
      viewAs: "internal",
      // Impersonation — when set, the entire portal renders as if the
      // listed user was logged in. UI-only; the actual JWT is unchanged.
      impersonatedAs: null, // {email, displayName, role} | null
      viewOptions: [
        { id: "internal", label: "Internal (admin)", shortLabel: "Internal" },
        { id: "client",   label: "Client",           shortLabel: "Client view" },
        { id: "rep",      label: "AWS Partner Rep",  shortLabel: "Rep view" },
      ],
      tabsByView: {
        internal: [
          { id: "overview",   label: "Overview" },
          { id: "clients",    label: "Clients" },
          { id: "financials", label: "Financials" },
          { id: "training",   label: "Training" },
          { id: "users",      label: "Users", adminOnly: true },
          { id: "ops",        label: "Ops",   adminOnly: true },
        ],
        client: [
          { id: "overview",     label: "My Engagement" },
          { id: "training",     label: "Training" },
          { id: "deliverables", label: "Deliverables" },
          { id: "contact",      label: "Contact Us" },
        ],
        rep: [
          { id: "overview",    label: "Pipeline" },
          { id: "engagements", label: "Active Engagements" },
          { id: "reports",     label: "Reports" },
          { id: "resources",   label: "Resources" },
        ],
      },
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

      // User management
      userList: [],
      userListLoading: false,
      userListError: "",
      userModalOpen: false,
      userModalMode: "create", // 'create' | 'edit'
      userForm: { username: "", email: "", password: "", role: "Clients", displayName: "" },
      userBusy: false,
      userFormError: "",

      // Dummy consultancy KPIs + clients (replace with real data later)
      kpis: [
        { label: "Active clients",        value: "8",       sub: "+2 this quarter" },
        { label: "Monthly revenue",       value: "$74k",    sub: "+11% MoM" },
        { label: "AWS spend managed",     value: "$312k/mo", sub: "across 14 accounts" },
        { label: "Active engagements",    value: "12",      sub: "3 closing this month" },
      ],
      clients: [
        { name: "Helix Robotics",      status: "active",     focus: "Cert track — 12 engineers on SAA-C03" },
        { name: "Northwind Logistics", status: "onboarding", focus: "Migration assessment + landing zone" },
        { name: "Lumen & Co",          status: "active",     focus: "ML infra: SageMaker + Bedrock pipeline" },
        { name: "Atlas Health",        status: "paused",     focus: "Q3 follow-up · HIPAA review" },
        { name: "Brightpath Tutoring", status: "active",     focus: "Internal AWS academy + cert prep" },
        { name: "Skyline Marine",      status: "active",     focus: "IoT Greengrass + telemetry pipeline" },
        { name: "Coastal Credit Union", status: "onboarding", focus: "Landing zone + security audit" },
        { name: "Verdant Energy",      status: "active",     focus: "Cost optimization + reserved instances" },
      ],
      revenue6mo: [
        { month: "Nov", v: 42 },
        { month: "Dec", v: 48 },
        { month: "Jan", v: 52 },
        { month: "Feb", v: 61 },
        { month: "Mar", v: 67 },
        { month: "Apr", v: 74 },
      ],
      awsBreakdown: [
        { svc: "EC2",       pct: 38 },
        { svc: "S3",        pct: 22 },
        { svc: "RDS",       pct: 14 },
        { svc: "Lambda",    pct: 11 },
        { svc: "Bedrock",   pct: 8  },
        { svc: "Other",     pct: 7  },
      ],
      feed: [
        { tag: "Helix Robotics",       text: "3 engineers passed SAA-C03 (avg 87%)",    when: "2h ago" },
        { tag: "Lumen & Co",           text: "SageMaker training pipeline deployed to prod", when: "yesterday" },
        { tag: "Coastal Credit Union", text: "Landing-zone PoC kicked off",            when: "yesterday" },
        { tag: "Skyline Marine",       text: "IoT Greengrass workflow shipped",         when: "2d ago" },
        { tag: "Brightpath",           text: "12 new cards added to Linux deck",        when: "3d ago" },
        { tag: "Verdant Energy",       text: "Saved $14k/mo via RI rightsizing review", when: "4d ago" },
      ],

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
    tabs() { return this.tabsByView[this.viewAs] || this.tabsByView.internal; },
    // Always strip the unique-suffix dash from handles before display.
    // Storage keeps the full handle for uniqueness; users only ever see the prefix.
    displayHandle() {
      if (this.impersonatedAs) return this.impersonatedAs.displayName;
      if (!this.currentUser) return "";
      const h = this.currentUser.handle || "";
      if (h) return h.split("-")[0];
      const email = this.currentUser.email || "";
      return email.split("@")[0] || "user";
    },
    isAdmin() {
      // Real admin (for showing the impersonation controls / view chips / etc).
      // Impersonation does NOT change isAdmin — it changes viewAs only — so an
      // admin previewing as a client still sees the "Stop impersonating" banner.
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
    goToTab(id) {
      // If a tool is open, leaving via a tab click should close it.
      if (this.embedOpen) this.closeTool();
      this.activeTab = id;
      if (id === "users" && this.isAdmin && !this.userList.length) this.loadUsers();
    },
    setViewAs(id) {
      this.viewAs = id;
      this.activeTab = this.tabsByView[id][0].id;
      this.userMenuOpen = false;
      if (this.embedOpen) this.closeTool();
    },
    goToUsers() {
      this.viewAs = "internal";
      this.impersonatedAs = null;
      this.userMenuOpen = false;
      this.goToTab("users");
    },
    viewAsUser(u) {
      const roleToView = { Admins: "internal", Clients: "client", Reps: "rep" };
      this.impersonatedAs = {
        email: u.email,
        displayName: (u.displayName || u.email.split("@")[0]).split("-")[0],
        role: u.role || "Clients",
      };
      this.viewAs = roleToView[u.role] || "client";
      this.activeTab = this.tabsByView[this.viewAs][0].id;
      if (this.embedOpen) this.closeTool();
    },
    stopImpersonation() {
      this.impersonatedAs = null;
      this.viewAs = "internal";
      this.activeTab = this.tabsByView.internal[0].id;
    },
    // Allow short usernames like "admin" — auto-append @weatherlightadvisors.com.
    // If the input already looks like an email (has @), pass through unchanged.
    normalizeIdentifier(raw) {
      const v = (raw || "").trim();
      if (!v) return "";
      if (v.includes("@")) return v.toLowerCase();
      return `${v.toLowerCase()}@weatherlightadvisors.com`;
    },
    toolUrl(path, extra = {}) {
      // Match the tool's theme to the parent site's theme. The tools support
      // 'weatherlight' (light navy) and 'sapphire' (dark teal) — same look as
      // the parent in each mode.
      const isDark = document.documentElement.classList.contains("dark-fallback");
      const theme = isDark ? "sapphire" : "weatherlight";
      const params = new URLSearchParams({ theme, brand: "WeatherLight Advisors", ...extra });
      return `${path}?${params.toString()}`;
    },
    openTool(path, title, extra = {}) {
      this.embedSrc = this.toolUrl(path, extra);
      this.embedTitle = title;
      this.embedOpen = true;
    },
    closeTool() {
      this.embedOpen = false;
      this.embedSrc = "";
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
      // Default to dark on first visit; respect explicit choice afterwards.
      this.themeOverride = (v === "light" || v === "dark") ? v : "dark";
      this.applyThemeClass();
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
      // If a tool is currently open, reload its iframe with the new theme.
      if (this.embedOpen && this.embedSrc) {
        try {
          const url = new URL(this.embedSrc, window.location.origin);
          url.searchParams.set("theme", this.themeOverride === "dark" ? "sapphire" : "weatherlight");
          this.embedSrc = url.pathname + url.search;
        } catch (_) { /* leave as-is on parse error */ }
      }
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

    // ─────────── User management ───────────
    async loadUsers() {
      if (!this.isAdmin) return;
      this.userListLoading = true;
      this.userListError = "";
      try {
        const tokens = getTokens();
        const res = await fetch(`${config.apiBase}/admin/users`, {
          headers: { Authorization: `Bearer ${tokens.id_token}` },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        this.userList = data.users || [];
      } catch (err) {
        this.userListError = err.message || "Failed to load users";
      } finally {
        this.userListLoading = false;
      }
    },
    openCreateUser() {
      this.userModalMode = "create";
      this.userForm = { username: "", email: "", password: "", role: "Clients", displayName: "" };
      this.userFormError = "";
      this.userModalOpen = true;
    },
    openEditUser(u) {
      this.userModalMode = "edit";
      this.userForm = {
        username: u.username,
        email: u.email,
        password: "",
        role: u.role || "Clients",
        displayName: u.displayName || "",
      };
      this.userFormError = "";
      this.userModalOpen = true;
    },
    async submitUser() {
      this.userFormError = "";
      this.userBusy = true;
      try {
        const tokens = getTokens();
        const headers = {
          Authorization: `Bearer ${tokens.id_token}`,
          "Content-Type": "application/json",
        };
        if (this.userModalMode === "create") {
          if (!this.userForm.email || !this.userForm.password) {
            this.userFormError = "Email and password are required.";
            return;
          }
          const res = await fetch(`${config.apiBase}/admin/users`, {
            method: "POST",
            headers,
            body: JSON.stringify(this.userForm),
          });
          if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
        } else {
          const body = { role: this.userForm.role };
          if (this.userForm.password) body.password = this.userForm.password;
          const res = await fetch(`${config.apiBase}/admin/users/${encodeURIComponent(this.userForm.username)}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(body),
          });
          if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
        }
        this.userModalOpen = false;
        await this.loadUsers();
      } catch (err) {
        this.userFormError = err.message || "Something went wrong.";
      } finally {
        this.userBusy = false;
      }
    },
    async deleteUser(u) {
      if (!confirm(`Delete user ${u.email}? This cannot be undone.`)) return;
      try {
        const tokens = getTokens();
        const res = await fetch(`${config.apiBase}/admin/users/${encodeURIComponent(u.username)}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${tokens.id_token}` },
        });
        if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
        await this.loadUsers();
      } catch (err) {
        alert(err.message || "Delete failed");
      }
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

.logo-wordmark {
  display: inline-flex;
  align-items: baseline;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  white-space: nowrap;
}
.logo-weather { color: #1a3a6e; }
.logo-light { color: #5b9bd5; }
.logo-advisors { color: #4a5e7e; font-weight: 500; }

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

.nav-view-chips {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding-right: 0.6rem;
  border-right: 1px solid #e5edf5;
  margin-right: 0.6rem;
}
.nav-chip {
  padding: 0.4rem 0.8rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 100px;
  color: #6b7c93;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.nav-chip:hover { background: #f0f7fd; color: #1a3a6e; }
.nav-chip.active { background: #1a3a6e; color: #ffffff; border-color: #1a3a6e; }

.impersonation-banner {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  z-index: 60;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: linear-gradient(90deg, #ffaa44 0%, #ff7b3a 100%);
  color: #2a1500;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: -0.005em;
  padding: 0 1rem;
  box-shadow: 0 2px 8px rgba(255, 170, 68, 0.25);
}
.impersonation-banner strong { font-weight: 700; }
.impersonation-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2a1500;
  animation: imp-pulse 1.5s ease-in-out infinite;
}
@keyframes imp-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
}
.impersonation-stop {
  margin-left: 0.5rem;
  padding: 0.3rem 0.85rem;
  background: rgba(0, 0, 0, 0.15);
  color: #2a1500;
  border: none;
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.15s;
}
.impersonation-stop:hover { background: rgba(0, 0, 0, 0.25); }
.portal-tabs.hasBanner { top: 108px; }
.portal-tabs.hasBanner ~ .portal-page { padding-top: 11.5rem; }

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
.user-menu-shortcut {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.85rem;
  padding-top: 0.85rem !important;
  border-top: 1px solid #f0f4f9;
  font-weight: 600 !important;
}
.user-menu-icon { width: 16px; height: 16px; flex-shrink: 0; }
.user-menu-section {
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid #f0f4f9;
}
.user-menu-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #6b7c93;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.5rem 0.25rem;
}
.view-pick { font-size: 0.88rem !important; padding: 0.4rem 0.5rem !important; }
.view-pick.active {
  background: #f0f7fd !important;
  color: #1a3a6e !important;
  font-weight: 600;
}
.user-menu-signout {
  margin-top: 0.85rem;
  padding-top: 0.85rem !important;
  border-top: 1px solid #f0f4f9;
  color: #b3261e !important;
  font-weight: 500;
}

/* User management table */
.users-panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}
.users-panel-actions { display: flex; gap: 0.5rem; }
.btn-sm { padding: 0.5rem 0.95rem !important; font-size: 0.85rem !important; }
.users-empty { color: #6b7c93; font-style: italic; padding: 1rem 0; }

.users-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border: 1px solid #e0eaf5;
  border-radius: 10px;
  overflow: hidden;
}
.users-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  background: #f7fbff;
  border-bottom: 1px solid #e0eaf5;
  font-size: 0.78rem;
  font-weight: 700;
  color: #4a5e7e;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.users-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #f0f4f9;
  color: #1a3a6e;
  font-size: 0.92rem;
}
.users-table tr:last-child td { border-bottom: none; }
.users-table-actions { text-align: right; }
.btn-link {
  background: transparent;
  border: none;
  color: #2c5aa0;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
}
.btn-link:hover { background: #f0f7fd; }
.btn-link.btn-danger { color: #b3261e; }
.btn-link.btn-danger:hover { background: rgba(179, 38, 30, 0.08); }

.role-pill {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.25rem 0.65rem;
  border-radius: 100px;
}
.role-admins   { background: rgba(91, 155, 213, 0.15); color: #2c5aa0; }
.role-clients  { background: rgba(40, 200, 120, 0.12); color: #1a8a4f; }
.role-reps     { background: rgba(255, 153, 0, 0.14);  color: #b86a00; }

.status-text {
  font-size: 0.78rem;
  font-family: 'SF Mono', monospace;
  color: #4a5e7e;
}
.status-text.disabled { color: #b3261e; }

.view-banner {
  display: inline-block;
  margin-bottom: 1.25rem;
  padding: 0.45rem 0.9rem;
  background: rgba(255, 153, 0, 0.12);
  color: #c2570a;
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: -0.005em;
}

.hero {
  position: relative;
  padding: 10rem 2rem 8rem;
  background: linear-gradient(180deg, #f0f7fd 0%, #d9eaf8 50%, #c4dcf0 100%);
  overflow: hidden;
  scroll-snap-align: start;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  padding: 7rem 2rem 5rem;
  background: #ffffff;
  scroll-snap-align: start;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
/* Portal tabs — fixed below the nav, always visible, never overlap content */
.portal-tabs {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e0eaf5;
}
.portal-tabs-inner {
  display: flex;
  gap: 0.4rem;
  padding: 0.6rem 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.portal-tabs-inner::-webkit-scrollbar { display: none; }
.portal-tab {
  flex-shrink: 0;
  padding: 0.55rem 1.1rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 100px;
  color: #4a5e7e;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.portal-tab:hover { background: #f0f7fd; color: #1a3a6e; }
.portal-tab.active {
  background: #1a3a6e;
  color: #ffffff;
  border-color: #1a3a6e;
}

/* Each tab is a single page that exactly fills the viewport below the
   fixed nav + fixed tab strip. Content scrolls inside the page if it
   doesn't fit, but the body itself never scrolls. */
.portal-page {
  padding: 10rem 2rem 2rem; /* nav (70px) + tabs (~56px) + breathing room */
  height: 100vh;
  height: 100dvh;
  overflow-y: auto;
  background: #ffffff;
}

.training-h3 {
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  font-size: 1rem;
  color: #2c5aa0;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* Training Ground hero card */
.tg-hero-card {
  display: grid;
  grid-template-columns: 1fr 360px;
  align-items: center;
  gap: 2rem;
  padding: 2.25rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #f0f7fd 0%, #e6f0fa 100%);
  border: 1px solid #cfdcec;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.18s ease, border-color 0.18s, box-shadow 0.18s;
}
.tg-hero-card:hover {
  transform: translateY(-2px);
  border-color: #5b9bd5;
  box-shadow: 0 16px 40px rgba(26, 58, 110, 0.10);
}
.tg-hero-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  color: #2c5aa0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.85rem;
}
.tg-hero-title {
  font-size: clamp(1.7rem, 3vw, 2.2rem);
  font-weight: 700;
  color: #1a3a6e;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 1rem;
}
.tg-hero-desc {
  color: #4a5e7e;
  font-size: 1rem;
  line-height: 1.65;
  margin-bottom: 1.5rem;
  max-width: 560px;
}
.tg-hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: #1a3a6e;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 8px;
  transition: background 0.15s;
}
.tg-hero-card:hover .tg-hero-cta { background: #2c5aa0; }
.tg-hero-card:hover .tg-hero-cta span { transform: translateX(4px); }
.tg-hero-cta span { transition: transform 0.18s; }
.tg-hero-preview {
  width: 100%;
  height: auto;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #e0eaf5;
  box-shadow: 0 8px 24px rgba(26, 58, 110, 0.08);
}

@media (max-width: 800px) {
  .tg-hero-card { grid-template-columns: 1fr; padding: 1.75rem; }
  .tg-hero-preview { display: none; }
}
.training-tools-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}
.overview-feed {
  margin-top: 3rem;
  max-width: 760px;
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
.kpi-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.kpi-card {
  padding: 1.4rem 1.5rem;
  background: #ffffff;
  border: 1px solid #e0eaf5;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(26, 58, 110, 0.04);
}
.kpi-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: #6b7c93;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.6rem;
}
.kpi-num {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a3a6e;
  line-height: 1;
  margin-bottom: 0.4rem;
  letter-spacing: -0.02em;
}
.kpi-sub {
  font-size: 0.85rem;
  color: #2c5aa0;
}

/* Clientele */
.clients-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
.client-card {
  padding: 1.2rem 1.4rem;
  background: #ffffff;
  border: 1px solid #e0eaf5;
  border-radius: 10px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.client-card:hover { border-color: #5b9bd5; box-shadow: 0 6px 18px rgba(26, 58, 110, 0.06); }
.client-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.client-name { font-size: 1.02rem; font-weight: 700; color: #1a3a6e; letter-spacing: -0.01em; }
.client-status {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.25rem 0.65rem;
  border-radius: 100px;
}
.status-active     { background: rgba(40, 200, 120, 0.12); color: #1a8a4f; }
.status-onboarding { background: rgba(255, 153, 0, 0.14);  color: #b86a00; }
.status-paused     { background: rgba(107, 124, 147, 0.15); color: #4a5e7e; }
.client-focus { color: #4a5e7e; font-size: 0.88rem; line-height: 1.5; }

/* Finance */
.finance-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1.5rem;
}
.finance-card {
  padding: 1.75rem;
  background: #ffffff;
  border: 1px solid #e0eaf5;
  border-radius: 12px;
}
.finance-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a3a6e;
  margin-bottom: 1.5rem;
}
.finance-card-foot {
  margin-top: 1.25rem;
  font-size: 0.82rem;
  color: #6b7c93;
  font-style: italic;
}
.bar-chart {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.75rem;
  height: 220px;
  align-items: end;
}
.bar-col { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; height: 100%; }
.bar-stack {
  width: 100%;
  background: linear-gradient(180deg, #5b9bd5 0%, #1a3a6e 100%);
  border-radius: 6px 6px 2px 2px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.4rem;
  min-height: 30px;
  transition: filter 0.15s;
}
.bar-col:hover .bar-stack { filter: brightness(1.1); }
.bar-val {
  font-size: 0.72rem;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.bar-x {
  font-size: 0.78rem;
  color: #6b7c93;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Activity feed */
.feed-list {
  margin-top: 2.5rem;
  list-style: none;
  padding: 0;
  background: #ffffff;
  border: 1px solid #e0eaf5;
  border-radius: 12px;
  overflow: hidden;
}
.feed-item {
  display: grid;
  grid-template-columns: 200px 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f0f4f9;
}
.feed-item:last-child { border-bottom: none; }
.feed-tag {
  font-size: 0.78rem;
  font-weight: 700;
  color: #2c5aa0;
  letter-spacing: -0.005em;
}
.feed-text { color: #1a3a6e; font-size: 0.92rem; }
.feed-when { color: #6b7c93; font-size: 0.82rem; white-space: nowrap; }

@media (max-width: 800px) {
  .finance-grid { grid-template-columns: 1fr; }
  .feed-item { grid-template-columns: 1fr; gap: 0.3rem; }
}
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
  scroll-snap-align: end;
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

/* ───────── Embedded tool window (inline, takes over the active tab area) ───────── */
.embed-page {
  display: flex;
  flex-direction: column;
}
.embed-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e0eaf5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(26, 58, 110, 0.08);
  min-height: 0;
}
.embed-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  background: linear-gradient(180deg, #f7fbff 0%, #eef5fc 100%);
  border-bottom: 1px solid #e0eaf5;
}
.embed-back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.85rem 0.4rem 0.65rem;
  background: transparent;
  border: 1px solid #d8e6f3;
  border-radius: 6px;
  color: #1a3a6e;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.embed-back:hover { background: #ffffff; border-color: #5b9bd5; }
.embed-back svg { width: 14px; height: 14px; }
.embed-title {
  flex: 1;
  font-size: 0.92rem;
  font-weight: 600;
  color: #1a3a6e;
  letter-spacing: -0.005em;
}
.embed-close {
  width: 28px;
  height: 28px;
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
.embed-close svg { width: 16px; height: 16px; }
.embed-frame {
  flex: 1;
  width: 100%;
  border: 0;
  background: #ffffff;
  min-height: 0;
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
