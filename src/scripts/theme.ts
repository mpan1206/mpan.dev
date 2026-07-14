/**
 * Theme persistence script.
 * Re-applies the stored theme after Astro view-transition swaps
 * so the dark class stays in sync with localStorage.
 */

const THEME_KEY = 'theme'
const LIGHT = 'light'
const DARK = 'dark'

function getPreferredTheme(): string {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT
}

// Reuse the value already set by the inline FOUC-prevention script if available.
let themeValue: string =
  (window as unknown as { __theme?: { value: string } }).__theme?.value ?? getPreferredTheme()

function persist(): void {
  localStorage.setItem(THEME_KEY, themeValue)
  reflect()
}

function reflect(): void {
  const root = document.firstElementChild
  root?.setAttribute('data-theme', themeValue)
  root?.classList.toggle('dark', themeValue === DARK)

  // Fill <meta name="theme-color"> with the computed background colour so
  // Android's browser chrome matches the page background.
  const bg = window.getComputedStyle(document.body).backgroundColor
  document.querySelector("meta[name='theme-color']")?.setAttribute('content', bg)
}

// Toggle the theme, with a circular view-transition reveal from the click point
// when the browser supports it and the user hasn't requested reduced motion.
function toggleTheme(event: MouseEvent): void {
  const nextIsDark = themeValue !== DARK
  themeValue = nextIsDark ? DARK : LIGHT

  if (
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    persist()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(() => persist())

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]

    document.documentElement.animate(
      { clipPath: nextIsDark ? [...clipPath].reverse() : clipPath },
      {
        duration: 400,
        easing: 'ease-out',
        fill: 'forwards',
        pseudoElement: nextIsDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
      }
    )
  })
}

function setup(): void {
  reflect()
}

setup()

// Re-run after View Transitions navigation.
document.addEventListener('astro:after-swap', setup)

// The header renders a theme button for desktop and one for mobile (dynamically).
// Use event delegation to handle clicks on dynamically mounted toggles.
document.addEventListener('click', (event) => {
  const btn = (event.target as Element).closest('[data-theme-toggle]')
  if (btn) {
    toggleTheme(event as MouseEvent)
  }
})

// Carry the theme-color value across View Transitions to prevent the
// Android navigation bar from flashing during page transitions.
document.addEventListener('astro:before-swap', (event) => {
  const color = document.querySelector("meta[name='theme-color']")?.getAttribute('content')
  if (color) {
    ;(event as { newDocument: Document }).newDocument
      .querySelector("meta[name='theme-color']")
      ?.setAttribute('content', color)
  }
})

// Sync with OS-level dark/light preference changes.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
  themeValue = matches ? DARK : LIGHT
  persist()
})
