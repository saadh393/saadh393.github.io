"use client";
import React, { useState, useRef, useEffect } from 'react';

const ExecutionContextVisualizer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef(null);

  const code = `const obj = {
  value: 42,
  method() {
    console.log(this.value); // 42

    function innerFunction() {
      console.log(this.value); // undefined
    }

    const innerArrowFunction = () => {
      console.log(this.value); // 42
    };

    innerFunction();
    innerArrowFunction();
  },
};

obj.method();`.split('\n');

  const steps = [
    { 
      phase: 'creation',
      context: 'global',
      stack: ['Global Execution Context'],
      variables: [
        { name: 'window', value: 'global Object' },
        { name: 'this', value: 'window' },
        { name: 'obj', value: 'undefined' }
      ],
      description: 'Creating Global Execution Context',
      highlightedLine: 0
    },
    {
      phase: 'execution',
      context: 'global',
      stack: ['Global Execution Context'],
      variables: [
        { name: 'window', value: 'global Object' },
        { name: 'this', value: 'window' },
        { name: 'obj', value: '{ value: 42, method: f() }' }
      ],
      description: 'Object created and assigned to obj variable',
      highlightedLine: 0
    },
    {
      phase: 'creation',
      context: 'method',
      stack: ['Global Execution Context', 'method() Execution Context'],
      variables: [
        { name: 'this', value: 'obj' },
        { name: 'innerFunction', value: 'f()' },
        { name: 'innerArrowFunction', value: 'undefined' }
      ],
      description: 'Creating method() Execution Context. "this" is bound to obj because of how method() was called',
      highlightedLine: 3
    },
    {
      phase: 'execution',
      context: 'method',
      stack: ['Global Execution Context', 'method() Execution Context'],
      variables: [
        { name: 'this', value: 'obj' },
        { name: 'this.value', value: '42' }
      ],
      description: 'Executing method() - First console.log(this.value)',
      highlightedLine: 4
    },
    {
      phase: 'creation',
      context: 'innerFunction',
      stack: ['Global Execution Context', 'method() Execution Context', 'innerFunction() Execution Context'],
      variables: [
        { name: 'this', value: 'window' },
        { name: 'this.value', value: 'undefined' }
      ],
      description: 'Creating innerFunction() Execution Context. Regular function creates new "this" binding',
      highlightedLine: 6
    },
    {
      phase: 'execution',
      context: 'innerFunction',
      stack: ['Global Execution Context', 'method() Execution Context', 'innerFunction() Execution Context'],
      variables: [
        { name: 'this', value: 'window' },
        { name: 'this.value', value: 'undefined' }
      ],
      description: 'Executing innerFunction() - console.log(this.value) returns undefined because "this" is window',
      highlightedLine: 7
    },
    {
      phase: 'creation',
      context: 'innerArrowFunction',
      stack: ['Global Execution Context', 'method() Execution Context', 'innerArrowFunction() Execution Context'],
      variables: [
        { name: 'this', value: 'obj (inherited)' },
        { name: 'this.value', value: '42' }
      ],
      description: 'Creating innerArrowFunction() Execution Context. Arrow function inherits "this" from method()',
      highlightedLine: 10
    },
    {
      phase: 'execution',
      context: 'innerArrowFunction',
      stack: ['Global Execution Context', 'method() Execution Context', 'innerArrowFunction() Execution Context'],
      variables: [
        { name: 'this', value: 'obj (inherited)' },
        { name: 'this.value', value: '42' }
      ],
      description: 'Executing innerArrowFunction() - console.log(this.value) returns 42 because "this" is inherited',
      highlightedLine: 11
    }
  ];

  const colors = {
    green: '#159861',
    yellow: '#FFC223',
    blue: '#05A4C3',
    red: '#E55056',
    orange: '#F85E0B'
  };

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

  const handlePrevious = () => {
    setIsPlaying(false);
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep(prev => Math.min(steps.length - 1, prev + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="my-8 p-6 bg-[#0D1117] rounded-lg grid grid-cols-1 md:grid-cols-3 md:gap-6 md:scale-90 max-w-7xl mx-auto">

      <div className="w-full flex-1">
        <h3 className="text-xl font-bold mb-4 text-secondary">Code Execution</h3>
        <pre className="bg-[#171919] w-full p-4 rounded-lg text-sm font-mono mb-4">
          {code.map((line, index) => (
            <div
              key={index}
              className={`text-wrap ${
                index === steps[currentStep].highlightedLine ? 'bg-[#159861]/20 -mx-4 px-4' : ''
              } ${line.trim().startsWith('//') ? 'text-[#525252]' : 'text-[#969696]'}`}
            >
              {line}
            </div>
          ))}
        </pre>

        <div className="flex justify-between gap-4 w-full">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-[#E55056] text-white rounded-lg hover:opacity-80"
          >
            Reset
          </button>
          <div className="flex gap-4 flex-wrap md:flex-nowrap">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-[#05A4C3] text-white rounded-lg hover:opacity-80 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handlePlayPause}
              className="px-4 py-2 bg-[#159861] text-white rounded-lg hover:opacity-80"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="px-4 py-2 bg-[#05A4C3] text-white rounded-lg hover:opacity-80 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 bg-[#171919] rounded-lg w-full">
          <p className="text-[#969696]">
            {steps[currentStep].description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-6 mt-6 col-span-2">
        <div className="border border-[#F85E0B] rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-[#F85E0B]">CALL STACK</h3>
          <div className="space-y-4">
            {steps[currentStep].stack.slice().reverse().map((context, index) => (
              <div
                key={index}
                className="border-2 rounded-lg p-4 text-center font-bold"
                style={{
                  borderColor: Object.values(colors)[index % Object.keys(colors).length],
                  color: Object.values(colors)[index % Object.keys(colors).length]
                }}
              >
                {context}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-[#159861] rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-[#159861]">EXECUTION CONTEXT</h3>
          <div className="space-y-2 mb-4">
            <div className="bg-[#159861] text-black px-3 py-1 rounded inline-block">
              Phase: {steps[currentStep].phase}
            </div>
            <div className="bg-[#159861] text-black px-3 py-1 rounded inline-block ml-2">
              Context: {steps[currentStep].context}
            </div>
          </div>

          <div className="border-2 border-[#FFC223] rounded-lg p-4 mt-4">
            <h4 className="text-xl font-bold mb-2 text-[#FFC223]">
              Variables & Scope
            </h4>
            <div className="space-y-2">
              {steps[currentStep].variables.map((variable, index) => (
                <div
                  key={index}
                  className="bg-[#FFC223] text-black px-3 py-1 rounded inline-block mr-2 mb-2"
                >
                  {variable.name}: {variable.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionContextVisualizer;