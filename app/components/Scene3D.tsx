"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Stars } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function ParticleField() {
    const ref = useRef<THREE.Points>(null);

    // Generate random points in a sphere
    const sphere = useMemo(() => {
        const temp = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);
            const r = 40 * Math.cbrt(Math.random()); // Radius

            const x = r * Math.sin(theta) * Math.cos(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(theta);

            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;
        }
        return temp;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="var(--color-accent)" // This won't work directly in canvas, need to pass prop or use state
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

// Helper to get CSS variable color
function useAccentColor() {
    const [color, setColor] = useState("#00ff9d");

    useFrame(() => {
        if (typeof window !== "undefined") {
            const style = getComputedStyle(document.documentElement);
            const newColor = style.getPropertyValue("--color-accent").trim();
            if (newColor && newColor !== color) {
                setColor(newColor);
            }
        }
    });

    return color;
}

function CyberGrid() {
    const gridRef = useRef<THREE.GridHelper>(null);
    const color = useAccentColor();

    useFrame((state) => {
        if (gridRef.current) {
            // Animate grid movement
            gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
        }
    });

    return (
        <group position={[0, -5, 0]} rotation={[0, 0, 0]}>
            <gridHelper
                ref={gridRef}
                args={[100, 50, color, color]}
                position={[0, 0, 0]}
            />
            {/* Fog to fade out grid */}
            <fog attach="fog" args={['#030303', 5, 30]} />
        </group>
    );
}

function FloatingParticles() {
    const color = useAccentColor();
    const ref = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const count = 200;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <Points ref={ref} positions={particles} stride={3}>
            <PointMaterial
                transparent
                color={color}
                size={0.08}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
            />
        </Points>
    )
}

export default function Scene3D() {
    return (
        <div className="canvas-container">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <color attach="background" args={['#030303']} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <FloatingParticles />
                </Float>

                <CyberGrid />

                {/* Ambient light for general illumination */}
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    );
}
