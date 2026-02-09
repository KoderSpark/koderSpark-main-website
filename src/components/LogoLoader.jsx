import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center, Environment } from '@react-three/drei';

const Model = () => {
    const { scene } = useGLTF('/logo.glb');
    const ref = useRef();

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 2; // Spin speed
        }
    });

    const { viewport } = useThree();

    // Responsive scale: smaller on mobile, larger on desktop
    // Base scale 0.05 adjusted by viewport width
    const scale = Math.min(viewport.width, viewport.height) * 0.015;

    return (
        <primitive object={scene} ref={ref} scale={scale} />
    );
};

const LogoLoader = () => {
    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <div className="w-full h-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={1} />
                    <Environment preset="city" />
                    <Center>
                        <Model />
                    </Center>
                </Canvas>
            </div>
        </div>
    );
};

export default LogoLoader;
