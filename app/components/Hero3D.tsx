"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function CyberCore() {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const [accentColor, setAccentColor] = useState("#00ff9d");

    // Poll for accent color changes
    useFrame(() => {
        if (typeof window !== "undefined") {
            const style = getComputedStyle(document.documentElement);
            const color = style.getPropertyValue('--color-accent').trim();
            if (color && color !== accentColor) {
                setAccentColor(color);
            }
        }

        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Icosahedron
                ref={meshRef}
                args={[1, 4]} // Radius 1, detail 4
                scale={hovered ? 1.2 : 1}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <MeshDistortMaterial
                    color={accentColor}
                    attach="material"
                    distort={0.4} // Strength, 0 disables the effect (default=1)
                    speed={2} // Speed (default=1)
                    roughness={0.2}
                    metalness={0.8}
                    wireframe={true}
                />
            </Icosahedron>

            {/* Inner glowing core */}
            <Icosahedron args={[0.5, 0]}>
                <meshBasicMaterial color={accentColor} transparent opacity={0.5} />
            </Icosahedron>
        </Float>
    );
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 opacity-80">
            <div className="w-[500px] h-[500px] pointer-events-auto">
                <Canvas camera={{ position: [0, 0, 3] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <CyberCore />
                </Canvas>
            </div>
        </div>
    );
}
