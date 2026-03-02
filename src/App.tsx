/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Info, X } from "lucide-react";

// Import local images
import gravityPicture from "../gravity-picture.webp";
import gettyImages from "../GettyImages-1046128816.webp";
import gravityWell1 from "../gravitywell-1WEB.jpg";

const AboutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[80vh] bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-lg font-light tracking-tight text-white/90">About this Project</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} className="text-white/60" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <div className="space-y-4 text-sm leading-relaxed text-white/70">
            <p>
              I created this project because I wanted a new way to visualize how gravity really happens in a 3D world like ours.
            </p>
            <p>
              Most educational materials and images found online represent spacetime as a <strong>flat 2D surface</strong> (often called the "rubber sheet" analogy). While useful for beginners, this representation is fundamentally incorrect.
            </p>
            <p>
              In our universe, spacetime isn't a sheet; it's a volumetric fabric that exists in all directions. Gravity doesn't just pull "down"—it warps the very geometry of space around a mass from every possible angle.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">The "Flat" Misconception</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <img 
                  src={gravityPicture} 
                  alt="2D Spacetime Analogy" 
                  className="rounded-xl border border-white/10 w-full aspect-video object-cover"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[10px] text-white/40 italic">Common 2D representation</p>
              </div>
              <div className="space-y-2">
                <img 
                  src={gettyImages} 
                  alt="Orbital Visualization" 
                  className="rounded-xl border border-white/10 w-full aspect-video object-cover"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[10px] text-white/40 italic">Planar orbit focus</p>
              </div>
              <div className="space-y-2">
                <img 
                  src={gravityWell1} 
                  alt="Gravity Well" 
                  className="rounded-xl border border-white/10 w-full aspect-video object-cover"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[10px] text-white/40 italic">The "downward" well trap</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-white/70">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">A 3D Approach</h3>
            <p>
              This simulation uses a <strong>3D volumetric grid</strong> to show how mass deforms space in three dimensions. By adjusting the "Divisions" and "Intensity", you can see the topology change not just on a plane, but throughout the volume of the simulation.
            </p>
            <p>
              This is a more faithful representation of General Relativity, where matter tells space how to curve, and space tells matter how to move—in all three spatial dimensions.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-white/70">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Simulation Controls</h3>
            <ul className="space-y-3 list-none">
              <li>
                <strong className="text-white/90">Spacetime Resolution:</strong> Adjust the "Divisions" to increase the density of the grid, revealing finer details of the curvature.
              </li>
              <li>
                <strong className="text-white/90">Gravitational Intensity:</strong> Modify the "Intensity (G)" to simulate different celestial bodies, from planets to black holes.
              </li>
              <li>
                <strong className="text-white/90">Gravitational Waves:</strong> Introduce ripples in the fabric of space, simulating the energy released by accelerating massive objects.
              </li>
              <li>
                <strong className="text-white/90">Particle Interaction:</strong> Spawn particles to see how matter follows the shortest path (geodesics) through curved space.
              </li>
            </ul>
          </div>

          <div className="pt-8 border-t border-white/5 text-[10px] text-white/30 text-right italic">
            Rafael de Menezes Ehlers, February 2026
          </div>
        </div>
        <div className="p-6 border-t border-white/10 bg-black/20 text-center">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-lg shadow-emerald-900/20"
          >
            Back to Simulation
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const InfoTooltip = ({ text }: { text: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePos = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipWidth = 240; // w-60
      const padding = 16;
      
      let left = rect.left + rect.width / 2;
      
      // Keep inside horizontal bounds
      if (left - tooltipWidth / 2 < padding) {
        left = tooltipWidth / 2 + padding;
      } else if (left + tooltipWidth / 2 > window.innerWidth - padding) {
        left = window.innerWidth - tooltipWidth / 2 - padding;
      }

      setPos({ top: rect.top - 12, left });
    }
  };

  return (
    <div 
      ref={triggerRef}
      className="ml-1.5 inline-block align-middle"
      onMouseEnter={() => {
        updatePos();
        setIsVisible(true);
      }}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Info size={10} className="opacity-40 hover:opacity-100 transition-opacity cursor-help" />
      {isVisible && createPortal(
        <div 
          style={{ 
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999
          }}
          className="w-60 p-3 bg-neutral-900/95 border border-white/10 rounded-2xl text-[11px] leading-relaxed text-white/90 shadow-2xl backdrop-blur-xl pointer-events-none transition-all duration-200"
        >
          {text}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-neutral-900"></div>
        </div>,
        document.body
      )}
    </div>
  );
};

