# Demo Preview

Since creating a video requires screen recording tools, here's what the visualization looks like:

## Key Features Demonstrated:

### 1. **3D Scatter Plot**
- The visualization shows a 3D space with three axes:
  - X-axis: Query Latency (logarithmic scale, 10ms to 1000ms)
  - Y-axis: Cost per Million Vectors/Month (logarithmic scale, $20 to $2000)
  - Z-axis: Recall@10 Percentage (linear scale, 80% to 99%)

### 2. **Four Configuration Points**
Each glowing sphere represents a different vector search configuration:
- 🔵 **Cold Storage** (Blue): High latency (500ms), low cost ($30), good recall (90%)
- 🟢 **Warm Cache** (Green): Balanced performance (40ms, $150, 95% recall)
- 🔴 **Premium Hot** (Red): Ultra-fast (10ms), expensive ($800), best recall (98%)
- 🟡 **Balanced** (Yellow): Cost-effective (100ms, $80, 93% recall)

### 3. **Optimal Zones**
Translucent colored regions showing ideal configurations for:
- **Real-time Search** (Red zone): <50ms latency, >92% recall
- **RAG Applications** (Green zone): <200ms latency, <$200 cost, >90% recall
- **Batch Analytics** (Blue zone): <$100 cost, >85% recall

### 4. **Interactive Elements**
- **Mouse drag** to rotate the 3D view
- **Scroll** to zoom in/out
- **Hover** over spheres to see detailed stats
- **Click** spheres for comprehensive configuration details

### 5. **UI Components**
- **Legend panel** on the left explaining all elements
- **Tooltip** appears on hover showing key metrics
- **Details panel** shows full configuration info when clicked
- **Dark theme** with glowing effects for better visibility

## How to Use:

1. **Explore**: Drag to rotate and see different angles
2. **Compare**: Visual distance shows similarity between configurations
3. **Analyze**: Zones help identify which configs work for your use case
4. **Decide**: Click points to get detailed implementation guidance

The visualization makes it easy to understand the trade-offs between speed, cost, and accuracy in vector search systems at a glance!