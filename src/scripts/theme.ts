/**
 * Theme persistence + Astro View Transition controller.
 *
 * Animation:
 *
 * Light -> Dark
 *   old(light) circle shrink
 *
 * Dark -> Light
 *   new(light) circle expand
 */

const THEME_KEY = 'theme'

const LIGHT = 'light'
const DARK = 'dark'

let transitioning = false

function getPreferredTheme(): string {
  const stored = localStorage.getItem(THEME_KEY)

  if (stored) {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT
}

let themeValue =
  (
    window as unknown as {
      __theme?: {
        value: string
      }
    }
  ).__theme?.value ?? getPreferredTheme()

function updateThemeColor(): void {
  requestAnimationFrame(() => {
    const bg = getComputedStyle(document.body).backgroundColor

    document.querySelector("meta[name='theme-color']")?.setAttribute('content', bg)
  })
}

function applyTheme(): void {
  const root = document.documentElement

  root.classList.toggle('dark', themeValue === DARK)

  root.dataset.theme = themeValue

  updateThemeColor()
}

function persist(): void {
  localStorage.setItem(THEME_KEY, themeValue)
}

function getButtonCenter(button: Element) {
  const rect = button.getBoundingClientRect()

  return {
    x: rect.left + rect.width / 2,

    y: rect.top + rect.height / 2,
  }
}

function cleanupTransitionClass() {
  document.documentElement.classList.remove('theme-transition-dark', 'theme-transition-light')
}

function toggleTheme(button: Element): void {
  if (transitioning) {
    return
  }

  transitioning = true

  const nextIsDark = themeValue !== DARK

  themeValue = nextIsDark ? DARK : LIGHT

  const transitionClass = nextIsDark ? 'theme-transition-dark' : 'theme-transition-light'

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!document.startViewTransition || reducedMotion) {
    persist()

    applyTheme()

    cleanupTransitionClass()

    transitioning = false

    return
  }

  const { x, y } = getButtonCenter(button)

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),

    Math.max(y, window.innerHeight - y)
  )

  /*
   * Important:
   * Add class BEFORE snapshot.
   */
  document.documentElement.classList.add(transitionClass)

  const transition = document.startViewTransition(() => {
    persist()

    applyTheme()
  })

  transition.ready.then(() => {
    const expand = [`circle(20px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]

    const shrink = [`circle(${endRadius}px at ${x}px ${y}px)`, `circle(20px at ${x}px ${y}px)`]

    document.documentElement.animate(
      {
        clipPath: nextIsDark ? shrink : expand,
      },

      {
        duration: 500,

        easing: 'cubic-bezier(0.4,0,0.2,1)',

        fill: 'forwards',

        pseudoElement: nextIsDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
      }
    )
  })

  transition.finished
    .then(() => {
      cleanupTransitionClass()

      transitioning = false
    })

    .catch(() => {
      cleanupTransitionClass()

      transitioning = false
    })
}

function setup() {
  applyTheme()
}

setup()

/*
 * Astro View Transition
 */

document.addEventListener('astro:after-swap', setup)

/*
 * Theme button delegation
 */

document.addEventListener('click', (event) => {
  const target = event.target

  if (!(target instanceof Element)) {
    return
  }

  const button = target.closest('[data-theme-toggle]')

  if (!button) {
    return
  }

  toggleTheme(button)
})

/*
 * Preserve Android browser theme color
 */

document.addEventListener('astro:before-swap', (event) => {
  const color = document.querySelector("meta[name='theme-color']")?.getAttribute('content')

  if (!color) {
    return
  }

  const newDocument = (
    event as {
      newDocument: Document
    }
  ).newDocument

  newDocument.querySelector("meta[name='theme-color']")?.setAttribute('content', color)
})

/*
 * Sync OS theme changes
 */

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
  themeValue = matches ? DARK : LIGHT

  persist()

  applyTheme()
})
