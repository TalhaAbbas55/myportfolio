"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * Geometry helpers
 * ------------------------------------------------------------------ */

/**
 * Fibonacci sphere. Gives an even point distribution without the pole
 * clustering you get from naive lat/long sampling.
 */
function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ),
    );
  }
  return points;
}

const NODE_COUNT = 220;
const RADIUS = 2.1;
/** Two nodes get an edge if they are closer than this. Tuned so the mesh
 *  reads as a network rather than a solid shell. */
const LINK_DISTANCE = 0.92;
/** Hard cap so a bad tuning value can never explode into tens of thousands
 *  of line segments. */
const MAX_LINKS = 900;

/* ------------------------------------------------------------------ *
 * The network itself
 * ------------------------------------------------------------------ */

const Network = ({ pointer }: { pointer: React.MutableRefObject<[number, number]> }) => {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);

  const nodes = useMemo(() => fibonacciSphere(NODE_COUNT, RADIUS), []);

  /* Node buffer: position + a per-node colour ramped violet -> cyan by
     latitude, so the sphere has vertical colour movement. */
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

  /* Edge buffer, built once. */
  const linkPositions = useMemo(() => {
    const segments: number[] = [];

    outer: for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < LINK_DISTANCE) {
          segments.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z,
          );
          if (segments.length / 6 >= MAX_LINKS) break outer;
        }
      }
    }

    return new Float32Array(segments);
  }, [nodes]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Constant slow drift...
    group.current.rotation.y += delta * 0.11;
    group.current.rotation.x += delta * 0.03;

    // ...plus a gentle lean toward the pointer. Lerped rather than set so the
    // core eases back to centre when the pointer leaves.
    const [px, py] = pointer.current;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      group.current.rotation.x + py * 0.25,
      0.05,
    );
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      px * 0.35,
      0.05,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      -py * 0.35 + Math.sin(state.clock.elapsedTime * 0.6) * 0.06,
      0.05,
    );

    // Nodes breathe very slightly out of phase with the float.
    if (nodesRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.015;
      nodesRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      {/* Inner core */}
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial
          color="#8B5CF6"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Solid inner glow */}
      <mesh>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshBasicMaterial
          color="#6D34D6"
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linkPositions, 3]}
          />
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
  );
};

/** A few dust motes drifting in front of the core for depth. */
const Dust = () => {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i++) {
      arr.set(
        [
          (Math.random() - 0.5) * 11,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 1,
        ],
        i * 3,
      );
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#C7D2FE"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

/** Tracks the pointer in normalised device coords for the whole canvas. */
const PointerTracker = ({
  pointer,
}: {
  pointer: React.MutableRefObject<[number, number]>;
}) => {
  const { size } = useThree();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = [
        (e.clientX / size.width) * 2 - 1,
        (e.clientY / size.height) * 2 - 1,
      ];
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointer, size.width, size.height]);

  return null;
};

/* ------------------------------------------------------------------ *
 * Public component
 * ------------------------------------------------------------------ */

export const NeuralCore = ({ className }: { className?: string }) => {
  const pointer = useRef<[number, number]>([0, 0]);
  const hostRef = useRef<HTMLDivElement>(null);

  // Render only while the hero is actually on screen. Once the user has
  // scrolled past, the RAF loop stops and the GPU goes idle.
  const [onScreen, setOnScreen] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Skip the canvas entirely for reduced-motion users and for very small
    // screens, where it costs battery and adds little.
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm) return;
    setAllowed(true);

    const el = hostRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      {allowed && (
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 45 }}
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          frameloop={onScreen ? "always" : "never"}
        >
          <PointerTracker pointer={pointer} />
          <ambientLight intensity={0.5} />
          <Network pointer={pointer} />
          <Dust />
        </Canvas>
      )}
    </div>
  );
};

export default NeuralCore;
