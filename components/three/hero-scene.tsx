"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// Track the pointer across the entire browser viewport, not just over the WebGL canvas.
const globalPointer = { x: 0, y: 0 };

function useGlobalPointerTracking() {
  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      globalPointer.x = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      globalPointer.y = -((event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1);
    };
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, []);
}

function makeScreenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 360;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);
  ctx.fillStyle = "#08101c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // A restrained phosphor display, not a neon HUD.
  ctx.fillStyle = "#a9c2f4";
  ctx.font = "bold 19px monospace";
  ctx.fillText("CSI_PVG / SYSTEM 01", 28, 40);
  ctx.strokeStyle = "rgba(220,226,242,.42)";
  ctx.beginPath();
  ctx.moveTo(28, 56);
  ctx.lineTo(484, 56);
  ctx.stroke();
  ctx.font = "17px monospace";
  ctx.fillStyle = "#8fa9df";
  ctx.fillText("C:\\> boot chapter.exe", 28, 98);
  ctx.fillText("Loading curiosity...", 28, 139);
  ctx.fillText("[ OK ] tools initialized", 28, 180);
  ctx.fillText("[ OK ] ideas detected", 28, 221);
  ctx.fillStyle = "#d2e0ff";
  ctx.fillText("C:\\> build something_", 28, 286);
  // Subtle CRT scan lines.
  ctx.fillStyle = "rgba(0,0,0,.16)";
  for (let y = 0; y < canvas.height; y += 4) ctx.fillRect(0, y, canvas.width, 1);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Key({ position, width = 0.105, depth = 0.105, color = "#c9c0ab" }: { position: [number, number, number]; width?: number; depth?: number; color?: string }) {
  return (
    <RoundedBox args={[width, 0.045, depth]} radius={0.012} smoothness={2} position={position}>
      <meshStandardMaterial color={color} roughness={0.82} />
    </RoundedBox>
  );
}

function Keyboard() {
  const rows = [
    { count: 14, start: -0.76, z: 0.24 },
    { count: 13, start: -0.70, z: 0.09 },
    { count: 12, start: -0.64, z: -0.06 },
    { count: 10, start: -0.55, z: -0.21 },
  ];
  return (
    <group position={[0, -1.16, 0.76]} rotation={[-0.05, 0, 0]}>
      <RoundedBox args={[1.9, 0.14, 0.68]} radius={0.07} smoothness={4}>
        <meshStandardMaterial color="#bcb39e" roughness={0.78} />
      </RoundedBox>
      {rows.map((row, rowIndex) => Array.from({ length: row.count }, (_, i) => (
        <Key key={`${rowIndex}-${i}`} position={[row.start + i * 0.112, 0.086, row.z]} width={rowIndex === 3 && i === 4 ? 0.32 : 0.09} color={rowIndex === 0 && (i === 0 || i === 13) ? "#8398c1" : "#c9c0ab"} />
      )))}
      <Key position={[0.61, 0.086, -0.07]} width={0.18} />
    </group>
  );
}

