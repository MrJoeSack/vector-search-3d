import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

// Configuration data points
const CONFIG_POINTS = [
  {
    id: 'cold-storage',
    name: 'Cold Storage',
    latency: 500,
    cost: 30,
    recall: 90,
    color: '#4FC3F7',
    description: 'Low-cost archive storage with acceptable recall. Good for batch processing and non-critical applications.'
  },
  {
    id: 'warm-cache',
    name: 'Warm Cache',
    latency: 40,
    cost: 150,
    recall: 95,
    color: '#66BB6A',
    description: 'Balanced performance and cost. Ideal for most production applications requiring good response times.'
  },
  {
    id: 'premium-hot',
    name: 'Premium Hot',
    latency: 10,
    cost: 800,
    recall: 98,
    color: '#F44336',
    description: 'Ultra-low latency with maximum accuracy. Perfect for real-time, mission-critical applications.'
  },
  {
    id: 'balanced',
    name: 'Balanced',
    latency: 100,
    cost: 80,
    recall: 93,
    color: '#FFB74D',
    description: 'Cost-effective solution with good performance. Suitable for most RAG and search applications.'
  }
];

// Optimal zones for different use cases
const OPTIMAL_ZONES = [
  {
    name: 'Real-time Search',
    color: '#FF5722',
    opacity: 0.15,
    criteria: { maxLatency: 50, minRecall: 92 },
    vertices: [
      [-2, -2, 4], [1, -2, 4], [1, 4, 4], [-2, 4, 4], // bottom face
      [-2, -2, 5], [1, -2, 5], [1, 4, 5], [-2, 4, 5]  // top face
    ]
  },
  {
    name: 'RAG Applications',
    color: '#4CAF50',
    opacity: 0.12,
    criteria: { maxLatency: 200, maxCost: 200, minRecall: 90 },
    vertices: [
      [-2, -2, 2], [3, -2, 2], [3, 3, 2], [-2, 3, 2], // bottom face
      [-2, -2, 5], [3, -2, 5], [3, 3, 5], [-2, 3, 5]  // top face
    ]
  },
  {
    name: 'Batch Analytics',
    color: '#2196F3',
    opacity: 0.1,
    criteria: { maxCost: 100, minRecall: 85 },
    vertices: [
      [-2, -2, 0], [4, -2, 0], [4, 2, 0], [-2, 2, 0], // bottom face
      [-2, -2, 5], [4, -2, 5], [4, 2, 5], [-2, 2, 5]  // top face
    ]
  }
];

// Logarithmic scaling functions
const logScale = (value, min, max, targetMin = -2, targetMax = 4) => {
  const logValue = Math.log10(value);
  const logMin = Math.log10(min);
  const logMax = Math.log10(max);
  return targetMin + (logValue - logMin) / (logMax - logMin) * (targetMax - targetMin);
};

const linearScale = (value, min, max, targetMin = 0, targetMax = 5) => {
  return targetMin + (value - min) / (max - min) * (targetMax - targetMin);
};

// Convert data coordinates to 3D positions
const dataToPosition = (latency, cost, recall) => [
  logScale(latency, 10, 1000),    // X: log scale for latency
  logScale(cost, 20, 2000),       // Y: log scale for cost
  linearScale(recall, 80, 99)     // Z: linear scale for recall
];

function ConfigurationPoint({ config, isSelected, isHovered, onClick, onHover, onHoverEnd }) {
  const meshRef = useRef();
  const glowRef = useRef();
  
  const position = useMemo(() => dataToPosition(config.latency, config.cost, config.recall), [config]);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      const scale = isHovered ? 1.3 : isSelected ? 1.2 : 1.0;
      meshRef.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
    
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial
          color={config.color}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Main sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(config);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(config);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHoverEnd();
        }}
      >
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshPhongMaterial
          color={config.color}
          emissive={config.color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Label */}
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {config.name}
      </Text>
    </group>
  );
}

