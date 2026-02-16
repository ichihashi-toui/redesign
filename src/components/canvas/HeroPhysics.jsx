// src/components/canvas/HeroPhysics.jsx
import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF, ContactShadows } from '@react-three/drei';
import { Physics, RigidBody, BallCollider, CuboidCollider } from '@react-three/rapier';

const PEDAL_LIST = [
  { id: 'fv01', name: 'Acapulco Gold', category: 'パワーアンプディストーション', model: '/models/acapulco.glb', sound: '/audio/fv01.mp3', link: 'https://www.earthquakerdevices.jp/acapulco-gold' },
  { id: 'fv02', name: 'Afterneath', category: 'ショートディレイリバーブ', model: '/models/afterneath.glb', sound: '/audio/fv02.mp3', link: 'https://www.earthquakerdevices.jp/afterneath' },
  { id: 'fv03', name: 'Aqueduct', category: 'ビブラート', model: '/models/aqueduct.glb', sound: '/audio/fv03.mp3', link: 'https://www.earthquakerdevices.jp/aqueduct' },
  { id: 'fv04', name: 'Astral Destiny', category: 'オクターブモジュレーション/リバーブ', model: '/models/astral.glb', sound: '/audio/fv04.mp3', link: 'https://www.earthquakerdevices.jp/astral-destiny' },
  { id: 'fv05', name: 'Barrows', category: 'ファズアタッカー', model: '/models/barrows.glb', sound: '/audio/fv05.mp3', link: 'https://www.earthquakerdevices.jp/barrows' },
  { id: 'fv06', name: 'Bellows', category: 'ファズドライバー', model: '/models/bellows.glb', sound: '/audio/fv06.mp3', link: 'https://www.earthquakerdevices.jp/bellows' },
  { id: 'fv07', name: 'Blumes', category: 'ベースオーバードライブ', model: '/models/blumes.glb', sound: '/audio/fv07.mp3', link: 'https://www.earthquakerdevices.jp/blumes' },
  { id: 'fv09', name: 'The Depths', category: 'アナログオプティカルビブラート', model: '/models/depths.glb', sound: '/audio/fv09.mp3', link: 'https://www.earthquakerdevices.jp/the-depths' },
  { id: 'fv10', name: 'Dispatch Master', category: 'デジタルディレイ＆リバーブ', model: '/models/dispatch.glb', sound: '/audio/fv10.mp3', link: 'https://www.earthquakerdevices.jp/dispatch-master' },
  { id: 'fv11', name: 'Silos', category: 'マルチジェネレーションディレイ', model: '/models/silios.glb', sound: '/audio/fv11.mp3', link: 'https://www.earthquakerdevices.jp/silos' },
  { id: 'fv12', name: 'Ghost Echo', category: 'ビンテージリバーブ', model: '/models/ghost.glb', sound: '/audio/fv12.mp3', link: 'https://www.earthquakerdevices.jp/ghost-echo' },
  { id: 'fv13', name: 'Rainbow Machine', category: 'ポリフォニックピッチシフター', model: '/models/rainbow.glb', sound: '/audio/fv13.mp3', link: 'https://www.earthquakerdevices.jp/rainbow-machine' },
  { id: 'fv14', name: 'Spatial Delivery', category: 'フィルター', model: '/models/spatoal.glb', sound: '/audio/fv14.mp3', link: 'https://www.earthquakerdevices.jp/spatial-delivery' },
  { id: 'fv15', name: 'Tentacle', category: 'アナログオクターブアップ', model: '/models/tentacle.glb', sound: '/audio/fv15.mp3', link: 'https://www.earthquakerdevices.jp/tentacle' },
  { id: 'fv16', name: 'Tone Reaper', category: 'ファズ', model: '/models/reaper.glb', sound: '/audio/fv16.mp3', link: 'https://www.earthquakerdevices.jp/tone-reaper' },
  { id: 'fv17', name: 'Zoar', category: 'ダイナミックディストーション', model: '/models/zoar.glb', sound: '/audio/fv17.mp3', link: 'https://www.earthquakerdevices.jp/zoar' },
  { id: 'fv18', name: 'Plumes', category: 'オーバードライブ', model: '/models/plumes01.glb', sound: '/audio/fv18.mp3', link: 'https://www.earthquakerdevices.jp/plumes' },
];

const HeroPhysics = ({ onSelect }) => {
  const gltfResults = useGLTF(PEDAL_LIST.map(p => p.model));

  const ballsData = useMemo(() => {
    const totalBalls = 300; 
    const cols = 15; 
    const spacingX = 0.75;
    const spacingZ = 0.75;
    
    const startX = -((cols - 1) * spacingX) / 2;
    const startZ = -((Math.ceil(totalBalls / cols) - 1) * spacingZ) / 2;

    return Array.from({ length: totalBalls }).map((_, i) => {
      const modelIndex = i % PEDAL_LIST.length;
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      return {
        id: `ball-${i}`,
        data: PEDAL_LIST[modelIndex],
        modelIndex: modelIndex,
        position: [
          startX + col * spacingX + (Math.random() - 0.5) * 0.2, 
          -2.05 + (Math.random() * 0.3), 
          startZ + row * spacingZ + (Math.random() - 0.5) * 0.2
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      };
    });
  }, []);

  const rigidBodyRefs = useRef([]);
  const clonedScenes = useMemo(() => ballsData.map(ball => gltfResults[ball.modelIndex].scene.clone()), [ballsData, gltfResults]);

  return (
    <Canvas camera={{ position: [0, 30, 0], fov: 16 }} shadows>
      <color attach="background" args={['#e5e5e5']} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 15, 5]} intensity={2.0} castShadow shadow-bias={-0.0001} />
      
      <Suspense fallback={null}>
        <Physics gravity={[0, -40, 0]}>
          <RigidBody type="fixed" colliders={false}>
            <mesh position={[0, -2.7, 0]} receiveShadow>
              <boxGeometry args={[40, 0.1, 40]} />
              <meshStandardMaterial color="#e5e5e5" />
            </mesh>
            
            <CuboidCollider position={[0, -2.45, 0]} args={[20, 0.05, 20]} />
            
            <CuboidCollider position={[-6.5, 0, 0]} args={[0.5, 10, 6]} /> 
            <CuboidCollider position={[6.5, 0, 0]} args={[0.5, 10, 6]} />  
            <CuboidCollider position={[0, 0, -4.5]} args={[7, 10, 0.5]} /> 
            <CuboidCollider position={[0, 0, 4.5]} args={[7, 10, 0.5]} />  
          </RigidBody>

          {ballsData.map((ball, i) => (
            <RigidBody 
              key={ball.id}
              ref={(el) => (rigidBodyRefs.current[i] = el)}
              colliders={false}
              position={ball.position} 
              rotation={ball.rotation} 
              restitution={0}     
              friction={3.0}      
              linearDamping={15.0} 
              angularDamping={15.0}
              canSleep={true} 
            >
              <BallCollider args={[0.4]} />

              <group
                onPointerDown={(e) => {
                  e.stopPropagation();
                  if (onSelect) onSelect(ball.data);
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                  document.body.style.cursor = 'default';
                }}
              >
                <primitive object={clonedScenes[i]} scale={0.7} />
              </group>
            </RigidBody>
          ))}
          
          <ContactShadows position={[0, -2.69, 0]} opacity={0.85} scale={20} blur={1.5} far={3.5} color="#000000" />
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default HeroPhysics;