const DEFAULT_DIVS = 20;
const MAX_DIVS = 60;
const CUBE_SIZE = 100;
const HALF = CUBE_SIZE / 2;
const INITIAL_RADIUS = 5;
const MAX_RADIUS = CUBE_SIZE * 0.3; // raio máx: 60% do diâmetro do cubo

const CELESTIAL_PRESETS = [
  { name: "Moon (0.16 G)", value: 0.16 },
  { name: "Mars (0.38 G)", value: 0.38 },
  { name: "Earth (1.0 G)", value: 1.0 },
  { name: "Saturn (1.06 G)", value: 1.06 },
  { name: "Neptune (1.12 G)", value: 1.12 },
  { name: "Jupiter (2.53 G)", value: 2.53 },
  { name: "Sun (28 G)", value: 8.0 }, // Scaled for visual clarity
  { name: "White Dwarf (100k G)", value: 15.0 }, // Scaled
  { name: "Neutron Star (Extreme)", value: 25.0 }, // Scaled
];

function buildCubeGridGeometry(divs: number, half = HALF) {
  const LINE_SUBDIV = 10; // subdivisão base por linha (suave, mas leve)
  const MAX_SAMPLES_ALONG = 200; // teto de amostras ao longo de cada linha para evitar travamentos
  const segments: number[] = [];
  const min = -half;
  const max = half;

  // número de amostras por eixo ao longo de cada linha
  const samples = Math.min(MAX_SAMPLES_ALONG, Math.max(2, Math.floor(divs * LINE_SUBDIV)));
  const stepAxis = (max - min) / divs;     // espaçamento entre linhas paralelas
  const stepAlong = (max - min) / samples; // espaçamento entre vértices ao longo de cada linha

  // Linhas paralelas a X
  for (let yi = 0; yi <= divs; yi++) {
    const y = min + yi * stepAxis;
    for (let zi = 0; zi <= divs; zi++) {
      const z = min + zi * stepAxis;
      for (let si = 0; si < samples; si++) {
        const x0 = min + si * stepAlong;
        const x1 = min + (si + 1) * stepAlong;
        segments.push(x0, y, z, x1, y, z);
      }
    }
  }

  // Linhas paralelas a Y
  for (let xi = 0; xi <= divs; xi++) {
    const x = min + xi * stepAxis;
    for (let zi = 0; zi <= divs; zi++) {
      const z = min + zi * stepAxis;
      for (let si = 0; si < samples; si++) {
        const y0 = min + si * stepAlong;
        const y1 = min + (si + 1) * stepAlong;
        segments.push(x, y0, z, x, y1, z);
      }
    }
  }

  // Linhas paralelas a Z
  for (let xi = 0; xi <= divs; xi++) {
    const x = min + xi * stepAxis;
    for (let yi = 0; yi <= divs; yi++) {
      const y = min + yi * stepAxis;
      for (let si = 0; si < samples; si++) {
        const z0 = min + si * stepAlong;
        const z1 = min + (si + 1) * stepAlong;
        segments.push(x, y, z0, x, y, z1);
      }
    }
  }

  const positions = new Float32Array(segments);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("position0", new THREE.BufferAttribute(positions.slice(), 3));
  return geometry;
}

