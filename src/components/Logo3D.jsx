import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, Environment } from '@react-three/drei';

const Model = () => {
    const { scene } = useGLTF('/logo.glb');
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y += 0.01;
        }
    });

    return (
        <group ref={ref}>
            <Center>
                <primitive object={scene} scale={0.18} />
            </Center>
        </group>
    );
};

const Logo3D = React.memo(({ className = "w-8 h-8" }) => {
    return (
        <div className={className}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Environment preset="city" />
                <Model />
            </Canvas>
        </div>
    );
});

export default Logo3D;
