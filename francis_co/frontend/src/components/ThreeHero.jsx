import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Float, Text } from '@react-three/drei';

export default function ThreeHero(){
  return (
    <div className='h-96 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#021024] to-[#07305a]'>
      <Canvas camera={{ position: [0,1.5,6], fov:50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5,5,5]} intensity={1} />
        <Suspense fallback={null}>
          <PresentationControls global polar={[-0.4,0.6]} azimuth={[-0.2,0.4]}>
            <Float rotationIntensity={0.6} floatIntensity={0.8}>
              <group position={[0,-0.25,0]}>
                <mesh position={[0,0.8,0]}>
                  <boxGeometry args={[1.8,0.9,0.8]} />
                  <meshStandardMaterial metalness={0.6} roughness={0.2} color='#00b4d8' />
                </mesh>
                <mesh position={[0,0,0]}>
                  <sphereGeometry args={[0.45,32,32]} />
                  <meshStandardMaterial metalness={0.5} roughness={0.3} color='#fff' />
                </mesh>
                <Text position={[0,1.9,0]} fontSize={0.25} color='#fff'>Scot Robotics</Text>
              </group>
            </Float>
          </PresentationControls>
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