function RetroComputer() {
  const group = useRef<THREE.Group>(null);
  const disk = useRef<THREE.Group>(null);
  const screenGlint = useRef<THREE.Mesh>(null);
  const screenTexture = useMemo(() => makeScreenTexture(), []);
  const screenMaterial = useMemo(() => new THREE.MeshBasicMaterial({ map: screenTexture }), [screenTexture]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // The CRT subtly turns toward the pointer, like it's tracking the visitor.
    const targetY = -0.16 + globalPointer.x * 0.27 + Math.sin(t * 0.24) * 0.012;
    const targetX = -0.025 - globalPointer.y * 0.105 + Math.sin(t * 0.32) * 0.006;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.075);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.075);
    group.current.position.y = 0.12 + Math.sin(t * 0.72) * 0.035;
    if (disk.current) {
      disk.current.rotation.y = Math.sin(t * 0.42) * 0.045;
      disk.current.position.y = -1.17 + Math.sin(t * 0.9 + 0.7) * 0.025;
    }
    if (screenGlint.current) {
      screenGlint.current.position.x = -0.78 + ((t * 0.16) % 1) * 1.48;
      screenGlint.current.visible = ((t * 0.16) % 1) < 0.94;
    }
  });

  return (
    <group ref={group} position={[0, 0.12, 0]}>
      {/* Heavy beige CRT shell */}
      <RoundedBox args={[2.32, 1.86, 1.25]} radius={0.16} smoothness={6} position={[0, 0.08, 0]}>
        <meshStandardMaterial color="#c7bea9" roughness={0.72} metalness={0.04} />
      </RoundedBox>
      {/* Front bezel */}
      <RoundedBox args={[2.02, 1.49, 0.16]} radius={0.12} smoothness={6} position={[-0.02, 0.17, 0.655]}>
        <meshStandardMaterial color="#aaa18e" roughness={0.78} />
      </RoundedBox>
      {/* Deep blue phosphor screen, set slightly inside the bezel */}
      <mesh position={[-0.02, 0.19, 0.744]} material={screenMaterial}>
        <planeGeometry args={[1.72, 1.13]} />
      </mesh>
      {/* A restrained screen bloom behind the glass, not a neon halo */}
      <mesh position={[-0.02, 0.19, 0.738]}>
        <planeGeometry args={[1.78, 1.19]} />
        <meshBasicMaterial color="#E8EAF2" transparent opacity={0.055} depthWrite={false} />
      </mesh>
      {/* Faint glass reflection, angled like a studio softbox */}
      <mesh position={[-0.43, 0.2, 0.752]} rotation={[0, 0, -0.13]}>
        <planeGeometry args={[0.22, 1.04]} />
        <meshBasicMaterial color="#e1eaff" transparent opacity={0.055} depthWrite={false} />
      </mesh>
      {/* Slow studio-light sweep across the CRT glass */}
      <mesh ref={screenGlint} position={[-0.78, 0.19, 0.754]}>
        <planeGeometry args={[0.055, 1.02]} />
        <meshBasicMaterial color="#c9d8ff" transparent opacity={0.11} depthWrite={false} />
      </mesh>
      {/* Screen inner lip */}
      <mesh position={[-0.02, 0.19, 0.75]}>
        <planeGeometry args={[1.78, 1.19]} />
        <meshBasicMaterial color="#161d17" wireframe transparent opacity={0.15} />
      </mesh>
      {/* Lower controls and floppy slot */}
      <mesh position={[0.72, -0.53, 0.748]}>
        <boxGeometry args={[0.13, 0.035, 0.012]} />
        <meshStandardMaterial color="#655f52" roughness={0.8} />
      </mesh>
      <mesh position={[0.72, -0.39, 0.748]}>
        <circleGeometry args={[0.035, 20]} />
        <meshStandardMaterial color="#E8EAF2" emissive="#E8EAF2" emissiveIntensity={0.35} roughness={0.35} />
      </mesh>
      <mesh position={[-0.68, -0.56, 0.748]}>
        <boxGeometry args={[0.31, 0.025, 0.012]} />
        <meshStandardMaterial color="#817968" roughness={0.9} />
      </mesh>
      {/* Thick pedestal and foot */}
      <RoundedBox args={[0.56, 0.28, 0.48]} radius={0.06} smoothness={4} position={[0, -1.02, -0.02]}>
        <meshStandardMaterial color="#b8af9a" roughness={0.76} />
      </RoundedBox>
      <RoundedBox args={[0.92, 0.12, 0.64]} radius={0.05} smoothness={4} position={[0, -1.19, 0.03]}>
        <meshStandardMaterial color="#aaa18d" roughness={0.78} />
      </RoundedBox>
      <Keyboard />
      {/* A wired, two-button mouse */}
      <group position={[1.28, -1.19, 0.67]} rotation={[Math.PI / 2, -0.12, 0]}>
        <mesh>
          <capsuleGeometry args={[0.105, 0.17, 4, 8]} />
          <meshStandardMaterial color="#c7bea9" roughness={0.75} />
        </mesh>
        <mesh position={[0, 0.103, 0.01]}>
          <boxGeometry args={[0.012, 0.012, 0.07]} />
          <meshStandardMaterial color="#6b6659" />
        </mesh>
      </group>
      {/* A small floppy disk as a quiet secondary detail */}
      <group ref={disk} position={[-1.31, -1.17, 0.56]} rotation={[0, 0.08, -0.05]}>
        <RoundedBox args={[0.27, 0.34, 0.035]} radius={0.025} smoothness={3}>
          <meshStandardMaterial color="#252d3b" roughness={0.66} metalness={0.12} />
        </RoundedBox>
        <mesh position={[0, 0.09, 0.02]}>
          <boxGeometry args={[0.15, 0.075, 0.008]} />
          <meshStandardMaterial color="#C8D0E6" roughness={0.7} metalness={0.08} />
        </mesh>
      </group>
    </group>
  );
}

