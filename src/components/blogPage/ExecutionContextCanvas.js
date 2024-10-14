"use client";
import React, { useRef, useEffect } from 'react';

const ExecutionContextCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    // Execution context objects
    const globalContext = { x: 300, y: 350, radius: 100, color: '#cc5200', text: 'Global Context' };
    const functionContext = { x: 300, y: 150, radius: 80, color: '#969696', text: 'Function Context' };

    // Animation variables
    let phase = 'creation';
    let creationProgress = 0;
    let executionProgress = 0;

    const drawContext = (context) => {
      ctx.beginPath();
      ctx.arc(context.x, context.y, context.radius, 0, 2 * Math.PI);
      ctx.fillStyle = context.color;
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(context.text, context.x, context.y);
    };

    const drawArrow = (fromX, fromY, toX, toY, color) => {
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Arrow head
      const angle = Math.atan2(toY - fromY, toX - fromX);
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - 15 * Math.cos(angle - Math.PI / 6), toY - 15 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(toX - 15 * Math.cos(angle + Math.PI / 6), toY - 15 * Math.sin(angle + Math.PI / 6));
      ctx.fillStyle = color;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw global context
      drawContext(globalContext);

      if (phase === 'creation') {
        creationProgress += 0.02;
        if (creationProgress > 1) {
          phase = 'execution';
        }
        functionContext.radius = 80 * creationProgress;
      } else {
        executionProgress += 0.02;
        if (executionProgress > 1) {
          executionProgress = 0;
          phase = 'creation';
          creationProgress = 0;
        }
      }

      // Draw function context
      drawContext(functionContext);

      // Draw arrow
      const arrowProgress = phase === 'creation' ? creationProgress : 1 - executionProgress;
      drawArrow(
        globalContext.x,
        globalContext.y - globalContext.radius,
        functionContext.x,
        functionContext.y + functionContext.radius,
        `rgba(204, 82, 0, ${arrowProgress})`
      );

      // Add text
      ctx.fillStyle = '#fff';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(phase === 'creation' ? 'Creation Phase' : 'Execution Phase', canvas.width / 2, 30);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="mx-auto border border-gray-600 rounded-lg" />;
};

export default ExecutionContextCanvas;