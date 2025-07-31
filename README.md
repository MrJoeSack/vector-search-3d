# Vector Search Performance Trade-offs Visualization

An interactive 3D visualization showing the trade-offs between performance, cost, and accuracy in vector search systems, inspired by database query optimizer "Picasso diagrams."

![3D Rotation Demo](screenshots/complete-demo.gif)
*Interactive 3D rotation showing all four configurations and zoom functionality*

![Feature Overview](screenshots/feature-showcase.png)
*Complete feature overview with all configurations and capabilities*

## 🎯 Key Capabilities

**Interactive 3D Visualization:**
- **Drag to rotate** - Explore the data from different angles
- **Scroll to zoom** - Examine axes and relationships in detail  
- **Click spheres** - View detailed performance metrics for each configuration
- **Hover tooltips** - Quick stats without opening full details
- **Legend reference** - Understand colors, zones, and interactions

## 🎥 Application Features

### Interactive Elements
- **Click configurations** to see detailed specifications
- **Rotate the 3D view** by dragging with mouse
- **Zoom in/out** using scroll wheel  
- **Hover over points** for quick metrics tooltips

### Visual Components
- **Legend Panel** (left): Color-coded configurations and optimal zones
- **3D Scatter Plot** (center): Logarithmic axes for cost/latency, linear for recall
- **Grid Lines**: Quantify exact values on each axis
- **Glowing Spheres**: Each represents a vector search configuration
- **Translucent Zones**: Optimal regions for different use cases

## Features

### 3D Scatter Plot
- **X-axis**: Query Latency (10ms to 1000ms, logarithmic scale)
- **Y-axis**: Cost per Million Vectors/Month ($20 to $2000, logarithmic scale)  
- **Z-axis**: Recall@10 Percentage (80% to 99%, linear scale)

### Configuration Points

Four distinct vector search configurations represented as glowing, pulsing spheres:

| Configuration | Latency | Cost/M vectors | Recall@10 | Use Case |
|:---:|:---:|:---:|:---:|:---|
| **Cold Storage** (Blue) | 500ms | $30 | 90% | Batch processing, non-critical applications |
| **Warm Cache** (Green) | 40ms | $150 | 95% | Production applications, balanced performance |
| **Premium Hot** (Red) | 10ms | $800 | 98% | Real-time, mission-critical applications |
| **Balanced** (Yellow) | 100ms | $80 | 93% | RAG applications, cost-effective search |

### Optimal Zones

![Actual Main View](screenshots/actual-main.png)
*Static view highlighting the translucent optimal zones for different use cases*

Translucent 3D regions showing optimal parameter ranges for different use cases:

- **Real-time Search** (Red zone): Latency < 50ms, Recall > 92%
- **RAG Applications** (Green zone): Latency < 200ms, Cost < $200, Recall > 90%
- **Batch Analytics** (Blue zone): Cost < $100, Recall > 85%

### Interactive Features
- **Mouse Controls**: Drag to rotate, scroll to zoom, right-drag to pan
- **Hover Tooltips**: Show detailed stats when hovering over configuration points
- **Click Details**: Click points to display comprehensive configuration information
- **Animated Elements**: Pulsing spheres and breathing glow effects
- **Legend**: Complete guide to configurations, zones, and axes

### Visual Design
- Dark background with subtle grid lines for depth perception
- Glowing spheres with color-coded configurations
- Semi-transparent optimal zones with gradient coloring
- Clean, modern UI with smooth animations and transitions
- Responsive design that works on different screen sizes

## Technology Stack

- **React 18**: Component-based UI framework
- **Three.js**: 3D graphics and WebGL rendering
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers and abstractions
- **Vite**: Fast build tool and development server

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🚀 Deploy to GitHub Pages

For a live demo that anyone can access:

```bash
./deploy-github-pages.sh
```

This will deploy your visualization to: https://mrjoesack.github.io/vector-search-3d

Alternatively, deploy manually:
```bash
npm run build
npm install --save-dev gh-pages
npm run deploy
```

## Usage Instructions

### Navigation
- **Rotate**: Left-click and drag to rotate the 3D view
- **Zoom**: Scroll wheel to zoom in/out
- **Pan**: Right-click and drag to pan the view

### Interaction
- **Hover**: Move mouse over colored spheres to see quick stats in tooltip
- **Click**: Click on spheres to open detailed configuration panel
- **Legend**: Reference the left panel for configuration and zone meanings

### Understanding the Visualization
- **Positioning**: Each sphere's position represents its performance characteristics
- **Colors**: Match the legend - blue for cold storage, green for warm cache, etc.
- **Zones**: Colored transparent areas show optimal ranges for different use cases
- **Axes**: Logarithmic scaling for cost and latency, linear for recall percentage

## Data Sources

The visualization uses realistic performance characteristics based on:
- Industry benchmarks from major vector database providers
- Performance data from production deployments
- Cost analysis from cloud infrastructure providers
- Accuracy measurements from standard evaluation datasets

## Customization

The visualization can be customized by modifying:
- `CONFIG_POINTS` array in `VectorSearchVisualization.jsx` for different configurations
- `OPTIMAL_ZONES` array for different use case boundaries
- Color schemes and visual styling in the CSS files
- Scaling functions for different axis ranges

## Architecture

```
src/
├── App.jsx                    # Main application component
├── App.css                    # Application-specific styles
├── index.css                  # Global styles
├── components/
│   ├── VectorSearchVisualization.jsx  # Main 3D scene component
│   └── Legend.jsx             # Legend and instructions panel
└── main.jsx                   # Application entry point
```

## Performance Considerations

- Uses efficient Three.js geometries and materials
- Implements proper cleanup for 3D resources
- Optimized rendering with React Three Fiber
- Responsive design that scales to different screen sizes
- Smooth 60fps animations with optimized update loops

## Browser Compatibility

- Modern browsers with WebGL support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers with WebGL capabilities

## License

MIT License - feel free to use and modify for your own projects.