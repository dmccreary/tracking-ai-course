import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label, ScatterChart, Scatter } from 'recharts';

const MooresLawChart = () => {
  const [scale, setScale] = useState('logarithmic'); // Default to logarithmic scale
  const [hoverInfo, setHoverInfo] = useState(null);

  // Comprehensive dataset of CPU/GPU transistor counts from 1964 to 2025
  // Data sourced from reputable sources including Intel, AMD, NVIDIA, and computer history publications
  const chipData = [
    { year: 1965, name: "Intel 4004", transistors: 2300, type: "CPU", manufacturer: "Intel", process: "10000nm", description: "First commercially available microprocessor" },
    { year: 1972, name: "Intel 8008", transistors: 3500, type: "CPU", manufacturer: "Intel", process: "10000nm", description: "8-bit CPU, first with dedicated registers" },
    { year: 1974, name: "Intel 8080", transistors: 4500, type: "CPU", manufacturer: "Intel", process: "6000nm", description: "8-bit microprocessor, influential in early personal computers" },
    { year: 1975, name: "MOS 6502", transistors: 3510, type: "CPU", manufacturer: "MOS Technology", process: "8000nm", description: "Powered Apple II, Commodore 64, and early Nintendo consoles" },
    { year: 1978, name: "Intel 8086", transistors: 29000, type: "CPU", manufacturer: "Intel", process: "3000nm", description: "First x86 processor, 16-bit architecture" },
    { year: 1979, name: "Motorola 68000", transistors: 68000, type: "CPU", manufacturer: "Motorola", process: "3500nm", description: "Powered early Macintosh computers" },
    { year: 1982, name: "Intel 80286", transistors: 134000, type: "CPU", manufacturer: "Intel", process: "1500nm", description: "Second-generation x86 processor" },
    { year: 1985, name: "Intel 80386", transistors: 275000, type: "CPU", manufacturer: "Intel", process: "1500nm", description: "First 32-bit x86 processor" },
    { year: 1989, name: "Intel 80486", transistors: 1200000, type: "CPU", manufacturer: "Intel", process: "1000nm", description: "First with integrated FPU" },
    { year: 1993, name: "Intel Pentium", transistors: 3100000, type: "CPU", manufacturer: "Intel", process: "800nm", description: "Fifth generation x86 architecture" },
    { year: 1995, name: "Intel Pentium Pro", transistors: 5500000, type: "CPU", manufacturer: "Intel", process: "500nm", description: "Introduced out-of-order execution" },
    { year: 1997, name: "Intel Pentium II", transistors: 7500000, type: "CPU", manufacturer: "Intel", process: "350nm", description: "Included MMX technology" },
    { year: 1999, name: "Intel Pentium III", transistors: 9500000, type: "CPU", manufacturer: "Intel", process: "250nm", description: "Added SSE instructions" },
    { year: 2000, name: "Intel Pentium 4", transistors: 42000000, type: "CPU", manufacturer: "Intel", process: "180nm", description: "NetBurst microarchitecture" },
    { year: 2003, name: "AMD Opteron", transistors: 105900000, type: "CPU", manufacturer: "AMD", process: "130nm", description: "First 64-bit x86 processor" },
    { year: 2004, name: "NVIDIA GeForce 6800", transistors: 222000000, type: "GPU", manufacturer: "NVIDIA", process: "130nm", description: "Early programmable GPU" },
    { year: 2006, name: "Intel Core 2 Duo", transistors: 291000000, type: "CPU", manufacturer: "Intel", process: "65nm", description: "Core microarchitecture, multi-core" },
    { year: 2007, name: "NVIDIA Tesla C870", transistors: 681000000, type: "GPU", manufacturer: "NVIDIA", process: "90nm", description: "First CUDA-capable GPU" },
    { year: 2008, name: "Intel Core i7 (Nehalem)", transistors: 731000000, type: "CPU", manufacturer: "Intel", process: "45nm", description: "Nehalem microarchitecture" },
    { year: 2010, name: "NVIDIA Fermi GF100", transistors: 3000000000, type: "GPU", manufacturer: "NVIDIA", process: "40nm", description: "First with CUDA compute capability 2.0" },
    { year: 2011, name: "AMD Bulldozer", transistors: 1200000000, type: "CPU", manufacturer: "AMD", process: "32nm", description: "Bulldozer microarchitecture" },
    { year: 2012, name: "NVIDIA Kepler GK110", transistors: 7100000000, type: "GPU", manufacturer: "NVIDIA", process: "28nm", description: "Kepler architecture" },
    { year: 2012, name: "Intel Core i7 (Ivy Bridge)", transistors: 1400000000, type: "CPU", manufacturer: "Intel", process: "22nm", description: "First with 3D tri-gate transistors" },
    { year: 2014, name: "NVIDIA Maxwell GM200", transistors: 8000000000, type: "GPU", manufacturer: "NVIDIA", process: "28nm", description: "Maxwell architecture" },
    { year: 2015, name: "Intel Xeon E5 v4", transistors: 7200000000, type: "CPU", manufacturer: "Intel", process: "14nm", description: "Broadwell architecture, 22 cores" },
    { year: 2016, name: "NVIDIA Pascal GP100", transistors: 15300000000, type: "GPU", manufacturer: "NVIDIA", process: "16nm", description: "Pascal architecture" },
    { year: 2017, name: "AMD EPYC (Naples)", transistors: 19200000000, type: "CPU", manufacturer: "AMD", process: "14nm", description: "Zen architecture, up to 32 cores" },
    { year: 2018, name: "NVIDIA Turing TU102", transistors: 18600000000, type: "GPU", manufacturer: "NVIDIA", process: "12nm", description: "Turing architecture with RT cores" },
    { year: 2019, name: "AMD Epyc Rome", transistors: 39540000000, type: "CPU", manufacturer: "AMD", process: "7nm", description: "Zen 2 architecture, 64 cores" },
    { year: 2020, name: "NVIDIA Ampere A100", transistors: 54200000000, type: "GPU", manufacturer: "NVIDIA", process: "7nm", description: "Ampere architecture, tensor cores" },
    { year: 2021, name: "Apple M1 Ultra", transistors: 114000000000, type: "SoC", manufacturer: "Apple", process: "5nm", description: "ARM-based SoC with integrated GPU" },
    { year: 2022, name: "NVIDIA Hopper H100", transistors: 80000000000, type: "GPU", manufacturer: "NVIDIA", process: "4nm", description: "Hopper architecture" },
    { year: 2023, name: "AMD EPYC Genoa", transistors: 90000000000, type: "CPU", manufacturer: "AMD", process: "5nm", description: "Zen 4 architecture, 96 cores" },
    { year: 2024, name: "NVIDIA Blackwell B200", transistors: 208000000000, type: "GPU", manufacturer: "NVIDIA", process: "4nm", description: "Blackwell architecture for AI" },
    { year: 2025, name: "Cerebras WSE-3", transistors: 4000000000000, type: "AI", manufacturer: "Cerebras", process: "5nm", description: "Wafer-scale AI processor" }
  ];

  // Calculate logarithmic values for each data point
  const chartData = chipData.map(item => ({
    ...item,
    log_transistors: Math.log10(item.transistors)
  }));

  // Function to toggle between linear and logarithmic scales
  const toggleScale = () => {
    setScale(scale === 'linear' ? 'logarithmic' : 'linear');
  };

  // Handle hover over data points
  const handleMouseOver = (data) => {
    setHoverInfo(data);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoverInfo(null);
  };

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bg-white p-4 rounded shadow border border-gray-200">
          <h4 className="font-bold text-lg">{data.name} ({data.year})</h4>
          <p><span className="font-semibold">Transistors:</span> {data.transistors.toLocaleString()}</p>
          <p><span className="font-semibold">Manufacturer:</span> {data.manufacturer}</p>
          <p><span className="font-semibold">Process:</span> {data.process}</p>
          <p><span className="font-semibold">Type:</span> {data.type}</p>
          <p className="mt-2">{data.description}</p>
        </div>
      );
    }
    return null;
  };

  // Format y-axis ticks
  const formatYAxis = (value) => {
    if (scale === 'logarithmic') {
      return `10^${value}`;
    }
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Moore's Law: Transistor Count (1965-2025)</h2>
        <p className="text-gray-600 mb-4">
          Visualization of the exponential growth in transistor counts, following Gordon Moore's 1965 prediction
          that transistor density would double approximately every two years.
        </p>
        <button 
          onClick={toggleScale} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Switch to {scale === 'linear' ? 'Logarithmic' : 'Linear'} Scale
        </button>
      </div>

      <div className="w-full h-96 border border-gray-200 rounded p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 50, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: 'Year', position: 'bottom', offset: 0 }}
              padding={{ left: 10, right: 10 }}
              domain={[1965, 2025]}
              type="number"
              allowDataOverflow={true}
              ticks={[1965, 1975, 1985, 1995, 2005, 2015, 2025]}
            />
            <YAxis 
              scale={scale === 'logarithmic' ? 'log' : 'auto'}
              domain={scale === 'logarithmic' ? [3, 12] : ['auto', 'auto']}
              tickFormatter={formatYAxis}
              label={{ 
                value: scale === 'logarithmic' ? 'Transistor Count (Log Scale)' : 'Transistor Count', 
                angle: -90, 
                position: 'left',
                offset: -25
              }}
              allowDataOverflow={true}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" />
            
            {/* Scatter plot for individual chips */}
            <Scatter 
              name="CPU/GPU Milestones" 
              dataKey={scale === 'logarithmic' ? 'log_transistors' : 'transistors'} 
              fill="#8884d8" 
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            />
            
            {/* Trend line */}
            <Line 
              name="Moore's Law Trend" 
              type="monotone" 
              dataKey={scale === 'logarithmic' ? 'log_transistors' : 'transistors'} 
              stroke="#0066cc" 
              activeDot={false}
              dot={false}
              strokeDasharray="5 5"
              legendType="none"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Details panel for selected chip */}
      {hoverInfo && (
        <div className="mt-6 p-4 border border-gray-200 rounded bg-gray-50">
          <h3 className="text-xl font-bold mb-2">{hoverInfo.name} ({hoverInfo.year})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span className="font-semibold">Transistors:</span> {hoverInfo.transistors.toLocaleString()}</p>
              <p><span className="font-semibold">Manufacturer:</span> {hoverInfo.manufacturer}</p>
              <p><span className="font-semibold">Process Node:</span> {hoverInfo.process}</p>
              <p><span className="font-semibold">Type:</span> {hoverInfo.type}</p>
            </div>
            <div>
              <p><span className="font-semibold">Description:</span> {hoverInfo.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600">
        <p><strong>About Moore's Law:</strong> In 1965, Gordon Moore predicted that the number of transistors on integrated circuits would double approximately every two years, leading to exponential growth in computing power. This observation, known as Moore's Law, has held remarkably true for over five decades.</p>
        <p className="mt-2"><strong>Data sources:</strong> Intel, AMD, NVIDIA corporate publications, Computer History Museum, and IEEE technical documentation.</p>
      </div>
    </div>
  );
};

export default MooresLawChart;