# CSI–PVG Chapter website starter

A dark, premium retro-computing starter homepage for the CSI–PVG Chapter technical community. Built with Next.js App Router, TypeScript, Tailwind CSS v4, Motion, shadcn-style local button components, Lucide React and React Three Fiber.

## Requirements

- Node.js 20.9+ (recommended: current LTS)
- npm
- VS Code (recommended)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

## What's included

- Responsive homepage and mobile navigation
- Hero with a custom 3D 1990s CRT workstation scene
- Technical domains bento-style grid
- Project concept cards
- Events section
- Community and join sections
- Reduced-motion CSS support
- Local reusable button component and `cn()` utility

## Important content to replace before launch

This is a visual starter, not an official chapter publication. Replace the sample project concepts, tentative event names, generic GitHub destination and `chapter@example.com` with verified CSI–PVG information. Add the official logo, social links, team names, approved chapter description and actual event registration URLs.

## Notes

- The 3D hero uses WebGL. If a device cannot render it, a CSS fallback orb is shown while the scene loads; you can extend this with a full static poster if needed.
- shadcn/ui is a component-copying workflow. This starter includes a small local button component styled in that spirit, rather than importing the entire shadcn library. You can initialize the official CLI later and add components as needed.
- React Bits and Magic UI are optional. The starter deliberately uses custom components first, so no paid component catalog is required.


## Visual direction

The current direction uses a charcoal/graphite base, restrained signal-blue accents, warm CRT beige and bold sans-serif typography. The hero features a custom Three.js recreation of a 1990s CRT workstation with keyboard, mouse and floppy disk. The scene includes subtle pointer parallax, slow product-style motion, a scan-lined blue terminal display, studio lighting, a restrained drafting frame, sparse dust particles, a floor plane and contact shadows. The visual effects are intentionally low-saturation rather than neon.

The blue accent is a design choice, not an official CSI brand color. Replace it with approved chapter branding if needed.
