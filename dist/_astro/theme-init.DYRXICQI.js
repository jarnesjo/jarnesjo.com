// Runs before the page renders, so dark mode never flashes white.
// Loaded as a blocking classic script in the layout head, not inline, so the
// Content-Security-Policy needs no hash for it (see README).
const theme = localStorage.getItem('theme') || 'system'
const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
if (isDark) document.documentElement.classList.add('dark')
