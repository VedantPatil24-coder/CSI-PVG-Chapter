# CSI–PVG Student Chapter Website

The official digital presence of the **Computer Society of India (CSI) – PVG Student Chapter**, PVG's College of Engineering and Technology, Pune.

A platform built to connect students through technology, innovation, collaboration, and community-driven learning.

## Overview

The CSI–PVG Student Chapter website serves as a central platform for showcasing the chapter's activities, technical initiatives, events, projects, and community.

Designed with a modern, dark retro-computing aesthetic, the website combines interactive 3D elements, responsive layouts, and subtle animations to create an engaging digital experience.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js (App Router) | Frontend framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Motion | Animations and interactions |
| React Three Fiber | 3D rendering |
| Three.js | 3D graphics |
| Lucide React | Icons |
| shadcn-style components | Reusable UI components |

## Features

- **Interactive Hero Section:** Custom 3D recreation of a 1990s CRT workstation.
- **Responsive Design:** Optimized layouts and navigation for desktop, tablet, and mobile devices.
- **About the Chapter:** Introduction, vision, and mission.
- **Technical Domains:** Explore different areas of technology and development.
- **Projects:** Showcase innovative ideas and student-led projects.
- **Events:** Discover chapter events, workshops, and technical activities.
- **Community:** Information about joining and participating in the chapter.
- **Animations:** Smooth transitions, subtle motion effects, and interactive elements.
- **Accessibility:** Reduced-motion support and CSS fallbacks for the 3D experience.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 20.9 or later
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/VedantPatil24-coder/CSI-PVG-Chapter.git
```

**2. Navigate to the project directory**

```bash
cd CSI-PVG-Chapter/csi-pvg-chapter
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the website**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

To create an optimized production build:

```bash
npm run build
```

To run the production server locally:

```bash
npm start
```

## Deployment

The website is deployed using **Vercel**.

The GitHub repository can be connected to Vercel for continuous deployment. New changes pushed to the configured production branch can automatically trigger a new deployment.

## Project Structure

```text
csi-pvg-chapter/
├── public/              # Static assets and images
├── src/
│   ├── app/             # Next.js App Router
│   ├── components/      # Reusable UI components
│   └── lib/             # Utility functions
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

*The directory structure above represents the main application organization.*

## Design Philosophy

The website follows a retro-computing-inspired visual direction, combining:

- Charcoal and graphite backgrounds.
- Restrained signal-blue accents.
- Warm CRT-inspired beige tones.
- Bold typography.
- Interactive 3D elements.
- Minimal, purposeful animations.

The design aims to balance nostalgia with a contemporary technical identity.

## Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Commit your changes.

```bash
git add .
git commit -m "Add: your feature description"
```

5. Push your branch.

```bash
git push origin feature/your-feature-name
```

6. Open a Pull Request for review.

## Acknowledgements

Built and maintained for the CSI–PVG Student Chapter community.

**Computer Society of India – PVG Student Chapter**  
PVG's College of Engineering and Technology, Pune.

---

*Connecting learning, innovation, and industry.*
