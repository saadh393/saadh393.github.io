"use client";
import React, { useState, useEffect, useRef } from 'react';

const ExecutionContextInteractive = () => {
  const [code, setCode] = useState(`var x = 5;
let y = 10;
function greet() {
  console.log("Hello");
}
x = 20;
greet();`);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('creation');
  const [currentStep, setCurrentStep] = useState(0);
  const [output, setOutput] = useState([]);
  const animationRef = useRef(null);

  const creationPhaseSteps = [
    { type: 'var', name: 'x', value: 'undefined' },
    { type: 'let', name: 'y', value: 'TDZ' },
    { type: 'function', name: 'greet', value: 'function body' },
  ];

  const executionPhaseSteps = [
    { type: 'var', name: 'x', value: '5' },
    { type: 'let', name: 'y', value: '10' },
    { type: 'assignment', name: 'x', value: '20' },
    { type: 'function', name: 'greet', value: 'Hello' },
  ];

  const resetAnimation = () => {
    setCurrentPhase('creation');
    setCurrentStep(0);
    setOutput([]);
    setIsPlaying(false);
  };

  const stepForward = () => {
    if (currentPhase === 'creation' && currentStep < creationPhaseSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentPhase === 'creation' && currentStep === creationPhaseSteps.length - 1) {
      setCurrentPhase('execution');
      setCurrentStep(0);
    } else if (currentPhase === 'execution' && currentStep < executionPhaseSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (executionPhaseSteps[currentStep + 1].type === 'function') {
        setOutput([...output, executionPhaseSteps[currentStep + 1].value]);
      }
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = setTimeout(() => {
        stepForward();
      }, 1000);
    }
    return () => clearTimeout(animationRef.current);
  }, [isPlaying, currentPhase, currentStep, stepForward]);

  const renderPhaseContent = (phase, steps) => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4">{phase === 'creation' ? 'Creation Phase' : 'Execution Phase'}</h3>
        <pre className="text-sm">
          {steps.map((step, index) => (
            <div key={index} className={`${index <= currentStep ? 'text-white' : 'text-gray-500'}`}>
              {step.type === 'var' && `var ${step.name} = ${step.value};`}
              {step.type === 'let' && `let ${step.name}; // ${step.value}`}
              {step.type === 'function' && `function ${step.name}() { ... }`}
              {step.type === 'assignment' && `${step.name} = ${step.value};`}
            </div>
          ))}
        </pre>
      </div>
    );
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {renderPhaseContent('creation', creationPhaseSteps)}
        {renderPhaseContent('execution', executionPhaseSteps)}
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Code Editor</h3>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-40 p-2 bg-gray-800 text-white rounded-lg"
        />
      </div>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-primary text-black px-4 py-2 rounded"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={stepForward}
          className="bg-secondary text-black px-4 py-2 rounded"
        >
          Step Forward
        </button>
        <button
          onClick={resetAnimation}
          className="bg-trinary text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Console Output</h3>
        <pre className="bg-gray-800 p-4 rounded-lg">
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default ExecutionContextInteractive;