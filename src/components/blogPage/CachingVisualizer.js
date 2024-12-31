"use client";
import React, { useState, useRef, useEffect } from 'react';

const CachingVisualizer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const steps = [
    {
      title: "Initial Request",
      description: "Client makes a request to the server through Undici",
      clientPosition: 0,
      serverResponse: null,
      cacheStatus: "empty"
    },
    {
      title: "Server Response",
      description: "Server sends response with Cache-Control headers",
      clientPosition: 100,
      serverResponse: "moving",
      cacheStatus: "empty"
    },
    {
      title: "Caching Response",
      description: "Undici stores the response in the cache",
      clientPosition: 100,
      serverResponse: "complete",
      cacheStatus: "storing"
    },
    {
      title: "Subsequent Request",
      description: "New request checks cache first",
      clientPosition: 0,
      serverResponse: "complete",
      cacheStatus: "full"
    },
    {
      title: "Cache Hit",
      description: "Response served from cache without server request",
      clientPosition: 50,
      serverResponse: "complete",
      cacheStatus: "serving"
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 2000);
    }
    return () => clearTimeout(animationRef.current);
  }, [isPlaying, currentStep]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Colors
      const colors = {
        primary: '#cc5200',
        secondary: '#969696',
        background: '#171919'
      };

      // Draw components
      drawClient(ctx, steps[currentStep].clientPosition, colors);
      drawServer(ctx, colors);
      drawCache(ctx, steps[currentStep].cacheStatus, colors);
      drawConnections(ctx, steps[currentStep], colors);
    };

    draw();
  }, [currentStep]);

  const drawClient = (ctx, position, colors) => {
    ctx.fillStyle = colors.primary;
    ctx.fillRect(50 + position, 150, 80, 40);
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.fillText('Client', 65 + position, 175);
  };

  const drawServer = (ctx, colors) => {
    ctx.fillStyle = colors.secondary;
    ctx.fillRect(450, 150, 80, 40);
    ctx.fillStyle = '#fff';
    ctx.fillText('Server', 470, 175);
  };

  const drawCache = (ctx, status, colors) => {
    ctx.fillStyle = status === 'empty' ? colors.background : colors.primary;
    ctx.strokeStyle = colors.secondary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(250, 50, 100, 60);
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText('Cache', 280, 85);
  };

  const drawConnections = (ctx, step, colors) => {
    ctx.strokeStyle = colors.secondary;
    ctx.lineWidth = 2;
    
    // Draw lines based on current step
    if (step.serverResponse === 'moving' || step.serverResponse === 'complete') {
      ctx.beginPath();
      ctx.moveTo(130 + step.clientPosition, 170);
      ctx.lineTo(450, 170);
      ctx.stroke();
    }

    if (step.cacheStatus === 'storing' || step.cacheStatus === 'full') {
      ctx.beginPath();
      ctx.moveTo(300, 110);
      ctx.lineTo(300, 150);
      ctx.stroke();
    }
  };

  return (
    <div className="my-8 p-6 bg-[#0D1117] rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-secondary">HTTP Caching Visualization</h3>
      
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={300} 
        className="bg-black mb-4 rounded-lg"
      />

      <div className="mb-4">
        <h4 className="text-primary font-bold">{steps[currentStep].title}</h4>
        <p className="text-trinary">{steps[currentStep].description}</p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => {
            setIsPlaying(false);
            setCurrentStep(0);
          }}
          className="px-4 py-2 bg-[#E55056] text-white rounded-lg hover:opacity-80"
        >
          Reset
        </button>
        
        <div className="space-x-4">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-[#05A4C3] text-white rounded-lg hover:opacity-80 disabled:opacity-50"
          >
            Previous
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-primary text-black rounded-lg hover:opacity-80"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 bg-[#05A4C3] text-white rounded-lg hover:opacity-80 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CachingVisualizer;