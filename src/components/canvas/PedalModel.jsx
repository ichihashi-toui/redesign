import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Center, Bounds } from '@react-three/drei';

// 親から modelPath という指示を受け取ります
const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
};

// ここでも modelPath を受け取り、中のModelにバケツリレーで渡します
const PedalModel = ({ modelPath }) => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      {/* 光飛びを防ぐ：全体の光を0.8に上げ、直接光を0.3に下げて柔らかくします */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />
      
      {/* 環境光をstudioからcityに変更すると、コントラストが少し落ち着きます */}
      <Environment preset="city" />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <Center>
            <Model modelPath={modelPath} />
          </Center>
        </Bounds>
      </Suspense>

      {/* 不自然な影を防ぐ：opacity(濃さ)を下げ、blur(ぼかし)を大きくします */}
      <ContactShadows position={[0, -1.5, 0]} opacity={0.25} scale={10} blur={3} far={4} />
      
      <OrbitControls makeDefault enableZoom={false} />
    </Canvas>
  );
};

export default PedalModel;