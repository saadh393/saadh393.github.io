import BlogLayout from "@/components/blogPage/BlogLayout";
import CallStackVisualizer from "@/components/blogPage/CallStackVisualizer";
import ExecutionContextInteractive from "@/components/blogPage/ExecutionContextInteractive";
import React from "react";

export default function JavaScriptExecutionContext() {
  return (
    <BlogLayout>
      <h1 className="text-4xl font-bold text-center">Understanding JavaScript's Execution Context</h1>
      <p className="text-center text-secondary mb-8">Exploring the Foundation of JavaScript Code Execution</p>

      <p>
        Hi there! Knowing the execution context is essential if you're exploring JavaScript. It serves as the base of JavaScript code execution, handling scope, variable management, and other functions. To explain it another way, the execution context is the environment in which your code executes. Execution context is important to understanding JavaScript concepts like hoisting, variable scope (particularly with let, var, and const), and the flow of execution. You will find it easier to debug your code and understand many of Javascript's weird problems if you know all the details of how the javascript engine executes your code.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Types of Execution Context</h2>
      <p>JavaScript has three types of execution contexts:</p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Global Execution Context:</strong> The default context when code is executed globally. It has access to global variables and functions.</li>
        <li><strong>Function Execution Context:</strong> Created whenever a function is invoked. Each function call creates a new execution context, forming a stack known as the call stack.</li>
        <li><strong>Eval Execution Context:</strong> Generated when code is executed inside an eval() function. It has its own environment variable.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">How Execution Context Works</h2>
      <p>
        Before you get into the execution context, keep in mind that each of your code execution processes goes through two stages. The first step is "Creation Phase," while the second is "Execution Phase". Let's take a look at both phases:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Creation Phase:</strong> As the name suggests, something is created during this phase. So, what exactly is created? One thing to keep in mind is that when variables and functions are hoisted, their initial values are set to undefined.</li>
        <li><strong>Execution Phase:</strong> During the creation phase, we set up the global object and initialize variables and functions. Now, in the execution phase, our code runs from top to bottom. Previously initialized variables will be assigned their values, and initialized functions will be invoked as needed.</li>
      </ul>
      <p>
        Note that whenever the execution context encounters a function call in the call stack, it creates a new execution context for that function. This new execution context also goes through the creation and execution phases.
      </p>

      <p>
        To better understand how the call stack works with multiple function calls, let's explore an interactive Call Stack Visualizer. This tool will help you see how execution contexts are created and managed as functions are called and returned.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Call Stack Visualizer</h2>
      <CallStackVisualizer />

      <p className="mt-4">
        As you interact with the Call Stack Visualizer, notice how:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Each function call creates a new execution context on top of the stack.</li>
        <li>The topmost context is always the one currently executing.</li>
        <li>When a function finishes executing, its context is removed from the stack.</li>
        <li>The global execution context remains at the bottom of the stack until the program completes.</li>
      </ul>
      <p>
        This visualization helps illustrate the Last-In-First-Out (LIFO) nature of the call stack and how JavaScript manages multiple execution contexts during program execution.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Practical Example</h2>
      <p>Let's look at a practical example to understand execution context better:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-md mb-4">
        <code className="language-javascript">
          {`function greet(name) {
  let greeting = "Hello";
  console.log(\`\${greeting}, \${name}!\`);
}

greet("Alice");`}
        </code>
      </pre>
      <p>In this example:</p>
      <ul className="list-disc list-inside mb-4">
        <li>The first line executes in the global execution context.</li>
        <li>When greet() is called, a new function execution context is created.</li>
        <li>Inside greet(), a new scope is formed with its own variables (name, greeting).</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">Detailed Creation and Execution Phase Simulation</h2>
      <p>This interactive animation allows you to see how variables and functions are treated in the Creation and Execution phases:</p>
      <ExecutionContextInteractive />

      <h2 className="text-2xl font-bold mt-8 mb-4">Interview Questions on Execution Context</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>
          <strong>What is Execution Context in JavaScript?</strong>
          <p>Answer: Execution context is the environment in which JavaScript code is executed. It consists of the scope chain, variable object, and this keyword.</p>
        </li>
        <li>
          <strong>How does JavaScript handle scope and scope chain?</strong>
          <p>Answer: JavaScript uses the scope chain to determine variable access. Each function creates a new scope, and JavaScript resolves variables by traversing the scope chain.</p>
        </li>
        <li>
          <strong>Explain hoisting in JavaScript.</strong>
          <p>Answer: Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compilation phase. This allows variables to be used before they are declared.</p>
        </li>
        <li>
          <strong>What is the difference between var, let, and const in relation to execution context?</strong>
          <p>Answer: var variables are function-scoped and are hoisted, let and const are block-scoped and are not hoisted in the same way var is. const additionally ensures that the variable cannot be reassigned once declared.</p>
        </li>
      </ol>

      <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p>
        Understanding execution context is fundamental to mastering JavaScript. It governs how variables and functions are accessed, the behavior of this, and the order in which code is executed. By grasping these concepts and practicing with interactive examples, you'll be well-prepared to tackle JavaScript interviews and build robust applications.
      </p>
    </BlogLayout>
  );
}