// Vertex shader: poço gravitacional esférico (sem torção), intensificado
const MAX_MASSES = 8;
const gridVertexShader = /* glsl */`
  attribute vec3 position0;
  uniform float uMassRadii[${MAX_MASSES}];
  uniform vec3  uMassCenters[${MAX_MASSES}];
  uniform int   uMassCount;
  uniform float uTime;
  uniform float uWaveAmp;
  
  uniform float uGravScale; // intensidade global
  uniform float uMinR;      // distância mínima
  uniform float uDeform;    // 0=plano, 1=deformado
  uniform float uHalf;      // meia dimensão do cubo para clamp
  uniform float uEpsSurf;   // folga de superfície
  uniform float uWellMul;   // multiplicador do poço
  varying float vDist;

  void main() {
    vec3 p = position0;
    vec3 totalDisplacement = vec3(0.0);
    float minDist = 1000.0;

    for (int i = 0; i < ${MAX_MASSES}; i++) {
      if (i >= uMassCount) break;
      
      vec3 center = uMassCenters[i];
      float sphereR = uMassRadii[i];
      
      vec3 toCenter = center - p;
      float r = length(toCenter);
      minDist = min(minDist, r);
      float safeR = max(r, uMinR);

      // Massa efetiva = 2x o raio
      float mass = sphereR * 2.0;

      // Curvatura tipo "poço" esfericamente simétrica
      float base = (uGravScale * mass * mass) / (safeR * safeR);

      // Suavização/saturação
      base = base / (1.0 + base);

      // Falloff distante leve para manter o cubo reconhecível
      float farFalloff = 1.0 / (1.0 + 0.015 * safeR);
      base *= farFalloff;

      // Evita atravessar a esfera
      float inside = step(r, sphereR);
      float clampToSurface = mix(1.0, sphereR / safeR, inside);

      // Direção segura (evita NaN quando r≈0)
      vec3 dir = (r > 1e-6) ? (toCenter / r) : vec3(1.0, 0.0, 0.0);
      
      // Intensidade mais forte e progressiva
      float radialAmt = pow(base, 1.2) * clampToSurface * 32.0 * uWellMul;
      
      // Calculate displacement for this mass
      float rPrime = max(sphereR + uEpsSurf, r - radialAmt);
      
      // Gravitational Waves: ripple effect based on time and distance
      float wave = sin(r * 0.5 - uTime * 5.0) * exp(-r * 0.02) * uWaveAmp;
      rPrime += wave;

      vec3 displaced = center - dir * rPrime;
      totalDisplacement += (displaced - p);
    }

    vec3 finalDisplaced = p + totalDisplacement;

    // Mantém dentro do cubo SEM "grudar" em arestas/cantos: projeta radialmente na superfície do cubo
    vec3 fromC = finalDisplaced - vec3(0.0); // Assuming cube centered at origin
    float maxAbs = max(max(abs(fromC.x), abs(fromC.y)), abs(fromC.z));
    if (maxAbs > uHalf) {
      float s = (uHalf - 0.001) / maxAbs;
      fromC *= s;
      finalDisplaced = fromC;
    }

    vec3 finalPos = mix(p, finalDisplaced, uDeform);
    vDist = minDist;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
  }
`;

// Fragment shader: linhas sólidas em cinza-azulado claro, leve vinheta por distância
const gridFragmentShader = /* glsl */`
  precision mediump float;
  varying float vDist;
  uniform float uAlpha;
  void main() {
    // Vibrant Cyan (R: 0.0, G: 0.8, B: 1.0) for a technological and futuristic look
    vec3 base = vec3(0.0, 0.8, 1.0);
    // Leve escurecimento com a distância ao centro para sugerir profundidade
    float shade = 1.0 - smoothstep(0.0, 80.0, vDist) * 0.15;
    gl_FragColor = vec4(base * shade, uAlpha);
  }
`;

interface Mass {
  id: string;
  position: THREE.Vector3;
  radius: number;
  color: number;
}

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  mesh: THREE.Mesh;
  trail: THREE.Line;
  history: THREE.Vector3[];
}

interface ThreeApi {
  updateGrid: (divisions: number) => void;
  updateMasses: (masses: Mass[]) => void;
  updateDeform: (on: boolean) => void;
  updateGravScale: (scale: number) => void;
  updateSmooth: (eps: number) => void;
  updateWellMul: (m: number) => void;
  updateAlpha: (a: number) => void;
  spawnParticles: (count: number) => void;
  clearParticles: () => void;
  setParticlesEnabled: (enabled: boolean) => void;
  updateWaveAmp: (amp: number) => void;
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [divs, setDivs] = useState(DEFAULT_DIVS);
  const [masses, setMasses] = useState<Mass[]>([
    { id: "1", position: new THREE.Vector3(0, 0, 0), radius: INITIAL_RADIUS, color: 0xF39C12 }
  ]);
  const [selectedMassId, setSelectedMassId] = useState<string | null>("1");
  const [deformOn, setDeformOn] = useState(true);
  const [smooth, setSmooth] = useState(0.5); // ε: folga de superfície
  const [wellMul, setWellMul] = useState(1.0); // Extra well intensity
  const [gridAlpha, setGridAlpha] = useState(1.0); // Grid transparency (1=opaque)
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [waveAmp, setWaveAmp] = useState(0.0); // Gravitational wave amplitude

