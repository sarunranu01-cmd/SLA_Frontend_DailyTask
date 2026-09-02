/**
 * JavaScript Learning & Interview Platform - Question Database
 * 30 Curated JavaScript Questions across 3 Distinct Categories:
 * 1. 10 Logic & Code Line-by-Line Breakdown Questions
 * 2. 10 Most Asked JavaScript Interview Questions (Deep Dive)
 * 3. 10 Must-Know Essential Interview Questions (30-Sec Simple Pitch)
 */

const JS_QUESTIONS = [
  // =========================================================================
  // CATEGORY 1: 10 JAVASCRIPT LOGIC & CODE LINE-BY-LINE BREAKDOWN QUESTIONS
  // =========================================================================
  {
    id: "logic-1",
    category: "logic",
    title: "1. The Classic `var` vs `let` in `setTimeout` Loop",
    difficulty: "Medium",
    tags: ["Closures", "Event Loop", "Scope", "var vs let"],
    shortSummary: "Understand how variable scoping (function scope vs block scope) impacts asynchronous closures in loops.",
    code: `// Loop with var
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log("var i:", i);
  }, 100);
}

// Loop with let
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log("let j:", j);
  }, 100);
}`,
    expectedOutput: `var i: 3
var i: 3
var i: 3
let j: 0
let j: 1
let j: 2`,
    lineByLine: [
      {
        line: 1,
        code: `// Loop with var`,
        explanation: "Comment header indicating the start of the `var` loop test.",
        variables: "None"
      },
      {
        line: 2,
        code: `for (var i = 0; i < 3; i++) {`,
        explanation: "`var i` is function-scoped (or globally scoped here). A single memory slot for `i` is shared across all iterations. Loop runs 3 times, incrementing `i` from 0 to 1, then 2, and finally stops when `i === 3`.",
        variables: "i: 0 -> 1 -> 2 -> 3 (Single shared reference)"
      },
      {
        line: 3,
        code: `  setTimeout(() => {`,
        explanation: "`setTimeout` is sent to the browser's Web API timer environment with a 100ms delay. The callback arrow function closes over the variable `i` (by reference, not by value).",
        variables: "Callback registered with Timer Web API (3 separate timers)"
      },
      {
        line: 4,
        code: `    console.log("var i:", i);`,
        explanation: "Inside the callback: When the 100ms timer expires, callbacks enter the Task Queue. When the Call Stack is clear (after synchronous loop finished where `i = 3`), each callback runs and prints the current value of `i`, which is `3`.",
        variables: "i = 3 (evaluated at execution time)"
      },
      {
        line: 5,
        code: `  }, 100);`,
        explanation: "Timer duration of 100 milliseconds.",
        variables: "None"
      },
      {
        line: 6,
        code: `}`,
        explanation: "End of the `var` loop block.",
        variables: "i = 3"
      },
      {
        line: 7,
        code: ``,
        explanation: "Empty spacing line.",
        variables: "None"
      },
      {
        line: 8,
        code: `// Loop with let`,
        explanation: "Comment header indicating the start of the `let` loop test.",
        variables: "None"
      },
      {
        line: 9,
        code: `for (let j = 0; j < 3; j++) {`,
        explanation: "`let j` is block-scoped. In ES6, JavaScript creates a **new lexical binding (new memory instance of `j`)** for each iteration of the loop! Iteration 0 has `j=0`, iteration 1 has `j=1`, iteration 2 has `j=2`.",
        variables: "Iteration 0: j_0=0; Iteration 1: j_1=1; Iteration 2: j_2=2"
      },
      {
        line: 10,
        code: `  setTimeout(() => {`,
        explanation: "Each `setTimeout` callback closes over its own unique, independent block-scoped `j` variable from that specific iteration.",
        variables: "3 separate callbacks, each holding closure over its own `j`"
      },
      {
        line: 11,
        code: `    console.log("let j:", j);`,
        explanation: "When each timer fires and the callback executes, it reads its own captured `j` snapshot: first prints 0, then 1, then 2.",
        variables: "Prints 0, then 1, then 2"
      },
      {
        line: 12,
        code: `  }, 100);`,
        explanation: "Timer duration of 100 milliseconds.",
        variables: "None"
      },
      {
        line: 13,
        code: `}`,
        explanation: "End of the `let` loop block.",
        variables: "None"
      }
    ],
    deepExplanation: `
**Why this happens:**
1. \`var\` has **function scope**, not block scope. The loop shares one single \`i\` variable. By the time the asynchronous \`setTimeout\` callbacks run, the synchronous loop has already finished and \`i\` is \`3\`.
2. \`let\` has **block scope**. JavaScript creates a brand new variable binding for \`j\` on every single loop iteration. Each callback function retains a closure over its own independent copy of \`j\`.
    `,
    interviewTip: "If an interviewer asks: 'How to fix the var loop without using let?', answer: 'Wrap the setTimeout in an IIFE (Immediately Invoked Function Expression) or pass `i` as the 3rd argument to `setTimeout(fn, 100, i)` to create a new parameter scope.'",
    interviewScript: `"With \`var\`, \`i\` is function-scoped, so all 3 timers share one reference which ends up being 3. With \`let\`, it is block-scoped, so a new binding of \`j\` is created for each loop iteration, preserving 0, 1, and 2 in closure."`
  },

  {
    id: "logic-2",
    category: "logic",
    title: "2. Event Loop Priority: Microtasks (Promises) vs Macrotasks (`setTimeout`)",
    difficulty: "Hard",
    tags: ["Event Loop", "Microtasks", "Macrotasks", "Promises", "Async"],
    shortSummary: "Learn the exact execution order between synchronous code, Promise microtasks, and timer macrotasks.",
    code: `console.log("1. Script Start");

setTimeout(() => {
  console.log("2. setTimeout 0ms");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("3. Promise Microtask 1");
  })
  .then(() => {
    console.log("4. Promise Microtask 2");
  });

console.log("5. Script End");`,
    expectedOutput: `1. Script Start
5. Script End
3. Promise Microtask 1
4. Promise Microtask 2
2. setTimeout 0ms`,
    lineByLine: [
      {
        line: 1,
        code: `console.log("1. Script Start");`,
        explanation: "Synchronous call executed immediately on the Call Stack. Logs `1. Script Start` to console.",
        variables: "Call Stack: active; Output: '1. Script Start'"
      },
      {
        line: 3,
        code: `setTimeout(() => {`,
        explanation: "`setTimeout` is handed off to Web APIs. Even with a `0ms` delay, its callback is scheduled into the **Macrotask Queue (Task Queue)**.",
        variables: "Macrotask Queue: [setTimeout callback]"
      },
      {
        line: 4,
        code: `  console.log("2. setTimeout 0ms");`,
        explanation: "Body of the macrotask callback. Will not run until the Call Stack is empty AND the entire Microtask Queue has been drained.",
        variables: "Pending execution in Macrotask Queue"
      },
      {
        line: 5,
        code: `}, 0);`,
        explanation: "End of `setTimeout` declaration.",
        variables: "None"
      },
      {
        line: 7,
        code: `Promise.resolve()`,
        explanation: "Creates an immediately resolved Promise. Its `.then()` callback is scheduled into the **Microtask Queue**.",
        variables: "Promise State: Fulfilled; Microtask Queue: [then callback 1]"
      },
      {
        line: 8,
        code: `  .then(() => {`,
        explanation: "Registers first microtask handler.",
        variables: "Microtask 1 registered"
      },
      {
        line: 9,
        code: `    console.log("3. Promise Microtask 1");`,
        explanation: "When Call Stack clears, Microtask 1 runs and logs `3. Promise Microtask 1`. Returning `undefined` schedules the chained `.then()` into the Microtask Queue.",
        variables: "Output: '3. Promise Microtask 1'; Microtask Queue: [then callback 2]"
      },
      {
        line: 10,
        code: `  })`,
        explanation: "End of first `.then()` handler.",
        variables: "None"
      },
      {
        line: 11,
        code: `  .then(() => {`,
        explanation: "Second microtask handler queued and executed immediately after Microtask 1 before any Macrotask is allowed to run.",
        variables: "Output: '4. Promise Microtask 2'"
      },
      {
        line: 12,
        code: `    console.log("4. Promise Microtask 2");`,
        explanation: "Logs `4. Promise Microtask 2`.",
        variables: "Microtask Queue now empty!"
      },
      {
        line: 13,
        code: `  });`,
        explanation: "End of Promise chain.",
        variables: "None"
      },
      {
        line: 15,
        code: `console.log("5. Script End");`,
        explanation: "Synchronous call. Runs before any asynchronous task in queues. Logs `5. Script End`.",
        variables: "Output: '5. Script End'; Synchronous Call Stack is now empty!"
      }
    ],
    deepExplanation: `
**Event Loop Priority Order:**
1. **Synchronous Code (Call Stack)**: Executes first line by line (Logs 1 and 5).
2. **Microtask Queue**: Has higher priority than Macrotasks! The Event Loop drains the *entire* Microtask queue (Promise callbacks, \`queueMicrotask\`, \`MutationObserver\`) before touching any macrotask (Logs 3 and 4).
3. **Macrotask Queue**: Runs next (\`setTimeout\`, \`setInterval\`, I/O) (Logs 2).
    `,
    interviewTip: "Remember this golden rule: Microtasks ALWAYS drain completely before the next Macrotask is picked up by the Event Loop.",
    interviewScript: `"JavaScript executes all synchronous code first. Once the call stack is empty, the Event Loop processes all microtasks (Promises) before moving to the macrotask queue (setTimeout). Hence, Promises log before setTimeout."`
  },

  {
    id: "logic-3",
    category: "logic",
    title: "3. Object Reference & Mutation vs Variable Reassignment",
    difficulty: "Medium",
    tags: ["Objects", "References", "Memory", "Stack vs Heap"],
    shortSummary: "Analyze how JavaScript stores objects in Heap memory and passes references by value.",
    code: `let userA = { name: "Arun", age: 21 };
let userB = userA;

// Mutation via reference
userB.age = 22;

// Reassignment of userB to a new memory address
userB = { name: "Prakash", age: 30 };

console.log("userA:", userA);
console.log("userB:", userB);`,
    expectedOutput: `userA: { name: 'Arun', age: 22 }
userB: { name: 'Prakash', age: 30 }`,
    lineByLine: [
      {
        line: 1,
        code: `let userA = { name: "Arun", age: 21 };`,
        explanation: "An object `{ name: 'Arun', age: 21 }` is allocated in **Heap memory** (e.g., at address `0x001`). `userA` on the Stack stores this reference address.",
        variables: "userA -> points to Heap address 0x001 ({ name: 'Arun', age: 21 })"
      },
      {
        line: 2,
        code: `let userB = userA;`,
        explanation: "Copies the reference address `0x001` from `userA` to `userB`. Both variables now point to the **exact same object in Heap memory**.",
        variables: "userB -> also points to Heap address 0x001"
      },
      {
        line: 4,
        code: `// Mutation via reference`,
        explanation: "Comment.",
        variables: "None"
      },
      {
        line: 5,
        code: `userB.age = 22;`,
        explanation: "Modifies the `age` property on object at `0x001`. Since `userA` points to `0x001`, `userA.age` is now also `22`!",
        variables: "Heap 0x001 mutated to: { name: 'Arun', age: 22 }"
      },
      {
        line: 7,
        code: `// Reassignment of userB to a new memory address`,
        explanation: "Comment.",
        variables: "None"
      },
      {
        line: 8,
        code: `userB = { name: "Prakash", age: 30 };`,
        explanation: "**Key Step:** A brand new object is created at Heap address `0x002`. `userB` is reassigned to point to `0x002`. `userA` remains unchanged pointing to `0x001`.",
        variables: "userA -> 0x001 ({ name: 'Arun', age: 22 }); userB -> 0x002 ({ name: 'Prakash', age: 30 })"
      },
      {
        line: 10,
        code: `console.log("userA:", userA);`,
        explanation: "Logs `userA` showing `age: 22` due to earlier mutation.",
        variables: "Output: { name: 'Arun', age: 22 }"
      },
      {
        line: 11,
        code: `console.log("userB:", userB);`,
        explanation: "Logs `userB` showing the newly assigned object `{ name: 'Prakash', age: 30 }`.",
        variables: "Output: { name: 'Prakash', age: 30 }"
      }
    ],
    deepExplanation: `
**Key Concept: Mutation vs Reassignment**
- In JavaScript, objects are **reference types**.
- Mutating a property (\`userB.age = 22\`) changes the underlying object in Heap memory, affecting all variables referencing it.
- Reassigning the variable (\`userB = { ... }\`) assigns a brand new memory pointer to \`userB\`, breaking its link with \`userA\`.
    `,
    interviewTip: "Always distinguish between mutating an object property versus re-pointing a variable to a new memory reference.",
    interviewScript: `"JavaScript assigns objects by reference. Mutating a property through \`userB\` modifies the shared Heap memory. But reassigning \`userB\` gives it a new memory address, leaving \`userA\` pointing to the mutated original."`
  },

  {
    id: "logic-4",
    category: "logic",
    title: "4. Function Declaration vs Variable Expression Hoisting",
    difficulty: "Medium",
    tags: ["Hoisting", "Execution Context", "Functions", "TypeError"],
    shortSummary: "Master how JS engine hoists Function Declarations vs `var` / `let` function expressions during the Creation Phase.",
    code: `console.log("typeof sayHello:", typeof sayHello);
console.log("typeof sayBye:", typeof sayBye);

sayHello(); // Works!
// sayBye(); // Would throw: TypeError: sayBye is not a function

function sayHello() {
  console.log("Hello from Declaration!");
}

var sayBye = function() {
  console.log("Bye from Expression!");
};

sayBye(); // Now it works`,
    expectedOutput: `typeof sayHello: function
typeof sayBye: undefined
Hello from Declaration!
Bye from Expression!`,
    lineByLine: [
      {
        line: 1,
        code: `console.log("typeof sayHello:", typeof sayHello);`,
        explanation: "During Creation Phase, the entire Function Declaration `function sayHello() {...}` is hoisted into memory with its full body. So `typeof sayHello` is `'function'`.",
        variables: "sayHello: [Function: sayHello]"
      },
      {
        line: 2,
        code: `console.log("typeof sayBye:", typeof sayBye);`,
        explanation: "`var sayBye` is hoisted as a variable and initialized to `undefined`. The function assignment has not happened yet! Thus `typeof sayBye` is `'undefined'`.",
        variables: "sayBye: undefined"
      },
      {
        line: 4,
        code: `sayHello(); // Works!`,
        explanation: "Calling `sayHello()` succeeds because the function definition is already available in the scope.",
        variables: "Output: 'Hello from Declaration!'"
      },
      {
        line: 5,
        code: `// sayBye(); // Would throw: TypeError: sayBye is not a function`,
        explanation: "If we called `sayBye()` here, JS would attempt `undefined()`, which throws `TypeError: sayBye is not a function` (not ReferenceError).",
        variables: "None"
      },
      {
        line: 7,
        code: `function sayHello() {`,
        explanation: "Function Declaration definition.",
        variables: "None"
      },
      {
        line: 8,
        code: `  console.log("Hello from Declaration!");`,
        explanation: "Body of `sayHello`.",
        variables: "None"
      },
      {
        line: 9,
        code: `}`,
        explanation: "End of `sayHello`.",
        variables: "None"
      },
      {
        line: 11,
        code: `var sayBye = function() {`,
        explanation: "Execution Phase: The anonymous function is now assigned to variable `sayBye`.",
        variables: "sayBye: [Function: sayBye]"
      },
      {
        line: 12,
        code: `  console.log("Bye from Expression!");`,
        explanation: "Body of `sayBye`.",
        variables: "None"
      },
      {
        line: 13,
        code: `};`,
        explanation: "End of function expression.",
        variables: "None"
      },
      {
        line: 15,
        code: `sayBye(); // Now it works`,
        explanation: "Now that `sayBye` points to the function, invoking it logs `Bye from Expression!`.",
        variables: "Output: 'Bye from Expression!'"
      }
    ],
    deepExplanation: `
**The Two Phases of JS Execution Context:**
1. **Creation / Memory Phase**:
   - Function declarations are saved with their full definition.
   - \`var\` variables are registered and initialized to \`undefined\`.
   - \`let\` / \`const\` are registered but uninitialized (Temporal Dead Zone).
2. **Execution Phase**:
   - Code runs top-to-bottom. Calling \`sayBye()\` before assignment tries to invoke \`undefined()\`, leading to a \`TypeError\`.
    `,
    interviewTip: "Notice the error type: Invoking an uninitialized `var` function expression throws `TypeError` (because the variable exists as `undefined`), NOT a `ReferenceError`!",
    interviewScript: `"Function declarations are hoisted with their complete implementation. Variable declarations with \`var\` are hoisted as \`undefined\`. Therefore, calling a function expression before its assignment yields a TypeError."`
  },

  {
    id: "logic-5",
    category: "logic",
    title: "5. Closure Counter with Independent State Encapsulation",
    difficulty: "Medium",
    tags: ["Closures", "Encapsulation", "State", "Scope"],
    shortSummary: "See how closures enable private variables and isolated state instances without ES6 classes.",
    code: `function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counterA = createCounter(10);
const counterB = createCounter(50);

counterA.increment();
counterA.increment();
counterB.decrement();

console.log("Counter A:", counterA.getValue());
console.log("Counter B:", counterB.getValue());`,
    expectedOutput: `Counter A: 12
Counter B: 49`,
    lineByLine: [
      {
        line: 1,
        code: `function createCounter(initialValue = 0) {`,
        explanation: "Defines factory function accepting an optional initial count.",
        variables: "None"
      },
      {
        line: 2,
        code: `  let count = initialValue; // Private variable`,
        explanation: "`count` is declared in the local lexical environment of `createCounter`. It cannot be accessed directly from outside.",
        variables: "count: local to execution context"
      },
      {
        line: 4,
        code: `  return {`,
        explanation: "Returns an object with 3 methods. These methods hold a **closure** over the `count` variable in this specific execution context.",
        variables: "Returns object containing methods"
      },
      {
        line: 5,
        code: `    increment: () => ++count,`,
        explanation: "Increments `count` and returns the new value.",
        variables: "None"
      },
      {
        line: 6,
        code: `    decrement: () => --count,`,
        explanation: "Decrements `count` and returns the new value.",
        variables: "None"
      },
      {
        line: 7,
        code: `    getValue: () => count`,
        explanation: "Getter method providing controlled read access to private `count`.",
        variables: "None"
      },
      {
        line: 8,
        code: `  };`,
        explanation: "End of return object.",
        variables: "None"
      },
      {
        line: 9,
        code: `}`,
        explanation: "End of `createCounter` function.",
        variables: "None"
      },
      {
        line: 11,
        code: `const counterA = createCounter(10);`,
        explanation: "Invocation 1: Creates an execution context where `count = 10`. Returns an instance with closure over this specific scope.",
        variables: "counterA.closure: count = 10"
      },
      {
        line: 12,
        code: `const counterB = createCounter(50);`,
        explanation: "Invocation 2: Creates a **completely separate, isolated execution context** where `count = 50`.",
        variables: "counterB.closure: count = 50"
      },
      {
        line: 14,
        code: `counterA.increment();`,
        explanation: "Modifies `counterA`'s private count from 10 to 11.",
        variables: "counterA count: 11"
      },
      {
        line: 15,
        code: `counterA.increment();`,
        explanation: "Modifies `counterA`'s private count from 11 to 12.",
        variables: "counterA count: 12"
      },
      {
        line: 16,
        code: `counterB.decrement();`,
        explanation: "Modifies `counterB`'s private count from 50 to 49. `counterA` is completely unaffected.",
        variables: "counterB count: 49"
      },
      {
        line: 18,
        code: `console.log("Counter A:", counterA.getValue());`,
        explanation: "Outputs `12`.",
        variables: "Output: 'Counter A: 12'"
      },
      {
        line: 19,
        code: `console.log("Counter B:", counterB.getValue());`,
        explanation: "Outputs `49`.",
        variables: "Output: 'Counter B: 49'"
      }
    ],
    deepExplanation: `
**Closures & Data Encapsulation:**
- A **closure** is a function bundled together with references to its surrounding lexical environment.
- Every time \`createCounter\` is invoked, a fresh lexical environment is created.
- The inner methods maintain a permanent live reference to their specific \`count\` variable, achieving private state encapsulation without exposing the variable to the global scope.
    `,
    interviewTip: "This pattern is the foundation of the Module Pattern and React Hooks (like `useState`).",
    interviewScript: `"Every invocation of \`createCounter\` creates a new lexical environment. The returned methods form a closure over that specific environment's \`count\` variable, keeping state encapsulated and isolated across instances."`
  },

  {
    id: "logic-6",
    category: "logic",
    title: "6. `this` Binding: Regular Method vs Arrow Function vs Callback",
    difficulty: "Hard",
    tags: ["this", "Arrow Functions", "Methods", "Lexical Scoping"],
    shortSummary: "Unpack how `this` is determined dynamically for regular functions versus lexically for arrow functions.",
    code: `const hero = {
  name: "Spider-Man",
  regularMethod: function() {
    return "Regular: " + this.name;
  },
  arrowMethod: () => {
    return "Arrow: " + (this ? this.name : "undefined");
  },
  delayedCallback: function() {
    setTimeout(function() {
      console.log("Delayed Regular this:", this ? this.name : "undefined");
    }, 50);

    setTimeout(() => {
      console.log("Delayed Arrow this:", this.name);
    }, 50);
  }
};

console.log(hero.regularMethod());
console.log(hero.arrowMethod());
hero.delayedCallback();`,
    expectedOutput: `Regular: Spider-Man
Arrow: undefined
Delayed Regular this: undefined
Delayed Arrow this: Spider-Man`,
    lineByLine: [
      {
        line: 1,
        code: `const hero = {`,
        explanation: "Declares object literal `hero`.",
        variables: "hero object defined"
      },
      {
        line: 2,
        code: `  name: "Spider-Man",`,
        explanation: "Property `name` set to `'Spider-Man'`.",
        variables: "hero.name = 'Spider-Man'"
      },
      {
        line: 3,
        code: `  regularMethod: function() {`,
        explanation: "Standard function. In regular functions, `this` is dynamically bound to the object calling the method (the object before the dot at call time).",
        variables: "this = hero at execution time"
      },
      {
        line: 4,
        code: `    return "Regular: " + this.name;`,
        explanation: "Accesses `hero.name`, returning `'Regular: Spider-Man'`.",
        variables: "Returns 'Regular: Spider-Man'"
      },
      {
        line: 5,
        code: `  },`,
        explanation: "End of `regularMethod`.",
        variables: "None"
      },
      {
        line: 6,
        code: `  arrowMethod: () => {`,
        explanation: "**Key Rule:** Arrow functions do NOT have their own `this`. They inherit `this` **lexically** from where they were defined. Here, the outer scope is the global object/module scope (not `hero`), where `this.name` is undefined.",
        variables: "this = global/window/undefined"
      },
      {
        line: 7,
        code: `    return "Arrow: " + (this ? this.name : "undefined");`,
        explanation: "Evaluates to `'Arrow: undefined'`.",
        variables: "Returns 'Arrow: undefined'"
      },
      {
        line: 8,
        code: `  },`,
        explanation: "End of `arrowMethod`.",
        variables: "None"
      },
      {
        line: 9,
        code: `  delayedCallback: function() {`,
        explanation: "Regular method where `this` is `hero` during invocation `hero.delayedCallback()`.",
        variables: "this = hero"
      },
      {
        line: 10,
        code: `    setTimeout(function() {`,
        explanation: "Standard function callback inside `setTimeout`. When invoked by timer mechanism, its `this` defaults to `window` (or `undefined` in strict mode).",
        variables: "this = window/undefined"
      },
      {
        line: 11,
        code: `      console.log("Delayed Regular this:", this ? this.name : "undefined");`,
        explanation: "Logs `Delayed Regular this: undefined`.",
        variables: "Output: 'Delayed Regular this: undefined'"
      },
      {
        line: 12,
        code: `    }, 50);`,
        explanation: "50ms timer.",
        variables: "None"
      },
      {
        line: 14,
        code: `    setTimeout(() => {`,
        explanation: "Arrow function callback inside `delayedCallback`. It lexically captures `this` from `delayedCallback` (which is `hero`!).",
        variables: "this = hero (captured lexically)"
      },
      {
        line: 15,
        code: `      console.log("Delayed Arrow this:", this.name);`,
        explanation: "Successfully accesses `hero.name` and logs `Delayed Arrow this: Spider-Man`.",
        variables: "Output: 'Delayed Arrow this: Spider-Man'"
      },
      {
        line: 16,
        code: `    }, 50);`,
        explanation: "50ms timer.",
        variables: "None"
      },
      {
        line: 17,
        code: `  }`,
        explanation: "End of `delayedCallback`.",
        variables: "None"
      },
      {
        line: 18,
        code: `};`,
        explanation: "End of `hero` object definition.",
        variables: "None"
      },
      {
        line: 20,
        code: `console.log(hero.regularMethod());`,
        explanation: "Logs `'Regular: Spider-Man'`.",
        variables: "Output: 'Regular: Spider-Man'"
      },
      {
        line: 21,
        code: `console.log(hero.arrowMethod());`,
        explanation: "Logs `'Arrow: undefined'`.",
        variables: "Output: 'Arrow: undefined'"
      },
      {
        line: 22,
        code: `hero.delayedCallback();`,
        explanation: "Triggers timers logging the delayed outputs.",
        variables: "Timers scheduled"
      }
    ],
    deepExplanation: `
**Rules of \`this\` in JavaScript:**
1. **Regular Functions**: \`this\` is determined by *how the function is called* (Implicit binding to object before dot, explicit with \`call/apply/bind\`, or default to global/undefined).
2. **Arrow Functions**: \`this\` is determined by *where the function is defined* (lexical scoping, inherits \`this\` from enclosing parent scope). Object literals \`{ ... }\` do not create a scope; only functions and blocks do.
    `,
    interviewTip: "Never use arrow functions for object methods if they need to reference `this.property`.",
    interviewScript: `"Regular functions have dynamic \`this\` determined at call time. Arrow functions do not have their own \`this\` and capture it lexically from their enclosing scope. An object literal does not create a new scope, so arrow methods resolve \`this\` to the global scope."`
  },

  {
    id: "logic-7",
    category: "logic",
    title: "7. Recursive Array Flattening & Deduplication (Deep Flatten)",
    difficulty: "Medium",
    tags: ["Recursion", "Array Methods", "reduce", "Deduplication"],
    shortSummary: "Implement a deep array flattener using recursion and `reduce`, then filter unique values.",
    code: `const nestedArray = [1, [2, [3, 4], 2], [1, 5]];

// Recursive flattening function
function flattenArray(arr) {
  return arr.reduce((accumulator, item) => {
    return accumulator.concat(
      Array.isArray(item) ? flattenArray(item) : item
    );
  }, []);
}

const flat = flattenArray(nestedArray);
const unique = flat.filter((item, index) => flat.indexOf(item) === index);

console.log("Flattened:", flat);
console.log("Unique:", unique);`,
    expectedOutput: `Flattened: [ 1, 2, 3, 4, 2, 1, 5 ]
Unique: [ 1, 2, 3, 4, 5 ]`,
    lineByLine: [
      {
        line: 1,
        code: `const nestedArray = [1, [2, [3, 4], 2], [1, 5]];`,
        explanation: "Input array containing 3 nested levels with duplicate numbers `1` and `2`.",
        variables: "nestedArray: multi-dimensional array"
      },
      {
        line: 3,
        code: `// Recursive flattening function`,
        explanation: "Comment.",
        variables: "None"
      },
      {
        line: 4,
        code: `function flattenArray(arr) {`,
        explanation: "Declares recursive function that handles arbitrarily deep nested arrays.",
        variables: "arr: array parameter"
      },
      {
        line: 5,
        code: `  return arr.reduce((accumulator, item) => {`,
        explanation: "`reduce` starts with an empty array `[]` as the accumulator. Iterates over each item in `arr`.",
        variables: "accumulator: starts as []"
      },
      {
        line: 6,
        code: `    return accumulator.concat(`,
        explanation: "Concatenates the resolved item(s) to the accumulator array.",
        variables: "None"
      },
      {
        line: 7,
        code: `      Array.isArray(item) ? flattenArray(item) : item`,
        explanation: "**Recursive Base Condition:** If `item` is an Array (`Array.isArray(item)` is true), recursively call `flattenArray(item)`. Otherwise, return the primitive item directly.",
        variables: "Branch: recursive call vs primitive value"
      },
      {
        line: 8,
        code: `    );`,
        explanation: "Closing bracket of `concat`.",
        variables: "None"
      },
      {
        line: 9,
        code: `  }, []);`,
        explanation: "Initial value for `reduce` is `[]`.",
        variables: "None"
      },
      {
        line: 10,
        code: `}`,
        explanation: "End of `flattenArray` function.",
        variables: "None"
      },
      {
        line: 12,
        code: `const flat = flattenArray(nestedArray);`,
        explanation: "Runs recursive reduction on `nestedArray`. Returns fully flattened 1D array `[1, 2, 3, 4, 2, 1, 5]`.",
        variables: "flat = [1, 2, 3, 4, 2, 1, 5]"
      },
      {
        line: 13,
        code: `const unique = flat.filter((item, index) => flat.indexOf(item) === index);`,
        explanation: "`flat.indexOf(item)` returns the first occurrence index of `item`. If current `index` matches first occurrence, it is kept; duplicate subsequent occurrences are filtered out.",
        variables: "unique = [1, 2, 3, 4, 5]"
      },
      {
        line: 15,
        code: `console.log("Flattened:", flat);`,
        explanation: "Logs flattened array.",
        variables: "Output: Flattened: [ 1, 2, 3, 4, 2, 1, 5 ]"
      },
      {
        line: 16,
        code: `console.log("Unique:", unique);`,
        explanation: "Logs unique array.",
        variables: "Output: Unique: [ 1, 2, 3, 4, 5 ]"
      }
    ],
    deepExplanation: `
**How Recursion Works Here:**
1. \`[1, [2, [3, 4], 2], [1, 5]]\`
2. Hits \`1\` -> concatenated to \`[1]\`.
3. Hits \`[2, [3, 4], 2]\` -> calls \`flattenArray\`:
   - \`2\` -> concatenated
   - \`[3, 4]\` -> calls \`flattenArray\` -> returns \`[3, 4]\`
   - \`2\` -> concatenated -> returns \`[2, 3, 4, 2]\`
4. Merges all sub-results into single flat list \`[1, 2, 3, 4, 2, 1, 5]\`.
    `,
    interviewTip: "Modern JavaScript provides `Array.prototype.flat(Infinity)` and `[...new Set(arr)]`, but interviewers often ask you to write the manual implementation without built-ins to test recursion & functional programming.",
    interviewScript: `"We use \`reduce\` with \`Array.isArray()\` to recursively flatten nested arrays into an accumulator. Then we filter duplicates by checking if the current element's index matches its \`indexOf\` first occurrence."`
  },

  {
    id: "logic-8",
    category: "logic",
    title: "8. Type Coercion & Tricky Equality (`==` vs `===`)",
    difficulty: "Medium",
    tags: ["Type Coercion", "Equality", "Implicit Conversion", "Quirks"],
    shortSummary: "Deconstruct famous JavaScript implicit type coercion riddles step by step.",
    code: `console.log("[] == ![]:", [] == ![]);
console.log("[] == 0:", [] == 0);
console.log("[1, 2] + [3, 4]:", [1, 2] + [3, 4]);
console.log('"5" - 3 + "2":', "5" - 3 + "2");
console.log("null == undefined:", null == undefined);
console.log("null === undefined:", null === undefined);`,
    expectedOutput: `[] == ![]: true
[] == 0: true
[1, 2] + [3, 4]: 1,23,4
"5" - 3 + "2": 22
null == undefined: true
null === undefined: false`,
    lineByLine: [
      {
        line: 1,
        code: `console.log("[] == ![]:", [] == ![]);`,
        explanation: "Step 1: Logical NOT `![]` has higher precedence. `[]` is truthy, so `![]` becomes `false`. Step 2: `[] == false`. Step 3: Loose comparison converts `false` to number `0`. Step 4: `[]` converted to primitive is `''`, then `Number('')` is `0`. Step 5: `0 == 0` is `true`!",
        variables: "Output: [] == ![]: true"
      },
      {
        line: 2,
        code: `console.log("[] == 0:", [] == 0);`,
        explanation: "Array `[]` is converted to primitive string `''`. String `''` coerced to number is `0`. `0 == 0` evaluates to `true`.",
        variables: "Output: [] == 0: true"
      },
      {
        line: 3,
        code: `console.log("[1, 2] + [3, 4]:", [1, 2] + [3, 4]);`,
        explanation: "The `+` operator with non-primitives invokes `.toString()` on both arrays: `'1,2'` + `'3,4'`, yielding string concatenation `'1,23,4'`.",
        variables: "Output: [1, 2] + [3, 4]: 1,23,4"
      },
      {
        line: 4,
        code: `console.log('"5" - 3 + "2":', "5" - 3 + "2");`,
        explanation: "Step 1: Minus operator `-` only works on numbers, coercing `'5'` to `5`. `5 - 3 = 2`. Step 2: `2 + '2'` uses string concatenation because of `+` and string operand, yielding `'22'`.",
        variables: "Output: \"5\" - 3 + \"2\": 22"
      },
      {
        line: 5,
        code: `console.log("null == undefined:", null == undefined);`,
        explanation: "In ECMAScript specification, `null == undefined` is explicitly defined as `true` (both represent absent values).",
        variables: "Output: null == undefined: true"
      },
      {
        line: 6,
        code: `console.log("null === undefined:", null === undefined);`,
        explanation: "Strict equality `===` checks both value and type. `typeof null` is `'object'` while `typeof undefined` is `'undefined'`. Types differ, so it evaluates to `false`.",
        variables: "Output: null === undefined: false"
      }
    ],
    deepExplanation: `
**ECMAScript Abstract Equality Rules:**
1. \`!\` has higher precedence than \`==\`.
2. When comparing an Object/Array with a primitive, JS calls \`ToPrimitive\` (usually \`.toString()\`).
3. Binary \`+\` concatenates if any operand is a string. Binary \`-\`, \`*\`, \`/\` always perform numeric conversion.
4. \`null\` and \`undefined\` are loosely equal (\`==\`) to each other and nothing else.
    `,
    interviewTip: "Interviewers use these questions to check if you understand JS spec conversion steps (ToPrimitive -> ToNumber / ToString).",
    interviewScript: `"In \`[] == ![]\`, the NOT operator evaluates first converting \`![]\` to \`false\`. In loose equality, both \`[]\` and \`false\` coerce to number \`0\`, making \`0 == 0\` evaluate to \`true\`."`
  },

  {
    id: "logic-9",
    category: "logic",
    title: "9. Infinite Currying with Chained Function Accumulation",
    difficulty: "Hard",
    tags: ["Currying", "Higher-Order Functions", "Closures", "Recursion"],
    shortSummary: "Implement an infinite chainable adder function `sum(1)(2)(3)...()` that evaluates when invoked empty.",
    code: `function sum(a) {
  return function(b) {
    // If an argument is provided, return sum with accumulated total
    if (b !== undefined) {
      return sum(a + b);
    }
    // If invoked empty (), return the final total
    return a;
  };
}

const res1 = sum(1)(2)(3)(4)();
const res2 = sum(10)(20)(30)();
const res3 = sum(5)();

console.log("sum(1)(2)(3)(4)():", res1);
console.log("sum(10)(20)(30)():", res2);
console.log("sum(5)():", res3);`,
    expectedOutput: `sum(1)(2)(3)(4)(): 10
sum(10)(20)(30)(): 60
sum(5)(): 5`,
    lineByLine: [
      {
        line: 1,
        code: `function sum(a) {`,
        explanation: "Outer function taking initial number `a` (accumulator).",
        variables: "a = current accumulated sum"
      },
      {
        line: 2,
        code: `  return function(b) {`,
        explanation: "Returns an inner function that accepts the next argument `b`.",
        variables: "b = next input argument"
      },
      {
        line: 4,
        code: `    if (b !== undefined) {`,
        explanation: "**Check for continuation:** If `b` is passed (e.g. `sum(1)(2)`), we continue currying by calling `sum(a + b)` with the new sum.",
        variables: "b is present -> accumulate and recurse"
      },
      {
        line: 5,
        code: `      return sum(a + b);`,
        explanation: "Recursive step: returns a new `sum` closure where `a` is replaced with `a + b`.",
        variables: "Returns new function ready for next chained call"
      },
      {
        line: 6,
        code: `    }`,
        explanation: "End of continuation branch.",
        variables: "None"
      },
      {
        line: 8,
        code: `    return a;`,
        explanation: "**Termination condition:** If called with empty parentheses `()` (`b === undefined`), return the accumulated total `a`.",
        variables: "Returns final number"
      },
      {
        line: 9,
        code: `  };`,
        explanation: "End of inner function.",
        variables: "None"
      },
      {
        line: 10,
        code: `}`,
        explanation: "End of `sum` function.",
        variables: "None"
      },
      {
        line: 12,
        code: `const res1 = sum(1)(2)(3)(4)();`,
        explanation: "Chains 4 additions: 1 -> 1+2=3 -> 3+3=6 -> 6+4=10 -> `()` terminates and returns `10`.",
        variables: "res1 = 10"
      },
      {
        line: 13,
        code: `const res2 = sum(10)(20)(30)();`,
        explanation: "Chains: 10 -> 30 -> 60 -> `()` returns `60`.",
        variables: "res2 = 60"
      },
      {
        line: 14,
        code: `const res3 = sum(5)();`,
        explanation: "Single value terminated: returns `5`.",
        variables: "res3 = 5"
      },
      {
        line: 16,
        code: `console.log("sum(1)(2)(3)(4)():", res1);`,
        explanation: "Logs `10`.",
        variables: "Output: 10"
      },
      {
        line: 17,
        code: `console.log("sum(10)(20)(30)():", res2);`,
        explanation: "Logs `60`.",
        variables: "Output: 60"
      },
      {
        line: 18,
        code: `console.log("sum(5)():", res3);`,
        explanation: "Logs `5`.",
        variables: "Output: 5"
      }
    ],
    deepExplanation: `
**Currying Mechanics:**
- Currying is transforming a function with multiple arguments \`f(a, b, c)\` into a series of unary functions \`f(a)(b)(c)\`.
- By returning a function that retains \`a\` in closure and recursively invoking \`sum(a + b)\`, we can chain infinitely until an empty invocation \`()\` signals termination.
    `,
    interviewTip: "If asked to make it work without the empty `()` call (e.g. `console.log(sum(1)(2)(3))`), override the function's `valueOf` or `toString` property!",
    interviewScript: `"Infinite currying is implemented using closures and recursion. If a second argument is passed, we return \`sum(a + b)\`. When called with no arguments, we hit the base condition and return the accumulated total."`
  },

  {
    id: "logic-10",
    category: "logic",
    title: "10. Custom Debounce Implementation & Timer Cancellation",
    difficulty: "Hard",
    tags: ["Debounce", "Timers", "Closures", "Performance", "Optimization"],
    shortSummary: "Build the classic `debounce()` utility from scratch to optimize search inputs and window resize handlers.",
    code: `function debounce(callbackFn, delayMs) {
  let timerId = null;

  return function(...args) {
    // 1. Clear any previous scheduled timer
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    // 2. Schedule new timer with latest arguments and 'this' context
    timerId = setTimeout(() => {
      callbackFn.apply(this, args);
      timerId = null;
    }, delayMs);
  };
}

let triggerCount = 0;
const logSearch = debounce((query) => {
  triggerCount++;
  console.log("API Query Executed:", query, "| Total Calls:", triggerCount);
}, 100);

// Rapid keystrokes within 100ms
logSearch("r");
logSearch("re");
logSearch("reac");
logSearch("react"); // Only this final call executes after 100ms!`,
    expectedOutput: `API Query Executed: react | Total Calls: 1`,
    lineByLine: [
      {
        line: 1,
        code: `function debounce(callbackFn, delayMs) {`,
        explanation: "Higher-order function taking the target callback and delay duration in milliseconds.",
        variables: "None"
      },
      {
        line: 2,
        code: `  let timerId = null;`,
        explanation: "`timerId` is maintained in the outer closure scope. It holds the reference to the active `setTimeout`.",
        variables: "timerId: null"
      },
      {
        line: 4,
        code: `  return function(...args) {`,
        explanation: "Returns wrapper function that catches all passed arguments using rest parameter `...args`.",
        variables: "args: array of passed arguments"
      },
      {
        line: 6,
        code: `    if (timerId !== null) {`,
        explanation: "Checks if a timer was already scheduled from a recent call.",
        variables: "None"
      },
      {
        line: 7,
        code: `      clearTimeout(timerId);`,
        explanation: "**Crucial Step:** Cancels the previous scheduled execution. This resets the countdown clock!",
        variables: "Previous timer cancelled"
      },
      {
        line: 8,
        code: `    }`,
        explanation: "End of cancellation check.",
        variables: "None"
      },
      {
        line: 11,
        code: `    timerId = setTimeout(() => {`,
        explanation: "Schedules a fresh timer for `delayMs` milliseconds.",
        variables: "timerId: assigned new Timer ID"
      },
      {
        line: 12,
        code: `      callbackFn.apply(this, args);`,
        explanation: "When delay elapses without interruption, executes `callbackFn` with the correct `this` and arguments.",
        variables: "Executes target function"
      },
      {
        line: 13,
        code: `      timerId = null;`,
        explanation: "Cleans up `timerId` reference.",
        variables: "timerId = null"
      },
      {
        line: 14,
        code: `    }, delayMs);`,
        explanation: "End of `setTimeout` block.",
        variables: "None"
      },
      {
        line: 15,
        code: `  };`,
        explanation: "End of returned wrapper function.",
        variables: "None"
      },
      {
        line: 16,
        code: `}`,
        explanation: "End of `debounce` function.",
        variables: "None"
      },
      {
        line: 18,
        code: `let triggerCount = 0;`,
        explanation: "Variable to count actual executions.",
        variables: "triggerCount = 0"
      },
      {
        line: 19,
        code: `const logSearch = debounce((query) => { ... }, 100);`,
        explanation: "Creates a debounced version of search query logger with 100ms delay.",
        variables: "logSearch initialized"
      },
      {
        line: 25,
        code: `logSearch("r");`,
        explanation: "Timer 1 scheduled for 100ms.",
        variables: "Timer 1 active"
      },
      {
        line: 26,
        code: `logSearch("re");`,
        explanation: "Timer 1 cancelled! Timer 2 scheduled for 100ms.",
        variables: "Timer 1 cancelled, Timer 2 active"
      },
      {
        line: 27,
        code: `logSearch("reac");`,
        explanation: "Timer 2 cancelled! Timer 3 scheduled for 100ms.",
        variables: "Timer 2 cancelled, Timer 3 active"
      },
      {
        line: 28,
        code: `logSearch("react");`,
        explanation: "Timer 3 cancelled! Timer 4 scheduled for 100ms. No further calls happen, so Timer 4 completes and fires with `'react'`.",
        variables: "Timer 4 completes -> logs output!"
      }
    ],
    deepExplanation: `
**Why Debounce is Critical in Frontend:**
- When users type fast in a search input (e.g. 5 keystrokes in 200ms), we don't want 5 expensive network API requests.
- Debounce guarantees the callback runs **only once** after the user has stopped typing for the specified \`delayMs\`.
    `,
    interviewTip: "Difference between Debounce vs Throttle: Debounce postpones execution until events pause; Throttle guarantees execution at a fixed steady rate (e.g. once every 200ms during scroll).",
    interviewScript: `"Debounce uses a closure to maintain a \`timerId\`. On every invocation, it clears the previous timer with \`clearTimeout\` and sets a new one. The callback only fires once the user pauses for the specified duration."`
  },


  // =========================================================================
  // CATEGORY 2: 10 MOST FREQUENTLY ASKED JAVASCRIPT INTERVIEW QUESTIONS (DEEP DIVE)
  // =========================================================================
  {
    id: "interview-1",
    category: "interview",
    title: "1. What is the difference between `var`, `let`, and `const`?",
    difficulty: "Easy",
    tags: ["Scope", "ES6", "Hoisting", "Temporal Dead Zone"],
    shortSummary: "Compare scope (Function vs Block), Hoisting & TDZ, Re-declaration, and Re-assignment rules.",
    analogy: "Think of `var` like a megaphone inside a building (everyone on that floor hears it), `let` like a sticky note inside a specific room (only visible in that room), and `const` like an engraved plaque in that room (cannot be replaced).",
    deepExplanation: `
JavaScript provides 3 keywords for variable declaration with critical differences:

| Feature | \`var\` | \`let\` | \`const\` |
| :--- | :--- | :--- | :--- |
| **Scope** | Function Scope | Block Scope \`{ }\` | Block Scope \`{ }\` |
| **Hoisting** | Hoisted with \`undefined\` | Hoisted into **Temporal Dead Zone (TDZ)** | Hoisted into **Temporal Dead Zone (TDZ)** |
| **Re-declaration** | Allowed in same scope | ❌ SyntaxError | ❌ SyntaxError |
| **Re-assignment** | Allowed | Allowed | ❌ TypeError |
| **Initial Value** | Optional | Optional | **Mandatory** at declaration |
| **Window Object** | Attaches to \`window.name\` | Does NOT attach to \`window\` | Does NOT attach to \`window\` |

### What is the Temporal Dead Zone (TDZ)?
The period between entering a block scope and the actual line where \`let\` or \`const\` is declared. Accessing the variable in this zone throws a **\`ReferenceError: Cannot access 'x' before initialization\`**.
    `,
    code: `// 1. Scope Demonstration
if (true) {
  var varVar = "I leak out!";
  let letVar = "I stay inside!";
  const constVar = "I also stay inside!";
}
console.log(varVar); // "I leak out!"
// console.log(letVar); // ReferenceError: letVar is not defined

// 2. const Object Mutation (Properties CAN be changed!)
const student = { name: "Arun" };
student.name = "Prakash"; // Valid mutation
// student = { name: "New" }; // TypeError: Assignment to constant variable`,
    expectedOutput: `I leak out!`,
    gotchas: "Declaring `const obj = {}` prevents reassigning `obj = ...`, but properties inside `obj.prop = ...` can still be mutated! To make an object immutable, use `Object.freeze(obj)`.",
    interviewScript: `"The key differences are scope, hoisting, and reassignability. \`var\` is function-scoped and hoisted with \`undefined\`. \`let\` and \`const\` are block-scoped and live in the Temporal Dead Zone until declared. \`const\` requires an initial value and prevents variable reassignment, while \`let\` allows reassignment."`
  },

  {
    id: "interview-2",
    category: "interview",
    title: "2. What are Closures in JavaScript and where are they used in real projects?",
    difficulty: "Medium",
    tags: ["Closures", "Lexical Scope", "Encapsulation", "Design Patterns"],
    shortSummary: "Understand how inner functions remember outer scope variables even after the outer function has returned.",
    analogy: "Imagine a backpack: When a function leaves its hometown (returns), it packs all the variables from its lexical environment into a backpack (closure) and carries them wherever it goes.",
    deepExplanation: `
### Formal Definition:
A **Closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the **lexical environment**). 
In JavaScript, closures are created every time a function is created, at function creation time.

### Real-World Use Cases:
1. **Data Privacy / Encapsulation (Module Pattern)**: Protecting internal state from external tampering.
2. **Function Factories**: Creating customized functions (e.g. \`multiplyBy(2)\`, \`multiplyBy(5)\`).
3. **Event Handlers & Callbacks**: Retaining access to specific element IDs or query params.
4. **Performance Optimization (Memoization, Debounce, Throttle)**: Remembering cached calculations or timer IDs across invocations.
    `,
    code: `// Real-world: Memoization using Closures
function memoizeSquare() {
  const cache = {}; // Private cache retained via closure

  return function(n) {
    if (n in cache) {
      console.log("Serving from Cache:", n);
      return cache[n];
    }
    console.log("Calculating fresh:", n);
    const result = n * n;
    cache[n] = result;
    return result;
  };
}

const squareCalc = memoizeSquare();
console.log(squareCalc(5)); // Calculating fresh: 5 -> 25
console.log(squareCalc(5)); // Serving from Cache: 5 -> 25`,
    expectedOutput: `Calculating fresh: 5
25
Serving from Cache: 5
25`,
    gotchas: "Be cautious of retaining large unused objects or DOM elements in closures because the Garbage Collector will not free that memory while the inner function exists (potential memory leak).",
    interviewScript: `"A closure is a function that remembers its outer lexical scope even when executed outside that scope. In real projects, we use closures for private variables, function factories, React hooks like useState, and utilities like debounce and memoization."`
  },

  {
    id: "interview-3",
    category: "interview",
    title: "3. How does the JavaScript Event Loop work? (Stack, Web APIs, Task Queues)",
    difficulty: "Hard",
    tags: ["Event Loop", "Call Stack", "Microtasks", "Async Architecture"],
    shortSummary: "Master how single-threaded JavaScript handles non-blocking asynchronous operations.",
    analogy: "Imagine a restaurant with 1 chef (Call Stack). When an order requires 30 mins in the oven (Web API timer), the chef puts it in the oven and cooks the next meal. When the oven dings, the waiter puts the dish on the service counter (Queue). When the chef's hands are empty, they plate the dish!",
    deepExplanation: `
JavaScript is **single-threaded** (one Call Stack, executing one command at a time). To handle async tasks (fetch, timers, DOM events), the runtime uses the **Event Loop Architecture**:

### Core Architecture Components:
1. **Call Stack**: Executes synchronous code (LIFO: Last In, First Out).
2. **Web APIs / Node APIs**: Browser background threads handling timers, HTTP network requests, and DOM events.
3. **Microtask Queue**: Holds callbacks from Promises (\`.then\`, \`.catch\`), \`queueMicrotask\`, and \`MutationObserver\`. (Highest Priority!).
4. **Macrotask Queue (Callback Queue)**: Holds callbacks from \`setTimeout\`, \`setInterval\`, and I/O.
5. **Event Loop**: A continuous loop that checks: *“Is the Call Stack empty?”* 
   - If **YES**, it immediately drains the **entire Microtask Queue**.
   - Then, it picks **one task** from the Macrotask Queue and pushes it onto the Call Stack.
    `,
    code: `console.log("A: Sync Start");

setTimeout(() => console.log("B: Macrotask (setTimeout)"), 0);

Promise.resolve()
  .then(() => console.log("C: Microtask 1 (Promise)"))
  .then(() => console.log("D: Microtask 2 (Promise)"));

console.log("E: Sync End");`,
    expectedOutput: `A: Sync Start
E: Sync End
C: Microtask 1 (Promise)
D: Microtask 2 (Promise)
B: Macrotask (setTimeout)`,
    gotchas: "A long-running synchronous loop (e.g. `while(true)`) will block the Call Stack completely, freezing the UI and preventing any timer or promise callback from running.",
    interviewScript: `"JavaScript is single-threaded with one call stack. Asynchronous operations are offloaded to Web APIs. When completed, Promise callbacks enter the Microtask Queue and timers enter the Macrotask Queue. The Event Loop prioritizes draining all microtasks as soon as the call stack is clear, before processing macrotasks."`
  },

  {
    id: "interview-4",
    category: "interview",
    title: "4. What is Prototypal Inheritance & The Prototype Chain?",
    difficulty: "Hard",
    tags: ["Prototypes", "OOP", "Inheritance", "__proto__"],
    shortSummary: "Learn how JavaScript achieves object-oriented inheritance through linked prototype objects.",
    analogy: "Think of your DNA: If you don't know how to do a specific task, you ask your parents (prototype). If they don't know, they ask your grandparents (prototype chain), until you reach the origin of humanity (`Object.prototype`).",
    deepExplanation: `
Unlike classical languages (Java/C++) that use class blueprints, JavaScript uses **Prototypal Inheritance**.

### Core Principles:
- Every object in JavaScript has an internal hidden link to another object called its **\`[[Prototype]]\`** (accessible via \`Object.getPrototypeOf(obj)\` or \`__proto__\`).
- When accessing \`obj.property\`, JavaScript searches:
  1. On \`obj\` directly.
  2. If not found, on \`obj.__proto__\`.
  3. Up the chain until \`Object.prototype\`.
  4. If still not found, reaches \`null\` and returns \`undefined\`.
- ES6 \`class\` syntax is syntactic sugar over this prototypal mechanism.
    `,
    code: `// Parent Constructor
function Person(name) {
  this.name = name;
}
// Adding shared method to prototype (memory efficient!)
Person.prototype.greet = function() {
  return "Hello, I am " + this.name;
};

// Child Instance
const dev = new Person("Arun");

console.log(dev.greet()); // "Hello, I am Arun"
console.log(dev.hasOwnProperty("name")); // true (own property)
console.log(dev.hasOwnProperty("greet")); // false (inherited from prototype!)
console.log(dev.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true`,
    expectedOutput: `Hello, I am Arun
true
false
true
true`,
    gotchas: "Adding methods inside constructor (`this.greet = function()...`) duplicates that function in memory for every single instance! Adding it to `Person.prototype.greet` creates one shared function in memory.",
    interviewScript: `"In JavaScript, objects inherit properties directly from other objects via the prototype chain. If a property is not found on an object, JS looks up its internal [[Prototype]] link until it reaches Object.prototype and finally null."`
  },

  {
    id: "interview-5",
    category: "interview",
    title: "5. How do `call()`, `apply()`, and `bind()` work? What are the differences?",
    difficulty: "Medium",
    tags: ["this", "call", "apply", "bind", "Functions"],
    shortSummary: "Compare explicit `this` binding methods: immediate execution vs returning a permanently bound function.",
    analogy: "Think of borrowing a phone: `call()` borrows the phone and dials numbers one-by-one; `apply()` borrows the phone and pastes a contact array list; `bind()` gives you a permanent shortcut contact saved on your phone for later.",
    deepExplanation: `
All three methods allow you to explicitly control what the \`this\` keyword points to:

| Method | Execution | How Arguments are Passed | Return Value |
| :--- | :--- | :--- | :--- |
| **\`call()\`** | **Invoked Immediately** | Comma-separated list: \`fn.call(thisObj, arg1, arg2)\` | Result of function |
| **\`apply()\`** | **Invoked Immediately** | Array of arguments: \`fn.apply(thisObj, [arg1, arg2])\` | Result of function |
| **\`bind()\`** | **Does NOT invoke** | Comma-separated list: \`fn.bind(thisObj, arg1, arg2)\` | **New Function** with bound \`this\` |
    `,
    code: `const user1 = { name: "Arun", role: "Developer" };
const user2 = { name: "Kavya", role: "Designer" };

function introduce(greeting, punctuation) {
  return \`\${greeting}, I am \${this.name}, a \${this.role}\${punctuation}\`;
}

// 1. call (Comma separated arguments)
console.log(introduce.call(user1, "Hey", "!"));

// 2. apply (Array of arguments)
console.log(introduce.apply(user2, ["Hello", "."]));

// 3. bind (Returns a new bound function for later)
const boundIntroduce = introduce.bind(user1, "Welcome");
console.log(boundIntroduce("!"));`,
    expectedOutput: `Hey, I am Arun, a Developer!
Hello, I am Kavya, a Designer.
Welcome, I am Arun, a Developer!`,
    gotchas: "Once a function is bound with `bind()`, its `this` context is permanently locked! Calling `.bind()`, `.call()`, or `.apply()` on an already-bound function will NOT change its `this`.",
    interviewScript: `"All three explicitly set \`this\`. \`call\` and \`apply\` execute the function immediately — \`call\` accepts arguments individually while \`apply\` accepts them as an array. \`bind\` returns a new function with \`this\` permanently bound for later execution."`
  },

  {
    id: "interview-6",
    category: "interview",
    title: "6. Explain Event Bubbling, Event Capturing, and Event Delegation",
    difficulty: "Medium",
    tags: ["DOM", "Events", "Event Bubbling", "Event Delegation", "Performance"],
    shortSummary: "Understand how events travel through the DOM tree and how event delegation boosts performance.",
    analogy: "Bubbling is like an air bubble underwater rising from the bottom (target element) up to the surface (window). Delegation is like a school principal handling permissions for all 500 students at the main office instead of placing a security guard in every classroom.",
    deepExplanation: `
### The 3 Phases of DOM Event Propagation:
1. **Capturing Phase (Trickling)**: Event travels down from \`window\` -> \`document\` -> parent elements -> target element.
2. **Target Phase**: Event reaches the actual target element clicked.
3. **Bubbling Phase**: Event bubbles back up from target element -> parent elements -> \`window\`. (Default mode for \`addEventListener\`).

### What is Event Delegation?
Instead of adding 1000 event listeners to 1000 \`<li>\` items, we add **one single listener** to the parent \`<ul>\` and check \`e.target\`.
- **Benefits**: Saves memory, improves speed, and automatically works for dynamically added child elements!
    `,
    code: `// Practical Event Delegation Pattern
const listHtml = \`
  <ul id="todoList">
    <li data-id="1">Buy Groceries</li>
    <li data-id="2">Practice JavaScript</li>
    <li data-id="3">Read Book</li>
  </ul>
\`;

// Instead of 3 listeners, attach 1 listener to parent:
function handleListClick(event) {
  const target = event.target;
  // Verify target is an LI element
  if (target.tagName === "LI") {
    console.log("Clicked Item ID:", target.dataset.id, "| Text:", target.innerText);
  }
}`,
    expectedOutput: `// When clicking item 2:
// Clicked Item ID: 2 | Text: Practice JavaScript`,
    gotchas: "`e.stopPropagation()` stops the event from traveling further up or down the DOM tree, but `e.preventDefault()` only prevents default browser behaviors (like form submit or link navigation).",
    interviewScript: `"Event propagation has two directions: capturing travels down to the target, and bubbling travels up from the target. Event delegation leverages bubbling by placing a single listener on a parent container to manage events from all current and future children using \`e.target\`."`
  },

  {
    id: "interview-7",
    category: "interview",
    title: "7. Evolution of Async JS: Callbacks -> Promises -> Async/Await",
    difficulty: "Medium",
    tags: ["Async", "Promises", "Async/Await", "Callbacks"],
    shortSummary: "Trace how asynchronous JavaScript evolved to solve Callback Hell and unhandled rejections.",
    analogy: "Callbacks were like pager messages (you call them back). Promises are like restaurant buzzer pagers (they guarantee to buzz green for food or red for sold out). Async/Await is like having room service deliver directly to your table seamlessly.",
    deepExplanation: `
### 1. Callbacks (ES5):
Functions passed into other functions to be called once async work completes.
- **Problems**: Callback Hell (Pyramid of Doom), difficult error handling, inversion of control.

### 2. Promises (ES6):
Objects representing future eventual completion or failure.
- **States**: \`pending\`, \`fulfilled\` (\`.then\`), \`rejected\` (\`.catch\`).
- Solved nesting via flat chaining: \`fetchUser().then().then().catch()\`.

### 3. Async / Await (ES2017):
Syntactic sugar on top of Promises built with Generators.
- Writes asynchronous code that looks and behaves like clean, readable synchronous code with \`try/catch\`.
    `,
    code: `// 1. Old Callback Hell (Pyramid of Doom)
// getUser(1, (user) => {
//   getOrders(user.id, (orders) => {
//     getReceipt(orders[0], (receipt) => { console.log(receipt); });
//   });
// });

// 2. Modern Clean Async/Await with try/catch
async function fetchUserDashboard(userId) {
  try {
    const userPromise = Promise.resolve({ id: userId, name: "Arun" });
    const ordersPromise = Promise.resolve(["Order #101", "Order #102"]);

    // Parallel execution with Promise.all
    const [user, orders] = await Promise.all([userPromise, ordersPromise]);
    
    console.log("Loaded Dashboard for:", user.name, "Total Orders:", orders.length);
    return { user, orders };
  } catch (error) {
    console.error("Failed to load dashboard:", error);
  }
}

fetchUserDashboard(1);`,
    expectedOutput: `Loaded Dashboard for: Arun Total Orders: 2`,
    gotchas: "Don't `await` independent operations sequentially if they don't depend on each other! Use `await Promise.all([p1, p2])` to run them concurrently in parallel.",
    interviewScript: `"Async JS started with callbacks, which led to Callback Hell and messy error handling. Promises introduced clean chaining and unified error handling via .catch(). Async/Await is syntactic sugar over Promises that makes asynchronous code readable and maintainable using standard try/catch blocks."`
  },

  {
    id: "interview-8",
    category: "interview",
    title: "8. Shallow Copy vs Deep Copy (Spread, structuredClone, JSON)",
    difficulty: "Medium",
    tags: ["Objects", "Shallow Copy", "Deep Copy", "structuredClone"],
    shortSummary: "Compare different cloning techniques, nested reference sharing, and modern `structuredClone()`.",
    analogy: "Shallow copy is like taking a photocopy of a page with an external website link written on it (both copies still point to the same live website). Deep copy is downloading the entire website and saving a complete offline duplicate.",
    deepExplanation: `
### Shallow Copy (\`{ ...obj }\`, \`Object.assign()\`, \`[...arr]\`):
Copies only top-level primitive properties. If an object contains nested objects/arrays, the **nested references are shared**!

### Deep Copy:
Copies all levels recursively, creating entirely independent clone objects.

### Comparison of Deep Copy Methods:
1. **\`structuredClone(obj)\`** (Modern Standard ES2022): Built-in, fast, handles circular references, Dates, Sets, Maps, and TypedArrays!
2. **\`JSON.parse(JSON.stringify(obj))\`**: Old workaround. **Fails on**: Functions, \`undefined\`, \`Symbol\`, \`Date\` (turns into string), and circular references.
3. **Custom Recursive Function**: Full control but requires manual maintenance.
    `,
    code: `const original = {
  name: "Arun",
  skills: ["JavaScript", "CSS"], // Nested reference!
  createdAt: new Date()
};

// 1. Shallow Copy (Spread)
const shallow = { ...original };
shallow.skills.push("React"); // Mutates BOTH original.skills and shallow.skills!

// 2. Modern Deep Copy (structuredClone)
const deep = structuredClone(original);
deep.skills.push("Node.js"); // Independent! original is unaffected

console.log("Original skills:", original.skills);
console.log("Deep cloned skills:", deep.skills);`,
    expectedOutput: `Original skills: [ 'JavaScript', 'CSS', 'React' ]
Deep cloned skills: [ 'JavaScript', 'CSS', 'React', 'Node.js' ]`,
    gotchas: "`JSON.stringify` drops properties whose values are `undefined`, functions, or Symbols, and converts `Date` instances into ISO strings without keeping them as Date objects.",
    interviewScript: `"A shallow copy only copies top-level properties; nested objects share memory references. A deep copy recursively duplicates every level. In modern JavaScript, we use \`structuredClone()\` for native, safe deep copying without the limitations of \`JSON.parse(JSON.stringify())\`."`
  },

  {
    id: "interview-9",
    category: "interview",
    title: "9. Higher-Order Functions (HOF) and Pure Functions",
    difficulty: "Medium",
    tags: ["Functional Programming", "HOF", "Pure Functions", "Immutability"],
    shortSummary: "Master functional programming pillars: functions that accept/return functions, and functions with zero side effects.",
    analogy: "A pure function is like a calculator: `2 + 2` is always `4`, and pressing the button doesn't turn off your room lights (no side effects). An impure function is like asking 'What time is it?' (result changes every time).",
    deepExplanation: `
### 1. Higher-Order Function (HOF):
A function that does at least one of the following:
- Takes one or more functions as arguments (e.g. \`map\`, \`filter\`, \`reduce\`, \`addEventListener\`).
- Returns a function as its result (e.g. \`debounce\`, Currying).

### 2. Pure Function:
A function that satisfies two strict conditions:
1. **Deterministic (Same Input -> Same Output)**: Given the same arguments, it will always return the exact same result.
2. **No Side Effects**: It does not mutate external state, modify parameters, make HTTP calls, or write to the console/DOM.
    `,
    code: `// Impure Function (Mutates external state & non-deterministic)
let taxRate = 0.18;
function calculateTotalImpure(price) {
  return price + (price * taxRate); // Relies on external mutable variable
}

// Pure Function (Self-contained, deterministic, zero side-effects)
function calculateTotalPure(price, rate) {
  return price + (price * rate);
}

// Higher-Order Function (Takes callback, returns transformed result)
const prices = [100, 200, 300];
const totals = prices.map(p => calculateTotalPure(p, 0.18));

console.log("Pure Transformed Totals:", totals);`,
    expectedOutput: `Pure Transformed Totals: [ 118, 236, 354 ]`,
    gotchas: "`Array.prototype.push()` and `Array.prototype.splice()` mutate the original array in-place (Impure!). `Array.prototype.concat()`, `map()`, and `filter()` return new arrays (Pure!).",
    interviewScript: `"A Higher-Order Function is a function that takes other functions as arguments or returns a function. A Pure Function is deterministic — always returning the same output for the same input — and causes no side effects on external state."`
  },

  {
    id: "interview-10",
    category: "interview",
    title: "10. Memory Management, Garbage Collection & Preventing Memory Leaks",
    difficulty: "Hard",
    tags: ["Memory", "Garbage Collection", "Performance", "Optimization"],
    shortSummary: "Learn how V8 manages memory allocation (Stack/Heap), Mark-and-Sweep GC, and how to avoid memory leaks.",
    analogy: "Garbage collection is like a city recycling truck: It starts at city hall (root variables) and drives through all connected roads (references). Any house with no connected road is marked as abandoned and demolished to free up land.",
    deepExplanation: `
### JavaScript Memory Lifecycle:
1. **Allocate Memory**: Allocated automatically when declaring variables/objects.
2. **Use Memory**: Reading and writing values.
3. **Release Memory**: Handled by the **Garbage Collector (GC)**.

### Garbage Collection Algorithm: Mark-and-Sweep
1. Starts from a set of **Roots** (Global object, currently executing call stack).
2. Traverses and **marks** all objects reachable from roots.
3. Any object that is **unreachable** is considered garbage and swept from memory.

### 4 Common Causes of Memory Leaks:
1. **Accidental Global Variables**: Forgetting \`let/const\` attaches variables to \`window\`.
2. **Forgotten Timers / Intervals**: \`setInterval\` holding references inside its callback without \`clearInterval\`.
3. **Detached DOM Nodes**: Keeping a JS variable reference to a DOM element removed from page.
4. **Uncleared Event Listeners**: Adding global listeners on \`window\` without removing them on component unmount.
    `,
    code: `// Memory Leak Example & Clean Fix
function setupListener() {
  const hugeData = new Array(100000).fill("Data chunk");

  const onScroll = () => {
    console.log("Scrolled with data length:", hugeData.length);
  };

  window.addEventListener("scroll", onScroll);

  // CLEANUP FUNCTION: Essential to prevent memory leak!
  return function cleanup() {
    window.removeEventListener("scroll", onScroll);
    console.log("Cleaned up listener to free memory!");
  };
}

const teardown = setupListener();
teardown();`,
    expectedOutput: `Cleaned up listener to free memory!`,
    gotchas: "WeakMap and WeakSet hold 'weak' references to objects, allowing the garbage collector to reclaim the object if there are no other references, preventing memory leaks in cache patterns.",
    interviewScript: `"JavaScript uses an automatic Mark-and-Sweep garbage collection algorithm that reclaims memory unreachable from root objects. Common memory leaks happen from uncleared intervals, forgotten event listeners, closures holding large unused data, and detached DOM trees."`
  },


  // =========================================================================
  // CATEGORY 3: 10 MUST-KNOW ESSENTIAL INTERVIEW QUESTIONS (30-SEC SIMPLE PITCH)
  // =========================================================================
  {
    id: "mustknow-1",
    category: "mustknow",
    title: "1. What is the difference between `null` and `undefined`?",
    difficulty: "Easy",
    tags: ["Types", "Basics", "null", "undefined"],
    shortSummary: "Understand absence of value: system default (`undefined`) vs intentional assignment (`null`).",
    simplePitch: `
- **\`undefined\`** means a variable has been declared but **not yet assigned a value** (JavaScript's default state).
- **\`null\`** is an **intentional assignment** representing an empty or non-existent value (developer's choice).
- **Type check**: \`typeof undefined === 'undefined'\`, whereas \`typeof null === 'object'\` (a famous legacy bug in JS).
- **Equality**: \`null == undefined\` is **\`true\`**, but \`null === undefined\` is **\`false\`**.
    `,
    code: `let a; // JS sets this to undefined
let b = null; // Developer sets this to empty

console.log("typeof a:", typeof a); // "undefined"
console.log("typeof b:", typeof b); // "object"
console.log("a == b:", a == b);     // true (loose)
console.log("a === b:", a === b);   // false (strict)`,
    expectedOutput: `typeof a: undefined
typeof b: object
a == b: true
a === b: false`,
    interviewScript: `"Undefined means a variable is declared but hasn't been assigned a value yet. Null is an intentional assignment representing 'no value'. Typeof undefined is 'undefined', while typeof null is 'object'."`
  },

  {
    id: "mustknow-2",
    category: "mustknow",
    title: "2. What is Hoisting in JavaScript?",
    difficulty: "Easy",
    tags: ["Hoisting", "Engine", "TDZ"],
    shortSummary: "How JS moves variable and function declarations to the top of their scope during compilation.",
    simplePitch: `
- **Hoisting** is JavaScript's default behavior of moving variable and function declarations to the top of their containing scope during the memory compilation phase before code executes.
- **Function Declarations** are hoisted with their **complete body** (callable anywhere in scope).
- **\`var\`** is hoisted and initialized to **\`undefined\`**.
- **\`let\` and \`const\`** are hoisted but kept in the **Temporal Dead Zone (TDZ)** without initialization (accessing throws \`ReferenceError\`).
    `,
    code: `console.log(myVar); // undefined
// console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization

greet(); // "Hello!"

var myVar = "JavaScript";
let myLet = "ES6";

function greet() {
  console.log("Hello!");
}`,
    expectedOutput: `undefined
Hello!`,
    interviewScript: `"Hoisting is JavaScript's process of allocating memory for declarations at the top of their scope before execution. Functions are fully hoisted, var is hoisted as undefined, and let/const are hoisted in the Temporal Dead Zone."`
  },

  {
    id: "mustknow-3",
    category: "mustknow",
    title: "3. What is the difference between `==` and `===`?",
    difficulty: "Easy",
    tags: ["Operators", "Equality", "Coercion"],
    shortSummary: "Loose equality (with coercion) vs Strict equality (value and type check).",
    simplePitch: `
- **\`==\` (Loose Equality)** compares values **after converting them to a common type** (implicit type coercion).
- **\`===\` (Strict Equality)** compares **both value and data type** without any type conversion.
- **Best Practice**: Always use \`===\` to prevent subtle bugs caused by unexpected type coercion rules.
    `,
    code: `console.log(5 == "5");   // true (string "5" converted to number 5)
console.log(5 === "5");  // false (number !== string)
console.log(0 == false); // true
console.log(0 === false);// false`,
    expectedOutput: `true
false
true
false`,
    interviewScript: `"== is loose equality which performs type coercion before comparing values. === is strict equality which checks both value and type without coercion. We should always prefer ===."`
  },

  {
    id: "mustknow-4",
    category: "mustknow",
    title: "4. What are the key differences between Regular Functions and Arrow Functions?",
    difficulty: "Easy",
    tags: ["Arrow Functions", "ES6", "this", "Syntax"],
    shortSummary: "4 core distinctions: `this` binding, constructor usage, `arguments` object, and concise syntax.",
    simplePitch: `
1. **\`this\` Binding**: Regular functions have dynamic \`this\`; Arrow functions do not have their own \`this\` and inherit it lexically from parent scope.
2. **Constructors**: Regular functions can be instantiated with \`new\`; Arrow functions throw \`TypeError\` if used with \`new\`.
3. **\`arguments\` Object**: Regular functions have access to \`arguments\`; Arrow functions do not (use rest \`...args\` instead).
4. **Syntax**: Arrow functions provide shorter syntax with implicit returns for single expressions.
    `,
    code: `// 1. Regular Function
function Regular() {
  this.val = 10;
}
const r = new Regular(); // Valid

// 2. Arrow Function
const Arrow = () => {};
// const a = new Arrow(); // TypeError: Arrow is not a constructor`,
    expectedOutput: `// Arrow functions cannot be constructors`,
    interviewScript: `"Arrow functions have 4 main differences: they inherit \`this\` lexically from the outer scope, cannot be used as constructors with \`new\`, do not have their own \`arguments\` object, and support concise implicit return syntax."`
  },

  {
    id: "mustknow-5",
    category: "mustknow",
    title: "5. What is the difference between Rest Parameter and Spread Operator?",
    difficulty: "Easy",
    tags: ["ES6", "Rest", "Spread", "Operators"],
    shortSummary: "Both use `...`, but Rest gathers items together while Spread unpacks items.",
    simplePitch: `
- **Rest Parameter (\`...rest\`)**: **Packs / gathers** multiple remaining individual elements into a single Array. Used in function parameters: \`function(...args)\`.
- **Spread Operator (\`...spread\`)**: **Unpacks / expands** an iterable (Array/Object/String) into individual separate elements. Used in array literals, object literals, or function calls: \`[...arr1, ...arr2]\`.
    `,
    code: `// REST: Gathers arguments into an array
function collectTags(first, ...remaining) {
  console.log("First:", first);
  console.log("Remaining array:", remaining);
}
collectTags("JS", "HTML", "CSS", "React");

// SPREAD: Unpacks array into new array
const frontend = ["Vue", "Angular"];
const allSkills = ["React", ...frontend];
console.log("Spread result:", allSkills);`,
    expectedOutput: `First: JS
Remaining array: [ 'HTML', 'CSS', 'React' ]
Spread result: [ 'React', 'Vue', 'Angular' ]`,
    interviewScript: `"Both use the three-dot syntax, but Rest gathers multiple elements into a single array inside function parameters, while Spread unpacks an array or object into individual elements."`
  },

  {
    id: "mustknow-6",
    category: "mustknow",
    title: "6. What is the difference between `map()` and `forEach()`?",
    difficulty: "Easy",
    tags: ["Array Methods", "map", "forEach", "Immutability"],
    shortSummary: "Return values: `map()` returns a new array and supports chaining; `forEach()` returns `undefined`.",
    simplePitch: `
- **\`map()\`** transforms each item in the array and **returns a brand new array** of equal length without mutating the original. It is chainable (\`.map().filter()\`).
- **\`forEach()\`** simply executes a callback for each element and **returns \`undefined\`**. It is used purely for side-effects (like logging or saving to DB) and cannot be chained.
- **Performance**: \`map()\` is used when you need the transformed output; \`forEach()\` is used when you only need to iterate.
    `,
    code: `const numbers = [1, 2, 3];

// map returns a new array
const doubled = numbers.map(n => n * 2);

// forEach returns undefined
const forEachResult = numbers.forEach(n => console.log("Item:", n));

console.log("map returned:", doubled);
console.log("forEach returned:", forEachResult);`,
    expectedOutput: `Item: 1
Item: 2
Item: 3
map returned: [ 2, 4, 6 ]
forEach returned: undefined`,
    interviewScript: `"\`map()\` returns a new transformed array and allows method chaining, whereas \`forEach()\` always returns \`undefined\` and is only used for executing side effects without returning a new array."`
  },

  {
    id: "mustknow-7",
    category: "mustknow",
    title: "7. What is `NaN` in JavaScript and how do you reliably check for it?",
    difficulty: "Easy",
    tags: ["NaN", "Number", "Types", "Quirks"],
    shortSummary: "`NaN` is 'Not a Number' of type 'number', and is the only value not equal to itself.",
    simplePitch: `
- **\`NaN\`** stands for **"Not-a-Number"**, generated when a mathematical operation fails to yield a valid number (e.g. \`"abc" * 2\`).
- **Type**: \`typeof NaN === 'number'\`.
- **The Quirk**: \`NaN\` is the **only value in JavaScript that is not equal to itself** (\`NaN === NaN\` is \`false\`).
- **Reliable Check**: Use **\`Number.isNaN(val)\`** (ES6). Avoid the global \`isNaN()\` because it performs aggressive type coercion!
    `,
    code: `console.log(typeof NaN); // "number"
console.log(NaN === NaN); // false

// Global isNaN (Flawed coercion)
console.log(isNaN("hello")); // true (coerces "hello" to NaN!)

// Number.isNaN (Strict & Reliable ES6 standard)
console.log(Number.isNaN("hello")); // false (not NaN type)
console.log(Number.isNaN(0 / 0));   // true`,
    expectedOutput: `number
false
true
false
true`,
    interviewScript: `"NaN represents an invalid numerical result. Its type is surprisingly 'number', and it's the only value not equal to itself. The most reliable way to check for it is \`Number.isNaN()\`, which avoids false positives from type coercion."`
  },

  {
    id: "mustknow-8",
    category: "mustknow",
    title: "8. What is the difference between Primitive and Reference Data Types?",
    difficulty: "Easy",
    tags: ["Data Types", "Stack", "Heap", "Memory"],
    shortSummary: "Stack (immutable by value) vs Heap (mutable by reference).",
    simplePitch: `
- **Primitives** (\`string\`, \`number\`, \`boolean\`, \`null\`, \`undefined\`, \`symbol\`, \`bigint\`):
  - Stored directly on the **Call Stack**.
  - **Immutable** and passed **by value** (copying creates an independent value).
- **Reference Types** (\`Object\`, \`Array\`, \`Function\`, \`Date\`):
  - Stored in **Heap memory**, while the variable on the Stack only holds a memory address pointer.
  - **Mutable** and passed **by reference** (copying copies the address pointer).
    `,
    code: `// Primitive: Copied by Value
let x = 10;
let y = x;
y = 20;
console.log("x:", x, "y:", y); // x is still 10

// Reference: Copied by Reference
let obj1 = { score: 10 };
let obj2 = obj1;
obj2.score = 99;
console.log("obj1.score:", obj1.score); // 99 (mutated!)`,
    expectedOutput: `x: 10 y: 20
obj1.score: 99`,
    interviewScript: `"Primitives are stored by value on the Stack and are immutable. Reference types like objects and arrays are stored on the Heap, and variables store a memory pointer, meaning copies share the same underlying object."`
  },

  {
    id: "mustknow-9",
    category: "mustknow",
    title: "9. What are Promises and what are their 3 states?",
    difficulty: "Easy",
    tags: ["Promises", "Async", "States"],
    shortSummary: "Pending, Fulfilled, and Rejected states of asynchronous operations.",
    simplePitch: `
A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

### The 3 Mutually Exclusive States:
1. **\`pending\`**: Initial state; asynchronous operation is ongoing.
2. **\`fulfilled\`**: Operation succeeded successfully (\`resolve(value)\`). Triggers \`.then()\`.
3. **\`rejected\`**: Operation failed with an error (\`reject(error)\`). Triggers \`.catch()\`.
- Once a Promise transitions to Fulfilled or Rejected, it becomes **Settled** (immutable state).
    `,
    code: `const checkScore = new Promise((resolve, reject) => {
  const marks = 85;
  if (marks >= 50) {
    resolve("Passed Exam! 🎉");
  } else {
    reject("Failed Exam! ❌");
  }
});

checkScore
  .then(result => console.log("Success:", result))
  .catch(err => console.error("Error:", err))
  .finally(() => console.log("Completed verification."));`,
    expectedOutput: `Success: Passed Exam! 🎉
Completed verification.`,
    interviewScript: `"A Promise represents an asynchronous operation. It has three states: Pending (initial state), Fulfilled (resolved successfully), and Rejected (failed with an error). Once settled, its state cannot change."`
  },

  {
    id: "mustknow-10",
    category: "mustknow",
    title: "10. What is Strict Mode (`'use strict'`) in JavaScript?",
    difficulty: "Easy",
    tags: ["Strict Mode", "Syntax", "Best Practices"],
    shortSummary: "Opt-in restricted variant of JS that eliminates silent errors and prevents bad practices.",
    simplePitch: `
- **Strict Mode** (enabled with \`"use strict";\`) opts into a cleaner, stricter JavaScript execution model.
- **Key Protections**:
  1. Prevents accidental global variables (throws \`ReferenceError\` if assigning to undeclared variable).
  2. Disallows duplicate parameter names (\`function(a, a)\`).
  3. Prohibits deleting variables or undeletable properties.
  4. Keeps \`this\` as \`undefined\` inside plain functions (instead of defaulting to \`window\`).
  5. ES6 modules and classes enable strict mode automatically by default.
    `,
    code: `"use strict";

try {
  // 1. Accidental global variable
  undeclaredVar = 100; // Throws ReferenceError!
} catch (e) {
  console.log("Caught in Strict Mode:", e.message);
}

function checkThis() {
  return this; // undefined in strict mode (not window!)
}
console.log("this in plain function:", checkThis());`,
    expectedOutput: `Caught in Strict Mode: undeclaredVar is not defined
this in plain function: undefined`,
    interviewScript: `"'use strict' enforces strict parsing and error handling in JavaScript. It converts silent errors into throwing exceptions, prevents accidental global variables, and sets 'this' to undefined in plain functions."`
  }
];

// Provide quick lookup maps and stats
const CATEGORIES = {
  logic: {
    id: "logic",
    title: "10 Logic & Code Line-by-Line Breakdown",
    icon: "🧩",
    badge: "10 Interactive Code Walkthroughs",
    description: "Step-by-step interactive breakdowns of tricky logic, asynchronous closures, references, and algorithm patterns with live code execution and memory inspection."
  },
  interview: {
    id: "interview",
    title: "Top 10 Most Asked JS Interview Questions",
    icon: "🚀",
    badge: "10 Deep Dive Guides",
    description: "Comprehensive, interview-tested explanations with real-world analogies, gotchas, architecture diagrams, and ready-to-use verbal interview scripts."
  },
  mustknow: {
    id: "mustknow",
    title: "10 Must-Know Quick Answers (30-Sec Pitch)",
    icon: "⚡",
    badge: "10 Essential Quick Hits",
    description: "High-yield, 30-second bulleted answers and cheat-sheet comparisons designed for immediate memorization and rapid recall in interviews."
  }
};
