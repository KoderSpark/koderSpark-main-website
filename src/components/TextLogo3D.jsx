import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

const ShinyText = () => {
    const textRef = useRef();
    const lightRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        // Move light from left to right repeatedly
        if (lightRef.current) {
            lightRef.current.position.x = (t % 3) * 10 - 15; // Moves from -15 to 15 every 3 seconds
        }
    });

    return (
        <group>
            <Center>
                <Text3D
                    ref={textRef}
                    font="/fonts/helvetiker_bold.typeface.json"
                    size={1.2}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    Koder Spark
                    <meshStandardMaterial
                        color="#ffffff"
                        metalness={0.9}
                        roughness={0.1}
                        emissive="#aaaaaa"
                        emissiveIntensity={0.4}
                    />
                </Text3D>
            </Center>

            {/* Moving light for shiny effect */}
            <pointLight
                ref={lightRef}
                position={[-10, 0, 5]}
                intensity={15}
                color="#ffffff"
                distance={20}
                decay={1}
            />
        </group>
    );
};

const TextLogo3D = () => {
    return (
        <div className="w-48 h-12">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                {/* <Environment preset="city" /> Removing environment to avoid HDR fetch errors due to network */}
                <ShinyText />
            </Canvas>
        </div>
    );
};

export default TextLogo3D;
