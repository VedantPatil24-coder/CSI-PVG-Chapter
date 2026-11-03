"use client";

import { useEffect, useRef } from "react";

interface WrapArrow {
  side: number;
  pos: number;
  dir: number;
  glowing?: boolean;
}

interface HudHexagon {
  id: string;
  x: number;
  y: number;
  r: number;
  outerWrapR: number;
  type: string;
  rings: number[];
  hasOuterWrap: boolean;
  wrapArrows: WrapArrow[];
  rotation: number;
  rotSpeed: number;
  energy: number;
  chromaticFlare?: boolean;
}

interface PCBTrace {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  hasPad: boolean;
}

interface PCBHexagon {
  id: string;
  x: number;
  y: number;
  r: number;
  hasChip: boolean;
  chipSize: number;
  outerFrame: boolean;
  outerRadius?: number;
  energy: number;
  traces: PCBTrace[];
}

interface Point {
  x: number;
  y: number;
}

interface Notch {
  x: number;
  y: number;
  count: number;
  spacing: number;
}

interface CircuitPath {
  id: string;
  style: "highway" | "primary" | "secondary" | "bus";
  width: number;
  hatched?: boolean;
  points: Point[];
  notches?: Notch[];
}

interface TerminalNode {
  x: number;
  y: number;
  r: number;
  flare: number;
  chromatic: boolean;
}

interface ChevronGroup {
  x: number;
  y: number;
  size: number;
  spacing: number;
  dir: number;
  glowing: boolean;
  count: number;
}

interface BarcodeGroup {
  x: number;
  y: number;
  groups: number;
  barsPerGroup: number;
  height: number;
}

interface IsoCube {
  x: number;
  y: number;
  r: number;
  phase: number;
}

interface AmbientHex {
  x: number;
  y: number;
  r: number;
}

interface Shockwave {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
}

