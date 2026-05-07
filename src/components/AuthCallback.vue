<template>
  <div class="callback-page">
    <div class="callback-card">
      <div class="spinner"></div>
      <p v-if="!error">Signing you in…</p>
      <div v-else class="error">
        <p><strong>Sign-in failed.</strong></p>
        <p class="error-detail">{{ error }}</p>
        <button class="btn-back" @click="$router.push('/')">Back to site</button>
      </div>
    </div>
  </div>
</template>

<script>
import { exchangeCodeForTokens, fetchMe } from "@/auth";

export default {
  data() {
    return { error: null };
  },
  async mounted() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const oauthError = url.searchParams.get("error_description") || url.searchParams.get("error");
    if (oauthError) {
      this.error = oauthError;
      return;
    }
    if (!code) {
      this.error = "Missing authorization code";
      return;
    }
    try {
      await exchangeCodeForTokens(code);
      await fetchMe();
      this.$router.replace("/");
    } catch (err) {
      console.error(err);
      this.error = err.message || String(err);
    }
  },
};
</script>

<style scoped>
.callback-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #f7fbff 0%, #e6f0fa 100%);
}

.callback-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 3rem 2.5rem;
  text-align: center;
  box-shadow: 0 12px 40px rgba(26, 58, 110, 0.12);
  border: 1px solid rgba(26, 58, 110, 0.08);
  min-width: 320px;
  color: #1a3a6e;
}

.spinner {
  width: 38px;
  height: 38px;
  border: 3px solid rgba(91, 155, 213, 0.25);
  border-top-color: #5b9bd5;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error { color: #b3261e; }
.error-detail { color: #6b7c93; font-size: 0.9rem; margin-top: 0.5rem; }

.btn-back {
  margin-top: 1.5rem;
  padding: 0.6rem 1.25rem;
  background: linear-gradient(135deg, #1a3a6e 0%, #2c5aa0 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
</style>