  const selectedMass = masses.find(m => m.id === selectedMassId);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    // Deep space black background
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(140, 120, 140);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Iluminação para a esfera dourada/laranja
    const light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(1, 2, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    // Starfield
    const starCount = 2000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 1000;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Particles
    const particles: Particle[] = [];
    const particleGeo = new THREE.SphereGeometry(0.5, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let isParticlesEnabled = true;
    let currentWellMul = 1.0;
    let currentGravScale = 1.0;

    const TRAIL_LENGTH = 40;
    const spawnParticles = (count: number) => {
      for (let i = 0; i < count; i++) {
        const pos = new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        );
        const vel = new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        );
        const mesh = new THREE.Mesh(particleGeo, particleMat);
        mesh.position.copy(pos);
        scene.add(mesh);

        // Trail setup
        const history = Array(TRAIL_LENGTH).fill(0).map(() => pos.clone());
        const trailPoints = new Float32Array(TRAIL_LENGTH * 3);
        for (let j = 0; j < TRAIL_LENGTH; j++) {
          trailPoints[j * 3] = pos.x;
          trailPoints[j * 3 + 1] = pos.y;
          trailPoints[j * 3 + 2] = pos.z;
        }
        const trailGeo = new THREE.BufferGeometry();
        trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPoints, 3));
        const trailMat = new THREE.LineBasicMaterial({ 
          color: 0xffffff, 
          transparent: true, 
          opacity: 0.2,
          blending: THREE.AdditiveBlending
        });
        const trail = new THREE.Line(trailGeo, trailMat);
        scene.add(trail);

