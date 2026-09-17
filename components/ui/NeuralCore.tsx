"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * Geometry
 * ------------------------------------------------------------------ */

/** Fibonacci sphere: even point spread with no clustering at the poles. */
function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push(
      new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius),
    );
  }
  return points;
}

const NODE_COUNT = 220;
const RADIUS = 2.1;
/** Two nodes get an edge if they are closer than this. */
const LINK_DISTANCE = 0.92;
/** Hard cap on edges, so a bad tuning value cannot explode the line count. */
const MAX_LINKS = 900;
/** Extra margin so glowing nodes on the rim never touch the window edge. */
const EDGE_PADDING = 1.08;

type Pointer = React.MutableRefObject<[number, number]>;

const clamp = THREE.MathUtils.clamp;
const lerp = THREE.MathUtils.lerp;
const damp = THREE.MathUtils.damp;

/* ------------------------------------------------------------------ *
 * The network
 * ------------------------------------------------------------------ */

const Network = ({ pointer }: { pointer: Pointer }) => {
  /** Outer group: where the sphere is in the window and how big it is. */
  const mover = useRef<THREE.Group>(null);
  /** Middle group: tilt toward the pointer. */
  const tilt = useRef<THREE.Group>(null);
  /** Inner group: constant slow spin. */
  const spin = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);

  const nodes = useMemo(() => fibonacciSphere(NODE_COUNT, RADIUS), []);

  /* Node positions, with colour ramped violet to cyan by latitude. */
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(nodes.length * 3);
    const colors = new Float32Array(nodes.length * 3);
    const violet = new THREE.Color("#A78BFA");
    const cyan = new THREE.Color("#22D3EE");
    const mixed = new THREE.Color();

    nodes.forEach((p, i) => {
      positions.set([p.x, p.y, p.z], i * 3);
      mixed.copy(violet).lerp(cyan, (p.y / RADIUS + 1) / 2);
      colors.set([mixed.r, mixed.g, mixed.b], i * 3);
    });
    return { positions, colors };
  }, [nodes]);

  /* Edges, built once. */
  const linkPositions = useMemo(() => {
    const segments: number[] = [];
    outer: for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < LINK_DISTANCE) {
          segments.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
          if (segments.length / 6 >= MAX_LINKS) break outer;
        }
      }
    }
    return new Float32Array(segments);
  }, [nodes]);

  const viewport = useThree((s) => s.viewport);
  const size = useThree((s) => s.size);

  useFrame((state, delta) => {
    if (!mover.current || !tilt.current || !spin.current) return;

    // A long frame (tab switch, GC pause) should not fling the sphere.
    const dt = Math.min(delta, 0.1);

    const vw = viewport.width; // world units visible at z = 0
    const vh = viewport.height;
    const [px, py] = pointer.current;
    const desktop = size.width >= 1024;

    /* How far past the hero we are: 0 while the hero fills the window, 1 once
       it has scrolled away. */
    const sy = window.scrollY;
    const past = clamp(sy / (window.innerHeight * 0.9), 0, 1);

    /* Size. Never larger than the window allows, and a bit smaller once the
       sphere is sitting behind body text. */
    const fit = Math.min(1, Math.min(vw, vh) / 2 / (RADIUS * EDGE_PADDING));
    /* In the desktop hero the sphere shares the window with the copy, so it
       gets only the space to the right of the text. The copy column starts at
       the page's content edge (max-w-7xl, 40px gutter) and is ~600px wide. */
    const W = size.width;
    const textRight = Math.max(0, (W - 1280) / 2) + 40 + 600 + 32;
    const freeFrac = clamp((W - textRight) / W, 0.2, 0.5);
    // 1.05 allows for perspective making the front of the sphere look larger.
    const heroFit = desktop
      ? Math.min(
          fit,
          (vw * freeFrac) / (2 * RADIUS * EDGE_PADDING * 1.05),
        )
      : fit;
    const targetScale = lerp(heroFit, fit * (desktop ? 0.72 : 0.85), past);
    const scale = damp(mover.current.scale.x, targetScale, 3, dt);
    mover.current.scale.setScalar(scale);

    /* Where it wants to be.
       In the hero: the empty right half on desktop, centred on small screens.
       Further down: a slow figure-of-eight driven by scroll, so each section
       finds the sphere somewhere new. The pointer pulls on top of both. */
    const heroX = desktop ? (textRight / W + freeFrac / 2 - 0.5) * vw : 0;
    const t = sy / 1000;
    const roamX = Math.sin(t * 1.1) * vw * 0.3;
    const roamY = Math.sin(t * 0.55) * Math.cos(t * 0.8) * vh * 0.22;

    let x = lerp(heroX, roamX, past) + px * vw * 0.14;
    let y = lerp(0, roamY, past) - py * vh * 0.14;

    /* Keep the whole sphere inside the window. */
    const r = RADIUS * scale * EDGE_PADDING;
    const maxX = Math.max(0, vw / 2 - r);
    const maxY = Math.max(0, vh / 2 - r);
    x = clamp(x, -maxX, maxX);
    y = clamp(y, -maxY, maxY);

    mover.current.position.x = damp(mover.current.position.x, x, 2.2, dt);
    mover.current.position.y = damp(
      mover.current.position.y,
      y + Math.sin(state.clock.elapsedTime * 0.6) * 0.06,
      2.2,
      dt,
    );

    /* Lean toward the pointer, easing back when it rests. */
    tilt.current.rotation.x = damp(tilt.current.rotation.x, py * 0.45, 3, dt);
    tilt.current.rotation.y = damp(tilt.current.rotation.y, px * 0.6, 3, dt);

    /* Constant spin, a touch faster while the page is scrolling. */
    spin.current.rotation.y += dt * 0.11;
    spin.current.rotation.x += dt * 0.03;

    if (nodesRef.current) {
      nodesRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.015);
    }
  });

  return (
    <group ref={mover}>
      <group ref={tilt}>
        <group ref={spin}>
          {/* Inner core */}
          <mesh>
            <icosahedronGeometry args={[1.05, 1]} />
            <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.22} />
          </mesh>

          {/* Solid inner glow */}
          <mesh>
            <sphereGeometry args={[0.72, 32, 32]} />
            <meshBasicMaterial color="#6D34D6" transparent opacity={0.16} />
          </mesh>

          {/* Edges */}
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[linkPositions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial
              color="#7C6BD6"
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>

          {/* Nodes */}
          <points ref={nodesRef}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[positions, 3]} />
              <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial
              size={0.055}
              vertexColors
              transparent
              opacity={0.95}
              sizeAttenuation
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </points>
        </group>
      </group>
    </group>
  );
};

