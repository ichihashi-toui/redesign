// src/components/canvas/HeroPhysics.jsx
import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
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
  { id: 'fv18', name: 'Plumes', category: 'オーバードライブ', model: '/models/plumes.glb', sound: '/audio/fv18.mp3', link: 'https://www.earthquakerdevices.jp/plumes' },
];

const HeroPhysics = ({ onSelect }) => {
  const gltfResults = useGLTF(PEDAL_LIST.map(p => p.model));

  const ballsData = useMemo(() => {
    // 🌟 個数を減らして（20個）、リストにある種類を1つずつ出現させます
    return Array.from({ length: 20 }).map((_, i) => {
      const modelIndex = i % PEDAL_LIST.length;
      return {
        id: `ball-${i}`,
        data: PEDAL_LIST[modelIndex],
        modelIndex: modelIndex,
        // 🌟 最初から詰まっているように、低い位置（y: 2〜4）から落とします
        position: [(Math.random() - 0.5) * 4, 2 + i * 0.4, (Math.random() - 0.5) * 1.5],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      };
    });
  }, []);

  const rigidBodyRefs = useRef([]);
  const clonedScenes = useMemo(() => ballsData.map(ball => gltfResults[ball.modelIndex].scene.clone()), [ballsData, gltfResults]);

  const handleBallClick = (index, data) => {
    const body = rigidBodyRefs.current[index];
    if (body) {
      // 🌟 クリック時の動きも極小に（ピクッとする程度）
      body.applyImpulse({ x: (Math.random() - 0.5) * 0.5, y: 1.5, z: (Math.random() - 0.5) * 0.5 }, true);
      if (onSelect) onSelect(data); // 🌟 これでHero.jsxにデータが飛び、右側の情報が切り替わります
    }
  };

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <Physics gravity={[0, -20, 0]}> {/* 重力を強くして「ずっしり」させます */}
          
          {/* 見えないケース */}
          <RigidBody type="fixed" colliders={false}>
            <CuboidCollider position={[0, -3.5, 0]} args={[6, 0.5, 6]} />
            <CuboidCollider position={[-4.5, 0, 0]} args={[0.5, 10, 6]} />
            <CuboidCollider position={[4.5, 0, 0]} args={[0.5, 10, 6]} />
            <CuboidCollider position={[0, 0, -1.5]} args={[6, 10, 0.5]} />
            
            {/* 🌟 クリックを邪魔しないよう、手前の壁の当たり判定をさらに奥に逃がしました */}
            <CuboidCollider position={[0, 0, 4]} args={[6, 10, 0.5]} /> 
          </RigidBody>

          {ballsData.map((ball, i) => (
            <RigidBody 
              key={ball.id}
              ref={(el) => (rigidBodyRefs.current[i] = el)}
              colliders={false}
              position={ball.position} 
              rotation={ball.rotation} 
              restitution={0}     // 🌟 跳ね返り 0（暴れない）
              friction={1.5}      // 🌟 摩擦を激しく（滑らない）
              linearDamping={4.0}  // 🌟 空気抵抗（重い動き）
              angularDamping={4.0}
            >
              <BallCollider args={[0.85]} /> {/* 🌟 当たり判定をモデルに合わせて大きく */}
              <group
                // pointerDownの方が反応が良いことが多いです
                onPointerDown={(e) => {
                  e.stopPropagation();
                  handleBallClick(i, ball.data);
                }}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { document.body.style.cursor = 'grab'; }}
              >
                {/* 🌟 スケールを 0.4 -> 0.8 に大きくして「ギチギチ感」を出します */}
                <primitive object={clonedScenes[i]} scale={0.8} />
              </group>
            </RigidBody>
          ))}
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default HeroPhysics;