import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls, Text } from '@react-three/drei';
import { CanvasTexture, DoubleSide, LinearFilter, MathUtils, RepeatWrapping, Vector3 } from 'three';

const shelfMaterial = {
  frame: '#8a5a36',
  inner: '#4c3023',
  edges: '#b98755',
};

function Box({ args, position, rotation, color, roughness = 0.72, metalness = 0.02 }) {
  return (
    <mesh castShadow receiveShadow position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function TapeStrip({ position, rotation, length, width = 0.18 }) {
  const tapeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 96;

    const context = canvas.getContext('2d');
    context.fillStyle = '#f7c51b';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#14130f';

    for (let xPosition = -canvas.height; xPosition < canvas.width + canvas.height; xPosition += 92) {
      context.beginPath();
      context.moveTo(xPosition, 0);
      context.lineTo(xPosition + 44, 0);
      context.lineTo(xPosition + 118, canvas.height);
      context.lineTo(xPosition + 74, canvas.height);
      context.closePath();
      context.fill();
    }

    const texture = new CanvasTexture(canvas);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(Math.max(1, length * 1.25), 1);
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;

    return texture;
  }, [length]);

  useEffect(() => {
    return () => {
      tapeTexture.dispose();
    };
  }, [tapeTexture]);

  return (
    <mesh castShadow position={position} rotation={rotation}>
      <planeGeometry args={[length, width]} />
      <meshStandardMaterial
        map={tapeTexture}
        roughness={0.74}
        side={DoubleSide}
        transparent={false}
      />
    </mesh>
  );
}

function WarningTape() {
  return (
    <group position={[0, 1.45, 0]}>
      <TapeStrip length={3.65} position={[0, 0.02, 0.47]} rotation={[0, 0, -0.82]} />
      <TapeStrip length={3.65} position={[0, 0.02, 0.49]} rotation={[0, 0, 0.82]} />
      <TapeStrip length={1.05} position={[-1.3, 0.02, 0.03]} rotation={[0, Math.PI / 2, -0.82]} />
      <TapeStrip length={1.05} position={[1.3, 0.02, 0.03]} rotation={[0, -Math.PI / 2, 0.82]} />
    </group>
  );
}

function BookMesh({ book, position, selected, disabled, onSelect }) {
  const groupRef = useRef();
  const coverRef = useRef();
  const [hovered, setHovered] = useState(false);
  const selectable = !disabled;
  const restingPosition = useMemo(() => new Vector3(...position), [position]);
  const openPosition = useMemo(() => new Vector3(0, 1.42, 1.42), []);

  useEffect(() => {
    if (!hovered) {
      return undefined;
    }

    document.body.style.cursor = 'pointer';

    return () => {
      document.body.style.cursor = '';
    };
  }, [hovered]);

  useFrame(() => {
    if (!groupRef.current || !coverRef.current) {
      return;
    }

    const targetPosition = selected ? openPosition : restingPosition;
    const targetScale = selected ? 1.22 : hovered ? 1.06 : 1;
    const targetRotationY = selected ? -0.15 : 0;
    const targetRotationZ = selected ? 0.02 : MathUtils.degToRad(book.lean || 0);
    const targetCoverRotation = selected ? -1.65 : 0;

    groupRef.current.position.lerp(targetPosition, 0.12);
    groupRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.12);
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.12);
    groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, targetRotationZ, 0.12);
    coverRef.current.rotation.y = MathUtils.lerp(
      coverRef.current.rotation.y,
      targetCoverRotation,
      0.14
    );
  });

  const handlePointerOver = (event) => {
    if (!selectable) {
      return;
    }

    event.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const handleClick = (event) => {
    if (!selectable) {
      return;
    }

    event.stopPropagation();
    onSelect(book.path);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <Box args={[0.38, 1.34, 0.5]} color={book.color} position={[0, 0, 0]} roughness={0.62} />
      <Box args={[0.3, 1.2, 0.04]} color="#f4ecd7" position={[0.02, 0, 0.27]} roughness={0.9} />
      <group ref={coverRef} position={[-0.19, 0, 0.31]}>
        <Box args={[0.38, 1.34, 0.06]} color={book.color} position={[0.19, 0, 0]} roughness={0.64} />
        <Box args={[0.04, 1.36, 0.08]} color={book.shadowColor} position={[0.02, 0, 0.01]} />
      </group>
      <Text
        anchorX="center"
        anchorY="middle"
        color="#fff8e8"
        fontSize={0.075}
        maxWidth={1}
        outlineColor="rgba(0,0,0,0.25)"
        outlineWidth={0.006}
        position={[0, -0.03, 0.36]}
        rotation={[0, 0, Math.PI / 2]}
      >
        {book.label}
      </Text>
    </group>
  );
}

