import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Center, Bounds } from '@react-three/drei';

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
};

const PedalModel = ({ modelPath }) => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />
      
      <Environment preset="city" />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <Center>
            <Model modelPath={modelPath} />
          </Center>
        </Bounds>
      </Suspense>

      <ContactShadows position={[0, -1.5, 0]} opacity={0.25} scale={10} blur={3} far={4} />
      
      <OrbitControls makeDefault enableZoom={false} />
    </Canvas>
  );
};

export default PedalModel;