function OptimalZone({ zone }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.opacity = zone.opacity + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  // Create box geometry for the zone
  const geometry = useMemo(() => {
    const geom = new THREE.BoxGeometry(
      zone.vertices[1][0] - zone.vertices[0][0], // width
      zone.vertices[2][1] - zone.vertices[0][1], // height  
      zone.vertices[4][2] - zone.vertices[0][2]  // depth
    );
    return geom;
  }, [zone]);

  const position = useMemo(() => [
    (zone.vertices[1][0] + zone.vertices[0][0]) / 2,
    (zone.vertices[2][1] + zone.vertices[0][1]) / 2,
    (zone.vertices[4][2] + zone.vertices[0][2]) / 2
  ], [zone]);

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshBasicMaterial
        color={zone.color}
        transparent
        opacity={zone.opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Axes() {
  const latencyLabels = [10, 50, 100, 500, 1000];
  const costLabels = [20, 50, 100, 200, 500, 1000, 2000];
  const recallLabels = [80, 85, 90, 95, 99];

  return (
    <group>
      {/* X-axis (Latency) */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-2, -2, 0, 4, -2, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#666" />
      </line>
      
      {/* Y-axis (Cost) */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-2, -2, 0, -2, 4, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#666" />
      </line>
      
      {/* Z-axis (Recall) */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-2, -2, 0, -2, -2, 5])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#666" />
      </line>

      {/* Axis Labels */}
      <Text position={[1, -2.5, 0]} fontSize={0.15} color="#999" anchorX="center">
        Query Latency (ms)
      </Text>
      <Text position={[-2.8, 1, 0]} fontSize={0.15} color="#999" anchorX="center" rotation={[0, 0, Math.PI / 2]}>
        Cost ($/M vectors/month)
      </Text>
      <Text position={[-2.5, -2.5, 2.5]} fontSize={0.15} color="#999" anchorX="center" rotation={[0, -Math.PI / 2, 0]}>
        Recall@10 (%)
      </Text>

      {/* Grid lines and tick labels */}
      {latencyLabels.map(latency => {
        const x = logScale(latency, 10, 1000);
        return (
          <group key={latency}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([x, -2, 0, x, -2, 5])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#333" />
            </line>
            <Text position={[x, -2.3, 0]} fontSize={0.1} color="#666" anchorX="center">
              {latency}
            </Text>
          </group>
        );
      })}

      {costLabels.map(cost => {
        const y = logScale(cost, 20, 2000);
        if (y >= -2 && y <= 4) {
          return (
            <group key={cost}>
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([-2, y, 0, 4, y, 0])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#333" />
              </line>
              <Text position={[-2.3, y, 0]} fontSize={0.1} color="#666" anchorX="center">
                ${cost}
              </Text>
            </group>
          );
        }
        return null;
      })}

      {recallLabels.map(recall => {
        const z = linearScale(recall, 80, 99);
        return (
          <group key={recall}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([-2, -2, z, 4, 4, z])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#333" />
            </line>
            <Text position={[-2.3, -2.3, z]} fontSize={0.1} color="#666" anchorX="center">
              {recall}%
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export default function VectorSearchVisualization({ onPointSelect, onPointHover, selectedPoint, hoveredPoint }) {
  const handlePointClick = (config) => {
    onPointSelect(selectedPoint?.id === config.id ? null : config);
  };

  const handlePointHover = (config) => {
    onPointHover(config);
  };

  const handlePointHoverEnd = () => {
    onPointHover(null);
  };

  return (
    <group>
      <Axes />
      
      {OPTIMAL_ZONES.map((zone, index) => (
        <OptimalZone key={index} zone={zone} />
      ))}
      
      {CONFIG_POINTS.map((config) => (
        <ConfigurationPoint
          key={config.id}
          config={config}
          isSelected={selectedPoint?.id === config.id}
          isHovered={hoveredPoint?.id === config.id}
          onClick={handlePointClick}
          onHover={handlePointHover}
          onHoverEnd={handlePointHoverEnd}
        />
      ))}
    </group>
  );
}