        particles.push({ position: pos, velocity: vel, mesh, trail, history });
      }
    };

    const clearParticles = () => {
      particles.forEach(p => {
        scene.remove(p.mesh);
        scene.remove(p.trail);
        p.trail.geometry.dispose();
        (p.trail.material as THREE.Material).dispose();
      });
      particles.length = 0;
    };

    // Mass meshes management
    const massMeshes = new Map<string, THREE.Mesh>();
    let currentMasses = masses;
    
    const updateMassMeshes = (newMasses: Mass[]) => {
      // Remove old meshes
      for (const [id, mesh] of massMeshes.entries()) {
        if (!newMasses.find(m => m.id === id)) {
          scene.remove(mesh);
          mesh.geometry.dispose();
          (mesh.material as THREE.Material).dispose();
          massMeshes.delete(id);
        }
      }
      
      // Add or update meshes
      newMasses.forEach(m => {
        let mesh = massMeshes.get(m.id);
        if (!mesh) {
          const geom = new THREE.SphereGeometry(m.radius, 32, 32);
          const mat = new THREE.MeshStandardMaterial({
            color: m.color,
            metalness: 0.3,
            roughness: 0.4,
            emissive: 0x2b1200,
            emissiveIntensity: 0.2,
          });
          mesh = new THREE.Mesh(geom, mat);
          scene.add(mesh);
          massMeshes.set(m.id, mesh);
        }
        
        mesh.position.copy(m.position);
        if ((mesh.geometry as THREE.SphereGeometry).parameters.radius !== m.radius) {
          mesh.geometry.dispose();
          mesh.geometry = new THREE.SphereGeometry(m.radius, 32, 32);
        }
      });
    };

    updateMassMeshes(masses);

    // Grade cúbica deformável
    let gridGeom = buildCubeGridGeometry(divs, HALF);
    const gridMat = new THREE.ShaderMaterial({
      vertexShader: gridVertexShader,
      fragmentShader: gridFragmentShader,
      uniforms: {
        uMassRadii: { value: new Float32Array(MAX_MASSES) },
        uMassCenters: { value: new Array(MAX_MASSES).fill(0).map(() => new THREE.Vector3()) },
        uMassCount: { value: masses.length },
        uTime: { value: 0.0 },
        uWaveAmp: { value: 0.0 },
        uGravScale: { value: 1.0 },
        uMinR: { value: 1.0 },
        uDeform: { value: deformOn ? 1.0 : 0.0 },
        uHalf: { value: HALF },
        uEpsSurf: { value: 0.5 },
        uWellMul: { value: 1.0 },
        uAlpha: { value: 1.0 },
      },
      transparent: true,
      depthWrite: false,
    });
    let grid = new THREE.LineSegments(gridGeom, gridMat);
    scene.add(grid);

    function onResize() {
      if (!canvas) return;
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    let stop = false;
    const clock = new THREE.Clock();
    function animate() {
      if (stop) return;
      requestAnimationFrame(animate);
      controls.update();
      
      const elapsedTime = clock.getElapsedTime();
      grid.material.uniforms.uTime.value = elapsedTime;

      if (isParticlesEnabled) {
        particles.forEach(p => {
          const force = new THREE.Vector3();
          currentMasses.forEach(m => {
            const dir = new THREE.Vector3().subVectors(m.position, p.position);
            const distSq = dir.lengthSq();
            const dist = Math.sqrt(distSq);
            if (dist > m.radius) {
              // Particle gravity responds to both global scale and well intensity
              const strength = (m.radius * 2.0 * currentWellMul * currentGravScale) / Math.max(distSq, 10.0);
              force.add(dir.normalize().multiplyScalar(strength));
            } else {
              // Collision: bounce or reset? Let's just slow down and push out
              p.velocity.multiplyScalar(0.9);
              force.add(dir.normalize().multiplyScalar(-0.1));
            }
          });
          p.velocity.add(force.multiplyScalar(0.1));
          p.position.add(p.velocity);
          p.mesh.position.copy(p.position);

          // Update history for trail
          p.history.unshift(p.position.clone());
          p.history.pop();

          // Update trail geometry
          const trailPos = p.trail.geometry.attributes.position.array as Float32Array;
          for (let j = 0; j < TRAIL_LENGTH; j++) {
            trailPos[j * 3] = p.history[j].x;
            trailPos[j * 3 + 1] = p.history[j].y;
            trailPos[j * 3 + 2] = p.history[j].z;
          }
          p.trail.geometry.attributes.position.needsUpdate = true;

          // Boundary check
          if (p.position.length() > 200) {
            p.position.set(
              (Math.random() - 0.5) * 100,
              (Math.random() - 0.5) * 100,
              (Math.random() - 0.5) * 100
            );
            p.velocity.set(0, 0, 0);
            // Reset history on boundary jump
            for (let j = 0; j < TRAIL_LENGTH; j++) {
              p.history[j].copy(p.position);
            }
          }
        });
      }

      renderer.render(scene, camera);
    }
    animate();

    const api: ThreeApi = {
      updateGrid(divisions) {
        const newGeom = buildCubeGridGeometry(divisions, HALF);
        grid.geometry.dispose();
        grid.geometry = newGeom;
      },
      updateMasses(newMasses) {
        currentMasses = newMasses;
        updateMassMeshes(newMasses);
        
        const radii = new Float32Array(MAX_MASSES);
        const centers = new Array(MAX_MASSES).fill(0).map(() => new THREE.Vector3());
        
        newMasses.forEach((m, i) => {
          if (i < MAX_MASSES) {
            radii[i] = m.radius;
            centers[i].copy(m.position);
          }
        });
        
        grid.material.uniforms.uMassRadii.value = radii;
        grid.material.uniforms.uMassCenters.value = centers;
        grid.material.uniforms.uMassCount.value = newMasses.length;
      },
      updateDeform(on) {
        grid.material.uniforms.uDeform.value = on ? 1.0 : 0.0;
      },
      updateGravScale(scale) {
        currentGravScale = scale;
        grid.material.uniforms.uGravScale.value = scale;
      },
      updateSmooth(eps) {
        grid.material.uniforms.uEpsSurf.value = eps;
      },
      updateWellMul(m) {
        currentWellMul = m;
        grid.material.uniforms.uWellMul.value = m;
      },
      updateAlpha(a) {
        grid.material.uniforms.uAlpha.value = a;
        grid.material.transparent = a < 1.0 || grid.material.transparent;
        grid.material.needsUpdate = true;
      },
      spawnParticles(count) {
        spawnParticles(count);
      },
      clearParticles() {
        clearParticles();
      },
      setParticlesEnabled(enabled) {
        isParticlesEnabled = enabled;
      },
      updateWaveAmp(amp) {
        grid.material.uniforms.uWaveAmp.value = amp;
      }
    };

    (canvas as any).__api = api;

    return () => {
      stop = true;
      ro.disconnect();
      controls.dispose();
      gridGeom.dispose();
      gridMat.dispose();
      renderer.dispose();
      massMeshes.forEach(m => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
    };
  }, []);

  useEffect(() => {
    const api = (canvasRef.current as any)?.__api as ThreeApi;
    if (!api) return;
    api.updateDeform(deformOn);
  }, [deformOn]);

  // Atualiza grid ao mudar divisões
  useEffect(() => {
    const api = (canvasRef.current as any)?.__api as ThreeApi;
    if (!api) return;
    const safeDivs = Math.max(1, Math.min(MAX_DIVS, Number(divs) || DEFAULT_DIVS));
    api.updateGrid(safeDivs);
  }, [divs]);

  // Atualiza esfera + gravidade ligada ao raio
  useEffect(() => {
    const api = (canvasRef.current as any)?.__api as ThreeApi;
    if (!api) return;
    api.updateMasses(masses);
    
    // Update gravity scale based on average mass or similar
    const avgRadius = masses.reduce((acc, m) => acc + m.radius, 0) / masses.length;
    const scale = THREE.MathUtils.clamp(((2 * avgRadius) / MAX_RADIUS) * 4.0, 0.05, 6.0);
    api.updateGravScale(scale);
  }, [masses]);

  // Update Surface Smoothness (ε)
  useEffect(() => {
    const api = (canvasRef.current as any)?.__api as ThreeApi;
    if (!api) return;
    api.updateSmooth(smooth);
  }, [smooth]);

  // Update Well Intensity
  useEffect(() => {
    const api = (canvasRef.current as any)?.__api as ThreeApi;
    if (!api) return;
    api.updateWellMul(wellMul);
  }, [wellMul]);

  // Update Grid Transparency
  useEffect(() => {
    const api = (canvasRef.current as any)?.__api as ThreeApi;
    if (!api) return;
    api.updateAlpha(gridAlpha);
  }, [gridAlpha]);

  useEffect(() => {
    const api = (canvasRef.current as any)?.__api as ThreeApi;
    if (!api) return;
    api.setParticlesEnabled(particlesEnabled);
  }, [particlesEnabled]);

  useEffect(() => {
    const api = (canvasRef.current as any)?.__api as ThreeApi;
    if (!api) return;
    api.updateWaveAmp(waveAmp);
  }, [waveAmp]);

  const addMass = () => {
    if (masses.length >= MAX_MASSES) return;
    const id = Math.random().toString(36).substr(2, 9);
    const newMass: Mass = {
      id,
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      ),
      radius: INITIAL_RADIUS,
      color: [0xF39C12, 0xE74C3C, 0x3498DB, 0x9B59B6, 0x2ECC71][masses.length % 5]
    };
    setMasses([...masses, newMass]);
    setSelectedMassId(id);
  };

  const removeMass = (id: string) => {
    if (masses.length <= 1) return;
    const newMasses = masses.filter(m => m.id !== id);
    setMasses(newMasses);
    if (selectedMassId === id) {
      setSelectedMassId(newMasses[0].id);
    }
  };

  const updateSelectedMass = (updates: Partial<Mass>) => {
    if (!selectedMassId) return;
    setMasses(masses.map(m => m.id === selectedMassId ? { ...m, ...updates } : m));
  };

  const applyPreset = (type: string) => {
    switch (type) {
      case "blackhole":
        setMasses([
          { id: "bh", position: new THREE.Vector3(0, 0, 0), radius: 25, color: 0x111111 }
        ]);
        setSelectedMassId("bh");
        setWellMul(2.5);
        setWaveAmp(0.5);
        break;
      case "binary":
        setMasses([
          { id: "b1", position: new THREE.Vector3(-30, 0, 0), radius: 12, color: 0xF39C12 },
          { id: "b2", position: new THREE.Vector3(30, 0, 0), radius: 12, color: 0x3498DB }
        ]);
        setSelectedMassId("b1");
        setWellMul(1.5);
        setWaveAmp(2.0);
        break;
      case "triple":
        setMasses([
          { id: "t1", position: new THREE.Vector3(-35, -20, 0), radius: 10, color: 0xE74C3C },
          { id: "t2", position: new THREE.Vector3(35, -20, 0), radius: 10, color: 0x2ECC71 },
          { id: "t3", position: new THREE.Vector3(0, 35, 0), radius: 10, color: 0xF1C40F }
        ]);
        setSelectedMassId("t1");
        setWellMul(1.2);
        setWaveAmp(1.0);
        break;
      case "grid":
        setMasses([
          { id: "g1", position: new THREE.Vector3(0, 0, 0), radius: 15, color: 0xF39C12 }
        ]);
        setSelectedMassId("g1");
        setWellMul(1.0);
        setWaveAmp(0.0);
        setDivs(40);
        break;
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white flex overflow-hidden font-sans">
      {/* Floating Sidebar */}
      <div className="absolute top-6 left-6 bottom-6 w-72 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl z-20 flex flex-col overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Control Panel</h2>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar">
          {/* Simulation Settings */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Simulation</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <label className="text-[11px] font-medium uppercase tracking-wider opacity-60">Divisions</label>
                  <InfoTooltip text="Simulates the resolution of the spacetime fabric. Higher density allows for more precise visualization of curvature gradients." />
                </div>
                <span className="text-[10px] font-mono text-emerald-400">{divs}</span>
              </div>
              <input
                type="range"
                min={1}
                max={MAX_DIVS}
                value={divs}
                onChange={(e) => setDivs(parseInt(e.target.value || "0", 10))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <label className="text-[11px] font-medium uppercase tracking-wider opacity-60">Grid Alpha</label>
                  <InfoTooltip text="Controls the transparency of the grid lines. Lower values help focus on the masses and particles." />
                </div>
                <span className="text-[10px] font-mono text-emerald-400">{gridAlpha.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={gridAlpha}
                onChange={(e) => setGridAlpha(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <label className="text-[11px] font-medium uppercase tracking-wider opacity-60 block">Presets</label>
                <InfoTooltip text="Quick-start scenarios demonstrating common astrophysical configurations like binary star systems or black holes." />
              </div>
              <select 
                onChange={(e) => applyPreset(e.target.value)}
                className="w-full bg-neutral-800 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500/50 transition-colors"
                defaultValue=""
              >
                <option value="" disabled>Select Configuration</option>
                <option value="blackhole">Black Hole</option>
                <option value="binary">Binary System</option>
                <option value="triple">Triple System</option>
                <option value="grid">Standard Well</option>
              </select>
            </div>
          </section>

          {/* Mass Management */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Mass Management</h3>
            
            <div className="flex gap-2">
              <button 
                onClick={addMass}
                disabled={masses.length >= MAX_MASSES}
                className="flex-1 px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
              >
                + Add Mass
              </button>
              <select 
                value={selectedMassId || ""} 
                onChange={(e) => setSelectedMassId(e.target.value)}
                className="flex-1 bg-neutral-800 border border-white/10 rounded-lg px-3 py-2 text-[10px] focus:outline-none"
              >
                {masses.map((m, i) => (
                  <option key={m.id} value={m.id}>Object {i + 1}</option>
                ))}
              </select>
            </div>

            {selectedMass && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Properties</span>
                  {masses.length > 1 && (
                    <button 
                      onClick={() => selectedMassId && removeMass(selectedMassId)}
                      className="text-[9px] text-red-400 hover:text-red-300 uppercase font-bold tracking-tighter"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <label className="text-[10px] font-medium uppercase tracking-wider opacity-60">Radius</label>
                      <InfoTooltip text="Represents the physical size of the celestial body. In General Relativity, mass and density determine the depth of the gravitational well." />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">{selectedMass.radius.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={MAX_RADIUS}
                    step={0.1}
                    value={selectedMass.radius}
                    onChange={(e) => updateSelectedMass({ radius: parseFloat(e.target.value) })}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {['x', 'y', 'z'].map((axis) => (
                    <div key={axis} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <label className="text-[10px] font-medium uppercase tracking-wider opacity-60">{axis.toUpperCase()} Position</label>
                          <InfoTooltip text={`Coordinate on the ${axis.toUpperCase()} axis. Gravity propagates from the center of mass, affecting the surrounding topology.`} />
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400">{(selectedMass.position as any)[axis].toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min={-HALF}
                        max={HALF}
                        step={0.5}
                        value={(selectedMass.position as any)[axis]}
                        onChange={(e) => {
                          const newPos = selectedMass.position.clone();
                          (newPos as any)[axis] = parseFloat(e.target.value);
                          updateSelectedMass({ position: newPos });
                        }}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Physics & Waves */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Physics & Waves</h3>
            
            <label className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center">
                <span className="text-[11px] font-medium uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">Deform Space</span>
                <InfoTooltip text="General Relativity states that gravity is not a force, but the curvature of spacetime caused by mass and energy." />
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={deformOn}
                  onChange={(e) => setDeformOn(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </div>
            </label>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <label className="text-[11px] font-medium uppercase tracking-wider opacity-60">Intensity</label>
                  <InfoTooltip text="The gravitational constant (G) multiplier. Higher values simulate more massive objects like black holes or neutron stars." />
                </div>
                <span className="text-[10px] font-mono text-emerald-400">{wellMul.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={20}
                step={0.1}
                value={wellMul}
                onChange={(e) => setWellMul(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              
              <div className="pt-2">
                <div className="flex items-center mb-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-white/30 block">Gravity Presets</label>
                  <InfoTooltip text="Predefined gravitational intensities matching real celestial bodies. Values are scaled for visual clarity." />
                </div>
                <select 
                  onChange={(e) => setWellMul(parseFloat(e.target.value))}
                  className="w-full bg-neutral-800 border border-white/5 rounded px-2 py-1.5 text-[10px] focus:outline-none focus:border-emerald-500/30 transition-colors"
                  value={CELESTIAL_PRESETS.find(p => p.value === wellMul) ? wellMul : ""}
                >
                  <option value="" disabled>Select Gravity (G)</option>
                  {CELESTIAL_PRESETS.map(p => (
                    <option key={p.name} value={p.value}>{p.name}</option>
                  ))}
                  <option value={wellMul}>Custom ({wellMul.toFixed(2)} G)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <label className="text-[11px] font-medium uppercase tracking-wider opacity-60">Waves</label>
                  <InfoTooltip text="Gravitational Waves are ripples in spacetime caused by accelerating masses, as predicted by Einstein in 1916." />
                </div>
                <span className="text-[10px] font-mono text-blue-400">{waveAmp.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={0.1}
                value={waveAmp}
                onChange={(e) => setWaveAmp(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </section>

          {/* Particles */}
          <section className="space-y-4">
            <div className="flex items-center mb-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Particles</h3>
              <InfoTooltip text="Inject test masses to observe how spacetime curvature dictates the motion of matter." />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  const api = (canvasRef.current as any)?.__api as ThreeApi;
                  api?.spawnParticles(20);
                }}
                className="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
              >
                Spawn
              </button>
              <button 
                onClick={() => {
                  const api = (canvasRef.current as any)?.__api as ThreeApi;
                  api?.clearParticles();
                }}
                className="flex-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
              >
                Clear
              </button>
            </div>

            <label className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center">
                <span className="text-[11px] font-medium uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">Simulate Orbit</span>
                <InfoTooltip text="Test the Equivalence Principle. Particles follow geodesics—the shortest path in curved spacetime—appearing as orbits." />
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={particlesEnabled}
                  onChange={(e) => setParticlesEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
              </div>
            </label>
          </section>
        </div>

        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[9px] uppercase tracking-widest text-white/30">
              <span>Status</span>
              <span className="text-emerald-500">Active</span>
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-widest text-white/30">
              <span>Engine</span>
              <span>Three.js v173</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full outline-none" />
        
        {/* Bottom Info */}
        <div className="absolute bottom-10 right-10 text-right">
          <h1 className="text-6xl font-light tracking-tighter text-white/90 leading-none pointer-events-none">Gravitational Well</h1>
          <p className="text-sm font-mono text-white/40 uppercase tracking-[0.5em] mt-3 pointer-events-none">Multi-Body Spacetime Topology</p>
          <button 
            onClick={() => setIsAboutOpen(true)}
            className="mt-6 text-[10px] uppercase tracking-[0.3em] text-emerald-400/60 hover:text-emerald-400 transition-colors border-b border-emerald-400/20 hover:border-emerald-400/50 pb-1"
          >
            Read more about this project
          </button>
        </div>

        <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

        {/* Top Right Stats */}
        <div className="absolute top-10 right-10 p-6 bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-2xl text-[10px] uppercase tracking-[0.2em] text-white/60 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-8">
              <span className="opacity-50">Active Masses</span>
              <span className="text-emerald-400 font-bold tabular-nums">{masses.length} / {MAX_MASSES}</span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="opacity-50">Grid Resolution</span>
              <span className="text-emerald-400 font-bold tabular-nums">{divs}³</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
