// Detect Dark Reader (or any extension that's force-darkening the page)
// and flip a body class so we render the sapphire-nexus-style fallback theme.

function styleSignal() {
  return !!document.querySelector('style[class*="darkreader"], meta[name="darkreader-mode"]');
}

function probeSignal() {
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;background:#ffffff;color:#000000;pointer-events:none;";
  document.body.appendChild(probe);
  const bg = getComputedStyle(probe).backgroundColor;
  document.body.removeChild(probe);
  // backgroundColor on a #ffffff element should parse near rgb(255, 255, 255).
  // If it's anything noticeably darker, an extension is rewriting styles.
  const m = bg.match(/rgb[a]?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return false;
  const [r, g, b] = [+m[1], +m[2], +m[3]];
  return r < 240 || g < 240 || b < 240;
}

export function isDarkReaderActive() {
  return styleSignal() || probeSignal();
}

export function applyDarkFallback() {
  document.documentElement.classList.add("dark-fallback");
}

export function detectAndApply() {
  const check = () => {
    if (isDarkReaderActive()) applyDarkFallback();
  };
  // Check now, then again after a moment, then once more after full load —
  // some extensions inject styles after our scripts run.
  check();
  setTimeout(check, 250);
  setTimeout(check, 1500);
}
