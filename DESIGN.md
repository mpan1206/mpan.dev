---
version: alpha
name: Astro App
description: A modern, minimalist Astro project using Shadcn UI
colors:
  background: 'oklch(1 0 0)'
  background-dark: 'oklch(0.145 0 0)'
  foreground: 'oklch(0.145 0 0)'
  foreground-dark: 'oklch(0.985 0 0)'
  primary: 'oklch(0.205 0 0)'
  primary-dark: 'oklch(0.922 0 0)'
  secondary: 'oklch(0.97 0 0)'
  secondary-dark: 'oklch(0.269 0 0)'
  muted: 'oklch(0.97 0 0)'
  muted-dark: 'oklch(0.269 0 0)'
  destructive: 'oklch(0.577 0.245 27.325)'
  destructive-dark: 'oklch(0.704 0.191 22.216)'
  border: 'oklch(0.922 0 0)'
  border-dark: 'oklch(1 0 0 / 10%)'
typography:
  sans:
    fontFamily: "'Inter Variable', sans-serif"
rounded:
  base: '0.625rem'
  sm: 'calc(0.625rem * 0.6)'
  md: 'calc(0.625rem * 0.8)'
  lg: '0.625rem'
  xl: 'calc(0.625rem * 1.4)'
spacing:
  base: '0.25rem'
---

# Astro App Design System

## Overview

This project adopts a modern, minimalist, and highly accessible design language, heavily influenced by Shadcn UI and utilizing Tailwind CSS v4 conventions.

The brand tone is **professional, sleek, and developer-centric**. By leveraging the OKLCH color space with mostly zero chroma (pure grays/monochrome), the interface delivers a stark, high-contrast visual experience that puts content first. The only vibrant exceptions are semantic colors (e.g., destructive actions), which instantly draw the user's attention.

Key visual characteristics include:

- **Subtle Affordances**: Interactive elements rely on delicate hover states, focus rings, and micro-interactions (like `translate-y-px` on active states) rather than heavy drop shadows.
- **Native Dark Mode**: First-class support for dark mode, gracefully inverting the monochromatic scale while maintaining accessibility and contrast ratios.

## Colors

The project's styling leverages CSS variables defined in the `oklch` color space. This ensures uniform perceptual lightness across both light and dark themes.

- **Background & Foreground**: Pure white (`oklch(1 0 0)`) background in light mode paired with near-black text, swapping to a deep dark gray (`oklch(0.145 0 0)`) in dark mode.
- **Primary / Accent**: Used for primary actions and highlights, mapped to strong contrast grays.
- **Destructive**: A carefully tuned red (`oklch(0.577 0.245 27.325)`) to clearly demarcate irreversible or dangerous actions.
- **Borders**: Subtle borders (`oklch(0.922 0 0)`) ensure elements are cleanly separated.

## Typography

- **Primary Font**: The `{typography.sans.fontFamily}` font is used exclusively. It is a highly legible, versatile typeface optimized for screen interfaces.
- **Hierarchy**: Uses standard Tailwind typography utilities to manage scale, keeping line heights breathable and font weights purposeful.

## Layout

- Relies on Tailwind's core spacing scale.
- Layouts prominently feature modern Flexbox and CSS Grid patterns (e.g., `flex min-h-svh p-6` for full viewport-height wrappers).
- Fluid spacing and gaps (`gap-4`, `p-6`) maintain rhythm and breathing room between elements.

## Elevation & Depth

- The UI avoids deep shadows, preferring flat design with borders and subtle background shifts.
- Focus states are communicated via distinct outer rings (`focus-visible:ring-3 focus-visible:ring-ring/50`) rather than elevation changes, supporting keyboard navigation clearly.

## Shapes

- **Refined Geometry**: A consistent base border radius of `{rounded.base}` provides a friendly yet structured feel across all container components.
- Buttons, inputs, and cards all align their inner and outer radiuses mathematically (e.g., `sm`, `md`, `lg` variants).

## Components

### Buttons

Buttons are the core interactive primitive, built with full accessibility in mind and managed via `class-variance-authority` (cva).

**Interaction States:**

- **Hover**: Subtle background opacity changes (e.g., `hover:bg-primary/80`).
- **Focus**: Distinct outer ring for keyboard navigation.
- **Active**: Physical button press simulation (`active:translate-y-px`).
- **Disabled**: Reduced opacity (`opacity-50`) and disabled pointer events.

**Variants:**

1. **Default**: High contrast (Primary background, Primary foreground text).
2. **Outline**: Transparent background with a distinct border. Ideal for secondary or alternative actions.
3. **Secondary**: Muted background color for less prominent actions.
4. **Ghost**: No background or border until hovered; perfect for toolbars and tertiary actions.
5. **Destructive**: Danger-themed styling for critical actions like delete or remove.
6. **Link**: Underlined text that mimics native anchor tags.

**Sizes:**

- `default` (`h-8`), `xs` (`h-6`), `sm` (`h-7`), `lg` (`h-9`).
- `icon`: Square aspect ratios (`size-6` to `size-9`) specifically designed for icon-only buttons.

## Do's and Don'ts

- **Do** use OKLCH colors exclusively when introducing new palette values to maintain perceptual uniformity.
- **Do** wrap interactive elements with `focus-visible` ring utilities to ensure keyboard accessibility.
- **Don't** mix multiple font families. Stick strictly to `{typography.sans.fontFamily}`.
- **Don't** add arbitrary drop shadows. Rely on borders, background shifts, and ring states for spatial separation.