interface DataPacket {
  pathIndex: number;
  progress: number;
  speed: number;
  dir: number;
  size: number;
  boost: number;
  temporary?: boolean;
}

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Current tuned settings
    const lineGlowMult = 0.55;
    const bgDensityMult = 1.05;

    // Reference virtual coordinate system (1600 x 1140 matches artwork aspect ratio)
    const REF_W = 1600;
    const REF_H = 1140;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;

    const pointer = {
      x: width * 0.72,
      y: height * 0.55,
      targetX: width * 0.72,
      targetY: height * 0.55,
      normX: 0.72,
      normY: 0.55,
      active: false,
      lastMove: 0,
    };

    let globalSurge = 0;
    const shockwaves: Shockwave[] = [];
    const dataPackets: DataPacket[] = [];

    // Concentric & HUD Hexagons
    const hudHexagons: HudHexagon[] = [
      {
        id: "hex-top-right",
        x: 1372,
        y: 204,
        r: 108,
        outerWrapR: 138,
        type: "pcb-hero",
        rings: [1.0, 0.88, 0.76],
        hasOuterWrap: true,
        wrapArrows: [
          { side: 5, pos: 0.85, dir: 1 },
          { side: 2, pos: 0.75, dir: 1 },
        ],
        rotation: 0,
        rotSpeed: 0.0025,
        energy: 0,
      },
      {
        id: "hex-mid-center",
        x: 1068,
        y: 595,
        r: 72,
        outerWrapR: 88,
        type: "concentric",
        rings: [1.0, 0.82, 0.65, 0.48, 0.34],
        hasOuterWrap: true,
        wrapArrows: [{ side: 2, pos: 0.65, dir: 1 }],
        rotation: 0.4,
        rotSpeed: -0.0035,
        energy: 0,
      },
      {
        id: "hex-far-right",
        x: 1518,
        y: 552,
        r: 105,
        outerWrapR: 122,
        type: "concentric-heavy",
        rings: [1.0, 0.86, 0.72, 0.56, 0.4],
        hasOuterWrap: true,
        wrapArrows: [],
        rotation: 1.1,
        rotSpeed: 0.002,
        energy: 0,
      },
      {
        id: "hex-bottom-hero",
        x: 1188,
        y: 928,
        r: 134,
        outerWrapR: 168,
        type: "hero-core",
        rings: [1.0, 0.88, 0.77, 0.64, 0.51, 0.38, 0.25],
        hasOuterWrap: true,
        wrapArrows: [
          { side: 1, pos: 0.62, dir: -1, glowing: true },
          { side: 3, pos: 0.45, dir: -1, glowing: true },
        ],
        chromaticFlare: true,
        rotation: 0,
        rotSpeed: 0.003,
        energy: 0,
      },
      {
        id: "hex-bottom-mid",
        x: 862,
        y: 1026,
        r: 74,
        outerWrapR: 92,
        type: "concentric",
        rings: [1.0, 0.83, 0.66, 0.48, 0.32],
        hasOuterWrap: true,
        wrapArrows: [{ side: 1, pos: 0.58, dir: -1 }],
        rotation: 2.1,
        rotSpeed: -0.003,
        energy: 0,
      },
      {
        id: "hex-bottom-left-mid",
        x: 658,
        y: 982,
        r: 58,
        outerWrapR: 70,
        type: "ring-arrows",
        rings: [1.0, 0.84],
        hasOuterWrap: false,
        wrapArrows: [],
        rotation: 0.8,
        rotSpeed: 0.004,
        energy: 0,
      },
      {
        id: "hex-bottom-left-small",
        x: 444,
        y: 1076,
        r: 44,
        outerWrapR: 52,
        type: "simple-double",
        rings: [1.0, 0.78],
        hasOuterWrap: false,
        wrapArrows: [],
        rotation: 0,
        rotSpeed: 0.002,
        energy: 0,
      },
      {
        id: "hex-bottom-far-right",
        x: 1468,
        y: 1038,
        r: 72,
        outerWrapR: 84,
        type: "ring-arrows",
        rings: [1.0, 0.85],
        hasOuterWrap: false,
        wrapArrows: [],
        rotation: 1.5,
        rotSpeed: -0.0035,
        energy: 0,
      },
    ];

    function createPCBTraces(seedCount: number, radius: number): PCBTrace[] {
      const traces: PCBTrace[] = [];
      const angles = [
        0,
        Math.PI / 3,
        (2 * Math.PI) / 3,
        Math.PI,
        (4 * Math.PI) / 3,
        (5 * Math.PI) / 3,
      ];
      for (let i = 0; i < seedCount; i++) {
        const a1 = angles[i % 6];
        const dist1 = radius * (0.22 + ((i * 37) % 35) / 100);
        const dist2 = radius * (0.55 + ((i * 53) % 32) / 100);
        const offset = ((i % 5) - 2) * (radius * 0.11);
        const perp = a1 + Math.PI / 2;

        const x1 = Math.cos(a1) * dist1 + Math.cos(perp) * offset;
        const y1 = Math.sin(a1) * dist1 + Math.sin(perp) * offset;
        const x2 = Math.cos(a1) * dist2 + Math.cos(perp) * offset;
        const y2 = Math.sin(a1) * dist2 + Math.sin(perp) * offset;

        const bendAngle = a1 + (i % 2 === 0 ? Math.PI / 3 : -Math.PI / 3);
        const x3 = x2 + Math.cos(bendAngle) * (radius * 0.18);
        const y3 = y2 + Math.sin(bendAngle) * (radius * 0.18);

        traces.push({ x1, y1, x2, y2, x3, y3, hasPad: i % 2 === 0 });
      }
      return traces;
    }

    const heroPCBTraces = createPCBTraces(28, 82);

    const pcbHexagons: PCBHexagon[] = [
      {
        id: "pcb-mid-upper",
        x: 1308,
        y: 492,
        r: 52,
        hasChip: true,
        chipSize: 16,
        outerFrame: false,
        energy: 0,
        traces: createPCBTraces(18, 52 * 0.85),
      },
      {
        id: "pcb-far-right-upper",
        x: 1548,
        y: 342,
        r: 35,
        hasChip: true,
        chipSize: 10,
        outerFrame: false,
        energy: 0,
        traces: createPCBTraces(20, 35 * 0.85),
      },
      {
        id: "pcb-center-low",
        x: 858,
        y: 772,
        r: 52,
        hasChip: false,
        chipSize: 0,
        outerFrame: true,
        energy: 0,
        traces: createPCBTraces(22, 52 * 0.85),
      },
      {
        id: "pcb-right-low",
        x: 1468,
        y: 778,
        r: 54,
        hasChip: true,
        chipSize: 15,
        outerFrame: true,
        outerRadius: 72,
        energy: 0,
        traces: createPCBTraces(24, 54 * 0.85),
      },
    ];

    const circuitPaths: CircuitPath[] = [
      {
        id: "highway-top",
        style: "highway",
        width: 9,
        hatched: true,
        points: [
          { x: 1262, y: 64 },
          { x: 1450, y: 64 },
          { x: 1532, y: 204 },
          { x: 1450, y: 344 },
          { x: 1258, y: 344 },
          { x: 1188, y: 465 },
          { x: 1026, y: 465 },
        ],
        notches: [{ x: 1365, y: 344, count: 3, spacing: 18 }],
      },
      {
        id: "branch-top-right-edge",
        style: "secondary",
        width: 2.5,
        points: [
          { x: 1450, y: 344 },
          { x: 1640, y: 344 },
        ],
      },
      {
        id: "bus-hex1-down",
        style: "bus",
        width: 2,
        points: [
          { x: 1360, y: 298 },
          { x: 1360, y: 428 },
          { x: 1396, y: 490 },
          { x: 1428, y: 490 },
        ],
      },
      {
        id: "track-mid-center",
        style: "primary",
        width: 4,
        points: [
          { x: 906, y: 690 },
          { x: 1106, y: 690 },
          { x: 1152, y: 610 },
          { x: 1112, y: 540 },
        ],
        notches: [{ x: 1030, y: 696, count: 3, spacing: 16 }],
      },
      {
        id: "bus-pcb-mid-down",
        style: "bus",
        width: 2,
        points: [
          { x: 1308, y: 544 },
          { x: 1308, y: 660 },
          { x: 1286, y: 695 },
          { x: 1286, y: 735 },
        ],
      },
      {
        id: "track-mid-right-chev",
        style: "primary",
        width: 3,
        points: [
          { x: 1230, y: 652 },
          { x: 1372, y: 652 },
          { x: 1422, y: 738 },
          { x: 1620, y: 738 },
        ],
      },
      {
        id: "track-mid-outer",
        style: "secondary",
        width: 2,
        points: [
          { x: 1320, y: 608 },
          { x: 1428, y: 608 },
          { x: 1485, y: 706 },
          { x: 1580, y: 706 },
        ],
      },
      {
        id: "highway-lower-arch",
        style: "highway",
        width: 9,
        hatched: true,
        points: [
          { x: 934, y: 868 },
          { x: 1012, y: 735 },
          { x: 1318, y: 735 },
          { x: 1416, y: 904 },
        ],
      },
      {
        id: "highway-lower-wrap",
        style: "primary",
        width: 3.5,
        points: [
          { x: 1416, y: 904 },
          { x: 1368, y: 986 },
          { x: 1415, y: 1068 },
          { x: 1272, y: 1068 },
          { x: 1105, y: 1068 },
          { x: 1020, y: 928 },
        ],
      },
      {
        id: "branch-left-upper",
        style: "secondary",
        width: 2.5,
        points: [
          { x: 580, y: 788 },
          { x: 760, y: 788 },
          { x: 806, y: 868 },
          { x: 934, y: 868 },
        ],
      },
      {
        id: "highway-left-chev",
        style: "highway",
        width: 8,
        hatched: true,
        points: [
          { x: 530, y: 872 },
          { x: 716, y: 872 },
          { x: 748, y: 926 },
        ],
      },
      {
        id: "branch-far-left-top",
        style: "secondary",
        width: 2.5,
        points: [
          { x: 85, y: 928 },
          { x: 378, y: 928 },
          { x: 432, y: 982 },
          { x: 585, y: 982 },
        ],
      },
      {
        id: "branch-far-left-mid",
        style: "primary",
        width: 3,
        points: [
          { x: 152, y: 992 },
          { x: 492, y: 992 },
          { x: 536, y: 1044 },
        ],
      },
      {
        id: "branch-far-left-bottom",
        style: "secondary",
        width: 2,
        points: [
          { x: -40, y: 1068 },
          { x: 238, y: 1068 },
          { x: 278, y: 1118 },
          { x: 392, y: 1118 },
        ],
      },
      {
        id: "branch-bottom-center-wrap",
        style: "secondary",
        width: 2.5,
        points: [
          { x: 748, y: 926 },
          { x: 816, y: 926 },
          { x: 768, y: 1026 },
          { x: 816, y: 1112 },
          { x: 912, y: 1112 },
        ],
      },
    ];

    const terminalNodes: TerminalNode[] = [
      { x: 1262, y: 64, r: 14, flare: 1.3, chromatic: true },
      { x: 1258, y: 344, r: 13, flare: 1.2, chromatic: true },
      { x: 1026, y: 465, r: 14, flare: 1.2, chromatic: true },
      { x: 906, y: 690, r: 14, flare: 1.25, chromatic: true },
      { x: 1372, y: 652, r: 10, flare: 0.9, chromatic: false },
      { x: 934, y: 868, r: 15, flare: 1.25, chromatic: false },
      { x: 748, y: 926, r: 15, flare: 1.2, chromatic: false },
      { x: 378, y: 928, r: 11, flare: 1.1, chromatic: false },
      { x: 152, y: 992, r: 15, flare: 1.2, chromatic: false },
      { x: 536, y: 1044, r: 12, flare: 0.8, chromatic: false },
      { x: 1272, y: 1068, r: 16, flare: 1.3, chromatic: true },
      { x: 1416, y: 904, r: 14, flare: 1.35, chromatic: true },
    ];

    const chevronGroups: ChevronGroup[] = [
      { x: 515, y: 872, size: 11, spacing: 18, dir: -1, glowing: true, count: 3 },
      { x: 605, y: 788, size: 8, spacing: 14, dir: -1, glowing: false, count: 3 },
      { x: 165, y: 928, size: 9, spacing: 26, dir: -1, glowing: false, count: 3 },
      { x: 325, y: 992, size: 9, spacing: 16, dir: -1, glowing: false, count: 3 },
      { x: 140, y: 1068, size: 7, spacing: 12, dir: -1, glowing: false, count: 3 },
      { x: 1258, y: 652, size: 8, spacing: 14, dir: -1, glowing: false, count: 3 },
      { x: 1155, y: 735, size: 8, spacing: 14, dir: -1, glowing: true, count: 3 },
    ];

    const barcodeGroups: BarcodeGroup[] = [
      { x: 1312, y: 682, groups: 3, barsPerGroup: 4, height: 10 },
      { x: 1192, y: 778, groups: 3, barsPerGroup: 4, height: 10 },
      { x: 808, y: 896, groups: 4, barsPerGroup: 4, height: 11 },
      { x: 568, y: 1088, groups: 4, barsPerGroup: 5, height: 13 },
    ];

    const isoCubes: IsoCube[] = [
      { x: 1182, y: 650, r: 18, phase: 0.2 },
      { x: 1554, y: 260, r: 16, phase: 1.4 },
      { x: 1574, y: 882, r: 17, phase: 2.8 },
      { x: 984, y: 1102, r: 17, phase: 4.1 },
    ];

    const ambientHexes: AmbientHex[] = [
      { x: 412, y: 318, r: 14 },
      { x: 438, y: 334, r: 14 },
      { x: 368, y: 495, r: 14 },
      { x: 392, y: 545, r: 14 },
      { x: 372, y: 572, r: 14 },
      { x: 396, y: 595, r: 14 },
      { x: 602, y: 605, r: 14 },
      { x: 752, y: 492, r: 14 },
      { x: 752, y: 522, r: 14 },
      { x: 885, y: 392, r: 14 },
      { x: 912, y: 408, r: 14 },
      { x: 518, y: 725, r: 14 },
      { x: 256, y: 792, r: 14 },
      { x: 282, y: 808, r: 14 },
    ];

    function initDataPackets() {
      dataPackets.length = 0;
      circuitPaths.forEach((path, idx) => {
        const count = path.style === "highway" ? 3 : 1;
        for (let i = 0; i < count; i++) {
          dataPackets.push({
            pathIndex: idx,
            progress: (i / count + idx * 0.17) % 1,
            speed:
              (path.style === "highway" ? 0.0022 : 0.0016) *
              (0.85 + (i % 3) * 0.15),
            dir: idx >= 9 ? -1 : 1,
            size: path.style === "highway" ? 4.5 : 3,
            boost: 0,
          });
        }
      });
    }
    initDataPackets();

    function updateDimensions() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scaleX = width / REF_W;
      const scaleY = height / REF_H;
      scale = Math.max(scaleX * 0.92, scaleY * 0.96);

      offsetX = width - REF_W * scale;
      offsetY = height - REF_H * scale;
    }

    updateDimensions();

    function toScreen(rx: number, ry: number, parallaxFactor = 1) {
      const px = (pointer.normX - 0.5) * -18 * parallaxFactor;
      const py = (pointer.normY - 0.5) * -18 * parallaxFactor;
      return {
        x: offsetX + rx * scale + px,
        y: offsetY + ry * scale + py,
      };
    }

    function handlePointerMove(clientX: number, clientY: number) {
      pointer.targetX = clientX;
      pointer.targetY = clientY;
      pointer.normX = clientX / Math.max(1, width);
      pointer.normY = clientY / Math.max(1, height);
      pointer.active = true;
      pointer.lastMove = performance.now();
    }

    function triggerPulse(clientX: number, clientY: number) {
      handlePointerMove(clientX, clientY);
      globalSurge = 1.0;

      shockwaves.push({
        x: clientX,
        y: clientY,
        r: 8,
        maxR: Math.max(width, height) * 0.75,
        alpha: 1.0,
      });

      circuitPaths.forEach((path, idx) => {
        dataPackets.push({
          pathIndex: idx,
          progress: idx >= 9 ? 0.98 : 0.02,
          speed: 0.0075 + Math.random() * 0.004,
          dir: idx >= 9 ? -1 : 1,
          size: path.style === "highway" ? 6 : 4,
          boost: 1.0,
          temporary: true,
        });
      });

      hudHexagons.forEach((h) => {
        h.energy = Math.min(1.5, h.energy + 0.9);
      });
      pcbHexagons.forEach((h) => {
        h.energy = Math.min(1.5, h.energy + 0.9);
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("input") ||
        target?.closest("textarea")
      ) {
        return;
      }
      triggerPulse(e.clientX, e.clientY);
    };

    const onTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("input") ||
        target?.closest("textarea")
      ) {
        return;
      }
      if (e.touches.length > 0) {
        triggerPulse(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("resize", updateDimensions);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    function traceFlatHex(
      cx: number,
      cy: number,
      r: number,
      rotationOffset = 0
    ) {
      if (!ctx) return;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 + rotationOffset;
        const vx = cx + Math.cos(angle) * r;
        const vy = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
    }

    function drawBackground(time: number) {
      if (!ctx) return;
      // 1. Base deep abyssal navy gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#010409");
      bgGrad.addColorStop(0.45, "#020813");
      bgGrad.addColorStop(0.8, "#030d1e");
      bgGrad.addColorStop(1, "#041227");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient radial cyan glow behind circuit clusters
      const glowCenters = [
        { rx: 1350, ry: 220, rad: 400, alpha: 0.065 },
        { rx: 1188, ry: 880, rad: 500, alpha: 0.085 },
        { rx: 980, ry: 620, rad: 350, alpha: 0.055 },
        { rx: 460, ry: 920, rad: 300, alpha: 0.04 },
      ];

      glowCenters.forEach((g) => {
        const pos = toScreen(g.rx, g.ry, 0.4);
        const r = g.rad * scale;
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r);
        const baseAlpha = (g.alpha + globalSurge * 0.03) * bgDensityMult;
        grad.addColorStop(0, `rgba(0, 175, 235, ${baseAlpha})`);
        grad.addColorStop(0.5, `rgba(2, 95, 170, ${baseAlpha * 0.42})`);
        grad.addColorStop(1, "rgba(1, 5, 11, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      // 3. Cursor spotlight illumination
      const cursorGrad = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        290 * scale
      );
      cursorGrad.addColorStop(0, `rgba(0, 215, 245, ${0.045 * bgDensityMult})`);
      cursorGrad.addColorStop(0.5, `rgba(0, 140, 220, ${0.018 * bgDensityMult})`);
      cursorGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = cursorGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. Micro-grid of small squares
      const cellStep = Math.max(14, Math.round(20 * scale));
      const boxSize = cellStep * 0.68;
      const shiftX = (pointer.normX - 0.5) * -6;
      const shiftY = (pointer.normY - 0.5) * -6;

      const baseGridAlpha = 0.011 * bgDensityMult;
      ctx.fillStyle = `rgba(0, 175, 235, ${baseGridAlpha})`;
      for (let x = shiftX % cellStep; x < width; x += cellStep) {
        for (let y = shiftY % cellStep; y < height; y += cellStep) {
          const col = Math.floor(x / cellStep);
          const row = Math.floor(y / cellStep);
          if ((col + row) % 2 === 0) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 78000) {
              const prox = 1 - Math.sqrt(distSq) / 280;
              ctx.fillStyle = `rgba(0, 210, 245, ${
                baseGridAlpha + prox * 0.028 * bgDensityMult
              })`;
              ctx.fillRect(x, y, boxSize, boxSize);
              ctx.fillStyle = `rgba(0, 175, 235, ${baseGridAlpha})`;
            } else {
              ctx.fillRect(x, y, boxSize, boxSize);
            }
          }
        }
      }

      // 5. Scattered background wireframe hexagons
      ambientHexes.forEach((ah, i) => {
        const p = toScreen(ah.x, ah.y, 0.5);
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        const hoverBoost = Math.max(0, 1 - dist / (200 * scale));
        const pulse =
          (0.038 + 0.015 * Math.sin(time * 0.0015 + i)) * bgDensityMult +
          hoverBoost * 0.16 * lineGlowMult;

        traceFlatHex(p.x, p.y, ah.r * scale);
        ctx.strokeStyle = `rgba(0, 195, 240, ${pulse})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }

    function drawPCBHexagon(
      cx: number,
      cy: number,
      r: number,
      traces: PCBTrace[],
      hasChip: boolean,
      chipSize: number,
      energy: number
    ) {
      if (!ctx) return;
      traceFlatHex(cx, cy, r);
      const fillGrad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
      fillGrad.addColorStop(0, `rgba(8, 38, 74, ${0.72 + energy * 0.15})`);
      fillGrad.addColorStop(1, `rgba(3, 16, 36, 0.88)`);
      ctx.fillStyle = fillGrad;
      ctx.fill();

      ctx.lineWidth = (1.3 + energy * 0.8) * scale;
      ctx.strokeStyle = `rgba(0, 200, 240, ${(0.38 + energy * 0.35) * lineGlowMult})`;
      ctx.stroke();

      traceFlatHex(cx, cy, r * 0.9);
      ctx.lineWidth = 0.75 * scale;
      ctx.strokeStyle = `rgba(40, 160, 220, ${(0.22 + energy * 0.25) * lineGlowMult})`;
      ctx.stroke();

      ctx.save();
      traceFlatHex(cx, cy, r * 0.88);
      ctx.clip();

      ctx.strokeStyle = `rgba(45, 190, 235, ${(0.26 + energy * 0.35) * lineGlowMult})`;
      ctx.fillStyle = `rgba(90, 220, 250, ${(0.38 + energy * 0.35) * lineGlowMult})`;
      ctx.lineWidth = 0.9 * scale;

      traces.forEach((t) => {
        const x1 = cx + t.x1 * scale;
        const y1 = cy + t.y1 * scale;
        const x2 = cx + t.x2 * scale;
        const y2 = cy + t.y2 * scale;
        const x3 = cx + t.x3 * scale;
        const y3 = cy + t.y3 * scale;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.stroke();

        if (t.hasPad) {
          ctx.beginPath();
          ctx.arc(x3, y3, 1.5 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (hasChip) {
        const cs = chipSize * scale;
        ctx.fillStyle = "#031022";
        ctx.strokeStyle = `rgba(0, 210, 245, ${(0.45 + energy * 0.3) * lineGlowMult})`;
        ctx.lineWidth = 1.1 * scale;
        ctx.fillRect(cx - cs, cy - cs, cs * 2, cs * 2);
        ctx.strokeRect(cx - cs, cy - cs, cs * 2, cs * 2);

        ctx.fillStyle = `rgba(0, 175, 235, ${(0.18 + energy * 0.28) * lineGlowMult})`;
        ctx.fillRect(cx - cs * 0.55, cy - cs * 0.55, cs * 1.1, cs * 1.1);

        const pinCount = 4;
        const pinLen = 4.2 * scale;
        for (let p = 0; p < pinCount; p++) {
          const offset = -cs * 0.65 + (p / (pinCount - 1)) * (cs * 1.3);
          ctx.beginPath();
          ctx.moveTo(cx + offset, cy - cs);
          ctx.lineTo(cx + offset, cy - cs - pinLen);
          ctx.moveTo(cx + offset, cy + cs);
          ctx.lineTo(cx + offset, cy + cs + pinLen);
          ctx.moveTo(cx - cs, cy + offset);
          ctx.lineTo(cx - cs - pinLen, cy + offset);
          ctx.moveTo(cx + cs, cy + offset);
          ctx.lineTo(cx + cs + pinLen, cy + offset);
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    function drawTriangleArrow(
      x: number,
      y: number,
      angle: number,
      size: number,
      isGlowing: boolean,
      localEnergy = 0
    ) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      const alpha = Math.min(
        0.95,
        (isGlowing ? 0.52 : 0.34) * lineGlowMult + localEnergy * 0.35
      );
      if (isGlowing) {
        ctx.shadowColor = "rgba(0, 225, 250, 0.6)";
        ctx.shadowBlur = 7 * scale * lineGlowMult;
        ctx.fillStyle = `rgba(72, 232, 250, ${alpha})`;
      } else {
        ctx.fillStyle = `rgba(26, 145, 212, ${alpha})`;
      }

      ctx.beginPath();
      ctx.moveTo(size, 0);
      ctx.lineTo(-size * 0.75, -size * 0.68);
      ctx.lineTo(-size * 0.75, size * 0.68);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawChromaticPrism(
      x: number,
      y: number,
      size: number,
      angle: number,
      intensity: number
    ) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalCompositeOperation = "lighter";

      const eff = intensity * lineGlowMult;
      const grad = ctx.createLinearGradient(-size, 0, size, 0);
      grad.addColorStop(0, "rgba(0, 210, 245, 0)");
      grad.addColorStop(0.28, `rgba(0, 210, 245, ${0.048 * eff})`);
      grad.addColorStop(0.5, `rgba(140, 205, 95, ${0.036 * eff})`);
      grad.addColorStop(0.72, `rgba(215, 70, 115, ${0.042 * eff})`);
      grad.addColorStop(1, "rgba(215, 0, 80, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawHUDHexagons() {
      if (!ctx) return;
      pcbHexagons.forEach((ph) => {
        const pos = toScreen(ph.x, ph.y, 0.85);
        const dist = Math.hypot(pos.x - pointer.x, pos.y - pointer.y);
        const hoverTarget = Math.max(0, 1 - dist / (180 * scale));
        ph.energy += (Math.max(hoverTarget, globalSurge * 0.7) - ph.energy) * 0.12;

        if (ph.outerFrame) {
          const outerR = (ph.outerRadius || ph.r * 1.32) * scale;
          traceFlatHex(pos.x, pos.y, outerR);
          ctx.strokeStyle = `rgba(0, 190, 235, ${(0.28 + ph.energy * 0.35) * lineGlowMult})`;
          ctx.lineWidth = 1.3 * scale;
          ctx.stroke();

          traceFlatHex(pos.x, pos.y, outerR * 0.91);
          ctx.strokeStyle = `rgba(2, 120, 185, ${(0.2 + ph.energy * 0.25) * lineGlowMult})`;
          ctx.lineWidth = 0.9 * scale;
          ctx.stroke();
        }

        drawPCBHexagon(
          pos.x,
          pos.y,
          ph.r * scale,
          ph.traces,
          ph.hasChip,
          ph.chipSize,
          ph.energy
        );
      });

      hudHexagons.forEach((hex) => {
        const pos = toScreen(hex.x, hex.y, 1.0);
        const r = hex.r * scale;
        const dist = Math.hypot(pos.x - pointer.x, pos.y - pointer.y);
        const hoverTarget = Math.max(0, 1 - dist / (hex.r * 2.2 * scale));
        hex.energy += (Math.max(hoverTarget, globalSurge * 0.75) - hex.energy) * 0.1;

        hex.rotation += hex.rotSpeed * (1 + hex.energy * 2.4);

        const hexGlow = ctx.createRadialGradient(
          pos.x,
          pos.y,
          r * 0.1,
          pos.x,
          pos.y,
          r * 1.35
        );
        hexGlow.addColorStop(
          0,
          `rgba(0, 190, 240, ${(0.055 + hex.energy * 0.14) * lineGlowMult})`
        );
        hexGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = hexGlow;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * 1.35, 0, Math.PI * 2);
        ctx.fill();

        if (hex.type === "pcb-hero") {
          drawPCBHexagon(
            pos.x,
            pos.y,
            r * 0.78,
            heroPCBTraces,
            false,
            0,
            hex.energy
          );

          ctx.fillStyle = `rgba(0, 215, 245, ${(0.45 + hex.energy * 0.35) * lineGlowMult})`;
          ctx.fillRect(
            pos.x - 16 * scale,
            pos.y + r * 0.66,
            32 * scale,
            4 * scale
          );
        }

        hex.rings.forEach((ratio, idx) => {
          if (hex.type === "pcb-hero" && idx > 1) return;
          const ringR = r * ratio;

          traceFlatHex(pos.x, pos.y, ringR);

          if (idx === 0) {
            ctx.fillStyle =
              hex.type === "pcb-hero" ? "transparent" : "rgba(2, 11, 26, 0.68)";
            if (hex.type !== "pcb-hero") ctx.fill();
            ctx.lineWidth = (1.7 + hex.energy * 0.9) * scale;
            ctx.strokeStyle = `rgba(0, 205, 245, ${(0.42 + hex.energy * 0.38) * lineGlowMult})`;
          } else {
            ctx.lineWidth = (idx % 2 === 0 ? 1.4 : 0.85) * scale;
            ctx.strokeStyle =
              idx % 2 === 0
                ? `rgba(0, 185, 230, ${(0.28 + hex.energy * 0.32) * lineGlowMult})`
                : `rgba(24, 102, 162, ${(0.24 + hex.energy * 0.28) * lineGlowMult})`;
          }

          if (idx === 2 || idx === 4) {
            ctx.setLineDash([12 * scale, 6 * scale]);
          } else {
            ctx.setLineDash([]);
          }
          ctx.stroke();
          ctx.setLineDash([]);
        });

        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(hex.rotation);
        const arcR = r * (hex.type === "ring-arrows" ? 0.62 : 0.44);
        ctx.strokeStyle = `rgba(0, 215, 245, ${(0.22 + hex.energy * 0.4) * lineGlowMult})`;
        ctx.lineWidth = 1.2 * scale;

        for (let a = 0; a < 3; a++) {
          const startAngle = (a * 2 * Math.PI) / 3;
          const endAngle = startAngle + Math.PI / 2.3;
          ctx.beginPath();
          ctx.arc(0, 0, arcR, startAngle, endAngle);
          ctx.stroke();

          if (hex.type === "ring-arrows") {
            const ax = Math.cos(endAngle) * arcR;
            const ay = Math.sin(endAngle) * arcR;
            ctx.fillStyle = `rgba(0, 215, 245, ${(0.35 + hex.energy * 0.4) * lineGlowMult})`;
            ctx.beginPath();
            ctx.arc(ax, ay, 2.2 * scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();

        if (hex.hasOuterWrap) {
          const wrapR = hex.outerWrapR * scale;
          traceFlatHex(pos.x, pos.y, wrapR);
          ctx.lineWidth = 1.2 * scale;
          ctx.strokeStyle = `rgba(24, 115, 178, ${(0.32 + hex.energy * 0.35) * lineGlowMult})`;
          ctx.stroke();

          hex.wrapArrows.forEach((wa) => {
            const a1 = (wa.side * Math.PI) / 3;
            const a2 = ((wa.side + 1) * Math.PI) / 3;
            const x1 = pos.x + Math.cos(a1) * wrapR;
            const y1 = pos.y + Math.sin(a1) * wrapR;
            const x2 = pos.x + Math.cos(a2) * wrapR;
            const y2 = pos.y + Math.sin(a2) * wrapR;

            const ax = x1 + (x2 - x1) * wa.pos;
            const ay = y1 + (y2 - y1) * wa.pos;
            const edgeAngle =
              Math.atan2(y2 - y1, x2 - x1) + (wa.dir === -1 ? Math.PI : 0);

            drawTriangleArrow(
              ax,
              ay,
              edgeAngle,
              (wa.glowing ? 9.5 : 7) * scale,
              wa.glowing || hex.energy > 0.45,
              hex.energy
            );
          });
        }

        if (hex.chromaticFlare) {
          drawChromaticPrism(
            pos.x - r * 0.62,
            pos.y - r * 0.68,
            36 * scale,
            -0.6,
            0.32 + hex.energy * 0.35
          );
          drawChromaticPrism(
            pos.x + r * 0.62,
            pos.y + r * 0.48,
            38 * scale,
            0.8,
            0.32 + hex.energy * 0.35
          );
        }
      });
    }

    function distToSegment(p: { x: number; y: number }, v: Point, w: Point) {
      const l2 = (w.x - v.x) ** 2 + (w.y - v.y) ** 2;
      if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
      let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
      t = Math.max(0, Math.min(1, t));
      return Math.hypot(
        p.x - (v.x + t * (w.x - v.x)),
        p.y - (v.y + t * (w.y - v.y))
      );
    }

    function getPointAlongPath(pts: Point[], t: number): Point {
      let totalLen = 0;
      const segLens: number[] = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const l = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
        segLens.push(l);
        totalLen += l;
      }
      let target = t * totalLen;
      for (let i = 0; i < segLens.length; i++) {
        if (target <= segLens[i] || i === segLens.length - 1) {
          const localT = segLens[i] === 0 ? 0 : target / segLens[i];
          return {
            x: pts[i].x + (pts[i + 1].x - pts[i].x) * localT,
            y: pts[i].y + (pts[i + 1].y - pts[i].y) * localT,
          };
        }
        target -= segLens[i];
      }
      return pts[0];
    }

    function drawCircuitPaths() {
      if (!ctx) return;
      circuitPaths.forEach((path) => {
        const screenPts = path.points.map((pt) => toScreen(pt.x, pt.y, 1.0));

        let minDist = Infinity;
        for (let i = 0; i < screenPts.length - 1; i++) {
          const d = distToSegment(pointer, screenPts[i], screenPts[i + 1]);
          if (d < minDist) minDist = d;
        }
        const hoverBoost = Math.max(0, 1 - minDist / (125 * scale));
        const pathEnergy = hoverBoost * 0.85 + globalSurge * 0.65;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (path.style === "highway") {
          ctx.beginPath();
          screenPts.forEach((p, i) =>
            i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
          );
          ctx.lineWidth = path.width * 1.85 * scale;
          ctx.strokeStyle = `rgba(0, 190, 240, ${(0.052 + pathEnergy * 0.11) * lineGlowMult})`;
          ctx.stroke();

          ctx.lineWidth = path.width * 1.08 * scale;
          ctx.strokeStyle = `rgba(34, 185, 232, ${(0.34 + pathEnergy * 0.38) * lineGlowMult})`;
          ctx.stroke();

          ctx.lineWidth = path.width * 0.64 * scale;
          ctx.strokeStyle = "#020b18";
          ctx.stroke();

          ctx.lineWidth = 1.2 * scale;
          ctx.strokeStyle = `rgba(85, 215, 245, ${(0.32 + pathEnergy * 0.38) * lineGlowMult})`;
          ctx.stroke();

          if (path.hatched) {
            ctx.save();
            ctx.setLineDash([2.5 * scale, 5.5 * scale]);
            ctx.lineWidth = path.width * 0.48 * scale;
            ctx.strokeStyle = `rgba(0, 195, 238, ${(0.17 + pathEnergy * 0.24) * lineGlowMult})`;
            ctx.stroke();
            ctx.restore();
          }
        } else if (path.style === "primary") {
          ctx.beginPath();
          screenPts.forEach((p, i) =>
            i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
          );
          ctx.lineWidth = path.width * 2.0 * scale;
          ctx.strokeStyle = `rgba(0, 180, 235, ${(0.045 + pathEnergy * 0.1) * lineGlowMult})`;
          ctx.stroke();

          ctx.lineWidth = path.width * 0.85 * scale;
          ctx.strokeStyle = `rgba(28, 185, 232, ${(0.36 + pathEnergy * 0.38) * lineGlowMult})`;
          ctx.stroke();
        } else {
          ctx.beginPath();
          screenPts.forEach((p, i) =>
            i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
          );
          ctx.lineWidth = path.width * 0.85 * scale;
          ctx.strokeStyle = `rgba(22, 125, 190, ${(0.28 + pathEnergy * 0.32) * lineGlowMult})`;
          ctx.stroke();
        }

        if (path.notches) {
          path.notches.forEach((n) => {
            const np = toScreen(n.x, n.y, 1.0);
            ctx.save();
            ctx.fillStyle = `rgba(45, 210, 242, ${(0.42 + pathEnergy * 0.35) * lineGlowMult})`;
            for (let k = 0; k < n.count; k++) {
              ctx.fillRect(
                np.x + k * n.spacing * scale,
                np.y - 3.5 * scale,
                8 * scale,
                7 * scale
              );
            }
            ctx.restore();
          });
        }
      });

      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const pkt = dataPackets[i];
        const path = circuitPaths[pkt.pathIndex];
        const speedMult = 1 + globalSurge * 2.2;
        pkt.progress += pkt.speed * pkt.dir * speedMult;

        if (pkt.temporary && (pkt.progress > 1 || pkt.progress < 0)) {
          dataPackets.splice(i, 1);
          continue;
        }
        if (pkt.progress > 1) pkt.progress -= 1;
        if (pkt.progress < 0) pkt.progress += 1;

        const pos = getPointAlongPath(path.points, pkt.progress);
        const sp = toScreen(pos.x, pos.y, 1.0);

        const r = pkt.size * 0.8 * scale;
        const pktAlpha = Math.min(
          0.85,
          (0.38 + globalSurge * 0.35) * lineGlowMult
        );
        const grad = ctx.createRadialGradient(
          sp.x,
          sp.y,
          0,
          sp.x,
          sp.y,
          r * 2.4
        );
        grad.addColorStop(0, `rgba(135, 238, 255, ${pktAlpha})`);
        grad.addColorStop(0.4, `rgba(0, 200, 240, ${pktAlpha * 0.55})`);
        grad.addColorStop(1, "rgba(0, 160, 220, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, r * 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawTerminalNodes(time: number) {
      if (!ctx) return;
      terminalNodes.forEach((node, idx) => {
        const pos = toScreen(node.x, node.y, 1.0);
        const dist = Math.hypot(pos.x - pointer.x, pos.y - pointer.y);
        const hover = Math.max(0, 1 - dist / (150 * scale));
        const pulse = 0.9 + 0.1 * Math.sin(time * 0.003 + idx * 1.3);
        const energy = Math.min(1.2, hover * 0.85 + globalSurge * 0.65);
        const r = node.r * 0.92 * scale * (1 + hover * 0.14);

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        const haloR = r * (3.4 + energy * 1.6) * node.flare;
        const halo = ctx.createRadialGradient(
          pos.x,
          pos.y,
          0,
          pos.x,
          pos.y,
          haloR
        );
        halo.addColorStop(
          0,
          `rgba(0, 210, 245, ${(0.14 * pulse + energy * 0.18) * lineGlowMult})`
        );
        halo.addColorStop(
          0.4,
          `rgba(0, 155, 225, ${(0.055 * pulse + energy * 0.08) * lineGlowMult})`
        );
        halo.addColorStop(1, "rgba(0, 100, 200, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, haloR, 0, Math.PI * 2);
        ctx.fill();

        const streakW = r * (7.5 + energy * 4.5) * node.flare;
        const streakH = r * 0.28;
        const streakGrad = ctx.createLinearGradient(
          pos.x - streakW,
          pos.y,
          pos.x + streakW,
          pos.y
        );
        streakGrad.addColorStop(0, "rgba(0, 210, 245, 0)");
        streakGrad.addColorStop(
          0.35,
          `rgba(0, 210, 245, ${(0.065 + energy * 0.12) * lineGlowMult})`
        );
        streakGrad.addColorStop(
          0.5,
          `rgba(145, 238, 250, ${(0.2 + energy * 0.24) * lineGlowMult})`
        );
        streakGrad.addColorStop(
          0.65,
          `rgba(0, 210, 245, ${(0.065 + energy * 0.12) * lineGlowMult})`
        );
        streakGrad.addColorStop(1, "rgba(0, 210, 245, 0)");
        ctx.fillStyle = streakGrad;
        ctx.beginPath();
        ctx.ellipse(pos.x, pos.y, streakW, streakH, 0, 0, Math.PI * 2);
        ctx.fill();

        if (node.chromatic) {
          drawChromaticPrism(
            pos.x - r * 1.85,
            pos.y + r * 1.25,
            r * 1.95,
            -0.75,
            0.35 + energy * 0.35
          );
        }
        ctx.restore();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * 1.2, 0, Math.PI * 2);
        ctx.lineWidth = (1.6 + energy * 0.7) * scale;
        ctx.strokeStyle = `rgba(42, 205, 242, ${(0.46 + energy * 0.4) * lineGlowMult})`;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * 0.84, 0, Math.PI * 2);
        ctx.fillStyle = "#020d1f";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * 0.52, 0, Math.PI * 2);
        const coreAlpha = Math.min(0.95, (0.5 + energy * 0.42) * lineGlowMult);
        ctx.fillStyle =
          hover > 0.25
            ? `rgba(190, 248, 255, ${coreAlpha})`
            : `rgba(56, 215, 245, ${coreAlpha})`;
        ctx.fill();
      });
    }

    function drawHUDAccents(time: number) {
      if (!ctx) return;
      chevronGroups.forEach((cg) => {
        const basePos = toScreen(cg.x, cg.y, 1.0);
        const dist = Math.hypot(basePos.x - pointer.x, basePos.y - pointer.y);
        const hover = Math.max(0, 1 - dist / (145 * scale));

        for (let i = 0; i < cg.count; i++) {
          const cx = basePos.x + i * cg.spacing * scale;
          const cy = basePos.y;
          const wave = Math.sin(time * 0.006 - i * 0.9) * 0.5 + 0.5;
          const isBright = cg.glowing || hover > 0.25 || globalSurge > 0.3;

          drawTriangleArrow(
            cx,
            cy,
            cg.dir === -1 ? Math.PI : 0,
            cg.size * 0.9 * scale * (1 + hover * 0.12),
            isBright && wave > 0.25,
            hover
          );
        }
      });

      barcodeGroups.forEach((bg) => {
        const pos = toScreen(bg.x, bg.y, 1.0);
        const dist = Math.hypot(pos.x - pointer.x, pos.y - pointer.y);
        const hover = Math.max(0, 1 - dist / (140 * scale));

        let curX = pos.x;
        const h = bg.height * scale;
        for (let g = 0; g < bg.groups; g++) {
          for (let b = 0; b < bg.barsPerGroup; b++) {
            const flicker = 0.26 + 0.18 * Math.sin(time * 0.005 + g * 2 + b);
            const barAlpha = Math.min(
              0.9,
              (flicker + hover * 0.35 + globalSurge * 0.25) * lineGlowMult
            );
            ctx.fillStyle = `rgba(0, 195, 240, ${barAlpha})`;
            const bw = (b % 2 === 0 ? 2.0 : 1.2) * scale;
            ctx.fillRect(curX, pos.y, bw, h);
            curX += 4.2 * scale;
          }
          curX += 6.5 * scale;
        }
      });

      isoCubes.forEach((cube) => {
        const pos = toScreen(cube.x, cube.y, 1.1);
        const dist = Math.hypot(pos.x - pointer.x, pos.y - pointer.y);
        const hover = Math.max(0, 1 - dist / (140 * scale));
        const bob = Math.sin(time * 0.0025 + cube.phase) * 2.5 * scale;
        const r = cube.r * scale * (1 + hover * 0.16);
        const cx = pos.x;
        const cy = pos.y + bob;

        ctx.save();
        ctx.strokeStyle = `rgba(42, 195, 238, ${(0.38 + hover * 0.38) * lineGlowMult})`;
        ctx.fillStyle = `rgba(4, 22, 46, ${0.55 + hover * 0.2})`;
        ctx.lineWidth = 1.0 * scale;

        const verts: Point[] = [];
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3 - Math.PI / 6;
          verts.push({
            x: cx + Math.cos(a) * r,
            y: cy + Math.sin(a) * r,
          });
        }

        ctx.beginPath();
        verts.forEach((v, i) =>
          i === 0 ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y)
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        [1, 3, 5].forEach((idx) => {
          ctx.moveTo(cx, cy);
          ctx.lineTo(verts[idx].x, verts[idx].y);
        });
        ctx.stroke();
        ctx.restore();
      });

      const telPos = toScreen(1144, 536, 1.0);
      const telDist = Math.hypot(telPos.x - pointer.x, telPos.y - pointer.y);
      const telHover = Math.max(0, 1 - telDist / (180 * scale));

      ctx.save();
      ctx.font = `${Math.max(
        9,
        Math.round(11 * scale)
      )}px "Share Tech Mono", monospace`;
      ctx.fillStyle = `rgba(105, 205, 240, ${(0.45 + telHover * 0.38) * lineGlowMult})`;
      const lineH = 14 * scale;

      const statusText =
        globalSurge > 0.2 ? "CORE SYST: OVERDRIVE |" : "CORE SYST: ONLINE |";
      const flowText =
        telHover > 0.2 ? "DATA_FLOW: 99.8% SYNC" : "DATA_FLOW: OPTIMAL";

      ctx.fillText(statusText, telPos.x, telPos.y);
      ctx.fillText("NET_LOG0: 92A", telPos.x, telPos.y + lineH);
      ctx.fillText(flowText, telPos.x, telPos.y + lineH * 2);

      ctx.strokeStyle = `rgba(0, 190, 235, ${(0.26 + telHover * 0.35) * lineGlowMult})`;
      ctx.lineWidth = 1.0 * scale;
      ctx.beginPath();
      ctx.moveTo(telPos.x + 88 * scale, telPos.y + lineH * 2.4);
      ctx.lineTo(telPos.x + 102 * scale, telPos.y + lineH * 3.3);
      ctx.lineTo(telPos.x + 164 * scale, telPos.y + lineH * 3.3);
      ctx.stroke();
      ctx.restore();
    }

    function drawInteractiveEffects() {
      if (!ctx) return;
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.r += (sw.maxR - sw.r) * 0.065 + 4;
        sw.alpha *= 0.94;

        if (sw.alpha < 0.015) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        traceFlatHex(sw.x, sw.y, sw.r);
        ctx.strokeStyle = `rgba(0, 215, 245, ${sw.alpha * 0.42 * lineGlowMult})`;
        ctx.lineWidth = 1.6 * scale;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r * 0.78, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45, 175, 235, ${sw.alpha * 0.22 * lineGlowMult})`;
        ctx.lineWidth = 1.0 * scale;
        ctx.stroke();
        ctx.restore();
      }

      if (pointer.active) {
        ctx.save();
        traceFlatHex(pointer.x, pointer.y, 13 * scale);
        ctx.strokeStyle = `rgba(0, 215, 245, ${0.18 * lineGlowMult})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 1.8 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 215, 245, ${0.48 * lineGlowMult})`;
        ctx.fill();
        ctx.restore();
      }
    }

    let animId: number;

    function animate(time: number) {
      pointer.x += (pointer.targetX - pointer.x) * 0.14;
      pointer.y += (pointer.targetY - pointer.y) * 0.14;

      if (globalSurge > 0.001) {
        globalSurge *= 0.95;
      } else {
        globalSurge = 0;
      }

      drawBackground(time);
      drawCircuitPaths();
      drawHUDHexagons();
      drawHUDAccents(time);
      drawTerminalNodes(time);
      drawInteractiveEffects();

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  return <canvas id="cyber-bg-canvas" ref={canvasRef} />;
}

