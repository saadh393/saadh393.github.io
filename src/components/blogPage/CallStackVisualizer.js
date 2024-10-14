"use client";
import React, { useState, useRef, useEffect } from 'react';

const CallStackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [output, setOutput] = useState([]);
  const canvasRef = useRef(null);

  const code = `
function greet(name) {
  return "Hello, " + name + "!";
}

function welcome(name) {
  let message = greet(name);
  return message + " Welcome!";
}

console.log(welcome("Alice"));
  `.trim().split('\n');

  const stepForward = () => {
    if (currentLine < code.length) {
      const line = code[currentLine].trim();
      
      if (line.startsWith('function')) {
        // Function declaration, do nothing
      } else if (line.includes('greet(')) {
        setStack(prev => [...prev, { name: 'greet', variables: { name: 'Alice' } }]);
      } else if (line.includes('welcome(')) {
        setStack(prev => [...prev, { name: 'welcome', variables: { name: 'Alice' } }]);
      } else if (line.includes('return') && stack.length > 0) {
        setStack(prev => prev.slice(0, -1));
      } else if (line.includes('console.log')) {
        setOutput(prev => [...prev, 'Hello, Alice! Welcome!']);
      }

      setCurrentLine(prev => prev + 1);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw stack
    const boxHeight = 60;
    const boxWidth = 200;
    const startY = canvas.height - 20;
    
    stack.forEach((context, index) => {
      const y = startY - (index + 1) * boxHeight;
      
      // Draw box
      ctx.fillStyle = '#cc5200';
      ctx.fillRect(20, y, boxWidth, boxHeight);
      
      // Draw text
      ctx.fillStyle = 'white';
      ctx.font = '14px Arial';
      ctx.fillText(context.name, 30, y + 20);
      
      // Draw variables
      Object.entries(context.variables).forEach(([key, value], vIndex) => {
        ctx.fillText(`${key}: ${value}`, 30, y + 40 + vIndex * 20);
      });
    });
    
    // Draw global context
    ctx.fillStyle = '#969696';
    ctx.fillRect(20, startY, boxWidth, boxHeight);
    ctx.fillStyle = 'white';
    ctx.fillText('Global Context', 30, startY + 35);
    
  }, [stack]);

  return (
    <div className="mt-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          <h3 className="text-xl font-bold mb-2">Code</h3>
          <pre className="bg-gray-800 p-4 rounded-lg text-white">
            {code.map((line, index) => (
              <div key={index} className={index === currentLine ? 'bg-primary text-black' : ''}>
                {line}
              </div>
            ))}
          </pre>
        </div>
        <div className="w-1/2">
          <h3 className="text-xl font-bold mb-2">Call Stack</h3>
          <canvas ref={canvasRef} width="240" height="400" className="border border-gray-600 rounded-lg" />
        </div>
      </div>
      <div className="mt-4">
        <button onClick={stepForward} className="bg-primary text-black px-4 py-2 rounded">
          Next Step
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Console Output</h3>
        <pre className="bg-gray-800 p-4 rounded-lg text-white">
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default CallStackVisualizer;