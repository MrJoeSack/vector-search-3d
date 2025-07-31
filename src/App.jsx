import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'
import VectorSearchVisualization from './components/VectorSearchVisualization'
import Legend from './components/Legend'
import './App.css'

function App() {
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [hoveredPoint, setHoveredPoint] = useState(null)

  return (
    <div className="app">
      <div className="header">
        <h1>Vector Search Performance Trade-offs</h1>
        <p>Interactive 3D visualization of latency, cost, and recall relationships</p>
      </div>
      
      <div className="visualization-container">
        <Canvas
          camera={{ position: [8, 6, 8], fov: 60 }}
          style={{ background: '#0a0a0a' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.4} />
          
          <VectorSearchVisualization 
            onPointSelect={setSelectedPoint}
            onPointHover={setHoveredPoint}
            selectedPoint={selectedPoint}
            hoveredPoint={hoveredPoint}
          />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={20}
          />
        </Canvas>
        
        <Legend />
        
        {hoveredPoint && (
          <div className="tooltip" style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            border: '1px solid #333'
          }}>
            <h3>{hoveredPoint.name}</h3>
            <p>Latency: {hoveredPoint.latency}ms</p>
            <p>Cost: ${hoveredPoint.cost}/M vectors/month</p>
            <p>Recall@10: {hoveredPoint.recall}%</p>
          </div>
        )}
        
        {selectedPoint && (
          <div className="details-panel" style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            fontSize: '14px',
            border: '1px solid #333',
            maxWidth: '300px'
          }}>
            <h3>{selectedPoint.name} Configuration</h3>
            <div style={{ marginTop: '10px' }}>
              <p><strong>Query Latency:</strong> {selectedPoint.latency}ms</p>
              <p><strong>Cost:</strong> ${selectedPoint.cost}/M vectors/month</p>
              <p><strong>Recall@10:</strong> {selectedPoint.recall}%</p>
              <p><strong>Description:</strong> {selectedPoint.description}</p>
            </div>
            <button 
              onClick={() => setSelectedPoint(null)}
              style={{
                marginTop: '10px',
                padding: '5px 10px',
                background: '#333',
                color: 'white',
                border: '1px solid #555',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