/** Dust motes spread across the whole window for depth. */
const Dust = () => {
  const ref = useRef<THREE.Points>(null);
  const viewport = useThree((s) => s.viewport);

  const positions = useMemo(() => {
    const count = 160;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr.set(
        [
          (Math.random() - 0.5) * viewport.width * 1.2,
          (Math.random() - 0.5) * viewport.height * 1.2,
          (Math.random() - 0.5) * 4 - 1,
        ],
        i * 3,
      );
    }
    return arr;
    // Built once; a later resize only changes how much of it is visible.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += Math.min(delta, 0.05) * 0.01;
    // Faint parallax: dust drifts up slower than the page scrolls.
    ref.current.position.y = (window.scrollY / window.innerHeight) * 0.35;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.026} color="#C7D2FE" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
};

/* ------------------------------------------------------------------ *
 * Public component
 * ------------------------------------------------------------------ */

/**
 * Site-wide 3D backdrop. A fixed, full-window canvas that sits above the
 * ambient Aurora and below every piece of content, so the sphere stays in view
 * for the whole page, drifts to a new spot as you scroll and follows the
 * cursor. It never takes pointer events, so nothing on the page is blocked.
 */
export const NeuralBackdrop = () => {
  const pointer = useRef<[number, number]>([0, 0]);
  const [allowed, setAllowed] = useState(false);

  // Once the hero is gone the sphere is behind reading text, so it steps back.
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(900);
  const opacity = useTransform(scrollY, [0, vh * 0.9], [1, 0.6]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // On phones/small tablets the sphere sits directly behind body copy with
    // no room to breathe, and a live WebGL scene is heavy on that hardware.
    // Below the desktop breakpoint we skip it entirely rather than render it
    // dimmed, which is both faster and easier to read. A media query (rather
    // than a one-off innerWidth check) keeps this correct when the viewport
    // crosses the breakpoint without a full reload, e.g. devtools' responsive
    // mode or rotating a tablet.
    const isDesktop = window.matchMedia("(min-width: 1024px)");
    const updateAllowed = () => setAllowed(isDesktop.matches && !reducedMotion.matches);
    updateAllowed();
    setVh(window.innerHeight);

    const onMove = (e: PointerEvent) => {
      pointer.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      ];
    };
    const onResize = () => setVh(window.innerHeight);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    isDesktop.addEventListener("change", updateAllowed);
    reducedMotion.addEventListener("change", updateAllowed);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      isDesktop.removeEventListener("change", updateAllowed);
      reducedMotion.removeEventListener("change", updateAllowed);
    };
  }, []);

  if (!allowed) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 -z-[5]"
    >
      <div className="h-full w-full">
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Network pointer={pointer} />
          <Dust />
        </Canvas>
      </div>
    </motion.div>
  );
};

export default NeuralBackdrop;