function BlueprintFrame() {
  const geometry = useMemo(() => {
    const points: number[] = [];
    const addLine = (a: [number, number, number], b: [number, number, number]) => points.push(...a, ...b);
    // Offset drafting frame and calibration ticks: more product-studio than sci-fi HUD.
    const z = -1.0;
    addLine([-1.92, 1.72, z], [1.92, 1.72, z]);
    addLine([1.92, 1.72, z], [1.92, -1.38, z]);
    addLine([1.92, -1.38, z], [-1.92, -1.38, z]);
    addLine([-1.92, -1.38, z], [-1.92, 1.72, z]);
    for (let i = 0; i <= 16; i++) {
      const x = -1.6 + i * 0.2;
      addLine([x, -1.38, z], [x, -1.38 + (i % 4 === 0 ? 0.075 : 0.035), z]);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return g;
  }, []);
  return <lineSegments geometry={geometry} position={[0, 0, 0]}>
    <lineBasicMaterial color="#E8EAF2" transparent opacity={0.22} depthWrite={false} />
  </lineSegments>;
}

function Dust() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(28 * 3);
    for (let i = 0; i < 28; i++) {
      const angle = i * 2.399963;
      const radius = 1.35 + (i % 7) * 0.12;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = -1.05 + ((i * 17) % 31) / 10;
      positions[i * 3 + 2] = -0.45 + ((i * 13) % 17) / 18;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);
  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.035;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.025;
  });
  return <points ref={points} geometry={geometry}>
    <pointsMaterial color="#C8D0E6" size={0.014} transparent opacity={0.42} sizeAttenuation depthWrite={false} />
  </points>;
}

function StudioFloor() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.29, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#10131a" roughness={0.34} metalness={0.22} />
      </mesh>
      <mesh position={[0, -1.282, 0.22]}>
        <boxGeometry args={[3.15, 0.006, 0.012]} />
        <meshBasicMaterial color="#E8EAF2" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function Scene() {
  const rim = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!rim.current) return;
    rim.current.intensity = 3.1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.28;
    rim.current.position.x = -2.8 + Math.sin(state.clock.elapsedTime * 0.18) * 0.22;
  });
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 4]} intensity={2.5} color="#f5eee0" />
      <directionalLight position={[3, 1, -3]} intensity={1.15} color="#D9DFEF" />
      <pointLight ref={rim} position={[-2.8, 1.1, 2.3]} intensity={3.1} color="#E8EAF2" distance={7} />
      <pointLight position={[0.2, 0.4, 2.6]} intensity={0.65} color="#d5e2ff" distance={4} />
      <BlueprintFrame />
      <Dust />
      <RetroComputer />
      <StudioFloor />
      <ContactShadows position={[0, -1.28, 0]} opacity={0.46} scale={5.8} blur={2.5} far={3.5} color="#000000" />
    </>
  );
}

export default function HeroScene() {
  useGlobalPointerTracking();
  return (
    <div className="hero-scene" aria-label="A 3D recreation of a 1990s beige CRT computer with keyboard and floppy disk" role="img">
      <Canvas camera={{ position: [0, 0.12, 6.7], fov: 36 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <Scene />
      </Canvas>
    </div>
  );
}