function Bookshelf({ books, selectedPath, wipMode, onSelectBook }) {
  return (
    <group position={[0, 0, 0]} rotation={[0, -0.18, 0]}>
      <Box args={[2.45, 0.18, 0.72]} color={shelfMaterial.edges} position={[0, 0.08, 0]} />
      <Box args={[2.45, 0.18, 0.72]} color={shelfMaterial.edges} position={[0, 2.92, 0]} />
      <Box args={[0.2, 2.98, 0.72]} color={shelfMaterial.frame} position={[-1.22, 1.5, 0]} />
      <Box args={[0.2, 2.98, 0.72]} color={shelfMaterial.frame} position={[1.22, 1.5, 0]} />
      <Box args={[2.25, 2.76, 0.12]} color={shelfMaterial.inner} position={[0, 1.5, -0.36]} />
      <Box args={[2.24, 0.16, 0.7]} color={shelfMaterial.edges} position={[0, 1.56, 0]} />
      <Box args={[2.58, 0.1, 0.82]} color="#2b1b14" position={[0, -0.04, 0.04]} />

      {books.map((book, index) => (
        <BookMesh
          book={book}
          disabled={wipMode}
          key={book.path}
          onSelect={onSelectBook}
          position={[-0.52 + index * 0.52, 0.82, 0.08]}
          selected={selectedPath === book.path}
        />
      ))}

      {wipMode && <WarningTape />}
    </group>
  );
}

function EnvironmentPlane() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#1b1a16" roughness={0.78} metalness={0.04} />
      </mesh>
      <mesh receiveShadow position={[0, 3.1, -3.9]}>
        <planeGeometry args={[15, 8]} />
        <meshStandardMaterial color="#22221d" roughness={0.88} />
      </mesh>
      <gridHelper args={[12, 12, '#454236', '#2d2b25']} position={[0, 0, 0]} />
    </group>
  );
}

function BookshelfScene({ books, selectedPath, wipMode, onSelectBook }) {
  return (
    <div className="scene-canvas" data-testid="bookshelf-scene">
      <Canvas
        camera={{ position: [4.6, 2.7, 5.4], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        shadows
      >
        <color attach="background" args={['#11110f']} />
        <fog attach="fog" args={['#11110f', 7.8, 13]} />
        <ambientLight intensity={0.45} />
        <directionalLight
          castShadow
          intensity={2.2}
          position={[3.2, 5.1, 4.2]}
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight color="#f4c16d" intensity={0.75} position={[-2.5, 2.3, 2.8]} />
        <EnvironmentPlane />
        <Bookshelf
          books={books}
          onSelectBook={onSelectBook}
          selectedPath={selectedPath}
          wipMode={wipMode}
        />
        <ContactShadows
          blur={2.8}
          far={5}
          opacity={0.35}
          position={[0, 0.02, 0]}
          scale={6}
        />
        <OrbitControls
          enableDamping
          enablePan={false}
          maxDistance={7}
          maxPolarAngle={Math.PI / 2.05}
          minDistance={3.4}
          minPolarAngle={Math.PI / 6}
          target={[0, 1.25, 0]}
        />
      </Canvas>
    </div>
  );
}

export default BookshelfScene;
